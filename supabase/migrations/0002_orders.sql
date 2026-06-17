create extension if not exists "pgcrypto";

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  plan text not null,
  quantity int not null,
  unit_amount int not null,
  amount_total int not null,
  currency text not null default 'thb',
  status text not null default 'pending',
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text not null,
  event_id text not null,
  stripe_session_id text unique not null,
  stripe_payment_intent text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists orders_status_idx on public.orders (status);

-- เปิด RLS แต่ไม่มี policy ให้ anon: เข้าถึงผ่าน service role (ฝั่ง server) เท่านั้น
alter table public.orders enable row level security;
