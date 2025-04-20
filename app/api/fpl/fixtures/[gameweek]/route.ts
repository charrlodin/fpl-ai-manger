import { NextRequest, NextResponse } from 'next/server';
import { getFixtures } from '@/lib/fpl-api';

/**
 * API route to fetch fixtures for a specific gameweek
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { gameweek: string } }
) {
  const gameweek = parseInt(params.gameweek);
  
  if (isNaN(gameweek)) {
    return NextResponse.json(
      { error: 'Invalid gameweek' },
      { status: 400 }
    );
  }
  
  try {
    const data = await getFixtures(gameweek);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching fixtures for gameweek ${gameweek}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch fixtures data' },
      { status: 500 }
    );
  }
}
