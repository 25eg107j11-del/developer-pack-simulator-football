'use client';

import { useState, useEffect, useCallback } from 'react';
import PlayerCard from './PlayerCard';

const rarityColors = {
  bronze: '#a0763b',
  silver: '#9ca3af',
  gold: '#daa520',
  rare: '#dc2626',
  'ultra-rare': '#9333ea',
  icon: '#0e7490',
};

const rarityGlowColors = {
  bronze: 'rgba(160, 118, 59, 0.5)',
  silver: 'rgba(156, 163, 175, 0.5)',
  gold: 'rgba(218, 165, 32, 0.6)',
  rare: 'rgba(220, 38, 38, 0.6)',
  'ultra-rare': 'rgba(147, 51, 234, 0.6)',
  icon: 'rgba(14, 116, 144, 0.6)',
};

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
  const [shakeIntensity, setShakeIntensity] = useState(1);

  const rarityOrder = ['bronze', 'silver', 'gold', 'rare', 'ultra-rare', 'icon'];
  const bestCard = cards.reduce((best, card) =>
    rarityOrder.indexOf(card.rarity) > rarityOrder.indexOf(best.rarity) ? card : best
  , cards[0]);
  const isWalkout = rarityOrder.indexOf(bestCard.rarity) >= rarityOrder.indexOf('rare');

  // Escalating shake intensity
  useEffect(() => {
    if (phase !== PHASES.SHAKE) return;
    const interval = setInterval(() => {
      setShakeIntensity(prev => Math.min(prev + 0.4, 3));
    }, 400);
    return () => clearInterval(interval);
  }, [phase]);

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

  useEffect(() => {
    let timer;
    if (phase === PHASES.SHAKE) {
      timer = setTimeout(advancePhase, 2200);
    } else if (phase === PHASES.BURST) {
      timer = setTimeout(advancePhase, 1800);
    } else if (phase === PHASES.WALKOUT) {
      timer = setTimeout(advancePhase, 4000);
    }
    return () => clearTimeout(timer);
  }, [phase, advancePhase]);

  useEffect(() => {
    if (phase === PHASES.CARDS && revealedCards.length < cards.length) {
      const timer = setTimeout(() => {
        setRevealedCards(prev => [...prev, cards[prev.length]]);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [phase, revealedCards, cards]);

  const skipToCards = () => {
    setPhase(PHASES.CARDS);
    setRevealedCards([...cards]);
  };

  const accentColor = rarityColors[bestCard.rarity] || '#6c5ce7';
  const glowColor = rarityGlowColors[bestCard.rarity] || 'rgba(108, 92, 231, 0.5)';

  return (
    <div className="pack-overlay" onClick={phase === PHASES.CARDS && revealedCards.length === cards.length ? onClose : undefined}>

      {/* ── SHAKE PHASE ── */}
      {phase === PHASES.SHAKE && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}>
          {/* Styled pack element */}
          <div style={{
            width: '140px',
            height: '200px',
            borderRadius: '6px',
            background: `linear-gradient(160deg, ${accentColor}22, ${accentColor}44, ${accentColor}22)`,
            border: `1px solid ${accentColor}66`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: `packShake ${0.3 / shakeIntensity}s ease-in-out infinite`,
            boxShadow: `0 0 ${30 * shakeIntensity}px ${glowColor}, inset 0 0 30px ${accentColor}11`,
          }}>
            {/* Foil seam */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '10%',
              right: '10%',
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              opacity: 0.6 + (shakeIntensity * 0.13),
              boxShadow: `0 0 ${8 * shakeIntensity}px ${accentColor}`,
            }} />
            {/* Pack label */}
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.7rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: accentColor,
              position: 'absolute',
              top: '25%',
              opacity: 0.7,
            }}>
              {packType.replace('-', ' ')}
            </div>
            {/* Corner accents */}
            <div style={{
              position: 'absolute', top: '8px', left: '8px', width: '16px', height: '16px',
              borderTop: `2px solid ${accentColor}66`, borderLeft: `2px solid ${accentColor}66`,
            }} />
            <div style={{
              position: 'absolute', bottom: '8px', right: '8px', width: '16px', height: '16px',
              borderBottom: `2px solid ${accentColor}66`, borderRight: `2px solid ${accentColor}66`,
            }} />
          </div>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            animation: 'pulse 1.2s ease-in-out infinite',
          }}>
            Opening Pack
          </p>

          <button className="walkout-skip" onClick={skipToCards} style={{ position: 'relative', bottom: 'auto' }}>
            Skip
          </button>

          <style jsx>{`
            @keyframes packShake {
              0%, 100% { transform: rotate(${-1.5 * shakeIntensity}deg) scale(1); }
              25% { transform: rotate(${1.5 * shakeIntensity}deg) scale(${1 + 0.02 * shakeIntensity}); }
              50% { transform: rotate(${-1.5 * shakeIntensity}deg) scale(${1 + 0.04 * shakeIntensity}); }
              75% { transform: rotate(${1.5 * shakeIntensity}deg) scale(${1 + 0.02 * shakeIntensity}); }
            }
          `}</style>
        </div>
      )}

      {/* ── BURST PHASE ── */}
      {phase === PHASES.BURST && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Central flash */}
          <div style={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            background: `radial-gradient(circle at center, ${accentColor}30 0%, transparent 60%)`,
            animation: 'lightRayBurst 1.5s ease forwards',
          }} />

          {/* Radiating lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '2px',
              height: '80vh',
              background: `linear-gradient(180deg, ${accentColor}40, transparent)`,
              transformOrigin: 'top center',
              transform: `translate(-50%, 0) rotate(${i * 30}deg)`,
              animation: `burstLineIn 1s ease forwards`,
              animationDelay: `${i * 0.03}s`,
              opacity: 0,
            }} />
          ))}

          {/* Glow orb */}
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
            animation: 'scaleIn 0.5s ease forwards',
            filter: `blur(20px)`,
            position: 'relative',
            zIndex: 2,
          }} />

          <button className="walkout-skip" onClick={skipToCards}>
            Skip
          </button>

          <style jsx>{`
            @keyframes burstLineIn {
              from { opacity: 0; height: 0; }
              to { opacity: 0.6; height: 80vh; }
            }
          `}</style>
        </div>
      )}

      {/* ── WALKOUT PHASE ── */}
      {phase === PHASES.WALKOUT && (
        <div className="walkout-stage">
          {/* Colored ambient glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at center, ${accentColor}15 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div className="walkout-country">{bestCard.country}</div>
          <div className="walkout-position">{bestCard.position}</div>
          <div className="walkout-text">WALKOUT</div>
          <div className="walkout-rating" style={{ color: accentColor }}>
            {bestCard.rating}
          </div>
          <div className="walkout-name" style={{ color: accentColor }}>
            {bestCard.name}
          </div>

          <button className="walkout-skip" onClick={skipToCards}>
            Skip
          </button>
        </div>
      )}

      {/* ── CARDS PHASE ── */}
      {phase === PHASES.CARDS && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '2rem',
          width: '100%',
          maxHeight: '100vh',
          overflow: 'auto',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            fontWeight: 700,
            animation: 'fadeInUp 0.5s ease forwards',
          }}>
            Pack Contents
          </h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.2rem',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '1000px',
          }}>
            {revealedCards.map((card, i) => (
              <div
                key={`${card.id}-${i}`}
                style={{
                  animation: `cardDealIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                  animationDelay: `${i * 0.12}s`,
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
              style={{
                animation: 'fadeInUp 0.5s ease forwards',
                animationDelay: '0.6s',
                opacity: 0,
                letterSpacing: '0.05em',
                marginTop: '0.5rem',
              }}
            >
              Continue
            </button>
          )}
        </div>
      )}
    </div>
  );
}
