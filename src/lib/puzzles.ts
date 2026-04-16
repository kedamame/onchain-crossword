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

// ─── Puzzle 0 ───────────────────────────────────────────────────────────────
// Grid 8x10
//      0  1  2  3  4  5  6  7  8  9
//  0:  .  .  .  W  A  L  L  E  T  .
//  1:  .  .  .  .  .  N  F  T  .  .
//  2:  .  .  .  .  .  .  .  H  .  .
//  3:  .  .  .  .  B  A  S  E  .  .
//  4:  .  .  .  .  .  .  .  R  .  .
//  5:  .  .  .  .  .  .  D  E  F  I
//  6:  .  .  .  .  .  .  A  U  .  .
//  7:  .  .  .  .  .  .  O  M  .  .
//
// Intersections verified:
//   WALLET(0,7)=E  == ETHEREUM(0,7)=E  ✓
//   NFT(1,7)=T     == ETHEREUM(1,7)=T  ✓
//   BASE(3,7)=E    == ETHEREUM(3,7)=E  ✓
//   DEFI(5,7)=E    == ETHEREUM(5,7)=E  ✓
//   DAO(5,6)=D     == DEFI(5,6)=D      ✓

const puzzle0: Puzzle = {
  id: 0,
  title: 'BASICS',
  rows: 8,
  cols: 10,
  words: [
    { word: 'WALLET',   direction: 'across', row: 0, col: 3, number: 1, clue: 'Where you keep your crypto assets' },
    { word: 'ETHEREUM', direction: 'down',   row: 0, col: 7, number: 2, clue: 'The second-largest blockchain' },
    { word: 'NFT',      direction: 'across', row: 1, col: 5, number: 3, clue: 'Non-Fungible Token (abbr.)' },
    { word: 'BASE',     direction: 'across', row: 3, col: 4, number: 4, clue: "Coinbase's L2 blockchain" },
    { word: 'DEFI',     direction: 'across', row: 5, col: 6, number: 5, clue: 'Decentralized Finance (abbr.)' },
    { word: 'DAO',      direction: 'down',   row: 5, col: 6, number: 5, clue: 'Community governance structure (abbr.)' },
  ],
};

// ─── Puzzle 1 ───────────────────────────────────────────────────────────────
// Grid 6x10
//      0  1  2  3  4  5  6  7  8  9
//  0:  .  G  .  C  .  .  .  .  .  .
//  1:  .  A  .  H  .  .  .  .  .  .
//  2:  .  S  W  A  P  .  D  .  .  .
//  3:  .  B  R  I  D  G  E  .  .  .
//  4:  .  .  .  N  .  .  F  .  .  .
//  5:  .  .  .  .  .  .  I  .  .  .
//
// Intersections verified:
//   GAS(2,1)=S    == SWAP(2,1)=S     ✓
//   CHAIN(2,3)=A  == SWAP(2,3)=A     ✓
//   CHAIN(3,3)=I  == BRIDGE(3,3)=I   ✓
//   DEFI(3,6)=E   == BRIDGE(3,6)=E   ✓
//   DEFI(2,6)=D   (DEFI starts row=2, col=6) ✓

const puzzle1: Puzzle = {
  id: 1,
  title: 'INFRASTRUCTURE',
  rows: 6,
  cols: 10,
  words: [
    { word: 'GAS',    direction: 'down',   row: 0, col: 1, number: 1, clue: 'Fee paid for blockchain transactions' },
    { word: 'CHAIN',  direction: 'down',   row: 0, col: 3, number: 2, clue: 'The backbone of blockchain' },
    { word: 'SWAP',   direction: 'across', row: 2, col: 1, number: 3, clue: 'Exchange one token for another' },
    { word: 'BRIDGE', direction: 'across', row: 3, col: 1, number: 4, clue: 'Move assets between networks' },
    { word: 'DEFI',   direction: 'down',   row: 2, col: 6, number: 5, clue: 'Decentralized Finance (abbr.)' },
  ],
};

// ─── Puzzle 2 ───────────────────────────────────────────────────────────────
// Grid 6x9
//      0  1  2  3  4  5  6  7  8
//  0:  .  .  .  .  .  T  .  .  .
//  1:  A  I  R  D  R  O  P  .  .
//  2:  .  .  .  .  .  K  .  .  .
//  3:  .  S  T  A  K  E  .  .  .
//  4:  .  .  .  M  I  N  T  .  .
//  5:  .  .  .  .  .  .  .  .  .
//
// Intersections verified:
//   AIRDROP(1,5)=O == TOKEN(1,5)=O   ✓
//   STAKE(3,5)=E   == TOKEN(3,5)=E   ✓
//   MINT(4,5)=N    == TOKEN(4,5)=N   ✓
//   MINT(4,6)=T    (last letter)
//   POOL? skipped — 4 words enough for puzzle 2

const puzzle2: Puzzle = {
  id: 2,
  title: 'TOKENOMICS',
  rows: 6,
  cols: 9,
  words: [
    { word: 'TOKEN',   direction: 'down',   row: 0, col: 5, number: 1, clue: 'Digital asset on a blockchain' },
    { word: 'AIRDROP', direction: 'across', row: 1, col: 0, number: 2, clue: 'Free token distribution event' },
    { word: 'STAKE',   direction: 'across', row: 3, col: 1, number: 3, clue: 'Lock tokens to earn rewards' },
    { word: 'MINT',    direction: 'across', row: 4, col: 3, number: 4, clue: 'Create a new NFT or token' },
  ],
};

// ─── Puzzle 3 ───────────────────────────────────────────────────────────────
// Grid 7x10
//      0  1  2  3  4  5  6  7  8  9
//  0:  .  .  .  .  .  .  .  .  .  .
//  1:  .  .  .  .  L  .  .  .  .  .
//  2:  .  .  .  .  A  .  .  .  .  .
//  3:  .  O  N  C  H  A  I  N  .  .
//  4:  .  .  .  .  E  .  .  F  .  .
//  5:  .  .  .  .  R  .  .  T  .  .
//  6:  .  .  G  A  S  .  .  .  .  .
//
// Intersections verified:
//   LAYER(3,4)=H? No: LAYER=L-A-Y-E-R, ONCHAIN has H at col=4.
//   Wait: ONCHAIN across row=3, col=1: O(1) N(2) C(3) H(4) A(5) I(6) N(7)
//   LAYER down col=4: L(1) A(2) Y(3)? No, row=3 col=4 = H from ONCHAIN.
//   LAYER would have Y at row=3 (index 2 from start row=1). Y != H.
//
// Let me redo puzzle 3:
// Use POOL, GAS, ONCHAIN, NFT, LAYER
//
//      0  1  2  3  4  5  6  7  8  9
//  0:  P  O  O  L  .  .  .  .  .  .
//  1:  .  N  .  .  .  .  .  .  .  .
//  2:  .  C  .  .  .  .  .  .  .  .
//  3:  .  H  .  .  .  .  .  .  .  .
//  4:  .  A  .  .  .  .  .  .  .  .
//  5:  .  I  .  G  A  S  .  .  .  .
//  6:  .  N  .  .  .  .  .  .  .  .
//
// POOL across (row=0, col=0): P-O-O-L ✓
// ONCHAIN down (row=0, col=1): O-N-C-H-A-I-N ✓ (O at row=0,col=1 = O from POOL ✓)
// GAS across (row=5, col=3): G-A-S ✓
// Not yet connected... GAS needs to cross ONCHAIN:
// ONCHAIN col=1 at row=5 = I. GAS at row=5: G(3) A(4) S(5). col=1 not in GAS. Not intersecting.
//
// Let me adjust GAS to cross ONCHAIN:
// ONCHAIN col=1 rows 0-6: O N C H A I N
// GAS down from col=1: O is row=0... hmm.
// GAS across at row=5, col=1: G? (5,1)=I from ONCHAIN. G!=I.
//
// NFT across (row=5, col=0): N(0) F(1) T(2). (5,1)=I from ONCHAIN. F!=I.
// NFT across (row=6, col=0): N(0) F(1) T(2). (6,1)=N from ONCHAIN. F!=N.
// NFT across (row=6, col=1): N(1) F(2) T(3). (6,1)=N from ONCHAIN. N=N ✓!
//
//      0  1  2  3  4  5  6  7  8  9
//  0:  P  O  O  L  .  .  .  .  .  .
//  1:  .  N  .  .  .  .  .  .  .  .
//  2:  .  C  .  .  .  .  .  .  .  .
//  3:  .  H  .  .  .  .  .  .  .  .
//  4:  .  A  .  .  .  .  .  .  .  .
//  5:  .  I  .  .  .  .  .  .  .  .
//  6:  .  N  F  T  .  .  .  .  .  .
//
// POOL across (row=0, col=0): P-O-O-L ✓
// ONCHAIN down (row=0, col=1): O-N-C-H-A-I-N ✓ (O at 0,1 == POOL's O ✓)
// NFT across (row=6, col=1): N-F-T ✓ (N at 6,1 == ONCHAIN's N ✓)
//
// Add GAS: need to connect to grid.
// POOL: P(0,0) O(0,1) O(0,2) L(0,3)
// GAS down from (0,0): G? (0,0)=P. No.
// GAS down from (0,2): G? (0,2)=O from POOL. No.
// GAS down from (0,3): G? (0,3)=L from POOL. No.
//
// Let me add YIELD down from (0,3):
// YIELD: Y-I-E-L-D. (0,3)=L from POOL. Y!=L. No.
//
// Add LAYER across at row=0 starting from col=3:
// LAYER: L(3) A(4) Y(5) E(6) R(7). (0,3)=L from POOL ✓!
//
//      0  1  2  3  4  5  6  7  8  9
//  0:  P  O  O  L  A  Y  E  R  .  .
//  1:  .  N  .  .  .  .  .  .  .  .
//  2:  .  C  .  .  .  .  .  .  .  .
//  3:  .  H  .  .  .  .  .  .  .  .
//  4:  .  A  .  .  .  .  .  .  .  .
//  5:  .  I  .  .  .  .  .  .  .  .
//  6:  .  N  F  T  .  .  .  .  .  .
//
// Wait: POOL is P-O-O-L (4 letters, col=0-3), and LAYER is L-A-Y-E-R.
// They share L at col=3. But the combined word at row=0 would be: P O O L A Y E R
// That's fine - POOL ends at col=3, LAYER starts at col=3. Same cell = L ✓
//
// POOL across (row=0, col=0): P(0) O(1) O(2) L(3)
// LAYER across (row=0, col=3): L(3) A(4) Y(5) E(6) R(7)
// Both share (0,3)=L. But they are TWO words at the same row with overlapping cell.
// This is NOT valid crossword design (cells can only belong to one across-word OR one down-word direction pair).
// Actually in a crossword, (0,3) would be the last letter of POOL and the first of LAYER - but that means (0,3) is part of TWO across words, which is invalid.
//
// Let me just go with 3 words for puzzle 3:

const puzzle3: Puzzle = {
  id: 3,
  title: 'ON-CHAIN',
  rows: 8,
  cols: 10,
  words: [
    { word: 'POOL',    direction: 'across', row: 0, col: 0, number: 1, clue: 'Liquidity pool for trading' },
    { word: 'ONCHAIN', direction: 'down',   row: 0, col: 1, number: 2, clue: 'Stored or executed on a blockchain' },
    { word: 'NFT',     direction: 'across', row: 6, col: 1, number: 3, clue: 'Non-Fungible Token (abbr.)' },
  ],
};

// ─── Puzzle 4 ───────────────────────────────────────────────────────────────
// Grid 7x10
//      0  1  2  3  4  5  6  7  8  9
//  0:  .  .  .  .  .  .  .  .  .  .
//  1:  .  .  Y  I  E  L  D  .  .  .
//  2:  .  .  .  .  .  .  E  .  .  .
//  3:  .  .  .  .  .  .  G  .  .  .
//  4:  .  .  .  .  .  .  E  .  .  .
//  5:  V  A  U  L  T  .  N  .  .  .
//  6:  .  .  .  .  .  .  .  .  .  .
//
// YIELD across (row=1, col=2): Y(2) I(3) E(4) L(5) D(6)
// DEGEN down  (row=1, col=6): D(1) E(2) G(3) E(4) N(5)
// Intersection: YIELD(1,6)=D and DEGEN(1,6)=D ✓
// VAULT across (row=5, col=0): V(0) A(1) U(2) L(3) T(4)
// DEGEN(5,6)=N - VAULT ends at col=4. Not intersecting. Need to connect VAULT.
//
// GEN down (row=3,col=6): hmm, DEGEN already at col=6.
// Let me add a word crossing VAULT:
// VAULT across (row=5, col=0): V A U L T
// DAO down (row=4,col=1): D(4) A(5) O(6). (5,1)=A from VAULT ✓!
//
//      0  1  2  3  4  5  6  7  8  9
//  0:  .  .  .  .  .  .  .  .  .  .
//  1:  .  .  Y  I  E  L  D  .  .  .
//  2:  .  .  .  .  .  .  E  .  .  .
//  3:  .  .  .  .  .  .  G  .  .  .
//  4:  .  D  .  .  .  .  E  .  .  .
//  5:  V  A  U  L  T  .  N  .  .  .
//  6:  .  O  .  .  .  .  .  .  .  .
//
// DAO down (row=4, col=1): D(4) A(5) O(6)
// VAULT across (row=5, col=0): V(0) A(1) U(2) L(3) T(4)
// Intersection: DAO(5,1)=A and VAULT(5,1)=A ✓
// YIELD across (row=1, col=2): Y-I-E-L-D ✓
// DEGEN down (row=1, col=6): D-E-G-E-N ✓ (D at row=1,col=6 == YIELD's D ✓)
// DAO connected via VAULT. DEGEN connected via YIELD. All connected ✓

const puzzle4: Puzzle = {
  id: 4,
  title: 'CULTURE',
  rows: 7,
  cols: 10,
  words: [
    { word: 'YIELD', direction: 'across', row: 1, col: 2, number: 1, clue: 'Return earned from staking or lending' },
    { word: 'DEGEN', direction: 'down',   row: 1, col: 6, number: 2, clue: 'High-risk crypto trader (slang)' },
    { word: 'DAO',   direction: 'down',   row: 4, col: 1, number: 3, clue: 'Decentralized Autonomous Organization' },
    { word: 'VAULT', direction: 'across', row: 5, col: 0, number: 4, clue: 'Smart contract that holds funds securely' },
  ],
};

// ─── Puzzle 5 ───────────────────────────────────────────────────────────────
// Grid 7x10
//      0  1  2  3  4  5  6  7  8  9
//  0:  .  .  .  .  .  .  .  .  .  .
//  1:  .  .  .  .  .  .  .  .  .  .
//  2:  .  .  .  .  H  O  D  L  .  .
//  3:  .  .  .  .  .  .  E  .  .  .
//  4:  .  .  .  .  .  .  F  .  .  .
//  5:  .  M  E  M  E  .  I  .  .  .
//  6:  .  .  .  .  .  .  .  .  .  .
//
// HODL across (row=2, col=4): H(4) O(5) D(6) L(7)
// DEFI down  (row=2, col=6): D(2) E(3) F(4) I(5)
// Intersection: HODL(2,6)=D and DEFI(2,6)=D ✓
// MEME across (row=5, col=1): M(1) E(2) M(3) E(4)
// DEFI(5,6)=I - MEME ends at col=4. Not connected.
// Need to connect MEME to rest.
// Add GAS down from (2,4): G? (2,4)=H. No.
// Add word that crosses both MEME and DEFI:
// DEFI col=6, rows 2-5. MEME row=5, cols 1-4.
// These don't intersect. Let me add a word down at col=4 crossing MEME:
// MEME(5,4)=E. Down word starting earlier at col=4:
// HODL at (2,4)=H. So col=4: H(2) ?(3) ?(4) E(5)?
// Word down at col=4, rows 2-5: H _ _ E -> HOLE? H-O-L-E ✓!
// HOLE down (row=2, col=4): H(2) O(3) L(4) E(5)
// HODL(2,4)=H and HOLE(2,4)=H ✓
// MEME(5,4)=E and HOLE(5,4)=E ✓
//
//      0  1  2  3  4  5  6  7  8  9
//  0:  .  .  .  .  .  .  .  .  .  .
//  1:  .  .  .  .  .  .  .  .  .  .
//  2:  .  .  .  .  H  O  D  L  .  .
//  3:  .  .  .  .  O  .  E  .  .  .
//  4:  .  .  .  .  L  .  F  .  .  .
//  5:  .  M  E  M  E  .  I  .  .  .
//  6:  .  .  .  .  .  .  .  .  .  .
//
// HODL across (row=2, col=4): H(4) O(5) D(6) L(7)
// DEFI down  (row=2, col=6): D(2) E(3) F(4) I(5) - D at (2,6)==HODL's D ✓
// HOLE down  (row=2, col=4): H(2) O(3) L(4) E(5) - H at (2,4)==HODL's H ✓
// MEME across(row=5, col=1): M(1) E(2) M(3) E(4) - E at (5,4)==HOLE's E ✓
// All connected ✓

const puzzle5: Puzzle = {
  id: 5,
  title: 'CRYPTO SLANG',
  rows: 7,
  cols: 10,
  words: [
    { word: 'HODL', direction: 'across', row: 2, col: 4, number: 1, clue: 'Hold crypto no matter what (crypto slang)' },
    { word: 'DEFI', direction: 'down',   row: 2, col: 6, number: 2, clue: 'Decentralized Finance (abbr.)' },
    { word: 'HOLE', direction: 'down',   row: 2, col: 4, number: 1, clue: 'A deep position in a losing trade (slang)' },
    { word: 'MEME', direction: 'across', row: 5, col: 1, number: 3, clue: 'Viral token driven by internet culture' },
  ],
};

// ─── Puzzle 6 ───────────────────────────────────────────────────────────────
// Grid 7x10
//      0  1  2  3  4  5  6  7  8  9
//  0:  .  .  .  .  .  .  .  .  .  .
//  1:  .  .  .  .  .  .  .  .  .  .
//  2:  .  .  S  T  A  K  E  .  .  .
//  3:  .  .  .  .  .  .  A  .  .  .
//  4:  .  .  .  .  .  .  R  .  .  .
//  5:  .  .  .  .  G  A  S  .  .  .
//  6:  .  .  .  .  .  .  .  .  .  .
//
// STAKE across (row=2, col=2): S(2) T(3) A(4) K(5) E(6)
// EARNS? EARN? GAS?
// GAS down (row=2,col=6)... no, STAKE's E is at col=6.
// EARN down (row=2, col=6): E(2) A(3) R(4) N(5). But (5,6)=? GAS(5,4-6).
// GAS across (row=5, col=4): G(4) A(5) S(6). (5,6)=S. EARN at (5,6)=N. S!=N.
//
// Let me use GAS across (row=5, col=4): G-A-S
// Need a down word at col=6 going from STAKE(2,6)=E down to GAS(5,6)=S:
// E _ _ S -> ETHS? EGGS? Let me try ERAS: E-R-A-S ✓ (4 letters, rows 2-5)
// ERAS down (row=2, col=6): E(2) R(3) A(4) S(5)
// STAKE(2,6)=E and ERAS(2,6)=E ✓
// GAS(5,6)=S and ERAS(5,6)=S ✓
// But "ERAS" is not a crypto term... Let me use something better.
//
// How about: E_RS -> not helpful.
// Let's just go with EARN down (row=2,col=6): E-A-R-N. Then GAS starts at col=3:
// GAS across (row=5, col=3): G(3) A(4) S(5). (5,6)=N from EARN(5,6)=N. GAS ends at col=5, not touching col=6.
// EARN(5,6)=N alone in row 5. Not connected to GAS.
// Add NFT down at col=5: N? STAKE(2,5)=K. N!=K. No.
//
// Simplify: just STAKE and EARN, then add a word crossing both:
// STAKE across (row=2, col=2): S T A K E (col 2-6)
// EARN down (row=2, col=6): E A R N (row 2-5)
// STAKE(2,6)=E == EARN(2,6)=E ✓
//
// Add BURN across (row=5, col=0): B(0) U(1) R(2) N(3)
// EARN(5,6)=N and BURN(5,3)=N. Col=6 != col=3. Not intersecting.
//
// Add BURN across (row=4, col=3): B(3) U(4) R(5) N(6)
// EARN(4,6)=R and BURN(4,6)=N. R!=N. No.
//
// Add BURN across (row=3, col=3): B(3) U(4) R(5) N(6)
// EARN(3,6)=A and BURN(3,6)=N. A!=N. No.
//
// Let me try a completely different word for the down:
// STAKE across (row=2, col=2): S(2) T(3) A(4) K(5) E(6)
// EARN doesn't work well. Let me use EDGE down at col=2:
// EDGE down (row=2, col=2): E(2) D(3) G(4) E(5). (2,2)=S from STAKE. E!=S. No.
//
// GAS down at col=4: G(?)...
// STAKE's A is at (2,4). GAS down (row=2, col=4): G? G!=A. No.
//
// APES down at col=6: A(?) STAKE's E is at (2,6).
// APES: A-P-E-S. (2,6)=E, not A. No.
//
// Hmm. Let me just use EARN and connect via a different word:
// STAKE across (row=3, col=2): S(2) T(3) A(4) K(5) E(6)
// EARN down (row=3, col=6): E(3) A(4) R(5) N(6)
// STAKE(3,6)=E == EARN(3,6)=E ✓
// Now add GAS crossing EARN:
// GAS across (row=5, col=4): G(4) A(5) S(6). EARN(5,6)=R. S!=R. No.
// GAS across (row=6, col=4): G(4) A(5) S(6). EARN(6,6)=N. S!=N. No.
//
// Let me just go with 2 words + a completely disconnected 3rd that connects through a common letter I can find.
// Actually, EARN has A at (4,6). Let me add a word crossing at (4,6)=A:
// AURA across (row=4, col=3): A(3) U(4) R(5) A(6). (4,6)=A from EARN ✓! (A==A ✓)
//
//      0  1  2  3  4  5  6  7  8  9
//  0:  .  .  .  .  .  .  .  .  .  .
//  1:  .  .  .  .  .  .  .  .  .  .
//  2:  .  .  .  .  .  .  .  .  .  .
//  3:  .  .  S  T  A  K  E  .  .  .
//  4:  .  .  .  A  U  R  A  .  .  .
//  5:  .  .  .  .  .  .  R  .  .  .
//  6:  .  .  .  .  .  .  N  .  .  .
//
// STAKE across (row=3, col=2): S T A K E
// AURA  across (row=4, col=3): A U R A
// EARN  down   (row=3, col=6): E A R N
// STAKE(3,6)=E == EARN(3,6)=E ✓
// AURA(4,6)=A  == EARN(4,6)=A ✓
// All connected ✓

const puzzle6: Puzzle = {
  id: 6,
  title: 'WEB3 LIFE',
  rows: 7,
  cols: 10,
  words: [
    { word: 'STAKE', direction: 'across', row: 3, col: 2, number: 1, clue: 'Lock tokens to earn rewards' },
    { word: 'EARN',  direction: 'down',   row: 3, col: 6, number: 2, clue: 'Generate yield from crypto assets' },
    { word: 'AURA',  direction: 'across', row: 4, col: 3, number: 3, clue: 'Onchain identity energy (Base app)' },
  ],
};

export const PUZZLES: Puzzle[] = [
  puzzle0,
  puzzle1,
  puzzle2,
  puzzle3,
  puzzle4,
  puzzle5,
  puzzle6,
];

export function getDailyPuzzle(): { puzzle: Puzzle; dayNumber: number } {
  const now = new Date();
  const dayNumber = Math.floor(
    (Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) -
      Date.UTC(2026, 0, 1)) /
      (1000 * 60 * 60 * 24),
  );
  const puzzle = PUZZLES[((dayNumber % PUZZLES.length) + PUZZLES.length) % PUZZLES.length];
  return { puzzle, dayNumber };
}

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

/** Map "row-col" -> cell number (for labeling) */
export function buildNumberMap(puzzle: Puzzle): Map<string, number> {
  const map = new Map<string, number>();
  for (const w of puzzle.words) {
    const key = `${w.row}-${w.col}`;
    if (!map.has(key)) map.set(key, w.number);
  }
  return map;
}

/** Get across and down clue lists (deduplicated) */
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

/** Given a cell, find which words cover it */
export function getWordsAtCell(
  puzzle: Puzzle,
  row: number,
  col: number,
): WordDef[] {
  return puzzle.words.filter((w) => {
    if (w.direction === 'across') {
      return w.row === row && col >= w.col && col < w.col + w.word.length;
    }
    return w.col === col && row >= w.row && row < w.row + w.word.length;
  });
}
