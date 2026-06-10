import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, amount } = body;

    if (!userId || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'userId and valid amount are required' },
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

    // Generate PIX code
    const pixCode = `PIX_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // Check if bonus applies (deposit >= 100)
    const bonusApplied = amount >= 100;
    const bonusAmount = bonusApplied ? 50 : 0;

    // Create deposit transaction
    await db.transaction.create({
      data: {
        userId,
        type: 'deposit',
        amount: amount,
        description: `Depósito via PIX - R$ ${amount.toFixed(2)}`,
        pixCode,
        status: 'confirmed',
      },
    });

    // Create bonus transaction if applicable
    if (bonusApplied) {
      await db.transaction.create({
        data: {
          userId,
          type: 'bonus',
          amount: bonusAmount,
          description: `Bônus de primeira aposta - R$ ${bonusAmount.toFixed(2)}`,
          status: 'confirmed',
        },
      });
    }

    // Update user balance
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        balance: user.balance + amount,
        bonusBalance: user.bonusBalance + bonusAmount,
      },
    });

    return NextResponse.json({
      success: true,
      newBalance: updatedUser.balance,
      newBonusBalance: updatedUser.bonusBalance,
      bonusApplied,
      bonusAmount,
      pixCode,
    });
  } catch (error) {
    console.error('Error processing deposit:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
