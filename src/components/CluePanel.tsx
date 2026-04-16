'use client';

import { WordDef } from '@/lib/puzzles';

interface Props {
  acrossClues: WordDef[];
  downClues: WordDef[];
  selectedWord: WordDef | null;
  onClueClick: (word: WordDef) => void;
}

export function CluePanel({ acrossClues, downClues, selectedWord, onClueClick }: Props) {
  return (
    <div className="clue-panel" style={{ width: '100%', maxWidth: '420px' }}>
      {/* ACROSS */}
      <div style={{ marginBottom: '16px' }}>
        <div className="clue-section-label">ACROSS</div>
        <div className="clue-divider" />
        {acrossClues.map((w) => {
          const isActive =
            selectedWord?.number === w.number &&
            selectedWord?.direction === 'across';
          return (
            <button
              key={`across-${w.number}`}
              onClick={() => onClueClick(w)}
              className={`clue-item ${isActive ? 'clue-item--active' : ''}`}
            >
              <span className="clue-number">{w.number.toString().padStart(2, '0')}</span>
              <span className="clue-text">{w.clue}</span>
              <span className="clue-length">({w.word.length})</span>
            </button>
          );
        })}
      </div>

      {/* DOWN */}
      <div>
        <div className="clue-section-label">DOWN</div>
        <div className="clue-divider" />
        {downClues.map((w) => {
          const isActive =
            selectedWord?.number === w.number &&
            selectedWord?.direction === 'down';
          return (
            <button
              key={`down-${w.number}`}
              onClick={() => onClueClick(w)}
              className={`clue-item ${isActive ? 'clue-item--active' : ''}`}
            >
              <span className="clue-number">{w.number.toString().padStart(2, '0')}</span>
              <span className="clue-text">{w.clue}</span>
              <span className="clue-length">({w.word.length})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
