import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, team, amount } = body;

    if (!userId || !team || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'userId, team, and valid amount are required' },
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

    // PROMOTION: betValue = amount * 2 (doubled value)
    const betValue = amount * 2;

    // Check sufficient balance for the amount (NOT the doubled value)
    if (user.balance < amount) {
      return NextResponse.json(
        { success: false, error: 'Saldo insuficiente para aposta' },
        { status: 400 }
      );
    }

    // Create winner bet record
    const winnerBet = await db.winnerBet.create({
      data: {
        userId,
        team,
        amount,
        betValue,
        status: 'active',
      },
    });

    // Create transaction for the bet
    await db.transaction.create({
      data: {
        userId,
        type: 'bet_place',
        amount: -amount,
        description: `Aposta Vencedor: ${team} - R$ ${amount.toFixed(2)} (Valor dobrado: R$ ${betValue.toFixed(2)})`,
        status: 'confirmed',
      },
    });

    // Deduct from user balance
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        balance: user.balance - amount,
      },
    });

    return NextResponse.json({
      success: true,
      winnerBetId: winnerBet.id,
      team,
      amount,
      betValue,
      newBalance: updatedUser.balance,
    });
  } catch (error) {
    console.error('Error placing winner bet:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
