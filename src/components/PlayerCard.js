'use client';

import { useState } from 'react';
import players, { getPlayerImageUrl, getPlayerFallbackUrl } from '@/data/players';

export default function PlayerCard({ card: initialCard, size = 'normal', onClick }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Always use the latest data from the master list so old local storage saves 
  // (like old emoji flags) get updated to new formats (like ISO codes).
  const card = players.find(p => p.id === initialCard.id) || initialCard;

  const sizeStyles = {
    small: { width: '160px', height: '230px', fontSize: '0.7' },
    normal: { width: '220px', height: '320px', fontSize: '1' },
    large: { width: '280px', height: '400px', fontSize: '1.3' },
  };

  const s = sizeStyles[size] || sizeStyles.normal;
  const scale = parseFloat(s.fontSize);

  const hasFrame = ['rare', 'ultra-rare', 'icon'].includes(card.rarity);
  const frameMap = {
    'rare': '/frames/rare.png',
    'ultra-rare': '/frames/ultrarare.png',
    'icon': '/frames/icon.png',
  };

  return (
    <div
      className="player-card-wrapper"
      style={{ 
        width: s.width, 
        height: s.height, 
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
      }}
      onClick={() => {
        setIsFlipped(!isFlipped);
        if (onClick) onClick(card);
      }}
    >
      {/* The actual card background (clipped with chamfered corners) */}
      <div
        className={`player-card ${card.rarity}`}
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 1 }}
      >
        <div className="player-card-bg"></div>
      </div>

      {/* AI Generated 3D Overlay Frame (sits between background and text) */}
      {hasFrame && (
        <img 
          src={frameMap[card.rarity]} 
          alt={`${card.rarity} frame`}
          style={{
            position: 'absolute',
            inset: '-22%', // Increased outward scale to prevent inner border from squishing text
            width: '144%',
            height: '144%',
            objectFit: 'contain',
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            zIndex: 2,
            opacity: 1,
          }}
        />
      )}

      {/* The Text and Stats Content (sits on top of the frame so it's perfectly readable) */}
      <div className="player-card-inner" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', padding: '0.8rem', display: 'flex', flexDirection: 'column' }}>
        {/* Top row: Rating + Position | Country */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="player-card-rating" style={{ fontSize: `${2.6 * scale}rem` }}>
              {card.rating}
            </div>
            <div className="player-card-position" style={{ fontSize: `${0.7 * scale}rem` }}>
              {card.position}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', marginTop: '0.2rem' }}>
            {/* Nation Flag */}
            <div style={{ width: `${1.4 * scale}rem`, height: `${1 * scale}rem`, opacity: 0.9, boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              <img 
                src={`https://flagcdn.com/${card.country}.svg`} 
                alt={card.country}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {/* Club Crest Placeholder */}
            <div style={{
              width: `${1.2 * scale}rem`,
              height: `${1.2 * scale}rem`,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}>
              <div style={{ width: '50%', height: '50%', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '50%' }}></div>
            </div>
          </div>
        </div>

        {/* Center Visual: Initials Circle */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
          <div style={{
            width: `${90 * scale}px`,
            height: `${90 * scale}px`,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${1.8 * scale}rem`,
            fontWeight: 800,
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}>
            {card.name.substring(0, 2).toUpperCase()}
          </div>
        </div>

        {/* Player name */}
        <div className="player-card-name" style={{ 
          fontSize: `${0.85 * scale}rem`, 
          padding: '0.4rem 0',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          {card.name}
        </div>

        {/* Minimalist Stats grid */}
        <div className="player-card-stats" style={{
          padding: '0.4rem 0 0 0',
          gap: '4px',
        }}>
          {/* Row 1: SPD, PHY, DEF */}
          <div className="player-card-stat">
            <div className="player-card-stat-value" style={{ fontSize: `${0.9 * scale}rem`, fontWeight: 900 }}>{card.stats.spd}</div>
            <div className="player-card-stat-label" style={{ fontSize: `${0.5 * scale}rem`, color: 'rgba(255,255,255,0.7)' }}>SPD</div>
          </div>
          <div className="player-card-stat">
            <div className="player-card-stat-value" style={{ fontSize: `${0.9 * scale}rem`, fontWeight: 900 }}>{card.stats.pow}</div>
            <div className="player-card-stat-label" style={{ fontSize: `${0.5 * scale}rem`, color: 'rgba(255,255,255,0.7)' }}>PHY</div>
          </div>
          <div className="player-card-stat">
            <div className="player-card-stat-value" style={{ fontSize: `${0.9 * scale}rem`, fontWeight: 900 }}>{card.stats.def}</div>
            <div className="player-card-stat-label" style={{ fontSize: `${0.5 * scale}rem`, color: 'rgba(255,255,255,0.7)' }}>DEF</div>
          </div>
          
          {/* Row 2: PAS, DRI, SHO */}
          <div className="player-card-stat">
            <div className="player-card-stat-value" style={{ fontSize: `${0.9 * scale}rem`, fontWeight: 900 }}>{card.stats.pas}</div>
            <div className="player-card-stat-label" style={{ fontSize: `${0.5 * scale}rem`, color: 'rgba(255,255,255,0.7)' }}>PAS</div>
          </div>
          <div className="player-card-stat">
            <div className="player-card-stat-value" style={{ fontSize: `${0.9 * scale}rem`, fontWeight: 900 }}>{card.stats.dri}</div>
            <div className="player-card-stat-label" style={{ fontSize: `${0.5 * scale}rem`, color: 'rgba(255,255,255,0.7)' }}>DRI</div>
          </div>
          <div className="player-card-stat">
            <div className="player-card-stat-value" style={{ fontSize: `${0.9 * scale}rem`, fontWeight: 900 }}>{card.stats.sho}</div>
            <div className="player-card-stat-label" style={{ fontSize: `${0.5 * scale}rem`, color: 'rgba(255,255,255,0.7)' }}>SHO</div>
          </div>
          </div>
        </div>
      </div>
  );
}
