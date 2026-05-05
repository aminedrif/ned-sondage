-- ============================================================
-- Supabase Migration: Create "responses" table for BI & CRM Survey
-- Run this in Supabase SQL Editor (or via CLI: supabase db push)
-- ============================================================

CREATE TABLE IF NOT EXISTS responses (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_at timestamptz NOT NULL DEFAULT now(),
  lang        text        NOT NULL,
  genre       text        NOT NULL,
  age_group   text        NOT NULL,
  education   text        NOT NULL,
  job_position text       NOT NULL,
  exp_crm     text        NOT NULL,
  exp_bi      text        NOT NULL,

  -- Section B: Business Intelligence Tools (1–5 Likert)
  b1  smallint NOT NULL CHECK (b1  BETWEEN 1 AND 5),
  b2  smallint NOT NULL CHECK (b2  BETWEEN 1 AND 5),
  b3  smallint NOT NULL CHECK (b3  BETWEEN 1 AND 5),
  b4  smallint NOT NULL CHECK (b4  BETWEEN 1 AND 5),
  b5  smallint NOT NULL CHECK (b5  BETWEEN 1 AND 5),
  b6  smallint NOT NULL CHECK (b6  BETWEEN 1 AND 5),
  b7  smallint NOT NULL CHECK (b7  BETWEEN 1 AND 5),
  b8  smallint NOT NULL CHECK (b8  BETWEEN 1 AND 5),
  b9  smallint NOT NULL CHECK (b9  BETWEEN 1 AND 5),
  b10 smallint NOT NULL CHECK (b10 BETWEEN 1 AND 5),
  b11 smallint NOT NULL CHECK (b11 BETWEEN 1 AND 5),
  b12 smallint NOT NULL CHECK (b12 BETWEEN 1 AND 5),
  b13 smallint NOT NULL CHECK (b13 BETWEEN 1 AND 5),
  b14 smallint NOT NULL CHECK (b14 BETWEEN 1 AND 5),
  b15 smallint NOT NULL CHECK (b15 BETWEEN 1 AND 5),
  b16 smallint NOT NULL CHECK (b16 BETWEEN 1 AND 5),
  b17 smallint NOT NULL CHECK (b17 BETWEEN 1 AND 5),
  b18 smallint NOT NULL CHECK (b18 BETWEEN 1 AND 5),
  b19 smallint NOT NULL CHECK (b19 BETWEEN 1 AND 5),
  b20 smallint NOT NULL CHECK (b20 BETWEEN 1 AND 5),

  -- Section C: CRM System Effectiveness (1–5 Likert)
  c1  smallint NOT NULL CHECK (c1  BETWEEN 1 AND 5),
  c2  smallint NOT NULL CHECK (c2  BETWEEN 1 AND 5),
  c3  smallint NOT NULL CHECK (c3  BETWEEN 1 AND 5),
  c4  smallint NOT NULL CHECK (c4  BETWEEN 1 AND 5),
  c5  smallint NOT NULL CHECK (c5  BETWEEN 1 AND 5),
  c6  smallint NOT NULL CHECK (c6  BETWEEN 1 AND 5),
  c7  smallint NOT NULL CHECK (c7  BETWEEN 1 AND 5),
  c8  smallint NOT NULL CHECK (c8  BETWEEN 1 AND 5),
  c9  smallint NOT NULL CHECK (c9  BETWEEN 1 AND 5),
  c10 smallint NOT NULL CHECK (c10 BETWEEN 1 AND 5),
  c11 smallint NOT NULL CHECK (c11 BETWEEN 1 AND 5),
  c12 smallint NOT NULL CHECK (c12 BETWEEN 1 AND 5),
  c13 smallint NOT NULL CHECK (c13 BETWEEN 1 AND 5),
  c14 smallint NOT NULL CHECK (c14 BETWEEN 1 AND 5),
  c15 smallint NOT NULL CHECK (c15 BETWEEN 1 AND 5),
  c16 smallint NOT NULL CHECK (c16 BETWEEN 1 AND 5)
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Anyone can INSERT (anonymous survey submissions)
CREATE POLICY "allow_insert" ON responses
  FOR INSERT
  WITH CHECK (true);

-- Anyone can SELECT (dashboard is public)
CREATE POLICY "allow_select" ON responses
  FOR SELECT
  USING (true);

-- ============================================================
-- Enable Realtime for the responses table
-- ============================================================

ALTER PUBLICATION supabase_realtime ADD TABLE responses;
