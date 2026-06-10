import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import type { BetSelection } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, selections, totalStake } = body;

    if (!userId || !selections || !Array.isArray(selections) || selections.length === 0 || typeof totalStake !== 'number' || totalStake <= 0) {
      return NextResponse.json(
        { success: false, error: 'userId, selections (non-empty array), and valid totalStake are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Calculate total odds (product of all selection odds)
    const totalOdds = selections.reduce((acc: number, sel: BetSelection) => acc * sel.odds, 1);

    // Calculate potential return
    const potentialReturn = totalOdds * totalStake;

    // Check sufficient balance
    if (user.balance < totalStake) {
      return NextResponse.json(
        { success: false, error: 'Saldo insuficiente para aposta' },
        { status: 400 }
      );
    }

    // Create bet record (selections stored as JSON string)
    const bet = await db.bet.create({
      data: {
        userId,
        selections: JSON.stringify(selections),
        totalOdds,
        totalStake,
        potentialReturn,
        status: 'pending',
        betType: 'match',
      },
    });

    // Create transaction for the bet
    await db.transaction.create({
      data: {
        userId,
        type: 'bet_place',
        amount: -totalStake,
        description: `Aposta #${bet.id} - R$ ${totalStake.toFixed(2)}`,
        status: 'confirmed',
      },
    });

    // Deduct from user balance
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        balance: user.balance - totalStake,
      },
    });

    return NextResponse.json({
      success: true,
      betId: bet.id,
      totalOdds,
      potentialReturn,
      newBalance: updatedUser.balance,
    });
  } catch (error) {
    console.error('Error placing bet:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
