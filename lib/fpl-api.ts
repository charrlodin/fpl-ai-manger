/**
 * FPL API Service
 * 
 * A service to fetch data from the official Fantasy Premier League API
 */

const FPL_API_BASE_URL = 'https://fantasy.premierleague.com/api';

/**
 * Get general FPL bootstrap data
 * Contains teams, players, game settings
 */
export async function getBootstrapData() {
  const response = await fetch(`${FPL_API_BASE_URL}/bootstrap-static/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch FPL bootstrap data');
  }
  
  return response.json();
}

/**
 * Get fixture data for all gameweeks or a specific gameweek
 */
export async function getFixtures(gameweek?: number) {
  const url = gameweek 
    ? `${FPL_API_BASE_URL}/fixtures/?event=${gameweek}` 
    : `${FPL_API_BASE_URL}/fixtures/`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch FPL fixtures');
  }
  
  return response.json();
}

/**
 * Get a specific team/entry data for a gameweek
 */
export async function getTeamData(entryId: number, gameweek: number) {
  const response = await fetch(`${FPL_API_BASE_URL}/entry/${entryId}/event/${gameweek}/picks/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch team data');
  }
  
  return response.json();
}

/**
 * Get a team's history and past seasons data
 */
export async function getTeamHistory(entryId: number) {
  const response = await fetch(`${FPL_API_BASE_URL}/entry/${entryId}/history/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch team history');
  }
  
  return response.json();
}

/**
 * Get standings for a specific league
 */
export async function getLeagueStandings(leagueId: number, page: number = 1) {
  const response = await fetch(`${FPL_API_BASE_URL}/leagues-classic/${leagueId}/standings/?page_standings=${page}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch league standings');
  }
  
  return response.json();
}

/**
 * Get detailed player data
 */
export async function getPlayerData(playerId: number) {
  const response = await fetch(`${FPL_API_BASE_URL}/element-summary/${playerId}/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch player data');
  }
  
  return response.json();
}

/**
 * Mock data for development/testing
 */
export const mockTeamData = {
  teamValue: 104.5,
  bank: 0.5,
  totalValue: 105.0,
  overallRank: 425387,
  gameweekPoints: 68,
  totalPoints: 1245,
  chips: [
    { name: 'wildcard', used: true, gameweek: 8 },
    { name: 'freehit', used: false },
    { name: 'bench_boost', used: false },
    { name: 'triple_captain', used: false }
  ],
  currentGameweek: 14
};

/**
 * Format currency value from API (80.5) to display format (£80.5m)
 */
export function formatCurrency(value: number): string {
  return `£${value}m`;
}

/**
 * Format rank with commas
 */
export function formatRank(rank: number | undefined): string {
  if (rank === undefined || rank === null) {
    return "--";
  }
  return rank.toLocaleString();
}
