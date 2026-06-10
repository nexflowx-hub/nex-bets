import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, amount, pixKey } = body;

    if (!userId || typeof amount !== 'number' || amount <= 0 || !pixKey) {
      return NextResponse.json(
        { success: false, error: 'userId, valid amount, and pixKey are required' },
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

    // Check sufficient balance (balance + bonusBalance >= amount)
    const totalAvailable = user.balance + user.bonusBalance;
    if (totalAvailable < amount) {
      return NextResponse.json(
        { success: false, error: 'Saldo insuficiente para saque' },
        { status: 400 }
      );
    }

    // Generate PIX code for withdrawal
    const pixCode = `PIX_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // Calculate how much to deduct from each balance
    let newBalance = user.balance;
    let newBonusBalance = user.bonusBalance;

    // Use bonusBalance first, then balance
    if (newBonusBalance > 0) {
      const bonusUsed = Math.min(newBonusBalance, amount);
      newBonusBalance -= bonusUsed;
      const remaining = amount - bonusUsed;
      if (remaining > 0) {
        newBalance -= remaining;
      }
    } else {
      newBalance -= amount;
    }

    // Create withdrawal transaction
    await db.transaction.create({
      data: {
        userId,
        type: 'withdrawal',
        amount: -amount,
        description: `Saque via PIX - R$ ${amount.toFixed(2)} para chave ${pixKey}`,
        pixCode,
        status: 'confirmed',
      },
    });

    // Update user balance
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        balance: newBalance,
        bonusBalance: newBonusBalance,
      },
    });

    return NextResponse.json({
      success: true,
      newBalance: updatedUser.balance,
      newBonusBalance: updatedUser.bonusBalance,
      pixCode,
      amount,
    });
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
