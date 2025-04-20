import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to calculate safety score - the number of points needed to avoid dropping in rank
 */
export async function GET(request: NextRequest) {
  // Get entry ID from the URL path
  const pathname = request.nextUrl.pathname;
  const entryIdMatch = pathname.match(/\/api\/fpl\/safety-score\/([\d]+)/);
  const entryIdString = entryIdMatch ? entryIdMatch[1] : '';
  const entryId = parseInt(entryIdString);

  if (isNaN(entryId)) {
    return NextResponse.json(
      { error: 'Invalid entry ID' },
      { status: 400 }
    );
  }
  
  try {
    // Get bootstrap data to fetch current gameweek
    const bootstrapData = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/').then(res => res.json());
    
    // Find the current gameweek
    const currentGameweek = bootstrapData.events.find((event: any) => 
      event.is_current === true
    )?.id || 1;
    
    // Fetch team history data to get current rank
    const teamHistoryResponse = await fetch(`https://fantasy.premierleague.com/api/entry/${entryId}/history/`);
    const teamHistoryData = await teamHistoryResponse.json();
    
    // Get current overall rank
    const latestGameweek = teamHistoryData.current?.length > 0 ? 
      teamHistoryData.current[teamHistoryData.current.length - 1] : null;
    
    if (!latestGameweek) {
      throw new Error('No gameweek data found');
    }

    // Current points and rank
    const currentPoints = latestGameweek.total_points;
    const currentRank = latestGameweek.overall_rank;
    
    // Get general league data to calculate safety score
    // In FPL, we need to look at the average points and overall point distribution
    const totalPlayers = bootstrapData.total_players || 10000000; // Fallback
    
    // Get average score for the current gameweek
    const averageScore = bootstrapData.events.find((e: any) => e.id === currentGameweek)?.average_entry_score || 0;
    
    // Calculate the estimated safety score based on:
    // 1. Top 10k rank changes (approximated)
    // 2. Average points in the current gameweek
    // 3. Current rank (different tiers have different volatility)
    
    let safetyBuffer = 0;
    
    // Adjust buffer based on rank tier
    if (currentRank < 10000) {
      // Top 10k needs more points to stay stable
      safetyBuffer = Math.round(averageScore * 1.15); // 15% above average
    } else if (currentRank < 100000) {
      // Top 100k
      safetyBuffer = Math.round(averageScore * 1.1); // 10% above average
    } else if (currentRank < 1000000) {
      // Top 1M
      safetyBuffer = Math.round(averageScore * 1.05); // 5% above average
    } else {
      // Outside top 1M
      safetyBuffer = averageScore;
    }
    
    // Current rank percentile (smaller is better)
    const rankPercentile = currentRank / totalPlayers;
    
    // Get the live points for the current gameweek
    const entryResponse = await fetch(`https://fantasy.premierleague.com/api/entry/${entryId}/event/${currentGameweek}/picks/`);
    const entryData = await entryResponse.json();
    
    // Get current gameweek points
    const currentGwPoints = entryData.entry_history?.points || 0;
    
    // Calculate safety score (points needed to maintain rank)
    // This is an approximation, as FPL doesn't provide the exact algorithm
    const pointsNeeded = Math.max(0, safetyBuffer - currentGwPoints);
    
    // Calculate if we're on track for green or red arrow
    const arrowDirection = currentGwPoints >= safetyBuffer ? 'green' : 'red';
    
    // Return safety score data
    return NextResponse.json({
      entryId,
      currentRank,
      currentPoints,
      gameweek: currentGameweek,
      currentGwPoints,
      safetyScore: pointsNeeded,
      averageScore,
      arrowDirection,
      rankPercentile,
      livePoints: currentGwPoints,
      statusMessage: arrowDirection === 'green' 
        ? `On track for a green arrow! ${Math.abs(pointsNeeded)} points above safety.` 
        : `Need ${pointsNeeded} more points to avoid a red arrow.`,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error calculating safety score:', error);
    
    return NextResponse.json(
      { error: 'Failed to calculate safety score' },
      { status: 500 }
    );
  }
}
