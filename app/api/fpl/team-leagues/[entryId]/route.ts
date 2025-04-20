import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to fetch leagues for a specific FPL team
 */
export async function GET(request: NextRequest) {
  // Get entry ID from the URL path
  const pathname = request.nextUrl.pathname;
  const entryIdMatch = pathname.match(/\/api\/fpl\/team-leagues\/([\d]+)/);
  const entryIdString = entryIdMatch ? entryIdMatch[1] : '';
  const entryId = parseInt(entryIdString);

  if (isNaN(entryId)) {
    return NextResponse.json(
      { error: 'Invalid entry ID' },
      { status: 400 }
    );
  }
  
  try {
    // Fetch team data to get leagues
    const response = await fetch(`https://fantasy.premierleague.com/api/entry/${entryId}/`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch team data: ${response.status}`);
    }
    
    const teamData = await response.json();
    
    // Extract leagues data
    const leagues = {
      classic: teamData.leagues?.classic || [],
      h2h: teamData.leagues?.h2h || [],
      cup: teamData.leagues?.cup || null,
      cup_matches: teamData.leagues?.cup_matches || []
    };
    
    return NextResponse.json(leagues);
  } catch (error) {
    console.error('Error fetching team leagues:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch team leagues' },
      { status: 500 }
    );
  }
}
