import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding NeX Bets database...\n');

  // Clean existing data
  await prisma.oddsMarket.deleteMany();
  await prisma.match.deleteMany();

  const matches = [
    // Group Stage - Group A
    { homeTeam: 'México', awayTeam: 'EUA', round: 'Fase de Grupos - A', date: '2026-06-11', venue: 'Estadio Azteca' },
    { homeTeam: 'Canadá', awayTeam: 'Jamaica', round: 'Fase de Grupos - A', date: '2026-06-11', venue: 'BMO Field' },
    { homeTeam: 'México', awayTeam: 'Canadá', round: 'Fase de Grupos - A', date: '2026-06-17', venue: 'Estadio Azteca' },
    // Group Stage - Group B
    { homeTeam: 'Argentina', awayTeam: 'Brasil', round: 'Fase de Grupos - B', date: '2026-06-12', venue: 'SoFi Stadium' },
    { homeTeam: 'Colômbia', awayTeam: 'Paraguai', round: 'Fase de Grupos - B', date: '2026-06-12', venue: 'MetLife Stadium' },
    { homeTeam: 'Argentina', awayTeam: 'Colômbia', round: 'Fase de Grupos - B', date: '2026-06-18', venue: 'SoFi Stadium' },
    // Group Stage - Group C
    { homeTeam: 'França', awayTeam: 'Alemanha', round: 'Fase de Grupos - C', date: '2026-06-13', venue: 'AT&T Stadium' },
    { homeTeam: 'Espanha', awayTeam: 'Inglaterra', round: 'Fase de Grupos - C', date: '2026-06-13', venue: 'Lumen Field' },
    { homeTeam: 'França', awayTeam: 'Espanha', round: 'Fase de Grupos - C', date: '2026-06-19', venue: 'AT&T Stadium' },
    // Round of 16
    { homeTeam: 'Brasil', awayTeam: 'Alemanha', round: 'Oitavos de Final', date: '2026-06-27', venue: 'MetLife Stadium', status: 'live', homeScore: 2, awayScore: 1 },
    // Quarter Finals
    { homeTeam: 'Argentina', awayTeam: 'França', round: 'Quartos de Final', date: '2026-07-04', venue: 'SoFi Stadium', status: 'live', homeScore: 1, awayScore: 1 },
    // Semi Finals
    { homeTeam: 'EUA', awayTeam: 'Espanha', round: 'Meias-Finais', date: '2026-07-09', venue: 'AT&T Stadium', status: 'live', homeScore: 0, awayScore: 1 },
    // Final
    { homeTeam: 'Argentina', awayTeam: 'Espanha', round: 'Final', date: '2026-07-12', venue: 'MetLife Stadium' },
    // 3rd Place
    { homeTeam: 'França', awayTeam: 'EUA', round: '3º Lugar', date: '2026-07-11', venue: 'SoFi Stadium' },
  ];

  const oddsTemplates = [
    { type: 'h2h', label: 'Vencedor' },
    { type: 'over_under_2.5', label: 'Golos 2.5' },
    { type: 'btts', label: 'Ambas Marcam' },
  ];

  for (const matchData of matches) {
    const match = await prisma.match.create({
      data: {
        homeTeam: matchData.homeTeam,
        awayTeam: matchData.awayTeam,
        homeScore: matchData.homeScore || 0,
        awayScore: matchData.awayScore || 0,
        status: matchData.status || 'upcoming',
        round: matchData.round,
        date: matchData.date,
        venue: matchData.venue || '',
      },
    });

    for (const template of oddsTemplates) {
      const r = () => Math.random() * 3 + 1.1;
      const oddsData: Record<string, number> = { matchId: match.id, type: template.type, label: template.label };

      if (template.type === 'h2h') {
        oddsData.homeOdds = parseFloat(r().toFixed(2));
        oddsData.drawOdds = parseFloat((r() + 0.5).toFixed(2));
        oddsData.awayOdds = parseFloat(r().toFixed(2));
      } else if (template.type === 'over_under_2.5') {
        oddsData.overOdds = parseFloat(r().toFixed(2));
        oddsData.underOdds = parseFloat(r().toFixed(2));
      } else if (template.type === 'btts') {
        oddsData.yesOdds = parseFloat(r().toFixed(2));
        oddsData.noOdds = parseFloat((r() + 0.3).toFixed(2));
      }

      await prisma.oddsMarket.create({ data: oddsData });
    }

    console.log(`  ✅ ${matchData.homeTeam} vs ${matchData.awayTeam} (${matchData.round})`);
  }

  const totalMatches = await prisma.match.count();
  const totalOdds = await prisma.oddsMarket.count();
  console.log(`\n🎉 Seed complete: ${totalMatches} matches, ${totalOdds} odds markets`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
