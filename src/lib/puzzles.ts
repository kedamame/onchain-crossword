import { WORD_BANK, WordEntry } from './wordlist';

export interface WordDef {
  word: string;
  direction: 'across' | 'down';
  row: number;
  col: number;
  clue: string;
  number: number;
}

export interface Puzzle {
  id: number;
  title: string;
  rows: number;
  cols: number;
  words: WordDef[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const GRID_SIZE = 14;

const PUZZLE_TITLES = [
  'BASICS',
  'DEFI',
  'LAYER 2',
  'CULTURE',
  'SECURITY',
  'TOKENOMICS',
  'GOVERNANCE',
  'INFRASTRUCTURE',
  'ONCHAIN',
  'WEB3 LIFE',
  'STAKING',
  'TRADING',
  'WALLETS',
  'BRIDGES',
  'PROTOCOLS',
];

// ─── Seeded RNG (mulberry32) ──────────────────────────────────────────────────

function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 0x100000000;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Grid helpers ─────────────────────────────────────────────────────────────

type Grid = (string | null)[][];

function makeGrid(): Grid {
  return Array.from({ length: GRID_SIZE }, () => Array<string | null>(GRID_SIZE).fill(null));
}

/**
 * Check if `word` can be placed at (row, col) in direction `dir`.
 * Returns { ok, crossCount } where crossCount is the number of cells
 * that match an existing letter (i.e. crossing an already-placed word).
 * crossCount must be ≥1 for the placement to be valid (connectivity).
 */
function canPlace(
  grid: Grid,
  word: string,
  dir: 'across' | 'down',
  row: number,
  col: number,
): { ok: boolean; crossCount: number } {
  const len = word.length;

  // Bounds
  if (dir === 'across') {
    if (row < 0 || row >= GRID_SIZE || col < 0 || col + len > GRID_SIZE)
      return { ok: false, crossCount: 0 };
    // Cell immediately before/after must be empty (no merging with adjacent word)
    if (col > 0 && grid[row][col - 1] !== null) return { ok: false, crossCount: 0 };
    if (col + len < GRID_SIZE && grid[row][col + len] !== null) return { ok: false, crossCount: 0 };
  } else {
    if (col < 0 || col >= GRID_SIZE || row < 0 || row + len > GRID_SIZE)
      return { ok: false, crossCount: 0 };
    if (row > 0 && grid[row - 1][col] !== null) return { ok: false, crossCount: 0 };
    if (row + len < GRID_SIZE && grid[row + len][col] !== null) return { ok: false, crossCount: 0 };
  }

  let crossCount = 0;

  for (let i = 0; i < len; i++) {
    const r = dir === 'across' ? row : row + i;
    const c = dir === 'across' ? col + i : col;
    const existing = grid[r][c];

    if (existing !== null) {
      // Cell occupied — letter must match (this is a crossing)
      if (existing !== word[i]) return { ok: false, crossCount: 0 };
      crossCount++;
    } else {
      // Cell empty — perpendicular neighbors must be empty (prevent parallel words)
      if (dir === 'across') {
        if (r > 0 && grid[r - 1][c] !== null) return { ok: false, crossCount: 0 };
        if (r < GRID_SIZE - 1 && grid[r + 1][c] !== null) return { ok: false, crossCount: 0 };
      } else {
        if (c > 0 && grid[r][c - 1] !== null) return { ok: false, crossCount: 0 };
        if (c < GRID_SIZE - 1 && grid[r][c + 1] !== null) return { ok: false, crossCount: 0 };
      }
    }
  }

  return { ok: true, crossCount };
}

function placeWord(
  grid: Grid,
  word: string,
  dir: 'across' | 'down',
  row: number,
  col: number,
): void {
  for (let i = 0; i < word.length; i++) {
    const r = dir === 'across' ? row : row + i;
    const c = dir === 'across' ? col + i : col;
    grid[r][c] = word[i];
  }
}

// ─── Generator ───────────────────────────────────────────────────────────────

interface PlacedEntry {
  entry: WordEntry;
  dir: 'across' | 'down';
  row: number;
  col: number;
}

/**
 * Attempt to generate a crossword for the given day + seed offset.
 * Returns null if fewer than `minWords` could be placed.
 */
function tryGenerate(
  dayNumber: number,
  seedOffset: number,
  minWords = 4,
): PlacedEntry[] | null {
  const rng = mulberry32((dayNumber + 1) * 31337 + seedOffset);
  const entries = shuffle([...WORD_BANK], rng);
  const grid = makeGrid();
  const placed: PlacedEntry[] = [];

  // Place first word horizontally in center of grid
  const first = entries[0];
  const firstRow = Math.floor(GRID_SIZE / 2);
  const firstCol = Math.floor((GRID_SIZE - first.word.length) / 2);
  placeWord(grid, first.word, 'across', firstRow, firstCol);
  placed.push({ entry: first, dir: 'across', row: firstRow, col: firstCol });

  // Greedily place up to 8 additional words
  for (let wi = 1; wi < entries.length && placed.length < 9; wi++) {
    const entry = entries[wi];

    // Find all valid crossing placements against every already-placed word
    const candidates: Array<{
      dir: 'across' | 'down';
      row: number;
      col: number;
      crossCount: number;
    }> = [];

    for (const p of placed) {
      const perpDir: 'across' | 'down' = p.dir === 'across' ? 'down' : 'across';

      for (let pi = 0; pi < p.entry.word.length; pi++) {
        const pLetter = p.entry.word[pi];
        const pRow = p.dir === 'across' ? p.row : p.row + pi;
        const pCol = p.dir === 'across' ? p.col + pi : p.col;

        for (let ni = 0; ni < entry.word.length; ni++) {
          if (entry.word[ni] !== pLetter) continue;

          // Align new word so that letter [ni] sits at (pRow, pCol)
          const nRow = perpDir === 'across' ? pRow : pRow - ni;
          const nCol = perpDir === 'across' ? pCol - ni : pCol;

          const result = canPlace(grid, entry.word, perpDir, nRow, nCol);
          if (result.ok && result.crossCount > 0) {
            // Dedup: same (dir, row, col) can be reached via multiple shared letters
            const key = `${perpDir}-${nRow}-${nCol}`;
            if (!candidates.some((c) => `${c.dir}-${c.row}-${c.col}` === key)) {
              candidates.push({ dir: perpDir, row: nRow, col: nCol, crossCount: result.crossCount });
            }
          }
        }
      }
    }

    if (candidates.length === 0) continue;

    // Prefer higher crossCount; break ties randomly
    const maxCross = Math.max(...candidates.map((c) => c.crossCount));
    const top = candidates.filter((c) => c.crossCount === maxCross);
    const chosen = top[Math.floor(rng() * top.length)];

    placeWord(grid, entry.word, chosen.dir, chosen.row, chosen.col);
    placed.push({ entry, dir: chosen.dir, row: chosen.row, col: chosen.col });
  }

  return placed.length >= minWords ? placed : null;
}

/** Trim to bounding box, assign cell numbers in reading order, build Puzzle. */
function buildPuzzle(placed: PlacedEntry[], dayNumber: number): Puzzle {
  // Bounding box
  let minRow = GRID_SIZE,
    maxRow = 0,
    minCol = GRID_SIZE,
    maxCol = 0;

  for (const p of placed) {
    const endRow = p.dir === 'across' ? p.row : p.row + p.entry.word.length - 1;
    const endCol = p.dir === 'across' ? p.col + p.entry.word.length - 1 : p.col;
    minRow = Math.min(minRow, p.row);
    maxRow = Math.max(maxRow, endRow);
    minCol = Math.min(minCol, p.col);
    maxCol = Math.max(maxCol, endCol);
  }

  const rows = maxRow - minRow + 1;
  const cols = maxCol - minCol + 1;

  // Collect unique start cells and assign numbers in reading order
  const startMap = new Map<string, { row: number; col: number }>();
  for (const p of placed) {
    const r = p.row - minRow;
    const c = p.col - minCol;
    const key = `${r}-${c}`;
    if (!startMap.has(key)) startMap.set(key, { row: r, col: c });
  }

  const sorted = Array.from(startMap.values()).sort((a, b) =>
    a.row !== b.row ? a.row - b.row : a.col - b.col,
  );

  const numberMap = new Map<string, number>();
  sorted.forEach((sc, idx) => {
    numberMap.set(`${sc.row}-${sc.col}`, idx + 1);
  });

  // Build WordDef array
  const words: WordDef[] = placed.map((p) => {
    const r = p.row - minRow;
    const c = p.col - minCol;
    return {
      word: p.entry.word,
      direction: p.dir,
      row: r,
      col: c,
      clue: p.entry.clue,
      // numberMap always has an entry for every placed word's start cell
      number: numberMap.get(`${r}-${c}`) ?? 1,
    };
  });

  const title =
    PUZZLE_TITLES[((dayNumber % PUZZLE_TITLES.length) + PUZZLE_TITLES.length) % PUZZLE_TITLES.length];

  return { id: dayNumber, title, rows, cols, words };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function getDailyPuzzle(): { puzzle: Puzzle; dayNumber: number } {
  const now = new Date();
  const dayNumber = Math.floor(
    (Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) -
      Date.UTC(2026, 0, 1)) /
      (1000 * 60 * 60 * 24),
  );

  let placed: PlacedEntry[] | null = null;

  // Try to get ≥4 words (20 attempts)
  for (let attempt = 0; attempt < 20 && placed === null; attempt++) {
    placed = tryGenerate(dayNumber, attempt * 100);
  }
  // Relax to ≥3 words
  for (let attempt = 0; placed === null && attempt < 20; attempt++) {
    placed = tryGenerate(dayNumber, attempt * 100 + 2000, 3);
  }
  // Relax to ≥2 words (practically always succeeds)
  for (let attempt = 0; placed === null && attempt < 20; attempt++) {
    placed = tryGenerate(dayNumber, attempt * 100 + 4000, 2);
  }
  // Absolute fallback: single word guaranteed
  if (placed === null) {
    const first = WORD_BANK[0];
    const col = Math.floor((GRID_SIZE - first.word.length) / 2);
    placed = [{ entry: first, dir: 'across', row: Math.floor(GRID_SIZE / 2), col }];
  }

  return { puzzle: buildPuzzle(placed, dayNumber), dayNumber };
}

// ─── Grid utilities (used by components) ─────────────────────────────────────

/** Build the answer grid (null = black cell) */
export function buildAnswerGrid(puzzle: Puzzle): (string | null)[][] {
  const grid: (string | null)[][] = Array.from({ length: puzzle.rows }, () =>
    Array(puzzle.cols).fill(null),
  );
  for (const w of puzzle.words) {
    for (let i = 0; i < w.word.length; i++) {
      const r = w.direction === 'across' ? w.row : w.row + i;
      const c = w.direction === 'across' ? w.col + i : w.col;
      grid[r][c] = w.word[i];
    }
  }
  return grid;
}

/** Map "row-col" -> cell number (for labeling grid cells) */
export function buildNumberMap(puzzle: Puzzle): Map<string, number> {
  const map = new Map<string, number>();
  for (const w of puzzle.words) {
    const key = `${w.row}-${w.col}`;
    if (!map.has(key)) map.set(key, w.number);
  }
  return map;
}

/** Get across and down clue lists, sorted by number */
export function getClues(puzzle: Puzzle) {
  const across: WordDef[] = [];
  const down: WordDef[] = [];
  const seenAcross = new Set<number>();
  const seenDown = new Set<number>();
  for (const w of puzzle.words) {
    if (w.direction === 'across' && !seenAcross.has(w.number)) {
      across.push(w);
      seenAcross.add(w.number);
    } else if (w.direction === 'down' && !seenDown.has(w.number)) {
      down.push(w);
      seenDown.add(w.number);
    }
  }
  across.sort((a, b) => a.number - b.number);
  down.sort((a, b) => a.number - b.number);
  return { across, down };
}

/** Given a cell position, return all words that cover it */
export function getWordsAtCell(puzzle: Puzzle, row: number, col: number): WordDef[] {
  return puzzle.words.filter((w) => {
    if (w.direction === 'across') {
      return w.row === row && col >= w.col && col < w.col + w.word.length;
    }
    return w.col === col && row >= w.row && row < w.row + w.word.length;
  });
}
