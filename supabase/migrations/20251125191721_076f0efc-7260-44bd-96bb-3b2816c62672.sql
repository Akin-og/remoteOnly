-- Create waitlist signups table
CREATE TABLE public.waitlist_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  current_status TEXT NOT NULL,
  role_interest TEXT NOT NULL,
  visa_need TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- No public policies needed - edge function will use service role to insert
-- This keeps the table secure from direct client manipulation

-- Create index for faster email lookups
CREATE INDEX idx_waitlist_signups_email ON public.waitlist_signups(email);

-- Create index for created_at for analytics queries
CREATE INDEX idx_waitlist_signups_created_at ON public.waitlist_signups(created_at DESC);