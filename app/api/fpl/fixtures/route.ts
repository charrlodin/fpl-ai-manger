import { NextResponse } from 'next/server';
import { getFixtures } from '@/lib/fpl-api';

/**
 * API route to fetch FPL fixtures data
 */
export async function GET() {
  try {
    const data = await getFixtures();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching fixtures data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fixtures data' },
      { status: 500 }
    );
  }
}
