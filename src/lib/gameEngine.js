// Core game engine: pack opening, achievement checking, localStorage persistence

import players, { packTypes, achievements } from '@/data/players';

const STORAGE_KEYS = {
  COLLECTION: 'dps_collection',
  PACKS: 'dps_packs',
  PACK_HISTORY: 'dps_pack_history',
  ACHIEVEMENTS: 'dps_achievements',
  GITHUB_USER: 'dps_github_user',
  GITHUB_STATS: 'dps_github_stats',
  FIRST_LOGIN: 'dps_first_login',
};

// ========== STORAGE HELPERS ==========
function getStorage(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage(key, value) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ========== COLLECTION ==========
export function getCollection() {
  return getStorage(STORAGE_KEYS.COLLECTION, []);
}

export function addToCollection(cards) {
  const collection = getCollection();
  const updated = [...collection, ...cards.map(c => ({ ...c, obtainedAt: Date.now() }))];
  setStorage(STORAGE_KEYS.COLLECTION, updated);
  return updated;
}

export function getUniqueCards() {
  const collection = getCollection();
  const seen = new Set();
  return collection.filter(c => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });
}

export function getDuplicates() {
  const collection = getCollection();
  const countMap = {};
  collection.forEach(c => {
    countMap[c.id] = (countMap[c.id] || 0) + 1;
  });
  return Object.entries(countMap)
    .filter(([, count]) => count > 1)
    .map(([id, count]) => ({
      card: collection.find(c => c.id === Number(id)),
      count,
    }));
}

// ========== PACKS ==========
export function getAvailablePacks() {
  return getStorage(STORAGE_KEYS.PACKS, {
    silver: 0,
    gold: 0,
    rare: 0,
    'ultra-rare': 0,
  });
}

export function addPack(packType, count = 1) {
  const packs = getAvailablePacks();
  packs[packType] = (packs[packType] || 0) + count;
  setStorage(STORAGE_KEYS.PACKS, packs);
  return packs;
}

export function consumePack(packType) {
  const packs = getAvailablePacks();
  if (!packs[packType] || packs[packType] <= 0) return false;
  packs[packType] -= 1;
  setStorage(STORAGE_KEYS.PACKS, packs);
  return true;
}

// ========== PACK OPENING LOGIC ==========
function weightedRandom(probabilities) {
  const rand = Math.random();
  let cumulative = 0;
  for (const [rarity, weight] of Object.entries(probabilities)) {
    cumulative += weight;
    if (rand <= cumulative) return rarity;
  }
  // Fallback
  return Object.keys(probabilities)[0];
}

function getPlayersByRarity(rarity) {
  return players.filter(p => p.rarity === rarity);
}

export function openPack(packType) {
  const packDef = packTypes[packType];
  if (!packDef) return null;

  if (!consumePack(packType)) return null;

  const drawnCards = [];
  const guaranteedRarity = packType === 'silver' ? 'silver'
    : packType === 'gold' ? 'gold'
    : packType === 'rare' ? 'rare'
    : 'ultra-rare';

  // First card: guaranteed minimum rarity
  const guaranteedPool = players.filter(p => {
    const rarityOrder = ['bronze', 'silver', 'gold', 'rare', 'ultra-rare', 'icon'];
    return rarityOrder.indexOf(p.rarity) >= rarityOrder.indexOf(guaranteedRarity);
  });
  const guaranteedCard = guaranteedPool[Math.floor(Math.random() * guaranteedPool.length)];
  drawnCards.push({ ...guaranteedCard });

  // Remaining cards: probability-based
  for (let i = 1; i < packDef.cardCount; i++) {
    const rarity = weightedRandom(packDef.probabilities);
    const pool = getPlayersByRarity(rarity);
    if (pool.length > 0) {
      const card = pool[Math.floor(Math.random() * pool.length)];
      drawnCards.push({ ...card });
    }
  }

  // Sort cards: best last (for dramatic reveal)
  const rarityOrder = ['bronze', 'silver', 'gold', 'rare', 'ultra-rare', 'icon'];
  drawnCards.sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));

  // Add to collection
  addToCollection(drawnCards);

  // Save to pack history
  const history = getPackHistory();
  history.unshift({
    packType,
    cards: drawnCards,
    openedAt: Date.now(),
  });
  setStorage(STORAGE_KEYS.PACK_HISTORY, history.slice(0, 50)); // keep last 50

  return drawnCards;
}

// ========== PACK HISTORY ==========
export function getPackHistory() {
  return getStorage(STORAGE_KEYS.PACK_HISTORY, []);
}

// ========== ACHIEVEMENTS ==========
export function getUnlockedAchievements() {
  return getStorage(STORAGE_KEYS.ACHIEVEMENTS, []);
}

export function unlockAchievement(achievementId) {
  const unlocked = getUnlockedAchievements();
  if (unlocked.includes(achievementId)) return false;
  unlocked.push(achievementId);
  setStorage(STORAGE_KEYS.ACHIEVEMENTS, unlocked);

  // Grant the reward pack
  const achievement = achievements.find(a => a.id === achievementId);
  if (achievement) {
    addPack(achievement.reward);
  }
  return true;
}

export function checkAchievements(githubStats) {
  const newlyUnlocked = [];

  // First login
  if (!getStorage(STORAGE_KEYS.FIRST_LOGIN, null)) {
    setStorage(STORAGE_KEYS.FIRST_LOGIN, Date.now());
    if (unlockAchievement('first_login')) {
      newlyUnlocked.push(achievements.find(a => a.id === 'first_login'));
    }
  }

  if (githubStats) {
    const totalCommits = githubStats.totalCommits || 0;

    // 1 commit
    if (totalCommits >= 1 && unlockAchievement('first_commit')) {
      newlyUnlocked.push(achievements.find(a => a.id === 'first_commit'));
    }

    // 5 commits
    if (totalCommits >= 5 && unlockAchievement('five_commits')) {
      newlyUnlocked.push(achievements.find(a => a.id === 'five_commits'));
    }

    // 15 commits
    if (totalCommits >= 15 && unlockAchievement('fifteen_commits')) {
      newlyUnlocked.push(achievements.find(a => a.id === 'fifteen_commits'));
    }
  }

  // Collection-based
  const unique = getUniqueCards();
  if (unique.length >= 10 && unlockAchievement('collector')) {
    newlyUnlocked.push(achievements.find(a => a.id === 'collector'));
  }
  if (unique.length >= 25 && unlockAchievement('full_house')) {
    newlyUnlocked.push(achievements.find(a => a.id === 'full_house'));
  }

  return newlyUnlocked;
}

// ========== GITHUB STATS ==========
export function getSavedGitHubUser() {
  return getStorage(STORAGE_KEYS.GITHUB_USER, null);
}

export function getSavedGitHubStats() {
  return getStorage(STORAGE_KEYS.GITHUB_STATS, null);
}

export function saveGitHubData(username, stats) {
  setStorage(STORAGE_KEYS.GITHUB_USER, username);
  setStorage(STORAGE_KEYS.GITHUB_STATS, stats);
}

export async function fetchGitHubStats(username) {
  try {
    // Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error('User not found');
    const userData = await userRes.json();

    // Fetch repos to estimate commits
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    const repos = await reposRes.json();

    // Fetch recent events for commit count estimation
    const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
    const events = await eventsRes.json();

    const pushEvents = Array.isArray(events)
      ? events.filter(e => e.type === 'PushEvent')
      : [];
    const totalCommitsFromEvents = pushEvents.reduce((sum, e) => sum + (e.payload?.commits?.length || 0), 0);

    // Estimate total commits from repos
    const totalRepos = userData.public_repos || 0;
    const estimatedTotalCommits = Math.max(totalCommitsFromEvents, totalRepos * 10);

    const stats = {
      username: userData.login,
      name: userData.name || userData.login,
      avatar: userData.avatar_url,
      bio: userData.bio,
      publicRepos: totalRepos,
      followers: userData.followers,
      following: userData.following,
      createdAt: userData.created_at,
      totalCommits: estimatedTotalCommits,
      recentCommits: totalCommitsFromEvents,
      topLanguages: getTopLanguages(repos),
      totalStars: repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0),
      totalForks: repos.reduce((sum, r) => sum + (r.forks_count || 0), 0),
    };

    saveGitHubData(username, stats);
    return stats;
  } catch (err) {
    console.error('Failed to fetch GitHub stats:', err);
    throw err;
  }
}

function getTopLanguages(repos) {
  const langCount = {};
  repos.forEach(r => {
    if (r.language) {
      langCount[r.language] = (langCount[r.language] || 0) + 1;
    }
  });
  return Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang, count]) => ({ lang, count }));
}

// ========== RESET ==========
export function resetAllData() {
  Object.values(STORAGE_KEYS).forEach(key => {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
  });
}
