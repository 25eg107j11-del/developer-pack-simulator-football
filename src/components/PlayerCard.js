'use client';

import { useState } from 'react';
import { getPlayerImageUrl, getPlayerFallbackUrl } from '@/data/players';

export default function PlayerCard({ card, size = 'normal', onClick }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const sizeStyles = {
    small: { width: '160px', height: '230px', fontSize: '0.7' },
    normal: { width: '220px', height: '320px', fontSize: '1' },
    large: { width: '280px', height: '400px', fontSize: '1.3' },
  };

  const s = sizeStyles[size] || sizeStyles.normal;
  const scale = parseFloat(s.fontSize);

  return (
    <div
      className={`player-card ${card.rarity}`}
      style={{ width: s.width, height: s.height, cursor: onClick ? 'pointer' : 'default' }}
      onClick={() => {
        setIsFlipped(!isFlipped);
        if (onClick) onClick(card);
      }}
    >
      <div className="player-card-inner">
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
          <div style={{ width: `${1.4 * scale}rem`, height: `${1 * scale}rem`, opacity: 0.9, marginTop: '0.2rem', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            <img 
              src={`https://flagcdn.com/${card.country}.svg`} 
              alt={card.country}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        {/* Player image */}
        <div className="player-card-icon-area" style={{
          width: `${90 * scale}px`,
          height: `${90 * scale}px`,
        }}>
          <img
            src={getPlayerImageUrl(card)}
            alt={card.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              if (e.target.src !== getPlayerFallbackUrl(card)) {
                e.target.src = getPlayerFallbackUrl(card);
              } else {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
              }
            }}
          />
          <div style={{ display: 'none', fontSize: `${2 * scale}rem` }}>
            {card.emoji}
          </div>
        </div>

        {/* Player name */}
        <div className="player-card-name" style={{ fontSize: `${0.85 * scale}rem` }}>
          {card.name}
        </div>

        {/* Stats grid */}
        <div className="player-card-stats">
          <div className="player-card-stat">
            <div className="player-card-stat-value" style={{ fontSize: `${0.8 * scale}rem` }}>{card.stats.spd}</div>
            <div className="player-card-stat-label" style={{ fontSize: `${0.5 * scale}rem` }}>SPD</div>
          </div>
          <div className="player-card-stat">
            <div className="player-card-stat-value" style={{ fontSize: `${0.8 * scale}rem` }}>{card.stats.pow}</div>
            <div className="player-card-stat-label" style={{ fontSize: `${0.5 * scale}rem` }}>PHY</div>
          </div>
          <div className="player-card-stat">
            <div className="player-card-stat-value" style={{ fontSize: `${0.8 * scale}rem` }}>{card.stats.def}</div>
            <div className="player-card-stat-label" style={{ fontSize: `${0.5 * scale}rem` }}>DEF</div>
          </div>
          <div className="player-card-stat">
            <div className="player-card-stat-value" style={{ fontSize: `${0.8 * scale}rem` }}>{card.stats.pas}</div>
            <div className="player-card-stat-label" style={{ fontSize: `${0.5 * scale}rem` }}>PAS</div>
          </div>
          <div className="player-card-stat">
            <div className="player-card-stat-value" style={{ fontSize: `${0.8 * scale}rem` }}>{card.stats.dri}</div>
            <div className="player-card-stat-label" style={{ fontSize: `${0.5 * scale}rem` }}>DRI</div>
          </div>
          <div className="player-card-stat">
            <div className="player-card-stat-value" style={{ fontSize: `${0.8 * scale}rem` }}>{card.stats.sho}</div>
            <div className="player-card-stat-label" style={{ fontSize: `${0.5 * scale}rem` }}>SHO</div>
          </div>
        </div>
      </div>
    </div>
  );
}
