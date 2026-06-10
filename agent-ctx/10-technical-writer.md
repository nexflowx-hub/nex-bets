---
Task ID: 10
Agent: Technical Writer
Task: Write comprehensive, professional technical README.md for NeX Bets in Portuguese (pt-BR)

Work Log:
- Read existing README.md to understand current format and structure
- Read prisma/schema.prisma: 6 models (User, Match, OddsMarket, Bet, Transaction, WinnerBet) with full field details and relationships
- Read src/types/index.ts: all TypeScript interfaces (Match, OddsMarket, BetSelection, MatchWithOdds, User, Transaction, Bet, WinnerBet), WORLD_CUP_TEAMS constant (56 teams), DATE_LABELS constant
- Read src/app/page.tsx: page assembly with 10 dynamic imports, auth/wallet overlay states, real-time polling (10s interval)
- Read package.json: all dependencies and scripts
- Read all 10 API route files to document exact request/response formats
- Read both Zustand stores (betSlip.ts and userStore.ts) for state management documentation
- Read all 10 nexbets components for component descriptions
- Wrote comprehensive README.md (~900 lines) in Portuguese (pt-BR) covering all 12 required sections

Stage Summary:
- README.md completely rewritten from ~694 lines to ~900+ lines of comprehensive documentation
- All content in Portuguese (pt-BR) as specified
- All 11 API endpoints documented with actual request/response JSON examples from source code
- Business logic diagrams explain bonus calculation, 2x promotion, and withdrawal debit order
- Database schema covers all 6 Prisma models with field types, defaults, and relationships
- Maintained existing format (badges, index, tables) while significantly expanding content
- Work record appended to worklog.md
