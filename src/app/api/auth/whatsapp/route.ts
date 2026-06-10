import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { whatsapp, name } = body;

    if (!whatsapp || typeof whatsapp !== 'string') {
      return NextResponse.json(
        { success: false, error: 'WhatsApp number is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { whatsapp },
    });

    if (existingUser) {
      return NextResponse.json({
        success: true,
        user: {
          id: existingUser.id,
          whatsapp: existingUser.whatsapp,
          name: existingUser.name,
          balance: existingUser.balance,
          bonusBalance: existingUser.bonusBalance,
        },
      });
    }

    // Create new user with 0 balance
    const newUser = await db.user.create({
      data: {
        whatsapp,
        name: name || null,
        balance: 0,
        bonusBalance: 0,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        whatsapp: newUser.whatsapp,
        name: newUser.name,
        balance: newUser.balance,
        bonusBalance: newUser.bonusBalance,
      },
    });
  } catch (error) {
    console.error('Error in WhatsApp auth:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
