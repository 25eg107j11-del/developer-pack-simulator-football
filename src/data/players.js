// Player/Card database for the Developer Pack Simulator
// Cards represent programming languages, tools, frameworks, and famous developer personas

const players = [
  // === BRONZE CARDS (Rating 50-64) ===
  { id: 1, name: "Notepad", rating: 50, position: "Editor", category: "Tool", emoji: "📝", country: "🇺🇸", stats: { spd: 30, pow: 20, def: 40, pas: 35, dri: 25, sho: 20 }, rarity: "bronze" },
  { id: 2, name: "FTP", rating: 52, position: "Deploy", category: "Tool", emoji: "📡", country: "🌍", stats: { spd: 25, pow: 30, def: 45, pas: 30, dri: 20, sho: 25 }, rarity: "bronze" },
  { id: 3, name: "jQuery", rating: 55, position: "Frontend", category: "Library", emoji: "💲", country: "🇺🇸", stats: { spd: 40, pow: 45, def: 35, pas: 50, dri: 40, sho: 35 }, rarity: "bronze" },
  { id: 4, name: "PHP", rating: 58, position: "Backend", category: "Language", emoji: "🐘", country: "🇩🇰", stats: { spd: 45, pow: 50, def: 40, pas: 55, dri: 35, sho: 40 }, rarity: "bronze" },
  { id: 5, name: "XML", rating: 51, position: "Data", category: "Format", emoji: "📄", country: "🌍", stats: { spd: 30, pow: 25, def: 50, pas: 40, dri: 20, sho: 15 }, rarity: "bronze" },
  { id: 6, name: "SVN", rating: 53, position: "VCS", category: "Tool", emoji: "🔀", country: "🇺🇸", stats: { spd: 35, pow: 30, def: 50, pas: 35, dri: 25, sho: 20 }, rarity: "bronze" },
  { id: 7, name: "COBOL", rating: 54, position: "Backend", category: "Language", emoji: "🏛️", country: "🇺🇸", stats: { spd: 20, pow: 35, def: 60, pas: 40, dri: 15, sho: 30 }, rarity: "bronze" },
  { id: 8, name: "Perl", rating: 56, position: "Backend", category: "Language", emoji: "🐪", country: "🇺🇸", stats: { spd: 45, pow: 40, def: 45, pas: 50, dri: 35, sho: 40 }, rarity: "bronze" },
  { id: 9, name: "Sublime Text", rating: 60, position: "Editor", category: "Tool", emoji: "🟠", country: "🇦🇺", stats: { spd: 65, pow: 40, def: 30, pas: 45, dri: 50, sho: 35 }, rarity: "bronze" },
  { id: 10, name: "Bootstrap", rating: 62, position: "Frontend", category: "Framework", emoji: "🅱️", country: "🇺🇸", stats: { spd: 60, pow: 50, def: 40, pas: 55, dri: 45, sho: 40 }, rarity: "bronze" },
  { id: 11, name: "WordPress", rating: 63, position: "CMS", category: "Platform", emoji: "📰", country: "🇺🇸", stats: { spd: 50, pow: 55, def: 50, pas: 60, dri: 40, sho: 45 }, rarity: "bronze" },
  { id: 12, name: "Heroku", rating: 61, position: "Deploy", category: "Platform", emoji: "🟣", country: "🇺🇸", stats: { spd: 55, pow: 45, def: 40, pas: 50, dri: 45, sho: 35 }, rarity: "bronze" },

  // === SILVER CARDS (Rating 65-74) ===
  { id: 13, name: "CSS", rating: 65, position: "Frontend", category: "Language", emoji: "🎨", country: "🌍", stats: { spd: 55, pow: 50, def: 45, pas: 65, dri: 60, sho: 40 }, rarity: "silver" },
  { id: 14, name: "HTML", rating: 66, position: "Frontend", category: "Language", emoji: "🏗️", country: "🌍", stats: { spd: 50, pow: 45, def: 60, pas: 70, dri: 45, sho: 35 }, rarity: "silver" },
  { id: 15, name: "MySQL", rating: 68, position: "Database", category: "Database", emoji: "🐬", country: "🇸🇪", stats: { spd: 55, pow: 60, def: 65, pas: 55, dri: 40, sho: 50 }, rarity: "silver" },
  { id: 16, name: "Java", rating: 70, position: "Backend", category: "Language", emoji: "☕", country: "🇺🇸", stats: { spd: 55, pow: 65, def: 70, pas: 60, dri: 45, sho: 55 }, rarity: "silver" },
  { id: 17, name: "C#", rating: 71, position: "Backend", category: "Language", emoji: "🟪", country: "🇺🇸", stats: { spd: 60, pow: 65, def: 65, pas: 60, dri: 50, sho: 55 }, rarity: "silver" },
  { id: 18, name: "MongoDB", rating: 69, position: "Database", category: "Database", emoji: "🍃", country: "🇺🇸", stats: { spd: 65, pow: 55, def: 55, pas: 60, dri: 55, sho: 45 }, rarity: "silver" },
  { id: 19, name: "Redis", rating: 72, position: "Database", category: "Database", emoji: "🔴", country: "🇮🇹", stats: { spd: 85, pow: 55, def: 50, pas: 60, dri: 60, sho: 40 }, rarity: "silver" },
  { id: 20, name: "Sass", rating: 67, position: "Frontend", category: "Language", emoji: "💅", country: "🇺🇸", stats: { spd: 60, pow: 50, def: 45, pas: 65, dri: 55, sho: 40 }, rarity: "silver" },
  { id: 21, name: "Express.js", rating: 70, position: "Backend", category: "Framework", emoji: "🚂", country: "🇺🇸", stats: { spd: 65, pow: 60, def: 55, pas: 65, dri: 55, sho: 50 }, rarity: "silver" },
  { id: 22, name: "Angular", rating: 73, position: "Frontend", category: "Framework", emoji: "🅰️", country: "🇺🇸", stats: { spd: 60, pow: 70, def: 65, pas: 65, dri: 55, sho: 55 }, rarity: "silver" },
  { id: 23, name: "Vue.js", rating: 74, position: "Frontend", category: "Framework", emoji: "💚", country: "🇨🇳", stats: { spd: 70, pow: 65, def: 55, pas: 70, dri: 65, sho: 55 }, rarity: "silver" },
  { id: 24, name: "Figma", rating: 73, position: "Design", category: "Tool", emoji: "🎨", country: "🇺🇸", stats: { spd: 65, pow: 55, def: 45, pas: 75, dri: 70, sho: 50 }, rarity: "silver" },

  // === GOLD CARDS (Rating 75-84) ===
  { id: 25, name: "JavaScript", rating: 78, position: "Fullstack", category: "Language", emoji: "⚡", country: "🇺🇸", stats: { spd: 80, pow: 70, def: 55, pas: 75, dri: 75, sho: 65 }, rarity: "gold" },
  { id: 26, name: "Python", rating: 80, position: "Fullstack", category: "Language", emoji: "🐍", country: "🇳🇱", stats: { spd: 70, pow: 75, def: 70, pas: 80, dri: 70, sho: 70 }, rarity: "gold" },
  { id: 27, name: "TypeScript", rating: 82, position: "Fullstack", category: "Language", emoji: "🔷", country: "🇺🇸", stats: { spd: 75, pow: 80, def: 75, pas: 80, dri: 70, sho: 70 }, rarity: "gold" },
  { id: 28, name: "React", rating: 84, position: "Frontend", category: "Framework", emoji: "⚛️", country: "🇺🇸", stats: { spd: 85, pow: 75, def: 60, pas: 85, dri: 80, sho: 70 }, rarity: "gold" },
  { id: 29, name: "Node.js", rating: 81, position: "Backend", category: "Runtime", emoji: "💚", country: "🇺🇸", stats: { spd: 80, pow: 75, def: 65, pas: 75, dri: 70, sho: 70 }, rarity: "gold" },
  { id: 30, name: "Docker", rating: 83, position: "DevOps", category: "Tool", emoji: "🐳", country: "🇺🇸", stats: { spd: 70, pow: 80, def: 80, pas: 70, dri: 65, sho: 75 }, rarity: "gold" },
  { id: 31, name: "PostgreSQL", rating: 82, position: "Database", category: "Database", emoji: "🐘", country: "🇺🇸", stats: { spd: 65, pow: 80, def: 85, pas: 70, dri: 55, sho: 75 }, rarity: "gold" },
  { id: 32, name: "Git", rating: 84, position: "VCS", category: "Tool", emoji: "🔀", country: "🇫🇮", stats: { spd: 75, pow: 75, def: 80, pas: 80, dri: 70, sho: 70 }, rarity: "gold" },
  { id: 33, name: "VS Code", rating: 83, position: "Editor", category: "Tool", emoji: "💙", country: "🇺🇸", stats: { spd: 85, pow: 70, def: 65, pas: 80, dri: 80, sho: 65 }, rarity: "gold" },
  { id: 34, name: "Next.js", rating: 84, position: "Fullstack", category: "Framework", emoji: "▲", country: "🇺🇸", stats: { spd: 85, pow: 80, def: 70, pas: 80, dri: 75, sho: 75 }, rarity: "gold" },
  { id: 35, name: "Tailwind", rating: 79, position: "Frontend", category: "Framework", emoji: "🌊", country: "🇺🇸", stats: { spd: 85, pow: 60, def: 50, pas: 80, dri: 75, sho: 55 }, rarity: "gold" },
  { id: 36, name: "GraphQL", rating: 78, position: "API", category: "Language", emoji: "◼️", country: "🇺🇸", stats: { spd: 70, pow: 75, def: 60, pas: 80, dri: 65, sho: 65 }, rarity: "gold" },

  // === RARE CARDS (Rating 85-89) ===
  { id: 37, name: "Rust", rating: 87, position: "Systems", category: "Language", emoji: "🦀", country: "🇺🇸", stats: { spd: 90, pow: 85, def: 85, pas: 75, dri: 80, sho: 85 }, rarity: "rare" },
  { id: 38, name: "Go", rating: 86, position: "Backend", category: "Language", emoji: "🐹", country: "🇺🇸", stats: { spd: 90, pow: 80, def: 80, pas: 75, dri: 75, sho: 80 }, rarity: "rare" },
  { id: 39, name: "Kubernetes", rating: 88, position: "DevOps", category: "Tool", emoji: "☸️", country: "🇺🇸", stats: { spd: 70, pow: 90, def: 90, pas: 75, dri: 65, sho: 85 }, rarity: "rare" },
  { id: 40, name: "AWS", rating: 89, position: "Cloud", category: "Platform", emoji: "☁️", country: "🇺🇸", stats: { spd: 80, pow: 90, def: 85, pas: 80, dri: 75, sho: 85 }, rarity: "rare" },
  { id: 41, name: "Firebase", rating: 85, position: "Backend", category: "Platform", emoji: "🔥", country: "🇺🇸", stats: { spd: 85, pow: 75, def: 70, pas: 85, dri: 80, sho: 75 }, rarity: "rare" },
  { id: 42, name: "Swift", rating: 86, position: "Mobile", category: "Language", emoji: "🍎", country: "🇺🇸", stats: { spd: 85, pow: 80, def: 75, pas: 80, dri: 80, sho: 80 }, rarity: "rare" },
  { id: 43, name: "Kotlin", rating: 85, position: "Mobile", category: "Language", emoji: "🟣", country: "🇷🇺", stats: { spd: 80, pow: 80, def: 75, pas: 80, dri: 75, sho: 78 }, rarity: "rare" },
  { id: 44, name: "Terraform", rating: 86, position: "DevOps", category: "Tool", emoji: "🏗️", country: "🇺🇸", stats: { spd: 70, pow: 85, def: 88, pas: 75, dri: 65, sho: 80 }, rarity: "rare" },

  // === ULTRA RARE CARDS (Rating 90-94) ===
  { id: 45, name: "Linux", rating: 93, position: "OS", category: "Platform", emoji: "🐧", country: "🇫🇮", stats: { spd: 85, pow: 95, def: 95, pas: 85, dri: 80, sho: 90 }, rarity: "ultra-rare" },
  { id: 46, name: "GitHub", rating: 92, position: "Platform", category: "Platform", emoji: "🐙", country: "🇺🇸", stats: { spd: 90, pow: 90, def: 85, pas: 90, dri: 85, sho: 85 }, rarity: "ultra-rare" },
  { id: 47, name: "TensorFlow", rating: 91, position: "AI/ML", category: "Framework", emoji: "🧠", country: "🇺🇸", stats: { spd: 75, pow: 92, def: 80, pas: 85, dri: 80, sho: 90 }, rarity: "ultra-rare" },
  { id: 48, name: "ChatGPT", rating: 94, position: "AI", category: "Tool", emoji: "🤖", country: "🇺🇸", stats: { spd: 95, pow: 90, def: 70, pas: 95, dri: 90, sho: 88 }, rarity: "ultra-rare" },
  { id: 49, name: "Copilot", rating: 90, position: "AI", category: "Tool", emoji: "✈️", country: "🇺🇸", stats: { spd: 92, pow: 85, def: 70, pas: 90, dri: 88, sho: 80 }, rarity: "ultra-rare" },
  { id: 50, name: "Neovim", rating: 91, position: "Editor", category: "Tool", emoji: "🟢", country: "🌍", stats: { spd: 95, pow: 85, def: 80, pas: 80, dri: 90, sho: 85 }, rarity: "ultra-rare" },

  // === ICON CARDS (Rating 95-99) — Legendary Devs ===
  { id: 51, name: "Linus Torvalds", rating: 97, position: "Kernel", category: "Icon", emoji: "🐧", country: "🇫🇮", stats: { spd: 90, pow: 98, def: 95, pas: 90, dri: 88, sho: 95 }, rarity: "icon" },
  { id: 52, name: "Tim Berners-Lee", rating: 96, position: "Web", category: "Icon", emoji: "🌐", country: "🇬🇧", stats: { spd: 85, pow: 95, def: 92, pas: 95, dri: 85, sho: 90 }, rarity: "icon" },
  { id: 53, name: "Guido van Rossum", rating: 95, position: "Python", category: "Icon", emoji: "🐍", country: "🇳🇱", stats: { spd: 80, pow: 90, def: 90, pas: 95, dri: 85, sho: 88 }, rarity: "icon" },
  { id: 54, name: "Brendan Eich", rating: 95, position: "JS", category: "Icon", emoji: "⚡", country: "🇺🇸", stats: { spd: 95, pow: 88, def: 80, pas: 90, dri: 90, sho: 85 }, rarity: "icon" },
  { id: 55, name: "Ada Lovelace", rating: 98, position: "Pioneer", category: "Icon", emoji: "👩‍💻", country: "🇬🇧", stats: { spd: 88, pow: 95, def: 90, pas: 98, dri: 92, sho: 95 }, rarity: "icon" },
  { id: 56, name: "Dennis Ritchie", rating: 97, position: "C Lang", category: "Icon", emoji: "⚙️", country: "🇺🇸", stats: { spd: 85, pow: 98, def: 95, pas: 90, dri: 85, sho: 95 }, rarity: "icon" },
  { id: 57, name: "Alan Turing", rating: 99, position: "Pioneer", category: "Icon", emoji: "🔐", country: "🇬🇧", stats: { spd: 92, pow: 99, def: 95, pas: 95, dri: 90, sho: 98 }, rarity: "icon" },
  { id: 58, name: "Margaret Hamilton", rating: 96, position: "Space", category: "Icon", emoji: "🚀", country: "🇺🇸", stats: { spd: 88, pow: 95, def: 95, pas: 92, dri: 85, sho: 92 }, rarity: "icon" },
];

export default players;

// Pack definitions with probabilities
export const packTypes = {
  silver: {
    name: "Silver Pack",
    emoji: "🥈",
    description: "Contains 3 cards. Guaranteed at least 1 Silver.",
    cardCount: 3,
    color: "#c0c0c0",
    probabilities: { bronze: 0.50, silver: 0.35, gold: 0.10, rare: 0.04, "ultra-rare": 0.008, icon: 0.002 },
  },
  gold: {
    name: "Gold Pack",
    emoji: "🥇",
    description: "Contains 5 cards. Guaranteed at least 1 Gold.",
    cardCount: 5,
    color: "#ffd700",
    probabilities: { bronze: 0.20, silver: 0.35, gold: 0.30, rare: 0.10, "ultra-rare": 0.035, icon: 0.015 },
  },
  rare: {
    name: "Rare Pack",
    emoji: "🔥",
    description: "Contains 5 cards. Guaranteed at least 1 Rare.",
    cardCount: 5,
    color: "#e17055",
    probabilities: { bronze: 0.05, silver: 0.15, gold: 0.35, rare: 0.30, "ultra-rare": 0.10, icon: 0.05 },
  },
  "ultra-rare": {
    name: "Ultra Rare Pack",
    emoji: "💎",
    description: "Contains 7 cards. Guaranteed at least 1 Ultra Rare!",
    cardCount: 7,
    color: "#fd79a8",
    probabilities: { bronze: 0.0, silver: 0.05, gold: 0.25, rare: 0.35, "ultra-rare": 0.25, icon: 0.10 },
  },
};

// Achievement definitions
export const achievements = [
  { id: "first_login", name: "🐐 First Touch", description: "Log in for the first time", reward: "silver", icon: "🐐" },
  { id: "first_commit", name: "⚡ First Strike", description: "Make your first commit", reward: "gold", icon: "⚡" },
  { id: "five_commits", name: "🧱 Wall of Code", description: "Reach 5 commits", reward: "rare", icon: "🧱" },
  { id: "fifteen_commits", name: "🏆 Champion", description: "Reach 15 commits", reward: "ultra-rare", icon: "🏆" },
  { id: "speed_demon", name: "💨 Speed Demon", description: "Commit within 1 hour of account creation", reward: "gold", icon: "💨" },
  { id: "collector", name: "🃏 Card Collector", description: "Collect 10 unique cards", reward: "rare", icon: "🃏" },
  { id: "full_house", name: "🏠 Full House", description: "Collect 25 unique cards", reward: "ultra-rare", icon: "🏠" },
];
