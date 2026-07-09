'use client';

import { useState, useEffect, useCallback } from 'react';
import PlayerCard from './PlayerCard';

const rarityColors = {
  bronze: '#cd7f32',
  silver: '#c0c0c0',
  gold: '#ffd700',
  rare: '#e17055',
  'ultra-rare': '#fd79a8',
  icon: '#00cec9',
};

const rarityFlareGradients = {
  bronze: 'radial-gradient(circle, rgba(205,127,50,0.3) 0%, transparent 70%)',
  silver: 'radial-gradient(circle, rgba(192,192,192,0.3) 0%, transparent 70%)',
  gold: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)',
  rare: 'radial-gradient(circle, rgba(225,112,85,0.4) 0%, transparent 70%)',
  'ultra-rare': 'radial-gradient(circle, rgba(253,121,168,0.4) 0%, transparent 70%)',
  icon: 'radial-gradient(circle, rgba(0,206,201,0.4) 0%, rgba(108,92,231,0.3) 50%, transparent 70%)',
};

// Phases: shake -> reveal -> walkout (if rare+) -> show cards
const PHASES = {
  SHAKE: 'shake',
  BURST: 'burst',
  WALKOUT: 'walkout',
  CARDS: 'cards',
};

export default function PackOpening({ cards, packType, onClose }) {
  const [phase, setPhase] = useState(PHASES.SHAKE);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [revealedCards, setRevealedCards] = useState([]);

  // Find the best card for walkout
  const rarityOrder = ['bronze', 'silver', 'gold', 'rare', 'ultra-rare', 'icon'];
  const bestCard = cards.reduce((best, card) =>
    rarityOrder.indexOf(card.rarity) > rarityOrder.indexOf(best.rarity) ? card : best
  , cards[0]);
  const isWalkout = rarityOrder.indexOf(bestCard.rarity) >= rarityOrder.indexOf('rare');

  const advancePhase = useCallback(() => {
    if (phase === PHASES.SHAKE) {
      setPhase(PHASES.BURST);
    } else if (phase === PHASES.BURST) {
      if (isWalkout) {
        setPhase(PHASES.WALKOUT);
      } else {
        setPhase(PHASES.CARDS);
      }
    } else if (phase === PHASES.WALKOUT) {
      setPhase(PHASES.CARDS);
    }
  }, [phase, isWalkout]);

  // Auto-advance phases
  useEffect(() => {
    let timer;
    if (phase === PHASES.SHAKE) {
      timer = setTimeout(advancePhase, 2000);
    } else if (phase === PHASES.BURST) {
      timer = setTimeout(advancePhase, 1500);
    } else if (phase === PHASES.WALKOUT) {
      timer = setTimeout(advancePhase, 3500);
    }
    return () => clearTimeout(timer);
  }, [phase, advancePhase]);

  // Reveal cards one by one
  useEffect(() => {
    if (phase === PHASES.CARDS && revealedCards.length < cards.length) {
      const timer = setTimeout(() => {
        setRevealedCards(prev => [...prev, cards[prev.length]]);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, revealedCards, cards]);

  const skipToCards = () => {
    setPhase(PHASES.CARDS);
    setRevealedCards([...cards]);
  };

  return (
    <div className="pack-overlay" onClick={phase === PHASES.CARDS && revealedCards.length === cards.length ? onClose : undefined}>

      {/* SHAKE PHASE */}
      {phase === PHASES.SHAKE && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}>
          <div style={{
            fontSize: '8rem',
            animation: 'packShake 0.3s ease-in-out infinite',
            filter: `drop-shadow(0 0 30px ${rarityColors[packType] || '#6c5ce7'})`,
          }}>
            📦
          </div>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            animation: 'pulse 1s ease-in-out infinite',
          }}>
            Pack Opening...
          </p>
          <button className="walkout-skip" onClick={skipToCards}>
            Click to skip →
          </button>
          <style jsx>{`
            @keyframes packShake {
              0%, 100% { transform: rotate(-3deg) scale(1); }
              25% { transform: rotate(3deg) scale(1.05); }
              50% { transform: rotate(-3deg) scale(1.1); }
              75% { transform: rotate(3deg) scale(1.05); }
            }
          `}</style>
        </div>
      )}

      {/* BURST PHASE */}
      {phase === PHASES.BURST && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: rarityFlareGradients[bestCard.rarity],
          animation: 'burstIn 0.5s ease forwards',
        }}>
          <div style={{
            fontSize: '12rem',
            animation: 'scaleIn 0.5s ease forwards',
            filter: `drop-shadow(0 0 60px ${rarityColors[bestCard.rarity]})`,
          }}>
            ✨
          </div>
          <button className="walkout-skip" onClick={skipToCards}>
            Click to skip →
          </button>
          <style jsx>{`
            @keyframes burstIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* WALKOUT PHASE */}
      {phase === PHASES.WALKOUT && (
        <div className="walkout-stage" style={{
          background: rarityFlareGradients[bestCard.rarity],
        }}>
          <div className="walkout-country">{bestCard.country}</div>
          <div className="walkout-position">{bestCard.position}</div>
          <div className="walkout-text">🔥 WALKOUT</div>
          <div className="walkout-rating" style={{ color: rarityColors[bestCard.rarity] }}>
            {bestCard.rating}
          </div>
          <div className="walkout-name" style={{ color: rarityColors[bestCard.rarity] }}>
            {bestCard.name}
          </div>
          <button className="walkout-skip" onClick={skipToCards}>
            Click to skip →
          </button>
        </div>
      )}

      {/* CARDS PHASE */}
      {phase === PHASES.CARDS && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          padding: '2rem',
          width: '100%',
          maxHeight: '100vh',
          overflow: 'auto',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            animation: 'fadeInUp 0.5s ease forwards',
          }}>
            Pack Contents
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {revealedCards.map((card, i) => (
              <div
                key={`${card.id}-${i}`}
                style={{
                  animation: `scaleIn 0.4s ease forwards`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                }}
              >
                <PlayerCard card={card} size="normal" />
              </div>
            ))}
          </div>
          {revealedCards.length === cards.length && (
            <button
              className="btn btn-primary btn-lg"
              onClick={onClose}
              style={{ animation: 'fadeInUp 0.5s ease forwards', animationDelay: '0.5s', opacity: 0 }}
            >
              Done ✓
            </button>
          )}
        </div>
      )}
    </div>
  );
}
