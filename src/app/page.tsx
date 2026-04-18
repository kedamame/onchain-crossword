'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  getDailyPuzzle,
  buildAnswerGrid,
  getClues,
  getWordsAtCell,
  WordDef,
} from '@/lib/puzzles';
import { CrosswordGrid } from '@/components/CrosswordGrid';
import { CluePanel } from '@/components/CluePanel';
import { CompletionStamp } from '@/components/CompletionStamp';
import { useFarcasterMiniApp } from '@/lib/farcaster';
import { useStreakRecord } from '@/lib/useStreakRecord';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';

const STORAGE_KEY = 'onchain-crossword';

interface SavedState {
  dayNumber: number;
  userGrid: string[][];
  isComplete: boolean;
}

interface StreakState {
  streak: number;
  lastCompletedDay: number;
}

export default function Home() {
  const { puzzle, dayNumber } = getDailyPuzzle();
  const answerGrid = buildAnswerGrid(puzzle);
  const { across: acrossClues, down: downClues } = getClues(puzzle);

  const { isInMiniApp } = useFarcasterMiniApp();
  const streakRecord = useStreakRecord(dayNumber);


  const [userGrid, setUserGrid] = useState<string[][]>(() =>
    Array.from({ length: puzzle.rows }, () => Array(puzzle.cols).fill('')),
  );
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedWord, setSelectedWord] = useState<WordDef | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showStamp, setShowStamp] = useState(false);
  const [streak, setStreak] = useState(1);

  // Load saved state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: SavedState = JSON.parse(raw);
        if (saved.dayNumber === dayNumber) {
          setUserGrid(saved.userGrid);
          setIsComplete(saved.isComplete);
        }
      }
      const rawStreak = localStorage.getItem(`${STORAGE_KEY}-streak`);
      if (rawStreak) {
        const s: StreakState = JSON.parse(rawStreak);
        setStreak(s.streak);
      }
    } catch {
      // ignore
    }
  }, [dayNumber]);

  // Save state when userGrid changes
  useEffect(() => {
    try {
      const saved: SavedState = { dayNumber, userGrid, isComplete };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // ignore
    }
  }, [dayNumber, userGrid, isComplete]);

  // Check completion
  useEffect(() => {
    if (isComplete) return;
    const complete = answerGrid.every((row, r) =>
      row.every((cell, c) => cell === null || userGrid[r]?.[c] === cell),
    );
    if (complete) {
      setIsComplete(true);
      setShowStamp(true);
      try {
        const rawStreak = localStorage.getItem(`${STORAGE_KEY}-streak`);
        let newStreak = 1;
        if (rawStreak) {
          const s: StreakState = JSON.parse(rawStreak);
          newStreak = s.lastCompletedDay === dayNumber - 1 ? s.streak + 1 : 1;
        }
        setStreak(newStreak);
        const newState: StreakState = { streak: newStreak, lastCompletedDay: dayNumber };
        localStorage.setItem(`${STORAGE_KEY}-streak`, JSON.stringify(newState));
      } catch {
        // ignore
      }
    }
  }, [userGrid, answerGrid, isComplete, dayNumber]);

  const selectCell = useCallback(
    (row: number, col: number) => {
      if (isComplete) return;

      const wordsAtCell = getWordsAtCell(puzzle, row, col);
      if (wordsAtCell.length === 0) return;

      if (selectedCell?.row === row && selectedCell?.col === col && wordsAtCell.length > 1) {
        const currentDir = selectedWord?.direction;
        const other = wordsAtCell.find((w) => w.direction !== currentDir);
        if (other) setSelectedWord(other);
        return;
      }

      setSelectedCell({ row, col });
      const preferred = wordsAtCell.find((w) => w.direction === selectedWord?.direction);
      setSelectedWord(preferred ?? wordsAtCell[0]);
    },
    [puzzle, selectedCell, selectedWord, isComplete],
  );

  const handleInput = useCallback(
    (row: number, col: number, value: string) => {
      if (isComplete) return;

      if (value !== '') {
        // Normal character: set cell and advance cursor
        setUserGrid((prev) => {
          const next = prev.map((r) => [...r]);
          next[row][col] = value;
          return next;
        });
        if (selectedWord) {
          const { direction } = selectedWord;
          const wordEnd =
            direction === 'across'
              ? selectedWord.col + selectedWord.word.length - 1
              : selectedWord.row + selectedWord.word.length - 1;
          const current = direction === 'across' ? col : row;
          if (current < wordEnd) {
            const nextRow = direction === 'across' ? row : row + 1;
            const nextCol = direction === 'across' ? col + 1 : col;
            setSelectedCell({ row: nextRow, col: nextCol });
          }
        }
      } else {
        // Backspace on empty cell: move cursor back (do NOT clear prev cell)
        if (selectedWord) {
          const { direction } = selectedWord;
          const wordStart =
            direction === 'across' ? selectedWord.col : selectedWord.row;
          const current = direction === 'across' ? col : row;
          if (current > wordStart) {
            const prevRow = direction === 'across' ? row : row - 1;
            const prevCol = direction === 'across' ? col - 1 : col;
            setSelectedCell({ row: prevRow, col: prevCol });
          }
        }
      }
    },
    [isComplete, selectedWord],
  );

  const handleDelete = useCallback(
    (row: number, col: number, wasEmpty: boolean) => {
      if (isComplete) return;
      if (!wasEmpty) {
        // Clear current cell only, stay in place
        setUserGrid((prev) => {
          const next = prev.map((r) => [...r]);
          next[row][col] = '';
          return next;
        });
      } else if (selectedWord) {
        // Cell already empty: move cursor back
        const { direction } = selectedWord;
        const wordStart = direction === 'across' ? selectedWord.col : selectedWord.row;
        const current = direction === 'across' ? col : row;
        if (current > wordStart) {
          const prevRow = direction === 'across' ? row : row - 1;
          const prevCol = direction === 'across' ? col - 1 : col;
          setSelectedCell({ row: prevRow, col: prevCol });
        }
      }
    },
    [isComplete, selectedWord],
  );

  const handleClueClick = useCallback(
    (word: WordDef) => {
      setSelectedWord(word);
      setSelectedCell({ row: word.row, col: word.col });
    },
    [],
  );

  const handleShare = useCallback(() => {
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || 'https://onchain-crossword.vercel.app';
    const displayStreak = streakRecord.onChainStreak ?? streak;
    const shareUrl = `${appUrl}/share?streak=${displayStreak}&day=${dayNumber}`;
    const text = `Onchain Crossword Day #${dayNumber} - ${puzzle.title}\n${displayStreak} day streak`;
    const composeUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text + '\n' + shareUrl)}`;
    if (isInMiniApp) {
      import('@farcaster/miniapp-sdk').then(({ sdk }) => {
        sdk.actions.openUrl(composeUrl);
      });
    } else {
      window.open(composeUrl, '_blank');
    }
  }, [dayNumber, puzzle.title, streak, streakRecord.onChainStreak, isInMiniApp]);

  return (
    <>
      <main
        style={{
          minHeight: '100dvh',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 0 80px',
        }}
      >
        {/* Header */}
        <header
          style={{
            width: '100%',
            borderBottom: '2px solid #000',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            maxWidth: '480px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: '22px',
                fontWeight: 900,
                color: '#000',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              ONCHAIN
            </div>
            <div
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: '22px',
                fontWeight: 900,
                color: '#000',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              CROSSWORD
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#999',
              }}
            >
              #{dayNumber.toString().padStart(3, '0')} — {puzzle.title}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-space)',
                fontSize: '13px',
                fontWeight: 700,
                color: '#000',
                marginTop: '2px',
              }}
            >
              {isComplete ? `${streakRecord.onChainStreak ?? streak} DAY STREAK` : 'SOLVE TODAY'}
            </div>
            {!isInMiniApp && (
              <div style={{ marginTop: '8px' }}>
                <ConnectWalletButton />
              </div>
            )}
          </div>
        </header>

        {/* Grid */}
        <div style={{ width: '100%', maxWidth: '480px', padding: '20px 20px 0' }}>
          <CrosswordGrid
            puzzle={puzzle}
            userGrid={userGrid}
            selectedCell={selectedCell}
            selectedWord={selectedWord}
            onCellClick={selectCell}
            onInput={handleInput}
            onDelete={handleDelete}
            isComplete={isComplete}
          />
        </div>

        {/* Active clue strip */}
        {selectedWord && !isComplete && (
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              padding: '12px 20px 0',
            }}
          >
            <div
              style={{
                background: '#000',
                color: '#fff',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-space)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: '#888',
                  whiteSpace: 'nowrap',
                }}
              >
                {selectedWord.number}{selectedWord.direction === 'across' ? 'A' : 'D'}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-space)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#fff',
                }}
              >
                {selectedWord.clue}
              </span>
            </div>
          </div>
        )}

        {/* Clue panel */}
        <div style={{ width: '100%', maxWidth: '480px', padding: '20px 20px 0' }}>
          <CluePanel
            acrossClues={acrossClues}
            downClues={downClues}
            selectedWord={selectedWord}
            onClueClick={handleClueClick}
          />
        </div>

        {/* Complete banner (when stamp dismissed) */}
        {isComplete && !showStamp && (
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              padding: '16px 20px 0',
            }}
          >
            <button
              onClick={() => setShowStamp(true)}
              style={{
                width: '100%',
                background: '#00FF87',
                color: '#000',
                padding: '16px',
                border: '2px solid #000',
                fontFamily: 'var(--font-space)',
                fontSize: '14px',
                fontWeight: 900,
                letterSpacing: '0.1em',
                cursor: 'pointer',
              }}
            >
              VIEW STAMP
            </button>
          </div>
        )}
      </main>

      {showStamp && (
        <CompletionStamp
          streak={streakRecord.onChainStreak ?? streak}
          dayNumber={dayNumber}
          puzzleTitle={puzzle.title}
          onShare={handleShare}
          onClose={() => setShowStamp(false)}
          canRecord={streakRecord.canRecord}
          contractReady={streakRecord.contractReady}
          alreadyRecorded={streakRecord.alreadyRecorded}
          txStatus={streakRecord.txStatus}
          txHash={streakRecord.txHash}
          onRecord={streakRecord.onRecord}
        />
      )}
    </>
  );
}
