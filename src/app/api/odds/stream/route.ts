import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const matches = await db.match.findMany({
      include: { odds: true },
      orderBy: { date: 'asc' },
    });
    return NextResponse.json(matches);
  } catch (error) {
    console.error('Error fetching stream data:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
