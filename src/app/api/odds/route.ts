import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const odds = await db.oddsMarket.findMany({
      include: { match: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(odds);
  } catch (error) {
    console.error('Error fetching odds:', error);
    return NextResponse.json({ error: 'Failed to fetch odds' }, { status: 500 });
  }
}
