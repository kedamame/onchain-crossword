'use client';

import { useEffect, useRef, useMemo } from 'react';
import {
  Puzzle,
  WordDef,
  buildAnswerGrid,
  buildNumberMap,
  getWordsAtCell,
} from '@/lib/puzzles';

interface Props {
  puzzle: Puzzle;
  userGrid: string[][];
  selectedCell: { row: number; col: number } | null;
  selectedWord: WordDef | null;
  onCellClick: (row: number, col: number) => void;
  onInput: (row: number, col: number, value: string) => void;
  /** Called when backspace is pressed; wasEmpty=true means cell was already empty → move cursor back */
  onDelete: (row: number, col: number, wasEmpty: boolean) => void;
  isComplete: boolean;
}

export function CrosswordGrid({
  puzzle,
  userGrid,
  selectedCell,
  selectedWord,
  onCellClick,
  onInput,
  onDelete,
  isComplete,
}: Props) {
  const answerGrid = useMemo(() => buildAnswerGrid(puzzle), [puzzle]);
  const numberMap = useMemo(() => buildNumberMap(puzzle), [puzzle]);
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  // Focus input when selectedCell changes
  useEffect(() => {
    if (selectedCell) {
      const key = `${selectedCell.row}-${selectedCell.col}`;
      const el = inputRefs.current.get(key);
      el?.focus();
    }
  }, [selectedCell]);

  function isCellInSelectedWord(row: number, col: number): boolean {
    if (!selectedWord) return false;
    if (selectedWord.direction === 'across') {
      return (
        row === selectedWord.row &&
        col >= selectedWord.col &&
        col < selectedWord.col + selectedWord.word.length
      );
    }
    return (
      col === selectedWord.col &&
      row >= selectedWord.row &&
      row < selectedWord.row + selectedWord.word.length
    );
  }

  function isCorrect(row: number, col: number): boolean {
    const answer = answerGrid[row][col];
    const user = userGrid[row]?.[col];
    return answer !== null && user === answer;
  }

  return (
    <div className="crossword-grid-wrapper">
      <div
        className="crossword-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${puzzle.cols}, 1fr)`,
          gridTemplateRows: `repeat(${puzzle.rows}, 1fr)`,
          gap: '2px',
          width: '100%',
          aspectRatio: `${puzzle.cols} / ${puzzle.rows}`,
          maxWidth: '420px',
        }}
      >
        {Array.from({ length: puzzle.rows }, (_, row) =>
          Array.from({ length: puzzle.cols }, (_, col) => {
            const answer = answerGrid[row][col];
            const isBlack = answer === null;
            const cellKey = `${row}-${col}`;
            const num = numberMap.get(cellKey);
            const isSelected =
              selectedCell?.row === row && selectedCell?.col === col;
            const inWord = isCellInSelectedWord(row, col);
            const correct = !isBlack && isCorrect(row, col);
            const userVal = userGrid[row]?.[col] ?? '';

            if (isBlack) {
              return (
                <div
                  key={cellKey}
                  style={{ background: '#000', borderRadius: '2px' }}
                />
              );
            }

            return (
              <div
                key={cellKey}
                className="crossword-cell"
                style={{
                  position: 'relative',
                  background: isComplete
                    ? '#00FF87'
                    : correct
                      ? '#d4f7e4'
                      : isSelected
                        ? '#000'
                        : inWord
                          ? '#e8e8e8'
                          : '#f5f5f5',
                  border: isSelected
                    ? '2px solid #000'
                    : '1px solid #ccc',
                  cursor: 'pointer',
                  borderRadius: '2px',
                }}
                onClick={() => onCellClick(row, col)}
              >
                {num !== undefined && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '1px',
                      left: '2px',
                      fontSize: 'clamp(6px, 1.5vw, 10px)',
                      lineHeight: 1,
                      fontFamily: 'var(--font-space)',
                      fontWeight: 700,
                      color: isSelected ? '#fff' : '#000',
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  >
                    {num}
                  </span>
                )}
                <input
                  ref={(el) => {
                    if (el) inputRefs.current.set(cellKey, el);
                    else inputRefs.current.delete(cellKey);
                  }}
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  maxLength={1}
                  value={userVal}
                  readOnly={isComplete}
                  onChange={(e) => {
                    // Only handle character input here (not deletion)
                    const raw = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
                    if (raw) onInput(row, col, raw.slice(-1));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault();
                      onDelete(row, col, userVal === '');
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: 'clamp(10px, 3vw, 20px)',
                    color: isComplete
                      ? '#000'
                      : correct
                        ? '#007a45'
                        : isSelected
                          ? '#fff'
                          : '#000',
                    caretColor: 'transparent',
                    textTransform: 'uppercase',
                    paddingTop: num ? '20%' : '0',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCellClick(row, col);
                  }}
                />
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
