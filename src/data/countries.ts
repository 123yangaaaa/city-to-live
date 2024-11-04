export interface Country {
  name: string;
  flag: string;
  scores: {
    costOfLiving: number;
    internet: number;
    climate: number;
    safety: number;
    culture: number;
    nature: number;
    overall: number;
  };
  description: string;
  imageUrl: string;
}

export const countries: Country[] = [
  {
    name: "葡萄牙",
    flag: "🇵🇹",
    scores: {
      costOfLiving: 75,
      internet: 90,
      climate: 85,
      safety: 95,
      culture: 90,
      nature: 85,
      overall: 88
    },
    description: "欧洲最适合数字游民的国家之一，拥有优质的生活方式、友好的签证政策和美丽的海岸线。",
    imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "泰国",
    flag: "🇹🇭",
    scores: {
      costOfLiving: 95,
      internet: 80,
      climate: 75,
      safety: 80,
      culture: 95,
      nature: 90,
      overall: 86
    },
    description: "数字游民天堂，低成本高品质生活，丰富的文化体验和美食。",
    imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "墨西哥",
    flag: "🇲🇽",
    scores: {
      costOfLiving: 90,
      internet: 75,
      climate: 85,
      safety: 70,
      culture: 95,
      nature: 90,
      overall: 84
    },
    description: "丰富的文化遗产，美食天堂，适合远程工作的时区，友好的签证政策。",
    imageUrl: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80"
  }
];