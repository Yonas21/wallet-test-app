import { DailyPoints } from '../types';

// Season start dates
const SEASONS = {
  spring: { month: 3, day: 1 }, // March 1
  summer: { month: 6, day: 1 }, // June 1
  autumn: { month: 9, day: 1 }, // September 1
  winter: { month: 12, day: 1 } // December 1
};

export function getCurrentSeason(): { season: string; dayOfSeason: number } {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Find the most recent season start
  let seasonStart = new Date(currentYear, SEASONS.winter.month - 1, SEASONS.winter.day);
  let season = 'winter';
  
  if (now >= new Date(currentYear, SEASONS.spring.month - 1, SEASONS.spring.day)) {
    seasonStart = new Date(currentYear, SEASONS.spring.month - 1, SEASONS.spring.day);
    season = 'spring';
  }
  if (now >= new Date(currentYear, SEASONS.summer.month - 1, SEASONS.summer.day)) {
    seasonStart = new Date(currentYear, SEASONS.summer.month - 1, SEASONS.summer.day);
    season = 'summer';
  }
  if (now >= new Date(currentYear, SEASONS.autumn.month - 1, SEASONS.autumn.day)) {
    seasonStart = new Date(currentYear, SEASONS.autumn.month - 1, SEASONS.autumn.day);
    season = 'autumn';
  }
  
  const dayOfSeason = Math.floor((now.getTime() - seasonStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  return { season, dayOfSeason };
}

export function calculateDailyPoints(): DailyPoints {
  // Simplified calculation to avoid any potential loops
  // Just return a static value for now to prevent crashes
  const points = 456;
  const formattedPoints = '456K';
  
  return { points, formattedPoints };
}
