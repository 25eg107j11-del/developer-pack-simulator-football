'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getCollection,
  getUniqueCards,
  getDuplicates,
  getSavedGitHubStats,
} from '@/lib/gameEngine';
import players from '@/data/players';
import PlayerCard from '@/components/PlayerCard';

export default function CollectionPage() {
  const [tab, setTab] = useState('all');
  const [collection, setCollection] = useState([]);
  const [uniqueCards, setUniqueCards] = useState([]);
  const [duplicates, setDuplicates] = useState([]);
  const [filterRarity, setFilterRarity] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const stats = getSavedGitHubStats();
    if (!stats) {
      router.push('/');
      return;
    }
    setCollection(getCollection());
    setUniqueCards(getUniqueCards());
    setDuplicates(getDuplicates());
  }, [router]);

  const rarities = ['all', 'bronze', 'silver', 'gold', 'rare', 'ultra-rare', 'icon'];

  const displayCards = tab === 'all'
    ? uniqueCards
    : tab === 'duplicates'
    ? duplicates.map(d => d.card)
    : uniqueCards;

  const filteredCards = filterRarity === 'all'
    ? displayCards
    : displayCards.filter(c => c.rarity === filterRarity);

  return (
    <div className="container section">
      <div className="section-header">
        <h1>My <span className="gradient-text">Collection</span> 🃏</h1>
        <p>{uniqueCards.length} / {players.length} unique cards collected ({collection.length} total)</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${tab === 'all' ? 'active' : ''}`}
          onClick={() => setTab('all')}
        >
          All Cards
        </button>
        <button
          className={`tab ${tab === 'duplicates' ? 'active' : ''}`}
          onClick={() => setTab('duplicates')}
        >
          Duplicates ({duplicates.length})
        </button>
      </div>

      {/* Rarity Filter */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-xs)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 'var(--space-2xl)',
      }}>
        {rarities.map(r => (
          <button
            key={r}
            className={`badge ${r === 'all' ? '' : `badge-${r}`}`}
            style={{
              cursor: 'pointer',
              padding: '6px 14px',
              fontSize: '0.8rem',
              background: filterRarity === r ? 'var(--accent-primary)' : undefined,
              color: filterRarity === r ? 'white' : undefined,
              border: filterRarity === r ? '1px solid var(--accent-primary)' : undefined,
            }}
            onClick={() => setFilterRarity(r)}
          >
            {r === 'all' ? 'All' : r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      {filteredCards.length === 0 ? (
        <div className="empty-state animate-fade-in">
          <div className="empty-state-icon">🃏</div>
          <h3>No cards yet</h3>
          <p style={{ maxWidth: '400px', margin: '0.5rem auto 1.5rem', fontSize: '0.9rem' }}>
            {tab === 'duplicates'
              ? 'No duplicate cards found.'
              : 'Open packs to start building your collection!'}
          </p>
          <button className="btn btn-primary" onClick={() => router.push('/packs')}>
            Go to Packs →
          </button>
        </div>
      ) : (
        <div className="collection-grid">
          {filteredCards.map((card, i) => (
            <div
              key={`${card.id}-${i}`}
              className="animate-fade-in"
              style={{
                animationDelay: `${Math.min(i * 0.05, 1)}s`,
                opacity: 0,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <PlayerCard card={card} size="small" />
              {tab === 'duplicates' && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'var(--accent-primary)',
                  color: 'white',
                  borderRadius: 'var(--radius-full)',
                  padding: '2px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}>
                  ×{duplicates.find(d => d.card.id === card.id)?.count}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
