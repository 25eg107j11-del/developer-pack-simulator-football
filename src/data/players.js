// Player/Card database for the Developer Pack Simulator
// Real footballers across all rarity tiers

const players = [
  // === BRONZE CARDS (Rating 50-64) ===
  { id: 1, name: "Phil Jones", rating: 52, position: "CB", category: "Defender", emoji: "🛡️", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", stats: { spd: 45, pow: 60, def: 55, pas: 40, dri: 35, sho: 30 }, rarity: "bronze" },
  { id: 2, name: "Mustafi", rating: 54, position: "CB", category: "Defender", emoji: "🛡️", country: "🇩🇪", stats: { spd: 50, pow: 58, def: 58, pas: 48, dri: 38, sho: 28 }, rarity: "bronze" },
  { id: 3, name: "Lingard", rating: 58, position: "CAM", category: "Midfielder", emoji: "🎯", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", stats: { spd: 65, pow: 50, def: 35, pas: 58, dri: 62, sho: 55 }, rarity: "bronze" },
  { id: 4, name: "Xhaka", rating: 62, position: "CM", category: "Midfielder", emoji: "⚙️", country: "🇨🇭", stats: { spd: 42, pow: 65, def: 60, pas: 68, dri: 52, sho: 58 }, rarity: "bronze" },
  { id: 5, name: "Maguire", rating: 60, position: "CB", category: "Defender", emoji: "🧱", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", stats: { spd: 40, pow: 70, def: 65, pas: 50, dri: 38, sho: 30 }, rarity: "bronze" },
  { id: 6, name: "Marcos Alonso", rating: 56, position: "LB", category: "Defender", emoji: "🛡️", country: "🇪🇸", stats: { spd: 48, pow: 62, def: 58, pas: 55, dri: 50, sho: 45 }, rarity: "bronze" },
  { id: 7, name: "Welbeck", rating: 57, position: "ST", category: "Forward", emoji: "⚽", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", stats: { spd: 62, pow: 58, def: 35, pas: 48, dri: 55, sho: 58 }, rarity: "bronze" },
  { id: 8, name: "Mignolet", rating: 55, position: "GK", category: "Goalkeeper", emoji: "🧤", country: "🇧🇪", stats: { spd: 30, pow: 55, def: 55, pas: 40, dri: 20, sho: 15 }, rarity: "bronze" },
  { id: 9, name: "Emre Can", rating: 63, position: "CM", category: "Midfielder", emoji: "⚙️", country: "🇩🇪", stats: { spd: 58, pow: 68, def: 62, pas: 60, dri: 55, sho: 58 }, rarity: "bronze" },
  { id: 10, name: "Giroud", rating: 64, position: "ST", category: "Forward", emoji: "⚽", country: "🇫🇷", stats: { spd: 40, pow: 75, def: 38, pas: 55, dri: 52, sho: 70 }, rarity: "bronze" },
  { id: 11, name: "Otamendi", rating: 61, position: "CB", category: "Defender", emoji: "🛡️", country: "🇦🇷", stats: { spd: 45, pow: 72, def: 68, pas: 50, dri: 40, sho: 32 }, rarity: "bronze" },
  { id: 12, name: "Matic", rating: 63, position: "CDM", category: "Midfielder", emoji: "🔒", country: "🇷🇸", stats: { spd: 38, pow: 70, def: 68, pas: 62, dri: 48, sho: 45 }, rarity: "bronze" },

  // === SILVER CARDS (Rating 65-74) ===
  { id: 13, name: "Pulisic", rating: 68, position: "LW", category: "Forward", emoji: "🇺🇸", country: "🇺🇸", stats: { spd: 78, pow: 55, def: 35, pas: 65, dri: 72, sho: 62 }, rarity: "silver" },
  { id: 14, name: "Mount", rating: 72, position: "CAM", category: "Midfielder", emoji: "🎯", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", stats: { spd: 65, pow: 58, def: 50, pas: 72, dri: 70, sho: 68 }, rarity: "silver" },
  { id: 15, name: "Richarlison", rating: 70, position: "ST", category: "Forward", emoji: "🐦", country: "🇧🇷", stats: { spd: 75, pow: 65, def: 38, pas: 58, dri: 68, sho: 70 }, rarity: "silver" },
  { id: 16, name: "Thiago Silva", rating: 74, position: "CB", category: "Defender", emoji: "🛡️", country: "🇧🇷", stats: { spd: 42, pow: 68, def: 82, pas: 70, dri: 55, sho: 28 }, rarity: "silver" },
  { id: 17, name: "Grealish", rating: 73, position: "LW", category: "Forward", emoji: "💇", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", stats: { spd: 72, pow: 55, def: 32, pas: 72, dri: 80, sho: 62 }, rarity: "silver" },
  { id: 18, name: "Lo Celso", rating: 67, position: "CAM", category: "Midfielder", emoji: "🎯", country: "🇦🇷", stats: { spd: 60, pow: 52, def: 45, pas: 70, dri: 72, sho: 58 }, rarity: "silver" },
  { id: 19, name: "Militão", rating: 74, position: "CB", category: "Defender", emoji: "🛡️", country: "🇧🇷", stats: { spd: 70, pow: 75, def: 78, pas: 55, dri: 52, sho: 30 }, rarity: "silver" },
  { id: 20, name: "Diogo Jota", rating: 72, position: "LW", category: "Forward", emoji: "🐺", country: "🇵🇹", stats: { spd: 78, pow: 60, def: 35, pas: 62, dri: 75, sho: 72 }, rarity: "silver" },
  { id: 21, name: "Foden", rating: 74, position: "CAM", category: "Midfielder", emoji: "⭐", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", stats: { spd: 72, pow: 55, def: 40, pas: 75, dri: 80, sho: 70 }, rarity: "silver" },
  { id: 22, name: "Valverde", rating: 74, position: "CM", category: "Midfielder", emoji: "🦅", country: "🇺🇾", stats: { spd: 80, pow: 72, def: 65, pas: 68, dri: 70, sho: 68 }, rarity: "silver" },
  { id: 23, name: "Szczesny", rating: 69, position: "GK", category: "Goalkeeper", emoji: "🧤", country: "🇵🇱", stats: { spd: 32, pow: 65, def: 72, pas: 42, dri: 20, sho: 15 }, rarity: "silver" },
  { id: 24, name: "Müller", rating: 73, position: "CAM", category: "Forward", emoji: "🎯", country: "🇩🇪", stats: { spd: 60, pow: 68, def: 40, pas: 78, dri: 65, sho: 75 }, rarity: "silver" },

  // === GOLD CARDS (Rating 75-84) ===
  { id: 25, name: "Salah", rating: 84, position: "RW", category: "Forward", emoji: "👑", country: "🇪🇬", stats: { spd: 90, pow: 65, def: 38, pas: 75, dri: 85, sho: 85 }, rarity: "gold" },
  { id: 26, name: "De Bruyne", rating: 84, position: "CAM", category: "Midfielder", emoji: "🧠", country: "🇧🇪", stats: { spd: 70, pow: 72, def: 55, pas: 92, dri: 82, sho: 80 }, rarity: "gold" },
  { id: 27, name: "Son", rating: 83, position: "LW", category: "Forward", emoji: "🇰🇷", country: "🇰🇷", stats: { spd: 88, pow: 60, def: 35, pas: 72, dri: 82, sho: 85 }, rarity: "gold" },
  { id: 28, name: "Lewandowski", rating: 82, position: "ST", category: "Forward", emoji: "🔫", country: "🇵🇱", stats: { spd: 65, pow: 82, def: 35, pas: 70, dri: 78, sho: 90 }, rarity: "gold" },
  { id: 29, name: "Casemiro", rating: 78, position: "CDM", category: "Midfielder", emoji: "🔒", country: "🇧🇷", stats: { spd: 55, pow: 82, def: 85, pas: 65, dri: 55, sho: 55 }, rarity: "gold" },
  { id: 30, name: "Alisson", rating: 82, position: "GK", category: "Goalkeeper", emoji: "🧤", country: "🇧🇷", stats: { spd: 45, pow: 72, def: 85, pas: 55, dri: 30, sho: 15 }, rarity: "gold" },
  { id: 31, name: "Rúben Dias", rating: 80, position: "CB", category: "Defender", emoji: "🛡️", country: "🇵🇹", stats: { spd: 55, pow: 78, def: 85, pas: 65, dri: 50, sho: 30 }, rarity: "gold" },
  { id: 32, name: "Modric", rating: 82, position: "CM", category: "Midfielder", emoji: "🪄", country: "🇭🇷", stats: { spd: 65, pow: 55, def: 60, pas: 88, dri: 85, sho: 68 }, rarity: "gold" },
  { id: 33, name: "Benzema", rating: 82, position: "ST", category: "Forward", emoji: "🐱", country: "🇫🇷", stats: { spd: 68, pow: 78, def: 35, pas: 78, dri: 82, sho: 86 }, rarity: "gold" },
  { id: 34, name: "Virgil van Dijk", rating: 84, position: "CB", category: "Defender", emoji: "🗿", country: "🇳🇱", stats: { spd: 72, pow: 86, def: 90, pas: 68, dri: 55, sho: 35 }, rarity: "gold" },
  { id: 35, name: "Kroos", rating: 79, position: "CM", category: "Midfielder", emoji: "🎹", country: "🇩🇪", stats: { spd: 48, pow: 68, def: 62, pas: 90, dri: 75, sho: 72 }, rarity: "gold" },
  { id: 36, name: "Courtois", rating: 83, position: "GK", category: "Goalkeeper", emoji: "🧤", country: "🇧🇪", stats: { spd: 35, pow: 78, def: 88, pas: 45, dri: 20, sho: 12 }, rarity: "gold" },

  // === RARE CARDS (Rating 85-89) ===
  { id: 37, name: "Haaland", rating: 89, position: "ST", category: "Forward", emoji: "🤖", country: "🇳🇴", stats: { spd: 88, pow: 90, def: 40, pas: 62, dri: 75, sho: 92 }, rarity: "rare" },
  { id: 38, name: "Mbappé", rating: 89, position: "ST", category: "Forward", emoji: "🐢", country: "🇫🇷", stats: { spd: 97, pow: 72, def: 35, pas: 75, dri: 90, sho: 88 }, rarity: "rare" },
  { id: 39, name: "Neymar", rating: 86, position: "LW", category: "Forward", emoji: "🎩", country: "🇧🇷", stats: { spd: 85, pow: 52, def: 30, pas: 82, dri: 94, sho: 78 }, rarity: "rare" },
  { id: 40, name: "Bellingham", rating: 88, position: "CM", category: "Midfielder", emoji: "🔔", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", stats: { spd: 78, pow: 78, def: 68, pas: 82, dri: 85, sho: 80 }, rarity: "rare" },
  { id: 41, name: "Vinícius Jr.", rating: 89, position: "LW", category: "Forward", emoji: "💃", country: "🇧🇷", stats: { spd: 95, pow: 60, def: 28, pas: 75, dri: 92, sho: 82 }, rarity: "rare" },
  { id: 42, name: "Gavi", rating: 85, position: "CM", category: "Midfielder", emoji: "🔥", country: "🇪🇸", stats: { spd: 72, pow: 65, def: 65, pas: 80, dri: 82, sho: 65 }, rarity: "rare" },
  { id: 43, name: "Pedri", rating: 86, position: "CM", category: "Midfielder", emoji: "🎨", country: "🇪🇸", stats: { spd: 68, pow: 58, def: 62, pas: 88, dri: 88, sho: 62 }, rarity: "rare" },
  { id: 44, name: "Lamine Yamal", rating: 87, position: "RW", category: "Forward", emoji: "👶", country: "🇪🇸", stats: { spd: 88, pow: 52, def: 25, pas: 82, dri: 90, sho: 75 }, rarity: "rare" },

  // === ULTRA RARE CARDS (Rating 90-94) ===
  { id: 45, name: "Messi", rating: 93, position: "RW", category: "Forward", emoji: "🐐", country: "🇦🇷", stats: { spd: 78, pow: 60, def: 30, pas: 90, dri: 95, sho: 90 }, rarity: "ultra-rare" },
  { id: 46, name: "Ronaldo", rating: 91, position: "ST", category: "Forward", emoji: "🐐", country: "🇵🇹", stats: { spd: 82, pow: 85, def: 32, pas: 72, dri: 82, sho: 94 }, rarity: "ultra-rare" },
  { id: 47, name: "De Bruyne", rating: 91, position: "CAM", category: "Midfielder", emoji: "🧠", country: "🇧🇪", stats: { spd: 72, pow: 75, def: 58, pas: 95, dri: 85, sho: 85 }, rarity: "ultra-rare" },
  { id: 48, name: "Mbappé", rating: 92, position: "ST", category: "Forward", emoji: "🐢", country: "🇫🇷", stats: { spd: 98, pow: 78, def: 38, pas: 78, dri: 92, sho: 90 }, rarity: "ultra-rare" },
  { id: 49, name: "Haaland", rating: 92, position: "ST", category: "Forward", emoji: "🤖", country: "🇳🇴", stats: { spd: 90, pow: 92, def: 42, pas: 65, dri: 78, sho: 95 }, rarity: "ultra-rare" },
  { id: 50, name: "Vinícius Jr.", rating: 93, position: "LW", category: "Forward", emoji: "💃", country: "🇧🇷", stats: { spd: 97, pow: 65, def: 30, pas: 80, dri: 95, sho: 88 }, rarity: "ultra-rare" },

  // === ICON CARDS (Rating 95-99) — Legends ===
  { id: 51, name: "Pelé", rating: 98, position: "CF", category: "Icon", emoji: "👑", country: "🇧🇷", stats: { spd: 90, pow: 80, def: 50, pas: 88, dri: 96, sho: 96 }, rarity: "icon" },
  { id: 52, name: "Maradona", rating: 97, position: "CAM", category: "Icon", emoji: "🪄", country: "🇦🇷", stats: { spd: 85, pow: 60, def: 35, pas: 90, dri: 98, sho: 90 }, rarity: "icon" },
  { id: 53, name: "Ronaldinho", rating: 96, position: "LW", category: "Icon", emoji: "😁", country: "🇧🇷", stats: { spd: 88, pow: 65, def: 30, pas: 88, dri: 97, sho: 85 }, rarity: "icon" },
  { id: 54, name: "Zidane", rating: 96, position: "CAM", category: "Icon", emoji: "🧊", country: "🇫🇷", stats: { spd: 78, pow: 78, def: 52, pas: 92, dri: 95, sho: 85 }, rarity: "icon" },
  { id: 55, name: "R9 Ronaldo", rating: 97, position: "ST", category: "Icon", emoji: "👽", country: "🇧🇷", stats: { spd: 92, pow: 82, def: 30, pas: 72, dri: 95, sho: 96 }, rarity: "icon" },
  { id: 56, name: "Maldini", rating: 95, position: "CB", category: "Icon", emoji: "🏛️", country: "🇮🇹", stats: { spd: 75, pow: 82, def: 97, pas: 72, dri: 70, sho: 35 }, rarity: "icon" },
  { id: 57, name: "Cruyff", rating: 96, position: "CF", category: "Icon", emoji: "🔮", country: "🇳🇱", stats: { spd: 82, pow: 68, def: 42, pas: 88, dri: 96, sho: 88 }, rarity: "icon" },
  { id: 58, name: "Beckenbauer", rating: 95, position: "CB", category: "Icon", emoji: "🤴", country: "🇩🇪", stats: { spd: 72, pow: 80, def: 95, pas: 85, dri: 80, sho: 65 }, rarity: "icon" },
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
