# ⭐ AI Review Manager

Platformă web premium pentru gestionarea și răspunderea automată la recenziile Google Business folosind inteligență artificială.

## 🚀 Stack Tehnologic

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript** (strict mode)
- **Tailwind CSS**
- **Framer Motion** (animații)
- **Shadcn/UI** (componente)
- **Recharts** (grafice)
- **Zustand** (state management)

### Backend
- **Node.js + Express** (API server)
- **PostgreSQL** (baza de date)
- **Prisma ORM** (type-safe queries)

### AI
- **OpenAI GPT-4o** (generator principal)
- **Anthropic Claude** (generator alternativ)

### Autentificare
- **Clerk** (auth, users, organizations)

### Plăți
- **Stripe** (abonamente, checkout)

### Hosting
- **Vercel** (frontend)
- **Railway / Supabase** (database + API)

---

## 📁 Structura Proiectului

```
ai-review-manager/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/      # App Router pages
│   │   │   ├── components/
│   │   │   │   ├── ui/         # Shadcn components
│   │   │   │   ├── dashboard/  # Dashboard widgets
│   │   │   │   ├── reviews/    # Review components
│   │   │   │   ├── ai/         # AI generator UI
│   │   │   │   ├── analytics/  # Charts & stats
│   │   │   │   ├── businesses/ # Multi-business UI
│   │   │   │   ├── admin/      # Admin panel
│   │   │   │   ├── settings/   # Settings page
│   │   │   │   ├── layout/     # Sidebar, Header
│   │   │   │   └── charts/     # Recharts components
│   │   │   ├── lib/      # Utilities
│   │   │   ├── hooks/    # Custom hooks
│   │   │   ├── store/    # Zustand stores
│   │   │   └── types/    # TypeScript types
│   └── api/              # Express backend
│       └── src/
│           ├── routes/   # API endpoints
│           ├── middleware/
│           └── services/ # Business logic
└── packages/
    └── database/         # Prisma schema + client
        └── prisma/
            ├── schema.prisma
            └── seed.ts
```

---

## 🔧 Instalare și Setup

### 1. Clonează și instalează dependențele

```bash
git clone <repo>
cd ai-review-manager
npm install
```

### 2. Configurează variabilele de mediu

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

Completează în `.env.local`:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — din Clerk Dashboard
- `CLERK_SECRET_KEY` — din Clerk Dashboard
- `DATABASE_URL` — PostgreSQL connection string
- `OPENAI_API_KEY` — din OpenAI Platform
- `STRIPE_SECRET_KEY` — din Stripe Dashboard

### 3. Setup baza de date

```bash
npm run db:push       # Creează tabelele
npm run db:seed       # Date de test (opțional)
```

### 4. Pornește aplicația

```bash
npm run dev           # Pornește frontend + API simultan
# sau separat:
npm run dev:web       # Frontend pe http://localhost:3000
npm run dev:api       # API pe http://localhost:4000
```

---

## 🎯 Funcționalități Implementate

### ✅ Dashboard
- Statistici în timp real (recenzii, rating, răspunsuri)
- Grafic evoluție rating (Recharts AreaChart)
- Analiză sentiment (PieChart)
- Quick actions
- AI Insights card
- Recenzii recente

### ✅ AI Reply Generator
- Generare 3 variante distincte cu GPT-4o
- 14 tonuri disponibile (Profesional, Prietenos, Restaurant, Hotel, etc.)
- AI Rewrite: Rescrie, Mai scurt, Mai lung, Mai prietenos, Mai elegant, Mai empatic
- Preview și editare manuală
- Publicare directă pe Google Business

### ✅ Recenzii
- Listă completă cu filtre (nerăspuns, rating, etc.)
- Căutare în text
- Indicator sentiment (pozitiv/neutru/negativ)
- Preview răspuns publicat
- AI dialog integrat

### ✅ Multi Business
- Gestionare multiple afaceri
- Auto Reply configurable per locație
- Sincronizare Google Business
- Toggle auto-reply 5★

### ✅ Statistici AI
- Timp economisit
- Rată răspuns
- Evoluție sentiment (grafic stacked bar)
- Top cuvinte cheie (progres animat)

### ✅ Abonamente
- Free (30 AI/lună)
- Pro (nelimitat + Auto Reply + AI Insights)
- Business (multi-locații + API + echipă)
- Enterprise (customizat)
- Integrare Stripe Checkout

### ✅ Admin Panel
- Statistici globale (utilizatori, afaceri, venituri)
- Tabel utilizatori recenți
- Alerte sistem
- Consum AI

### ✅ Notificări
- Listă notificări cu citit/necitit
- Badge urgente
- Tipuri: recenzie nouă, auto-reply, publicare

### ✅ Setări
- Cont utilizator
- Canale notificări (email, browser, push)
- Configurare Auto Reply
- Gestionare abonament

### ✅ Design
- Dark Mode + Light Mode cu next-themes
- Animații fluide cu Framer Motion
- Carduri cu hover effects
- Glassmorphism
- Gradient brand (violet/indigo)
- Responsive 100%
- Sidebar colapsibil pe mobile

---

## 📊 Schema Baza de Date

```
User → Subscription (1:1)
User → BusinessMember → Business (N:M)
Business → Review → ReviewReply (1:N:N)
Review → AIGeneration (1:N)
Business → BusinessLocation (1:N)
Business → RatingHistory (1:N)
User → AILog (1:N)
User → Notification (1:N)
```

---

## 🔑 Variabile de Mediu Necesare

| Variabilă | Descriere |
|-----------|-----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `DATABASE_URL` | PostgreSQL URL |
| `OPENAI_API_KEY` | OpenAI API key |
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret |

---

## 🚢 Deploy

### Vercel (Frontend)
```bash
vercel --prod
```

### Railway (API + Database)
```bash
railway up
```

### Supabase (Database alternativă)
Folosește connection string din Supabase Dashboard în `DATABASE_URL`.

---

## 📝 TODO / Roadmap

- [ ] Integrare Google Business Profile API reală
- [ ] Google OAuth flow complet
- [ ] Auto-reply scheduler (cron job)
- [ ] Email notifications (Resend)
- [ ] Mobile app (React Native)
- [ ] API publică pentru developers
- [ ] White-label pentru agenții
- [ ] Analiza competiției (review-urile competitorilor)
