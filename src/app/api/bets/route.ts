import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      playerName,
      whatsapp,
      email,
      cpf,
      championTeam,
      championStake,
      championOdd,
      matchSelections,
      matchesStake,
      totalInvestment,
      totalPotential,
    } = body;

    if (!playerName || !whatsapp || !championTeam) {
      return NextResponse.json(
        { error: 'Nome, WhatsApp e seleção de campeão são obrigatórios.' },
        { status: 400 }
      );
    }

    const selectedMatchKeys = Object.keys(matchSelections || {});
    let matchesTotalOdd = selectedMatchKeys.length > 0 ? 1 : 0;

    // We recalculate on server side for security
    const { groupStageMatches } = await import('@/lib/data');
    const { CHAMPION_BONUS, MATCH_BONUS_THRESHOLD, MATCH_BONUS_MULTIPLIER } = await import('@/lib/data');

    selectedMatchKeys.forEach((matchId: string) => {
      const match = groupStageMatches.find((m) => m.id === matchId);
      if (match) {
        const sel = matchSelections[matchId];
        matchesTotalOdd *= match.odds[sel as keyof typeof match.odds] || 1;
      }
    });

    const isMatchesBonusActive = matchesStake >= MATCH_BONUS_THRESHOLD;
    const finalMatchesOdd = isMatchesBonusActive
      ? matchesTotalOdd * MATCH_BONUS_MULTIPLIER
      : matchesTotalOdd;
    const matchesPotential =
      selectedMatchKeys.length > 0 ? matchesStake * finalMatchesOdd : 0;

    const serverTotalPotential =
      championStake * championOdd * CHAMPION_BONUS + matchesPotential;

    const pixCode = `00020126580014br.gov.bcb.pix0136bolao-copa-2026-${Date.now()}5204000053039865802BR5925Bolao Copa 20266009Sao Paulo62140510BOLAO20266304${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const bet = await db.bet.create({
      data: {
        playerName,
        whatsapp,
        email: email || null,
        cpf: cpf || null,
        championTeam,
        championStake: Number(championStake),
        championOdd: Number(championOdd),
        championBonus: CHAMPION_BONUS,
        matchSelections: JSON.stringify(matchSelections || {}),
        matchesStake: Number(matchesStake) || 0,
        matchesTotalOdd: Number(finalMatchesOdd) || 0,
        matchesBonus: isMatchesBonusActive ? MATCH_BONUS_MULTIPLIER : 1,
        totalInvestment: Number(totalInvestment),
        totalPotential: Number(serverTotalPotential),
        status: 'pending',
        pixCode,
      },
    });

    return NextResponse.json(
      {
        success: true,
        betId: bet.id,
        pixCode,
        totalInvestment: bet.totalInvestment,
        totalPotential: bet.totalPotential,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating bet:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar aposta.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bets = await db.bet.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ bets });
  } catch (error) {
    console.error('Error fetching bets:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar apostas.' },
      { status: 500 }
    );
  }
}