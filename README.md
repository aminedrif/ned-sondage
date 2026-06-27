#  BI & CRM Survey — Tradifoot Algérie

A full-stack academic survey application measuring the impact of Business Intelligence tools on CRM system effectiveness at Tradifoot Algeria.

**Stack:** React (Vite) · TailwindCSS · Supabase · Recharts

---

##  Quick Start

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to **Settings → API** and copy:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`)
   - **anon / public key** (the long JWT string)

### 2. Run the Database Migration

1. In Supabase, go to **SQL Editor**
2. Open and paste the contents of [`supabase/migrations/001_init.sql`](supabase/migrations/001_init.sql)
3. Click **Run** this creates the `responses` table with RLS policies and enables Realtime

### 3. Configure Environment Variables

Copy `.env` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your-anon-key
```

### 4. Install & Run

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

##  Pages

| URL | Description |
|-----|-------------|
| `/` | Public survey form (FR/EN toggle, 3 steps) |
| `/dashboard` | Admin dashboard with charts & export |

---

##  Project Structure

```
src/
├── pages/
│   ├── SurveyPage.jsx        # Public multi-step survey
│   └── DashboardPage.jsx     # Admin analytics dashboard
├── components/
│   ├── survey/
│   │   ├── ProgressBar.jsx    # Step indicator
│   │   ├── SectionA.jsx       # Demographic questions
│   │   ├── SectionB.jsx       # BI tools (Likert 1–5)
│   │   ├── SectionC.jsx       # CRM effectiveness (Likert 1–5)
│   │   ├── LikertRow.jsx      # Reusable Likert row
│   │   └── ThankYou.jsx       # Submission confirmation
│   └── dashboard/
│       ├── OverviewTab.jsx    # KPIs + demographic charts
│       ├── SectionBTab.jsx    # BI dimension analysis
│       ├── SectionCTab.jsx    # CRM dimension analysis
│       └── ExportTab.jsx      # CSV / SPSS / Google Sheets
├── lib/
│   ├── supabase.js            # Supabase client
│   ├── surveyData.js          # All questions EN + FR
│   └── statsHelpers.js        # Average, distribution, CSV helpers
├── App.jsx                    # Router
├── main.jsx                   # Entry point
└── index.css                  # Tailwind directives
```

---

## 🌐 Deploy to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy — Vercel auto-detects Vite

> **Note:** Add `vercel.json` for SPA routing:
> ```json
> { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
> ```

---

## 📊 Survey Sections

### Section A : Demographics (6 questions)
Gender, Age group, Education, Job position, CRM experience, BI experience

### Section B : Business Intelligence Tools (20 items, 4 dimensions)
1. **Data Warehouse** (B1–B5)
2. **OLAP & Dashboards** (B6–B10)
3. **Data Mining** (B11–B15)
4. **Overall BI Integration** (B16–B20)

### Section C : CRM System Effectiveness (16 items, 4 dimensions)
1. **Customer Satisfaction** (C1–C4)
2. **Customer Retention** (C5–C8)
3. **Targeting Accuracy** (C9–C12)
4. **Operational Efficiency** (C13–C16)

---

## 📤 Export Options

- **CSV** — Full dataset with original text values
- **SPSS-ready CSV** — Categorical variables encoded as integers
- **Google Sheets** — POST to Google Apps Script webhook (guide included)

---

## License

Academic use only Master's thesis research project.
