import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to fetch live FPL points for a team
 * This gives more up-to-date points than the regular team API
 */
export async function GET(request: NextRequest) {
  // Get entry ID from the URL path
  const pathname = request.nextUrl.pathname;
  const entryIdMatch = pathname.match(/\/api\/fpl\/live-points\/([\d]+)/);
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
    
    // Get user's picks for the current gameweek
    const picksResponse = await fetch(`https://fantasy.premierleague.com/api/entry/${entryId}/event/${currentGameweek}/picks/`);
    const picksData = await picksResponse.json();
    
    // Get live event data which has the most current points
    const liveDataResponse = await fetch(`https://fantasy.premierleague.com/api/event/${currentGameweek}/live/`);
    const liveData = await liveDataResponse.json();
    
    // Calculate total live points
    let totalPoints = 0;
    const picks = picksData.picks || [];
    
    // Add points from all players in the team
    picks.forEach((pick: any) => {
      const playerLiveData = liveData.elements.find((e: any) => e.id === pick.element);
      
      if (playerLiveData) {
        // For captain, double the points
        const multiplier = pick.multiplier || 1;
        totalPoints += playerLiveData.stats.total_points * multiplier;
      }
    });
    
    // Return most up-to-date points
    return NextResponse.json({
      entryId,
      gameweek: currentGameweek,
      livePoints: totalPoints,
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching live points:', error);
    return NextResponse.json(
      { error: 'Failed to fetch live points data' },
      { status: 500 }
    );
  }
}
