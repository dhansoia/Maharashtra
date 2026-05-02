# Maharashtra Fuel Partner

Official AIVC × iFuel **Maharashtra State Partner** website. Built with Next.js 15 (App Router) + Payload CMS 3.0 + PostgreSQL, deployed on Hostinger KVM 2 VPS.

> Built by [NDSG Associates](https://ndsg.in) / [dhansoia.com](https://dhansoia.com) for Mr. Neeraj Goel's Pvt. Ltd. company.

---

## What this site does

- Showcases the company as the AIVC iFuel State Partner for Maharashtra.
- Recruits **District Partners** (₹1.02 Cr investment, 6 pumps + territory rights).
- Recruits **Mini Fuel Pump Holders** (₹14.16 L investment, 1 pump).
- Collects online applications with KYC document uploads.
- Interactive **ROI calculator** for both tiers.
- Interactive **Maharashtra district map** (territory availability).
- **Partner Dashboard** for District Partners (post-login).
- Online payments via **Razorpay**.
- Trilingual: English / Hindi / Marathi.

---

## Tech stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router, RSC) |
| CMS / Auth | Payload CMS 3.0 |
| Database | PostgreSQL 16 + Drizzle |
| Styling | Tailwind CSS 3.4 + shadcn-style primitives |
| Animation | framer-motion |
| Charts | recharts |
| Maps | SVG centroid map (extendable to react-simple-maps + GeoJSON) |
| Forms | react-hook-form + zod |
| Email | Resend |
| Payments | Razorpay |
| Icons | lucide-react |

---

## Project structure

```
src/
├── app/
│   ├── (frontend)/              # Public marketing site
│   │   ├── page.tsx             # Home
│   │   ├── about/, contact/, faq/, blog/...
│   │   ├── business-opportunity/  → ROI calculator
│   │   ├── district-partner/    + apply/
│   │   ├── pump-holder/         + apply/
│   │   ├── territory-map/
│   │   └── privacy-policy/, terms/, disclaimer/
│   ├── (auth)/                  # login, forgot-password
│   ├── (dashboard)/             # Partner dashboard (post-login)
│   ├── (payload)/admin/         # Payload CMS admin UI
│   ├── api/
│   │   ├── applications/{district-partner,pump-holder}/route.ts
│   │   ├── contact/route.ts
│   │   ├── razorpay/{create-order,verify}/route.ts
│   │   └── territories/route.ts
│   ├── layout.tsx
│   └── globals.css
├── collections/                 # Payload collections (typed)
├── components/
│   ├── ui/                      # Button, Card, Input, etc.
│   ├── layout/                  # Navbar, Footer, WhatsAppButton
│   ├── home/                    # Hero, Stats, Tiers, Earnings, CTA
│   ├── forms/                   # DistrictPartnerForm, PumpHolderForm, Contact
│   ├── calculators/             # ROICalculator
│   ├── maps/                    # MaharashtraMap
│   └── dashboard/               # Sidebar, StatsCards, charts
├── lib/
│   ├── constants.ts             # Single source of truth: pricing, commissions
│   ├── maharashtra-districts.ts # 36 districts with codes, regions, centroids
│   ├── razorpay.ts, resend.ts, whatsapp.ts, utils.ts
└── i18n/                        # en / hi / mr translations
```

---

## Getting started

```bash
# 1. Install
npm install

# 2. Environment
cp .env.example .env
# Edit .env with your DB URI, Payload secret, Razorpay keys, Resend key

# 3. Database
createdb maharashtra_fuel
# (Payload will create tables automatically on first run)

# 4. Dev server
npm run dev
```

The app runs at <http://localhost:3000>.
- Public site: `/`
- Admin: `/admin` (create the first admin user on first visit)
- Partner Dashboard: `/dashboard` (after login)

---

## Business constants — single source of truth

All financial calculations come from `src/lib/constants.ts`:

| | INR |
|---|---|
| Pump base | 12,00,000 |
| GST 18% | 2,16,000 |
| Pump MRP | 14,16,000 |
| Discounted (10%) | 12,96,000 |
| Margin per pump | 1,20,000 |
| Pump-sale incentive (10%) | 1,20,000 |
| District Partner Total | 1,02,76,000 |
| State Partner Total | 4,88,80,000 |
| Fuel commission | ₹3.50/L (Pump 2.50 + District 0.40 + State 0.30 + AIVC 0.30) |

---

## Deployment

See the build guide in `/root/.claude/uploads` for the Hostinger KVM 2 VPS setup:
- Node 20 + PM2
- Postgres 16
- Nginx reverse proxy + Let's Encrypt SSL

```bash
npm run build
pm2 start ecosystem.config.js
```

---

## Roadmap / next sessions

- [ ] Plug `react-simple-maps` + Maharashtra TopoJSON for full SVG district shapes.
- [ ] Connect ROI calculator output to "share quote" PDF email.
- [ ] Document upload UI inside multi-step application forms.
- [ ] Integrate Razorpay button into application step 5.
- [ ] WhatsApp Business API for application notifications.
- [ ] Real testimonials & gallery via Payload admin.
- [ ] SEO: structured data (Organization, FAQ schema), sitemap, OpenGraph images.
- [ ] Set up GitHub Actions / CI on push.

---

## License

Proprietary. Built for Neeraj Goel's Pvt. Ltd. company.  
© NDSG Associates / dhansoia.com.
