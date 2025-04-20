import { NextResponse } from 'next/server';
import { getBootstrapData } from '@/lib/fpl-api';

/**
 * API route to fetch FPL bootstrap data
 */
export async function GET() {
  try {
    const data = await getBootstrapData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching bootstrap data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FPL data' },
      { status: 500 }
    );
  }
}
