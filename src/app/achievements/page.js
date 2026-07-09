'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getUnlockedAchievements,
  getSavedGitHubStats,
} from '@/lib/gameEngine';
import { achievements } from '@/data/players';

export default function AchievementsPage() {
  const [unlocked, setUnlocked] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stats = getSavedGitHubStats();
    if (!stats) {
      router.push('/');
      return;
    }
    setUnlocked(getUnlockedAchievements());
  }, [router]);

  const rewardBadgeClass = {
    silver: 'badge-silver',
    gold: 'badge-gold',
    rare: 'badge-rare',
    'ultra-rare': 'badge-ultra-rare',
  };

  const rewardLabel = {
    silver: 'Silver Pack',
    gold: 'Gold Pack',
    rare: 'Rare Pack',
    'ultra-rare': 'Ultra Rare Pack',
  };

  return (
    <div className="container section">
      <div className="section-header">
        <h1>🏆 <span className="gradient-text-gold">Achievements</span></h1>
        <p>{unlocked.length} / {achievements.length} unlocked</p>
      </div>

      {/* Progress Bar */}
      <div style={{
        maxWidth: '500px',
        margin: '0 auto var(--space-2xl)',
      }}>
        <div style={{
          width: '100%',
          height: '8px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{
            width: `${(unlocked.length / achievements.length) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-gold))',
            borderRadius: 'var(--radius-full)',
            transition: 'width 1s ease',
          }} />
        </div>
      </div>

      {/* Achievement Cards */}
      <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {achievements.map((achievement, i) => {
          const isUnlocked = unlocked.includes(achievement.id);
          return (
            <div
              key={achievement.id}
              className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'} animate-fade-in`}
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
            >
              <div className="achievement-icon">
                {isUnlocked ? achievement.icon : '🔒'}
              </div>
              <div className="achievement-info">
                <div className="achievement-name">{achievement.name}</div>
                <div className="achievement-desc">{achievement.description}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                <span className={`badge ${rewardBadgeClass[achievement.reward] || ''}`}>
                  {rewardLabel[achievement.reward] || achievement.reward}
                </span>
                {isUnlocked && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontWeight: 600 }}>
                    ✓ Claimed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
