export type Sport = "football" | "tennis" | "rugby" | "cricket";

export interface Match {
  id: string;
  sport: Sport;
  competition: string;
  status: "live" | "upcoming" | "finished";
  minute?: string;
  startsAt?: string;
  home: { name: string; short: string; score?: number | string; logo?: string };
  away: { name: string; short: string; score?: number | string; logo?: string };
  isWomens: boolean;
  highlight?: string;
}

export interface Athlete {
  id: string;
  name: string;
  sport: Sport;
  team: string;
  country: string;
  position?: string;
  jersey?: number;
  age: number;
  image: string;
  stats: { label: string; value: string }[];
  bio: string;
  achievements: string[];
  recentForm?: ("W" | "L" | "D")[];
  trending?: boolean;
  rank?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  sport: Sport;
  isWomens: boolean;
  publishedAt: string;
  readTime: number;
  image: string;
  featured?: boolean;
  author: string;
}

export interface Ranking {
  id: string;
  position: number;
  name: string;
  sport: Sport;
  points: number;
  change: number;
  isWomens: boolean;
  competition: string;
}

// ---- MATCHES (women's first) ----
export const matches: Match[] = [
  {
    id: "m1",
    sport: "football",
    competition: "UEFA Women's Champions League",
    status: "live",
    minute: "67'",
    isWomens: true,
    home: { name: "Barcelona Femení", short: "BAR" },
    away: { name: "Olympique Lyonnais", short: "OL" },
    highlight: "Aitana Bonmatí scored a stunning free-kick",
  },
  {
    id: "m2",
    sport: "football",
    competition: "NWSL",
    status: "live",
    minute: "82'",
    isWomens: true,
    home: { name: "San Diego Wave", short: "SD" },
    away: { name: "Portland Thorns", short: "POR" },
    highlight: "Sophia Smith equalizer in the 78th",
  },
  {
    id: "m3",
    sport: "tennis",
    competition: "WTA Finals — Riyadh",
    status: "live",
    minute: "Set 2 · 4-3",
    isWomens: true,
    home: { name: "Iga Świątek", short: "ŚWI", score: "6, 4" },
    away: { name: "Coco Gauff", short: "GAU", score: "4, 3" },
  },
  {
    id: "m4",
    sport: "cricket",
    competition: "Women's Premier League",
    status: "live",
    minute: "Innings 2 · Over 14.2",
    isWomens: true,
    home: { name: "Mumbai Indians W", short: "MI", score: "168/4" },
    away: { name: "Gujarat Giants W", short: "GG", score: "112/5" },
  },
  {
    id: "m5",
    sport: "rugby",
    competition: "Women's Six Nations",
    status: "upcoming",
    startsAt: "Today · 19:45",
    isWomens: true,
    home: { name: "England Red Roses", short: "ENG" },
    away: { name: "France XV", short: "FRA" },
  },
  {
    id: "m6",
    sport: "football",
    competition: "Women's Super League",
    status: "upcoming",
    startsAt: "Tomorrow · 17:30",
    isWomens: true,
    home: { name: "Arsenal Women", short: "ARS" },
    away: { name: "Chelsea Women", short: "CHE" },
  },
  {
    id: "m7",
    sport: "football",
    competition: "Liga F",
    status: "finished",
    isWomens: true,
    home: { name: "Real Madrid Femenino", short: "RMA", score: 2 },
    away: { name: "Atlético Madrid Fem", short: "ATM", score: 1 },
  },
  {
    id: "m8",
    sport: "tennis",
    competition: "Billie Jean King Cup",
    status: "finished",
    isWomens: true,
    home: { name: "Italy", short: "ITA", score: "2-0" },
    away: { name: "Slovakia", short: "SVK", score: "" },
  },
];

// ---- ATHLETES ----
export const athletes: Athlete[] = [
  {
    id: "a1",
    name: "Aitana Bonmatí",
    sport: "football",
    team: "Barcelona Femení",
    country: "Spain",
    position: "Midfielder",
    jersey: 14,
    age: 27,
    rank: 1,
    trending: true,
    image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&q=80",
    stats: [
      { label: "Goals", value: "18" },
      { label: "Assists", value: "12" },
      { label: "Apps", value: "24" },
      { label: "Rating", value: "8.9" },
    ],
    bio: "Two-time Ballon d'Or Féminin winner and the heartbeat of Barcelona's historic treble-winning side.",
    achievements: ["Ballon d'Or Féminin 2023, 2024", "UEFA Women's Champions League ×3", "FIFA World Cup 2023"],
    recentForm: ["W", "W", "W", "D", "W"],
  },
  {
    id: "a2",
    name: "Coco Gauff",
    sport: "tennis",
    team: "USA",
    country: "United States",
    age: 21,
    rank: 3,
    trending: true,
    image: "https://images.unsplash.com/photo-1599933310642-8f07bdea3884?w=600&q=80",
    stats: [
      { label: "W-L", value: "52-12" },
      { label: "Titles", value: "4" },
      { label: "Aces", value: "298" },
      { label: "Ranking", value: "#3" },
    ],
    bio: "US Open champion and one of the most electrifying baseliners on the WTA tour.",
    achievements: ["US Open Champion 2023", "Roland-Garros Champion 2025", "WTA Finals winner"],
    recentForm: ["W", "L", "W", "W", "W"],
  },
  {
    id: "a3",
    name: "Smriti Mandhana",
    sport: "cricket",
    team: "Royal Challengers Bengaluru W",
    country: "India",
    age: 28,
    rank: 2,
    trending: false,
    image: "https://images.unsplash.com/photo-1593766827228-8a8b1b1f9af9?w=600&q=80",
    stats: [
      { label: "Runs", value: "612" },
      { label: "Avg", value: "48.6" },
      { label: "SR", value: "138.2" },
      { label: "50s", value: "6" },
    ],
    bio: "Elegant left-handed opener, captain of India and WPL champion with RCB.",
    achievements: ["WPL Champion 2024", "ICC ODI Player of the Year", "Arjuna Award"],
    recentForm: ["W", "W", "L", "W", "W"],
  },
  {
    id: "a4",
    name: "Ilona Maher",
    sport: "rugby",
    team: "Bristol Bears Women",
    country: "United States",
    position: "Centre",
    age: 28,
    rank: 4,
    trending: true,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80",
    stats: [
      { label: "Tries", value: "11" },
      { label: "Apps", value: "16" },
      { label: "Tackles", value: "142" },
      { label: "Meters", value: "1,284" },
    ],
    bio: "Olympic bronze medalist, the most-followed rugby player in the world, redefining the sport's reach.",
    achievements: ["Olympic Bronze, Paris 2024", "World Rugby Sevens Player of the Year nominee"],
    recentForm: ["W", "W", "W", "L", "W"],
  },
  {
    id: "a5",
    name: "Sophia Smith",
    sport: "football",
    team: "Portland Thorns",
    country: "United States",
    position: "Forward",
    jersey: 9,
    age: 24,
    rank: 5,
    image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=600&q=80",
    stats: [
      { label: "Goals", value: "16" },
      { label: "Assists", value: "7" },
      { label: "Apps", value: "22" },
      { label: "Rating", value: "8.4" },
    ],
    bio: "NWSL MVP and USWNT star known for blistering pace and clinical finishing.",
    achievements: ["NWSL MVP 2022", "Olympic Gold, Paris 2024"],
    recentForm: ["W", "W", "D", "W", "L"],
  },
  {
    id: "a6",
    name: "Iga Świątek",
    sport: "tennis",
    team: "Poland",
    country: "Poland",
    age: 24,
    rank: 1,
    image: "https://images.unsplash.com/photo-1531315396756-905d68d21b56?w=600&q=80",
    stats: [
      { label: "W-L", value: "61-9" },
      { label: "Titles", value: "6" },
      { label: "Slams", value: "5" },
      { label: "Ranking", value: "#1" },
    ],
    bio: "World #1 and five-time Grand Slam champion with a relentless baseline game.",
    achievements: ["Roland-Garros ×4", "US Open Champion", "WTA Player of the Year"],
    recentForm: ["W", "W", "W", "W", "W"],
  },
];

// ---- NEWS ----
export const news: NewsItem[] = [
  {
    id: "n1",
    title: "Bonmatí inspires Barcelona to commanding UWCL win over Lyon",
    excerpt: "A masterclass from the two-time Ballon d'Or winner as Barça stamp their authority on Europe.",
    category: "Match Report",
    sport: "football",
    isWomens: true,
    publishedAt: "12 min ago",
    readTime: 4,
    featured: true,
    author: "Maya Hernandez",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80",
  },
  {
    id: "n2",
    title: "Ilona Maher signs landmark deal to anchor PWR title push",
    excerpt: "The Olympic medalist commits to Bristol Bears for a second season as women's rugby attendance soars.",
    category: "Transfer",
    sport: "rugby",
    isWomens: true,
    publishedAt: "1 hour ago",
    readTime: 3,
    author: "Olivia Carter",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1200&q=80",
  },
  {
    id: "n3",
    title: "WTA Finals: Świątek and Gauff renew rivalry in Riyadh thriller",
    excerpt: "Two of the tour's biggest names trade blows in a match already being called one of the year's best.",
    category: "Live",
    sport: "tennis",
    isWomens: true,
    publishedAt: "2 hours ago",
    readTime: 5,
    author: "Priya Shah",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&q=80",
  },
  {
    id: "n4",
    title: "Mandhana powers Mumbai Indians to WPL summit",
    excerpt: "A second-innings century from the India captain seals another famous WPL chase.",
    category: "Match Report",
    sport: "cricket",
    isWomens: true,
    publishedAt: "4 hours ago",
    readTime: 4,
    author: "Riya Kapoor",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80",
  },
  {
    id: "n5",
    title: "Red Roses name unchanged XV for France showdown",
    excerpt: "England keep faith with their forward pack ahead of a pivotal Six Nations clash in Twickenham.",
    category: "Team News",
    sport: "rugby",
    isWomens: true,
    publishedAt: "6 hours ago",
    readTime: 3,
    author: "Hannah Wells",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
  },
  {
    id: "n6",
    title: "Inside the rise of NWSL: how the league rewrote the playbook",
    excerpt: "Record attendances, billion-dollar valuations, and a new generation of stars driving women's football forward.",
    category: "Feature",
    sport: "football",
    isWomens: true,
    publishedAt: "Yesterday",
    readTime: 8,
    author: "Jordan Mills",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80",
  },
];

// ---- RANKINGS ----
export const rankings: Ranking[] = [
  { id: "r1", position: 1, name: "Spain", sport: "football", points: 2061, change: 0, isWomens: true, competition: "FIFA Women's Ranking" },
  { id: "r2", position: 2, name: "United States", sport: "football", points: 2049, change: 1, isWomens: true, competition: "FIFA Women's Ranking" },
  { id: "r3", position: 3, name: "Germany", sport: "football", points: 2030, change: -1, isWomens: true, competition: "FIFA Women's Ranking" },
  { id: "r4", position: 4, name: "England", sport: "football", points: 2025, change: 0, isWomens: true, competition: "FIFA Women's Ranking" },
  { id: "r5", position: 5, name: "France", sport: "football", points: 2002, change: 2, isWomens: true, competition: "FIFA Women's Ranking" },
];

export const sportLabel: Record<Sport, string> = {
  football: "Football",
  tennis: "Tennis",
  rugby: "Rugby",
  cricket: "Cricket",
};
