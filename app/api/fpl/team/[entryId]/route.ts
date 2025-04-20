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
    
    // Find the latest gameweek data to get current rank
    const latestGameweek = teamHistoryData.current?.length > 0 ? 
      teamHistoryData.current[teamHistoryData.current.length - 1] : null;
    
    // Combine the data
    const combinedData = {
      current: teamGameweekData,
      history: teamHistoryData,
      chips: teamHistoryData.chips || [],
      pastSeasons: teamHistoryData.past || [],
      teamInfo: {
        teamName: teamGameweekData.entry?.name || 'Unknown Team',
        playerName: teamGameweekData.entry?.player_name || 'Unknown Manager',
        teamValue,
        bank,
        totalValue: teamValue + bank,
        overallRank: latestGameweek?.overall_rank || teamHistoryData.entry?.overall_rank,
        gameweekPoints: teamGameweekData.entry_history?.points,
        totalPoints: latestGameweek?.total_points || teamHistoryData.entry?.total_points,
        gameweekRank: latestGameweek?.rank,
        startedGW: teamHistoryData.current?.[0]?.event || 1,
        transfers: teamGameweekData.entry_history?.event_transfers || 0,
        transferCost: teamGameweekData.entry_history?.event_transfers_cost || 0,
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
