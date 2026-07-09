'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getSavedGitHubStats,
  fetchGitHubStats,
  checkAchievements,
  getAvailablePacks,
  getUniqueCards,
  getUnlockedAchievements,
} from '@/lib/gameEngine';
import { achievements } from '@/data/players';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [packs, setPacks] = useState({});
  const [uniqueCount, setUniqueCount] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const savedStats = getSavedGitHubStats();
    if (!savedStats) {
      router.push('/');
      return;
    }
    // Load cached data immediately
    setStats(savedStats);
    setPacks(getAvailablePacks());
    setUniqueCount(getUniqueCards().length);
    setUnlockedCount(getUnlockedAchievements().length);

    // Fetch fresh stats in background
    fetchGitHubStats(savedStats.username).then(freshStats => {
      // Overwrite fresh stats with any simulated commits if they exist in local storage to preserve dev testing
      const currentStats = JSON.parse(localStorage.getItem('dps_github_stats'));
      if (currentStats && currentStats.totalCommits > freshStats.totalCommits) {
        freshStats.totalCommits = currentStats.totalCommits;
      }
      
      checkAchievements(freshStats);
      setStats(freshStats);
      setPacks(getAvailablePacks());
      setUnlockedCount(getUnlockedAchievements().length);
    }).catch(console.error);
  }, [router]);

  const simulateCommits = () => {
    const newStats = { ...stats, totalCommits: (stats.totalCommits || 0) + 5 };
    localStorage.setItem('dps_github_stats', JSON.stringify(newStats));
    checkAchievements(newStats);
    setStats(newStats);
    setPacks(getAvailablePacks());
    setUnlockedCount(getUnlockedAchievements().length);
  };

  if (!stats) return null;

  const totalPacks = Object.values(packs).reduce((s, v) => s + v, 0);

  return (
    <div className="container section">
      {/* Profile Header */}
      <div className="glass" style={{
        padding: 'var(--space-xl)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-xl)',
        marginBottom: 'var(--space-2xl)',
        animation: 'fadeInUp 0.6s ease forwards',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          border: '3px solid var(--accent-primary)',
          flexShrink: 0,
        }}>
          {stats.avatar && (
            <img
              src={stats.avatar}
              alt={stats.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>
            {stats.name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            @{stats.username} {stats.bio && `• ${stats.bio}`}
          </p>
        </div>
      </div>

      {/* GitHub Stats Grid */}
      <div className="section-header" style={{ textAlign: 'left', marginBottom: 'var(--space-lg)' }}>
        <h2>Developer <span className="gradient-text">Time Machine</span> 📈</h2>
      </div>

      <div className="stats-grid" style={{ marginBottom: 'var(--space-2xl)' }}>
        {[
          { value: stats.totalCommits, label: 'Total Commits', color: 'var(--accent-primary)' },
          { value: stats.publicRepos, label: 'Public Repos', color: 'var(--accent-secondary)' },
          { value: stats.totalStars, label: 'Stars Earned', color: 'var(--accent-gold)' },
          { value: stats.followers, label: 'Followers', color: 'var(--accent-rare)' },
        ].map((stat, i) => (
          <div
            key={i}
            className="card stat-card animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
          >
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Top Languages */}
      {stats.topLanguages && stats.topLanguages.length > 0 && (
        <div className="card animate-fade-in animate-delay-2" style={{ marginBottom: 'var(--space-2xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.2rem' }}>
            🔥 Top Languages
          </h3>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            {stats.topLanguages.map((lang, i) => (
              <div
                key={lang.lang}
                style={{
                  padding: 'var(--space-sm) var(--space-md)',
                  background: 'var(--bg-glass-light)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}
              >
                {lang.lang} <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>({lang.count})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="section-header" style={{ textAlign: 'left', marginBottom: 'var(--space-lg)' }}>
        <h2>Quick <span className="gradient-text-gold">Actions</span></h2>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <div
          className="card animate-fade-in animate-delay-3"
          style={{ cursor: 'pointer', textAlign: 'center' }}
          onClick={() => router.push('/packs')}
        >
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-sm)' }}>📦</div>
          <h3 style={{ fontSize: '1.1rem' }}>Open Packs</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            {totalPacks > 0 ? (
              <span style={{ color: 'var(--accent-gold)' }}>{totalPacks} packs available!</span>
            ) : (
              'No packs available yet'
            )}
          </p>
        </div>

        <div
          className="card animate-fade-in animate-delay-4"
          style={{ cursor: 'pointer', textAlign: 'center' }}
          onClick={() => router.push('/collection')}
        >
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-sm)' }}>🃏</div>
          <h3 style={{ fontSize: '1.1rem' }}>My Collection</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            {uniqueCount} / 58 cards collected
          </p>
        </div>

        <div
          className="card animate-fade-in"
          style={{ cursor: 'pointer', textAlign: 'center', animationDelay: '0.5s', opacity: 0 }}
          onClick={() => router.push('/achievements')}
        >
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-sm)' }}>🏆</div>
          <h3 style={{ fontSize: '1.1rem' }}>Achievements</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            {unlockedCount} / {achievements.length} unlocked
          </p>
        </div>
      </div>

      {/* Dev Tools */}
      <div style={{ marginTop: '3rem', padding: '1rem', border: '1px dashed var(--accent-rare)', borderRadius: '12px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          <strong>Dev Testing:</strong> GitHub's API can take ~5 minutes to register new commits. Use this to instantly test achievement triggers!
        </p>
        <button className="btn btn-outline" onClick={simulateCommits} style={{ borderColor: 'var(--accent-rare)', color: 'var(--accent-rare)' }}>
          + Simulate 5 Commits
        </button>
      </div>
    </div>
  );
}
