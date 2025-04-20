import { NextRequest, NextResponse } from 'next/server';
import { getTeamHistory, getTeamData } from '@/lib/fpl-api';

/**
 * API route to fetch FPL team data for a specific entry ID
 */
export async function GET(request: NextRequest) {
  // Get entry ID from the URL path instead of params
  const pathname = request.nextUrl.pathname;
  const entryIdMatch = pathname.match(/\/api\/fpl\/team\/([\d]+)/);
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
    
    // Find the current gameweek (the first one that hasn't finished or is ongoing)
    const currentGameweek = bootstrapData.events.find((event: any) => 
      event.is_current === true
    )?.id || 1;
    
    console.log(`Fetching data for team ${entryId}, current gameweek: ${currentGameweek}`);
    
    // Fetch team data for current gameweek
    const teamGameweekData = await getTeamData(entryId, currentGameweek);
    
    // Fetch team history data
    const teamHistoryData = await getTeamHistory(entryId);
    
    // Get the team value from the picks
    const teamValue = teamGameweekData.entry_history?.value / 10 || 0;
    const bank = teamGameweekData.entry_history?.bank / 10 || 0;
    
    // Combine the data
    const combinedData = {
      current: teamGameweekData,
      history: teamHistoryData,
      teamInfo: {
        teamValue,
        bank,
        totalValue: teamValue + bank,
        overallRank: teamHistoryData.entry?.overall_rank,
        gameweekPoints: teamGameweekData.entry_history?.points,
        totalPoints: teamHistoryData.entry?.total_points,
        currentGameweek
      }
    };
    
    console.log('Team info:', combinedData.teamInfo);
    return NextResponse.json(combinedData);
  } catch (error) {
    console.error('Error fetching team data:', error);
    
    // Return error response instead of mock data
    return NextResponse.json(
      { error: 'Failed to fetch FPL data. Please try again or check your team ID.' },
      { status: 500 }
    );
  }
}
