---
Task ID: 4
Agent: Backend API Developer
Task: Create all backend API routes for auth, wallet, bets, winner-bets, and teams

Work Log:
- Read existing codebase: prisma schema, types, db client, matches API example
- Created 10 API route files covering all platform backend functionality
- Auth: POST /api/auth/whatsapp - login/register by WhatsApp number with auto-create
- Wallet: GET /api/wallet/balance - retrieve user balance and bonus balance
- Wallet: POST /api/wallet/deposit - deposit via PIX with bonus logic (≥R$100 gets R$50 bonus)
- Wallet: POST /api/wallet/withdraw - withdraw via PIX, uses bonusBalance first then balance
- Wallet: GET /api/wallet/transactions - transaction history (last 50, newest first)
- Bets: POST /api/bets/place - place match bets with multi-selection, odds calculation, balance check
- Bets: GET /api/bets/history - bet history (last 20 bets, newest first)
- Winner Bets: POST /api/winner-bet/place - place winner bets with 2x promotion (betValue = amount * 2)
- Winner Bets: GET /api/winner-bet/history - winner bet history
- Teams: GET /api/teams - return all World Cup teams for winner betting
- All routes use NextResponse.json(), NextRequest for POST bodies, try/catch error handling
- All currency values in BRL (R$), Portuguese error messages where appropriate
- Lint passed with no errors, dev server compiling successfully

Stage Summary:
- 10 API route files created covering auth, wallet (4 routes), bets (2 routes), winner-bets (2 routes), teams (1 route)
- All routes follow consistent patterns: input validation, error handling, JSON responses
- Bonus logic: deposit ≥ R$100 triggers R$50 bonus to bonusBalance
- Withdrawal: deducts from bonusBalance first, then balance
- Winner bet promotion: betValue is doubled (2x), user only pays original amount
- All database operations use existing Prisma schema models (User, Bet, Transaction, WinnerBet)
