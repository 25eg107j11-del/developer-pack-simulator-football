'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAvailablePacks,
  openPack,
  getSavedGitHubStats,
} from '@/lib/gameEngine';
import { packTypes } from '@/data/players';
import PackOpening from '@/components/PackOpening';

export default function PacksPage() {
  const [packs, setPacks] = useState({});
  const [openingPack, setOpeningPack] = useState(null);
  const [drawnCards, setDrawnCards] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stats = getSavedGitHubStats();
    if (!stats) {
      router.push('/');
      return;
    }
    setPacks(getAvailablePacks());
  }, [router]);

  const handleOpenPack = (packType) => {
    const cards = openPack(packType);
    if (cards) {
      setOpeningPack(packType);
      setDrawnCards(cards);
    }
  };

  const handleCloseOpening = () => {
    setOpeningPack(null);
    setDrawnCards(null);
    setPacks(getAvailablePacks());
  };

  const totalPacks = Object.values(packs).reduce((s, v) => s + v, 0);

  return (
    <div className="container section">
      <div className="section-header">
        <h1>Pack <span className="gradient-text-gold">Store</span> 📦</h1>
        <p>Open your earned packs to discover developer cards</p>
      </div>

      {totalPacks === 0 ? (
        <div className="empty-state animate-fade-in">
          <div className="empty-state-icon">📦</div>
          <h3 style={{ marginBottom: 'var(--space-sm)' }}>No Packs Available</h3>
          <p style={{ maxWidth: '400px', margin: '0 auto var(--space-lg)', fontSize: '0.9rem' }}>
            Earn packs by unlocking achievements! Connect your GitHub and start coding to earn rewards.
          </p>
          <button className="btn btn-primary" onClick={() => router.push('/achievements')}>
            View Achievements →
          </button>
        </div>
      ) : (
        <div className="pack-grid">
          {Object.entries(packTypes).map(([type, packDef]) => {
            const count = packs[type] || 0;
            return (
              <div
                key={type}
                className={`pack-card ${type}-pack animate-fade-in`}
                style={{
                  opacity: count > 0 ? 1 : 0.4,
                  pointerEvents: count > 0 ? 'auto' : 'none',
                }}
                onClick={() => count > 0 && handleOpenPack(type)}
              >
                <div className="pack-icon">{packDef.emoji}</div>
                <div className="pack-name">{packDef.name}</div>
                <div className="pack-description">{packDef.description}</div>
                <div className="pack-count">
                  {count > 0 ? (
                    <span style={{ color: packDef.color, fontWeight: 700 }}>
                      {count} available
                    </span>
                  ) : (
                    'None available'
                  )}
                </div>
                {count > 0 && (
                  <button className="btn btn-primary" style={{ marginTop: 'var(--space-sm)' }}>
                    Open Pack 🎉
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pack Opening Overlay */}
      {openingPack && drawnCards && (
        <PackOpening
          cards={drawnCards}
          packType={openingPack}
          onClose={handleCloseOpening}
        />
      )}
    </div>
  );
}
