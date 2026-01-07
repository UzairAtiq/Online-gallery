-- Run this SQL in your Supabase SQL Editor to set up the database

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON photos
  FOR SELECT
  USING (true);

-- Create policy to allow public insert (for API)
CREATE POLICY "Allow public insert" ON photos
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow public delete (for API)
CREATE POLICY "Allow public delete" ON photos
  FOR DELETE
  USING (true);

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('photo-library', 'photo-library', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy to allow public uploads
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'photo-library');

-- Create storage policy to allow public reads
CREATE POLICY "Allow public reads" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'photo-library');

-- Create storage policy to allow public deletes
CREATE POLICY "Allow public deletes" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'photo-library');

