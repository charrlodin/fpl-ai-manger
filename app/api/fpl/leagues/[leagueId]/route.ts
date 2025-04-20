import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to fetch FPL league standings
 */
export async function GET(request: NextRequest) {
  // Get league ID from the URL path
  const pathname = request.nextUrl.pathname;
  const leagueIdMatch = pathname.match(/\/api\/fpl\/leagues\/([\d]+)/);
  const leagueIdString = leagueIdMatch ? leagueIdMatch[1] : '';
  const leagueId = parseInt(leagueIdString);

  if (isNaN(leagueId)) {
    return NextResponse.json(
      { error: 'Invalid league ID' },
      { status: 400 }
    );
  }

  // Get page from query params (defaults to 1)
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  
  try {
    // Fetch league data from FPL API
    const response = await fetch(`https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/?page=${page}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch league data: ${response.status}`);
    }
    
    const leagueData = await response.json();
    
    return NextResponse.json(leagueData);
  } catch (error) {
    console.error('Error fetching league data:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch league data' },
      { status: 500 }
    );
  }
}
