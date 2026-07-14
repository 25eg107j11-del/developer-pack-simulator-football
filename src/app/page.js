'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  fetchGitHubStats,
  getSavedGitHubUser,
  getSavedGitHubStats,
  checkAchievements,
  getAvailablePacks,
  logout,
} from '@/lib/gameEngine';

export default function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedUser, setSavedUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const saved = getSavedGitHubUser();
    if (saved) setSavedUser(saved);
  }, []);

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError('');
    try {
      const stats = await fetchGitHubStats(username.trim());
      checkAchievements(stats);
      router.push('/dashboard');
    } catch (err) {
      setError('Could not find that GitHub user. Please check the username.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    const stats = getSavedGitHubStats();
    if (stats) checkAchievements(stats);
    router.push('/dashboard');
  };

  return (
    <>
      <section className="hero">
        <div className="hero-badge animate-fade-in">
          Developer Time Machine × Football Pack Simulator
        </div>

        <h1 className="animate-fade-in animate-delay-1">
          Your Code.<br />
          <span className="gradient-text">Your Packs.</span><br />
          <span className="gradient-text-gold">Your Legend.</span>
        </h1>

        <p className="animate-fade-in animate-delay-2">
          Connect your GitHub to transform your coding stats into a football career.
          Earn packs, open walkouts, and build your ultimate developer collection.
        </p>

        {savedUser ? (
          <div className="animate-fade-in animate-delay-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Welcome back, <strong style={{ color: 'var(--accent-primary)' }}>{savedUser}</strong>!
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={handleContinue}>
                Continue to Dashboard
              </button>
              <button
                className="btn btn-outline btn-lg"
                onClick={() => {
                  logout();
                  setSavedUser(null);
                }}
              >
                Switch Account
              </button>
            </div>
          </div>
        ) : (
          <div className="github-input-section animate-fade-in animate-delay-3">
            <form onSubmit={handleConnect}>
              <div className="github-input-group">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your GitHub username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  id="github-username-input"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || !username.trim()}
                  id="connect-btn"
                >
                  {loading ? (
                    <span className="loading-spinner" />
                  ) : (
                    '→ Connect'
                  )}
                </button>
              </div>
            </form>
            {error && (
              <p style={{ color: 'var(--accent-rare)', marginTop: '0.75rem', fontSize: '0.9rem', textAlign: 'center' }}>
                {error}
              </p>
            )}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>How It <span className="gradient-text">Works</span></h2>
            <p>Your coding journey becomes a football career mode</p>
          </div>

          <div className="stats-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              { icon: '01', title: 'Connect GitHub', desc: 'Link your account to fetch your coding stats' },
              { icon: '02', title: 'Earn Achievements', desc: 'Commits, streaks, and contributions unlock rewards' },
              { icon: '03', title: 'Open Packs', desc: 'Dramatic animations reveal your football cards' },
              { icon: '04', title: 'Build Collection', desc: 'Collect all 58 cards from Bronze to Icon rarity' },
            ].map((feature, i) => (
              <div
                key={i}
                className="card animate-fade-in"
                style={{ animationDelay: `${i * 0.15}s`, opacity: 0, textAlign: 'center' }}
              >
                <div style={{
                  fontSize: '1.5rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  marginBottom: '0.75rem',
                  color: 'var(--accent-primary)',
                  opacity: 0.4,
                }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Tiers */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Achievement <span className="gradient-text-gold">Rewards</span></h2>
            <p>Code more, earn better packs</p>
          </div>

          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { tier: 'Login for a day', pack: 'Silver Pack', badge: 'badge-silver' },
              { tier: '1 Commit', pack: 'Gold Pack', badge: 'badge-gold' },
              { tier: '5 Commits', pack: 'Rare Pack', badge: 'badge-rare' },
              { tier: '15 Commits', pack: 'Ultra Rare Pack', badge: 'badge-ultra-rare' },
            ].map((item, i) => (
              <div
                key={i}
                className="achievement-card animate-fade-in"
                style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
              >
                <div className="achievement-icon" style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 800, 
                  fontSize: '1.2rem', 
                  color: 'var(--text-muted)',
                  width: '40px',
                  textAlign: 'center',
                }}>{String(i + 1).padStart(2, '0')}</div>
                <div className="achievement-info">
                  <div className="achievement-name">{item.tier}</div>
                  <div className="achievement-desc">Earns you a {item.pack}</div>
                </div>
                <span className={`badge ${item.badge}`}>{item.pack}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
