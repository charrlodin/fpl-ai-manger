import useSWR from 'swr';
import { mockTeamData } from '@/lib/fpl-api';

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

// Default refresh interval for live data (30 seconds)
const LIVE_REFRESH_INTERVAL = 30000;
// More frequent refresh for live points (15 seconds)
const LIVE_POINTS_REFRESH_INTERVAL = 15000;

/**
 * Hook to fetch FPL bootstrap data
 */
export function useBootstrapData() {
  const { data, error, isLoading } = useSWR('/api/fpl/bootstrap', fetcher);
  
  return {
    bootstrapData: data,
    isLoading,
    isError: error
  };
}

/**
 * Hook to fetch user's team data
 */
export function useTeamData(entryId?: number, liveRefresh = true) {
  // Only fetch if entryId is provided
  const shouldFetch = !!entryId;
  
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/api/fpl/team/${entryId}` : null,
    fetcher,
    { 
      refreshInterval: liveRefresh ? LIVE_REFRESH_INTERVAL : 0,
      revalidateOnFocus: true,
      dedupingInterval: 5000 // Avoid duplicate requests within 5 seconds
    }
  );
  
  // If no entryId, return null for teamData indicating no team is connected
  if (!shouldFetch) {
    return {
      teamData: null,
      isLoading: false,
      isError: null
    };
  }
  
  return {
    teamData: data,
    isLoading,
    isError: error,
    refreshData: mutate // Expose a function to manually refresh the data
  };
}

/**
 * Hook to fetch fixtures for current gameweek
 */
export function useFixtures(gameweek?: number) {
  const { data, error, isLoading } = useSWR(
    gameweek ? `/api/fpl/fixtures/${gameweek}` : '/api/fpl/fixtures',
    fetcher
  );
  
  return {
    fixtures: data,
    isLoading,
    isError: error
  };
}

/**
 * Hook to fetch league standings
 */
export function useLeagueStandings(leagueId?: number, page: number = 1) {
  const shouldFetch = !!leagueId;
  
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/api/fpl/leagues/${leagueId}?page=${page}` : null,
    fetcher,
    { 
      refreshInterval: LIVE_REFRESH_INTERVAL * 2, // Less frequent than points
      revalidateOnFocus: true
    }
  );
  
  return {
    leagueData: data,
    standings: data?.standings?.results || [],
    leagueInfo: data?.league || null,
    hasNext: data?.standings?.has_next || false,
    page: data?.standings?.page || 1,
    isLoading,
    isError: error,
    refreshData: mutate
  };
}

/**
 * Hook to fetch live points data (most up-to-date during matches)
 */
export function useLivePoints(entryId?: number) {
  const shouldFetch = !!entryId;
  
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/api/fpl/live-points/${entryId}` : null,
    fetcher,
    { 
      refreshInterval: LIVE_POINTS_REFRESH_INTERVAL,
      revalidateOnFocus: true,
      dedupingInterval: 5000
    }
  );
  
  return {
    livePoints: data?.livePoints,
    gameweek: data?.gameweek,
    lastUpdated: data?.lastUpdated,
    isLoading,
    isError: error,
    refreshData: mutate
  };
}

/**
 * Hook to fetch all leagues for a team
 */
export function useTeamLeagues(entryId?: number) {
  const shouldFetch = !!entryId;
  
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/api/fpl/team-leagues/${entryId}` : null,
    fetcher,
    { 
      refreshInterval: LIVE_REFRESH_INTERVAL * 4, // Less frequent updates
      revalidateOnFocus: true
    }
  );
  
  return {
    leagues: data,
    classicLeagues: data?.classic || [],
    h2hLeagues: data?.h2h || [],
    cupInfo: data?.cup,
    isLoading,
    isError: error,
    refreshData: mutate
  };
}

/**
 * Hook to fetch safety score - points needed to avoid dropping in rank
 */
export function useSafetyScore(entryId?: number) {
  const shouldFetch = !!entryId;
  
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/api/fpl/safety-score/${entryId}` : null,
    fetcher,
    { 
      refreshInterval: LIVE_POINTS_REFRESH_INTERVAL, // Update frequently during live games
      revalidateOnFocus: true,
      dedupingInterval: 5000
    }
  );
  
  return {
    safetyData: data,
    safetyScore: data?.safetyScore,
    arrowDirection: data?.arrowDirection,
    currentGwPoints: data?.currentGwPoints,
    averageScore: data?.averageScore,
    statusMessage: data?.statusMessage,
    isLoading,
    isError: error,
    refreshData: mutate
  };
}
