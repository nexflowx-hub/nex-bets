import { NextResponse } from 'next/server';
import { WORLD_CUP_TEAMS } from '@/types';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      teams: WORLD_CUP_TEAMS,
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
