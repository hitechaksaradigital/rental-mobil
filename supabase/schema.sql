-- ============================================================
-- Velocis Fleet & Mobility - Database Schema
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================================

-- 1) Enum status armada
DO $$ BEGIN
  CREATE TYPE armada_status AS ENUM (
    'available',   -- Tersedia (Ready)
    'rented',      -- Sedang Disewa
    'service',     -- Dalam Perawatan
    'booked'       -- Dipesan / Reservasi
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2) Tabel utama inventaris kendaraan
CREATE TABLE IF NOT EXISTS public.armada (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,                 -- "Toyota Innova Zenix Q Hybrid"
  plate           TEXT NOT NULL UNIQUE,          -- "B 1842 VLZ"
  type            TEXT NOT NULL,                 -- "MPV 2023"
  category        TEXT,                          -- mpv | suv | luxury | sedan
  status          armada_status NOT NULL DEFAULT 'available',
  odometer_km     INTEGER NOT NULL DEFAULT 0,
  fuel_percent    INTEGER NOT NULL DEFAULT 100 CHECK (fuel_percent BETWEEN 0 AND 100),
  image_url       TEXT,
  stnk_expiry     DATE,                          -- tanggal jatuh tempo STNK/pajak
  telematic_icon  TEXT,                           -- material symbol name
  telematic_text  TEXT,                          -- "Tol Jagorawi KM 28 (78 km/h)"
  telematic_color TEXT,                          -- tailwind text-color class
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3) Trigger untuk auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_armada_updated_at ON public.armada;
CREATE TRIGGER trg_armada_updated_at
BEFORE UPDATE ON public.armada
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4) Row Level Security (RLS)
ALTER TABLE public.armada ENABLE ROW LEVEL SECURITY;

-- Policy: read semua user (anon) untuk demo portal
DROP POLICY IF EXISTS "armada read all" ON public.armada;
CREATE POLICY "armada read all"
ON public.armada FOR SELECT
USING (true);

-- Policy: insert semua user (anon) untuk demo form tambah
DROP POLICY IF EXISTS "armada insert all" ON public.armada;
CREATE POLICY "armada insert all"
ON public.armada FOR INSERT
WITH CHECK (true);

-- Policy: update semua user (anon) untuk demo edit
DROP POLICY IF EXISTS "armada update all" ON public.armada;
CREATE POLICY "armada update all"
ON public.armada FOR UPDATE
USING (true)
WITH CHECK (true);

-- Policy: delete semua user (anon) untuk demo hapus
DROP POLICY IF EXISTS "armada delete all" ON public.armada;
CREATE POLICY "armada delete all"
ON public.armada FOR DELETE
USING (true);

-- 5) Seed data contoh (4 unit awal seperti di desain)
INSERT INTO public.armada (
  name, plate, type, category, status, odometer_km, fuel_percent,
  image_url, stnk_expiry, telematic_icon, telematic_text, telematic_color
) VALUES
(
  'Toyota Innova Zenix Q Hybrid', 'B 1842 VLZ', 'MPV 2023', 'mpv',
  'available', 18450, 85,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD_rvxsjt4N5qniFn9AXelDtuZzQ_Ybh0CcMLEOGtL7KL_7sxdaCqU4bqu3lZcxdU5f_M754Num0qfQ0bQ-QIuigfQcmhtuxg6rYw_uUdcGE0JKJPs2u_vjMU1z9qPzeHC8IRvbjl6uFRZ4w37qmwNBAwrjyyeQPoV18cAcJ_SXU7GE34tUuhpB9abifQPuSozD0zoHzrGuwLbxRLAY0ChQnfXpW1zxsqAjVBhaaEhh5WwlMPT5sWvt',
  '2025-12-14', 'near_me', 'Parkir Pool Cawang (0 km/h)', 'text-emerald-700'
),
(
  'Mitsubishi Pajero Sport Dakar', 'B 2099 KFL', 'SUV 2022', 'suv',
  'rented', 42890, 40,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ8C2dgXnmZD9nNx1hg720mTPE61imQE9DSN0mTJELFE1DQSv8UW3DP2fpT-sBhBivWf6n6lhgBqel4uzp_ObSotsLhgaNztMZdFW4lrQEzeSfbETNV6HkuV3J6rZ3kN1J2sOq_ST99Wp5mLtfkQ_NkllCjPsYfRC581FgAWQcQK8Yufdp3oVR2g9cwlr3NaptfyYB9ZB5dMTynxSuDG_rYABOgBYku0ijDmGfSckSTUF-2fdXmFdH',
  NULL, 'navigation', 'Tol Jagorawi KM 28 (78 km/h)', 'text-secondary'
),
(
  'Toyota Alphard 2.5G Executive', 'D 1455 ACD', 'Luxury 2023', 'luxury',
  'rented', 12120, 95,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDgaDklmV8HH9A2DZ3X0CZ25Ul9seYb2LhaXVDfHu8AnMQ0WLzQJDqHNrby-jiYWo8pRAwAhbZ3JLmJJ38wSmWCD2AqebUVmA3q9SHk94nvPaOtdhswTx0z4uHW_7TVcP2RIe31dFaSjT47f7AJEh-ns1i1boieBJUm7d2c42xewYsSqEr0Us5BPYE7kBrQFWU2JExArKJB9AiXdZVn1qZYEK4J8lxiORWWpP8CxHrbLqKa4ilsZGxu',
  NULL, 'flight_takeoff', 'Bandara Soetta T3 (VIP Arrival)', 'text-secondary'
),
(
  'Honda HR-V RS Turbo', 'B 2410 SVR', 'Crossover 2022', 'sedan',
  'service', 30050, 55,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD-HqmvIxzSlcF8zCSCvauFIDIcwB-LzSgaLqS5Ue4dVVzAPynRoakgo_R08NPfrvJexGAJkeXZkWXFg_Djvdc2jFxlDesQ1Q3b8lvPG25vVR9p2KFfQEKW5ZTw_7FU_JPBtK9RDY3neVt1wPEG4clr2BYyVIx40x8VxMGLN22ok9kV8yMvkux1KxQ3BrlaY-_wUGxoy5Ey4Hul6J6mLavVvMVtjHlUmKLxLJuq4fRAe0Zx88hr5Qx0',
  NULL, 'build', 'Bengkel Resmi Honda Fatmawati', 'text-amber-700'
)
ON CONFLICT (plate) DO NOTHING;

-- 6) Index untuk pencarian cepat
CREATE INDEX IF NOT EXISTS idx_armada_plate ON public.armada(plate);
CREATE INDEX IF NOT EXISTS idx_armada_status ON public.armada(status);
CREATE INDEX IF NOT EXISTS idx_armada_category ON public.armada(category);