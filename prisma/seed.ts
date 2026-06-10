import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface MatchSeed {
  homeTeam: string;
  awayTeam: string;
  round: string;
  date: string;
  time: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  status?: string;
  homeScore?: number;
  awayScore?: number;
}

const matchesData: MatchSeed[] = [
  // === June 11 (Thursday) ===
  { homeTeam: 'México', awayTeam: 'África do Sul', round: 'Fase de Grupos - R1', date: '2026-06-11', time: '16:00', homeOdds: 1.43, drawOdds: 4.45, awayOdds: 8.30 },
  { homeTeam: 'Coreia do Sul', awayTeam: 'República Tcheca', round: 'Fase de Grupos - R1', date: '2026-06-11', time: '23:00', homeOdds: 2.67, drawOdds: 3.10, awayOdds: 2.92 },

  // === June 12 (Friday) ===
  { homeTeam: 'Canadá', awayTeam: 'Bósnia e Herzegovina', round: 'Fase de Grupos - R1', date: '2026-06-12', time: '16:00', homeOdds: 1.85, drawOdds: 3.60, awayOdds: 4.50 },
  { homeTeam: 'EUA', awayTeam: 'Paraguai', round: 'Fase de Grupos - R1', date: '2026-06-12', time: '22:00', homeOdds: 2.02, drawOdds: 3.40, awayOdds: 4.00 },

  // === June 13 (Saturday) ===
  { homeTeam: 'Catar', awayTeam: 'Suíça', round: 'Fase de Grupos - R1', date: '2026-06-13', time: '16:00', homeOdds: 12.00, drawOdds: 6.60, awayOdds: 1.23 },
  { homeTeam: 'Brasil', awayTeam: 'Marrocos', round: 'Fase de Grupos - R1', date: '2026-06-13', time: '19:00', homeOdds: 1.68, drawOdds: 3.75, awayOdds: 5.50 },
  { homeTeam: 'Haiti', awayTeam: 'Escócia', round: 'Fase de Grupos - R1', date: '2026-06-13', time: '22:00', homeOdds: 5.90, drawOdds: 4.25, awayOdds: 1.56 },

  // === June 14 (Sunday) ===
  { homeTeam: 'Austrália', awayTeam: 'Turquia', round: 'Fase de Grupos - R1', date: '2026-06-14', time: '01:00', homeOdds: 5.00, drawOdds: 3.80, awayOdds: 1.73 },
  { homeTeam: 'Alemanha', awayTeam: 'Curaçao', round: 'Fase de Grupos - R1', date: '2026-06-14', time: '14:00', homeOdds: 1.04, drawOdds: 19.00, awayOdds: 60.00 },
  { homeTeam: 'Países Baixos', awayTeam: 'Japão', round: 'Fase de Grupos - R1', date: '2026-06-14', time: '17:00', homeOdds: 2.02, drawOdds: 3.60, awayOdds: 3.65 },
  { homeTeam: 'Costa do Marfim', awayTeam: 'Equador', round: 'Fase de Grupos - R1', date: '2026-06-14', time: '20:00', homeOdds: 3.60, drawOdds: 2.80, awayOdds: 2.45 },
  { homeTeam: 'Suécia', awayTeam: 'Tunísia', round: 'Fase de Grupos - R1', date: '2026-06-14', time: '23:00', homeOdds: 1.92, drawOdds: 3.45, awayOdds: 4.35 },

  // === June 15 (Monday) ===
  { homeTeam: 'Espanha', awayTeam: 'Cabo Verde', round: 'Fase de Grupos - R1', date: '2026-06-15', time: '13:00', homeOdds: 1.11, drawOdds: 10.00, awayOdds: 22.00 },
  { homeTeam: 'Bélgica', awayTeam: 'Egito', round: 'Fase de Grupos - R1', date: '2026-06-15', time: '16:00', homeOdds: 1.69, drawOdds: 3.80, awayOdds: 5.30 },
  { homeTeam: 'Arábia Saudita', awayTeam: 'Uruguai', round: 'Fase de Grupos - R1', date: '2026-06-15', time: '19:00', homeOdds: 7.80, drawOdds: 4.50, awayOdds: 1.44 },
  { homeTeam: 'Irã', awayTeam: 'Nova Zelândia', round: 'Fase de Grupos - R1', date: '2026-06-15', time: '22:00', homeOdds: 1.92, drawOdds: 3.40, awayOdds: 4.40 },

  // === June 16 (Tuesday) ===
  { homeTeam: 'França', awayTeam: 'Senegal', round: 'Fase de Grupos - R1', date: '2026-06-16', time: '16:00', homeOdds: 1.46, drawOdds: 4.45, awayOdds: 7.50 },
  { homeTeam: 'Iraque', awayTeam: 'Noruega', round: 'Fase de Grupos - R1', date: '2026-06-16', time: '19:00', homeOdds: 13.00, drawOdds: 6.80, awayOdds: 1.22 },
  { homeTeam: 'Argentina', awayTeam: 'Argélia', round: 'Fase de Grupos - R1', date: '2026-06-16', time: '22:00', homeOdds: 1.41, drawOdds: 4.65, awayOdds: 8.40 },

  // === June 17 (Wednesday) ===
  { homeTeam: 'Áustria', awayTeam: 'Jordânia', round: 'Fase de Grupos - R1', date: '2026-06-17', time: '01:00', homeOdds: 1.33, drawOdds: 5.45, awayOdds: 9.00 },
  { homeTeam: 'Portugal', awayTeam: 'RD do Congo', round: 'Fase de Grupos - R1', date: '2026-06-17', time: '14:00', homeOdds: 1.29, drawOdds: 5.65, awayOdds: 11.00 },
  { homeTeam: 'Inglaterra', awayTeam: 'Croácia', round: 'Fase de Grupos - R1', date: '2026-06-17', time: '17:00', homeOdds: 1.76, drawOdds: 3.75, awayOdds: 4.85 },
  { homeTeam: 'Gana', awayTeam: 'Panamá', round: 'Fase de Grupos - R1', date: '2026-06-17', time: '20:00', homeOdds: 2.07, drawOdds: 3.50, awayOdds: 3.60 },
  { homeTeam: 'Uzbequistão', awayTeam: 'Colômbia', round: 'Fase de Grupos - R1', date: '2026-06-17', time: '23:00', homeOdds: 8.20, drawOdds: 4.50, awayOdds: 1.43 },

  // === June 18 (Thursday) ===
  { homeTeam: 'República Tcheca', awayTeam: 'África do Sul', round: 'Fase de Grupos - R2', date: '2026-06-18', time: '13:00', homeOdds: 1.97, drawOdds: 3.35, awayOdds: 4.20 },
  { homeTeam: 'Suíça', awayTeam: 'Bósnia e Herzegovina', round: 'Fase de Grupos - R2', date: '2026-06-18', time: '16:00', homeOdds: 1.64, drawOdds: 4.10, awayOdds: 5.30 },
  { homeTeam: 'Canadá', awayTeam: 'Catar', round: 'Fase de Grupos - R2', date: '2026-06-18', time: '19:00', homeOdds: 1.32, drawOdds: 5.25, awayOdds: 10.00 },
  { homeTeam: 'México', awayTeam: 'Coreia do Sul', round: 'Fase de Grupos - R2', date: '2026-06-18', time: '22:00', homeOdds: 1.85, drawOdds: 3.55, awayOdds: 4.60 },

  // === June 19 (Friday) ===
  { homeTeam: 'EUA', awayTeam: 'Austrália', round: 'Fase de Grupos - R2', date: '2026-06-19', time: '16:00', homeOdds: 1.77, drawOdds: 4.00, awayOdds: 4.45 },
  { homeTeam: 'Escócia', awayTeam: 'Marrocos', round: 'Fase de Grupos - R2', date: '2026-06-19', time: '19:00', homeOdds: 4.25, drawOdds: 3.25, awayOdds: 2.02 },
  { homeTeam: 'Brasil', awayTeam: 'Haiti', round: 'Fase de Grupos - R2', date: '2026-06-19', time: '21:30', homeOdds: 1.09, drawOdds: 11.00, awayOdds: 33.00 },

  // === June 20 (Saturday) ===
  { homeTeam: 'Turquia', awayTeam: 'Paraguai', round: 'Fase de Grupos - R2', date: '2026-06-20', time: '00:00', homeOdds: 2.25, drawOdds: 3.15, awayOdds: 3.55 },
  { homeTeam: 'Países Baixos', awayTeam: 'Suécia', round: 'Fase de Grupos - R2', date: '2026-06-20', time: '14:00', homeOdds: 1.63, drawOdds: 4.15, awayOdds: 5.25 },
  { homeTeam: 'Alemanha', awayTeam: 'Costa do Marfim', round: 'Fase de Grupos - R2', date: '2026-06-20', time: '17:00', homeOdds: 1.58, drawOdds: 4.35, awayOdds: 5.50 },
  { homeTeam: 'Equador', awayTeam: 'Curaçao', round: 'Fase de Grupos - R2', date: '2026-06-20', time: '21:00', homeOdds: 1.21, drawOdds: 7.40, awayOdds: 12.00 },

  // === June 21 (Sunday) ===
  { homeTeam: 'Tunísia', awayTeam: 'Japão', round: 'Fase de Grupos - R2', date: '2026-06-21', time: '01:00', homeOdds: 5.35, drawOdds: 3.55, awayOdds: 1.74 },
  { homeTeam: 'Espanha', awayTeam: 'Arábia Saudita', round: 'Fase de Grupos - R2', date: '2026-06-21', time: '13:00', homeOdds: 1.11, drawOdds: 10.00, awayOdds: 21.00 },
  { homeTeam: 'Bélgica', awayTeam: 'Irã', round: 'Fase de Grupos - R2', date: '2026-06-21', time: '16:00', homeOdds: 1.42, drawOdds: 4.65, awayOdds: 8.00 },
  { homeTeam: 'Uruguai', awayTeam: 'Cabo Verde', round: 'Fase de Grupos - R2', date: '2026-06-21', time: '19:00', homeOdds: 1.45, drawOdds: 4.45, awayOdds: 7.60 },
  { homeTeam: 'Nova Zelândia', awayTeam: 'Egito', round: 'Fase de Grupos - R2', date: '2026-06-21', time: '22:00', homeOdds: 4.45, drawOdds: 3.90, awayOdds: 1.78 },

  // === June 22 (Monday) ===
  { homeTeam: 'Argentina', awayTeam: 'Áustria', round: 'Fase de Grupos - R2', date: '2026-06-22', time: '14:00', homeOdds: 1.65, drawOdds: 3.80, awayOdds: 5.70 },
  { homeTeam: 'França', awayTeam: 'Iraque', round: 'Fase de Grupos - R2', date: '2026-06-22', time: '18:00', homeOdds: 1.12, drawOdds: 8.20, awayOdds: 32.00 },
  { homeTeam: 'Noruega', awayTeam: 'Senegal', round: 'Fase de Grupos - R2', date: '2026-06-22', time: '21:00', homeOdds: 2.17, drawOdds: 3.50, awayOdds: 3.35 },

  // === June 23 (Tuesday) ===
  { homeTeam: 'Jordânia', awayTeam: 'Argélia', round: 'Fase de Grupos - R2', date: '2026-06-23', time: '00:00', homeOdds: 6.40, drawOdds: 4.25, awayOdds: 1.54 },
  { homeTeam: 'Portugal', awayTeam: 'Uzbequistão', round: 'Fase de Grupos - R2', date: '2026-06-23', time: '14:00', homeOdds: 1.25, drawOdds: 6.40, awayOdds: 11.00 },
  { homeTeam: 'Inglaterra', awayTeam: 'Gana', round: 'Fase de Grupos - R2', date: '2026-06-23', time: '17:00', homeOdds: 1.31, drawOdds: 5.65, awayOdds: 9.40 },
  { homeTeam: 'Panamá', awayTeam: 'Croácia', round: 'Fase de Grupos - R2', date: '2026-06-23', time: '20:00', homeOdds: 6.50, drawOdds: 3.90, awayOdds: 1.58 },
  { homeTeam: 'Colômbia', awayTeam: 'RD do Congo', round: 'Fase de Grupos - R2', date: '2026-06-23', time: '23:00', homeOdds: 1.47, drawOdds: 4.30, awayOdds: 7.50 },

  // === June 24 (Wednesday) ===
  { homeTeam: 'Suíça', awayTeam: 'Canadá', round: 'Fase de Grupos - R3', date: '2026-06-24', time: '16:00', homeOdds: 2.15, drawOdds: 3.35, awayOdds: 3.55 },
  { homeTeam: 'Bósnia e Herzegovina', awayTeam: 'Catar', round: 'Fase de Grupos - R3', date: '2026-06-24', time: '16:00', homeOdds: 1.57, drawOdds: 4.00, awayOdds: 6.20 },
  { homeTeam: 'Escócia', awayTeam: 'Brasil', round: 'Fase de Grupos - R3', date: '2026-06-24', time: '19:00', homeOdds: 5.80, drawOdds: 5.15, awayOdds: 1.48 },
  { homeTeam: 'Marrocos', awayTeam: 'Haiti', round: 'Fase de Grupos - R3', date: '2026-06-24', time: '19:00', homeOdds: 1.35, drawOdds: 5.15, awayOdds: 9.10 },
  { homeTeam: 'África do Sul', awayTeam: 'Coreia do Sul', round: 'Fase de Grupos - R3', date: '2026-06-24', time: '22:00', homeOdds: 4.20, drawOdds: 3.40, awayOdds: 1.97 },
  { homeTeam: 'República Tcheca', awayTeam: 'México', round: 'Fase de Grupos - R3', date: '2026-06-24', time: '22:00', homeOdds: 4.70, drawOdds: 3.60, awayOdds: 1.80 },

  // === June 25 (Thursday) ===
  { homeTeam: 'Equador', awayTeam: 'Alemanha', round: 'Fase de Grupos - R3', date: '2026-06-25', time: '17:00', homeOdds: 4.60, drawOdds: 3.75, awayOdds: 1.76 },
  { homeTeam: 'Curaçao', awayTeam: 'Costa do Marfim', round: 'Fase de Grupos - R3', date: '2026-06-25', time: '17:00', homeOdds: 11.00, drawOdds: 6.50, awayOdds: 1.23 },
  { homeTeam: 'Tunísia', awayTeam: 'Países Baixos', round: 'Fase de Grupos - R3', date: '2026-06-25', time: '20:00', homeOdds: 6.40, drawOdds: 4.30, awayOdds: 1.50 },
  { homeTeam: 'Japão', awayTeam: 'Suécia', round: 'Fase de Grupos - R3', date: '2026-06-25', time: '20:00', homeOdds: 2.10, drawOdds: 3.35, awayOdds: 3.60 },
  { homeTeam: 'Paraguai', awayTeam: 'Austrália', round: 'Fase de Grupos - R3', date: '2026-06-25', time: '23:00', homeOdds: 2.17, drawOdds: 3.15, awayOdds: 3.65 },
  { homeTeam: 'Turquia', awayTeam: 'EUA', round: 'Fase de Grupos - R3', date: '2026-06-25', time: '23:00', homeOdds: 2.65, drawOdds: 3.50, awayOdds: 2.57 },

  // === June 26 (Friday) ===
  { homeTeam: 'Senegal', awayTeam: 'Iraque', round: 'Fase de Grupos - R3', date: '2026-06-26', time: '16:00', homeOdds: 1.43, drawOdds: 4.50, awayOdds: 7.50 },
  { homeTeam: 'Noruega', awayTeam: 'França', round: 'Fase de Grupos - R3', date: '2026-06-26', time: '16:00', homeOdds: 4.30, drawOdds: 3.55, awayOdds: 1.85 },
  { homeTeam: 'Cabo Verde', awayTeam: 'Arábia Saudita', round: 'Fase de Grupos - R3', date: '2026-06-26', time: '21:00', homeOdds: 2.55, drawOdds: 3.40, awayOdds: 2.75 },
  { homeTeam: 'Uruguai', awayTeam: 'Espanha', round: 'Fase de Grupos - R3', date: '2026-06-26', time: '21:00', homeOdds: 5.35, drawOdds: 3.90, awayOdds: 1.64 },

  // === June 27 (Saturday) ===
  { homeTeam: 'Nova Zelândia', awayTeam: 'Bélgica', round: 'Fase de Grupos - R3', date: '2026-06-27', time: '00:00', homeOdds: 9.40, drawOdds: 5.85, awayOdds: 1.28 },
  { homeTeam: 'Egito', awayTeam: 'Irã', round: 'Fase de Grupos - R3', date: '2026-06-27', time: '00:00', homeOdds: 2.27, drawOdds: 3.00, awayOdds: 3.60 },
  { homeTeam: 'Panamá', awayTeam: 'Inglaterra', round: 'Fase de Grupos - R3', date: '2026-06-27', time: '18:00', homeOdds: 7.70, drawOdds: 6.50, awayOdds: 1.30 },
  { homeTeam: 'Croácia', awayTeam: 'Gana', round: 'Fase de Grupos - R3', date: '2026-06-27', time: '18:00', homeOdds: 1.64, drawOdds: 3.80, awayOdds: 5.60 },
  { homeTeam: 'RD do Congo', awayTeam: 'Uzbequistão', round: 'Fase de Grupos - R3', date: '2026-06-27', time: '20:30', homeOdds: 2.35, drawOdds: 3.30, awayOdds: 3.15 },
  { homeTeam: 'Colômbia', awayTeam: 'Portugal', round: 'Fase de Grupos - R3', date: '2026-06-27', time: '20:30', homeOdds: 3.55, drawOdds: 3.25, awayOdds: 2.17 },
  { homeTeam: 'Jordânia', awayTeam: 'Argentina', round: 'Fase de Grupos - R3', date: '2026-06-27', time: '23:00', homeOdds: 13.00, drawOdds: 7.10, awayOdds: 1.19 },
  { homeTeam: 'Argélia', awayTeam: 'Áustria', round: 'Fase de Grupos - R3', date: '2026-06-27', time: '23:00', homeOdds: 3.85, drawOdds: 3.00, awayOdds: 2.17 },
];

// All unique teams for winner betting
const allTeams = [
  'Argentina', 'Brasil', 'França', 'Alemanha', 'Espanha', 'Inglaterra', 'Portugal',
  'Bélgica', 'Países Baixos', 'Croácia', 'Suíça', 'Itália', 'Uruguai', 'Colômbia',
  'México', 'EUA', 'Canadá', 'Japão', 'Coreia do Sul', 'Austrália', 'Marrocos',
  'Senegal', 'Nigéria', 'Gana', 'Camarões', 'Costa do Marfim', 'Arábia Saudita',
  'Irã', 'Equador', 'Peru', 'Chile', 'Dinamarca', 'Suécia', 'Polónia', 'Sérvia',
  'Áustria', 'Escócia', 'Turquia', 'República Tcheca', 'Noruega', 'Uzbequistão',
  'Tunísia', 'Argélia', 'Egito', 'Cabo Verde', 'RD do Congo', 'Panamá',
  'Haiti', 'Nova Zelândia', 'Paraguai', 'Catar', 'Iraque', 'Jordânia',
  'África do Sul', 'Bósnia e Herzegovina', 'Curaçao'
];

async function main() {
  console.log('🌱 Seeding NeX Bets database...\n');

  // Clean existing data
  await prisma.winnerBet.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.bet.deleteMany();
  await prisma.user.deleteMany();
  await prisma.oddsMarket.deleteMany();
  await prisma.match.deleteMany();

  for (const m of matchesData) {
    const match = await prisma.match.create({
      data: {
        homeTeam: m.homeTeam,
        awayTeam: m.awayTeam,
        homeScore: m.homeScore || 0,
        awayScore: m.awayScore || 0,
        status: m.status || 'upcoming',
        round: m.round,
        date: m.date,
        time: m.time,
      },
    });

    await prisma.oddsMarket.create({
      data: {
        matchId: match.id,
        type: 'h2h',
        label: 'Resultado Final',
        homeOdds: m.homeOdds,
        drawOdds: m.drawOdds,
        awayOdds: m.awayOdds,
      },
    });

    console.log(`  ✅ ${m.date} ${m.time} | ${m.homeTeam} vs ${m.awayTeam} [${m.homeOdds} / ${m.drawOdds} / ${m.awayOdds}]`);
  }

  const totalMatches = await prisma.match.count();
  const totalOdds = await prisma.oddsMarket.count();
  console.log(`\n🎉 Seed complete: ${totalMatches} matches, ${totalOdds} odds markets`);
  console.log(`🌍 ${allTeams.length} teams available for winner betting`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
