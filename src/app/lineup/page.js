'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getUniqueCards,
  getLineup,
  saveLineup,
  getSavedGitHubStats,
} from '@/lib/gameEngine';
import PlayerCard from '@/components/PlayerCard';

// 4-3-3 Formation layout (percentages for top/left positioning)
const FORMATION_433 = {
  ST: { top: '15%', left: '50%' },
  LW: { top: '25%', left: '20%' },
  RW: { top: '25%', left: '80%' },
  CAM: { top: '45%', left: '50%' },
  CM1: { top: '55%', left: '30%' },
  CM2: { top: '55%', left: '70%' },
  LB: { top: '75%', left: '15%' },
  CB1: { top: '75%', left: '35%' },
  CB2: { top: '75%', left: '65%' },
  RB: { top: '75%', left: '85%' },
  GK: { top: '90%', left: '50%' },
};

export default function LineupPage() {
  const [lineup, setLineup] = useState({});
  const [collection, setCollection] = useState([]);
  const [selectingSlot, setSelectingSlot] = useState(null); // e.g., 'ST'
  const router = useRouter();

  useEffect(() => {
    const stats = getSavedGitHubStats();
    if (!stats) {
      router.push('/');
      return;
    }
    setLineup(getLineup());
    setCollection(getUniqueCards());
  }, [router]);

  const handleSelectPlayer = (card) => {
    if (!selectingSlot) return;
    
    // Check if player is already in another slot
    const newLineup = { ...lineup };
    for (const [slot, existingCard] of Object.entries(newLineup)) {
      if (existingCard && existingCard.id === card.id) {
        newLineup[slot] = null; // Remove from old slot
      }
    }
    
    newLineup[selectingSlot] = card;
    setLineup(newLineup);
    saveLineup(newLineup);
    setSelectingSlot(null);
  };

  const handleRemovePlayer = (slot, e) => {
    e.stopPropagation();
    const newLineup = { ...lineup };
    newLineup[slot] = null;
    setLineup(newLineup);
    saveLineup(newLineup);
  };

  return (
    <div className="container section">
      <div className="section-header">
        <h1>My <span className="gradient-text">Lineup</span></h1>
        <p>Build your Ultimate Developer XI</p>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        aspectRatio: '0.7',
        backgroundColor: '#2e7d32',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10%, rgba(255,255,255,0.05) 10%, rgba(255,255,255,0.05) 20%)',
        border: '4px solid rgba(255,255,255,0.5)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
      }}>
        {/* Pitch Lines */}
        <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.5)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '20%', aspectRatio: '1', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)' }} />
        
        {/* Penalty Areas */}
        <div style={{ position: 'absolute', top: 0, left: '25%', width: '50%', height: '15%', border: '2px solid rgba(255,255,255,0.5)', borderTop: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '25%', width: '50%', height: '15%', border: '2px solid rgba(255,255,255,0.5)', borderBottom: 'none' }} />

        {/* Player Slots */}
        {Object.entries(FORMATION_433).map(([slot, position]) => {
          const card = lineup[slot];
          return (
            <div
              key={slot}
              style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onClick={() => setSelectingSlot(slot)}
            >
              {card ? (
                <div style={{ position: 'relative', transform: 'scale(0.5)', transformOrigin: 'center center' }}>
                   <PlayerCard card={card} size="normal" />
                   <button 
                     onClick={(e) => handleRemovePlayer(slot, e)}
                     style={{
                       position: 'absolute',
                       top: '-10px',
                       right: '-10px',
                       background: 'var(--accent-rare)',
                       color: 'white',
                       border: 'none',
                       borderRadius: '50%',
                       width: '30px',
                       height: '30px',
                       fontSize: '20px',
                       cursor: 'pointer',
                       zIndex: 20,
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                     }}
                   >×</button>
                </div>
              ) : (
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  border: '2px dashed rgba(255,255,255,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  backdropFilter: 'blur(4px)',
                  transition: 'all 0.2s ease',
                }}
                className="hover-scale"
                >
                  {slot}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Player Selection Modal */}
      {selectingSlot && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
          overflowY: 'auto',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}>
            <h2 style={{ margin: 0 }}>Select Player for <span className="gradient-text-gold">{selectingSlot}</span></h2>
            <button 
              className="btn btn-outline"
              onClick={() => setSelectingSlot(null)}
            >
              Cancel
            </button>
          </div>

          <div className="collection-grid" style={{ width: '100%', maxWidth: '1200px' }}>
            {collection.map(card => (
              <div key={card.id} onClick={() => handleSelectPlayer(card)} style={{ cursor: 'pointer' }} className="hover-scale">
                <PlayerCard card={card} size="small" />
              </div>
            ))}
            {collection.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)' }}>
                You don't have any players in your collection yet. Go open some packs!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
