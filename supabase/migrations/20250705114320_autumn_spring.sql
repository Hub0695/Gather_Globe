/*
  # Create trips table for travel planning

  1. New Tables
    - `trips`
      - `id` (uuid, primary key, auto-generated)
      - `title` (text, not null)
      - `destination` (text, not null)
      - `country` (text, not null)
      - `start_date` (date, not null)
      - `end_date` (date, not null)
      - `budget` (integer, not null, default 0)
      - `description` (text, nullable)
      - `preferences` (text array, default empty array)
      - `created_by` (uuid, references profiles.id)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `trips` table
    - Add policy for users to view trips they created or are members of
    - Add policy for users to insert their own trips
    - Add policy for users to update trips they created

  3. Additional Features
    - Automatic `updated_at` timestamp trigger
    - Foreign key constraint to profiles with cascade delete
    - Index on created_by for performance
*/

-- Create the trips table
CREATE TABLE IF NOT EXISTS public.trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  destination text NOT NULL,
  country text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  budget integer NOT NULL DEFAULT 0,
  description text,
  preferences text[] DEFAULT '{}',
  created_by uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own trips"
  ON public.trips
  FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can insert their own trips"
  ON public.trips
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own trips"
  ON public.trips
  FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own trips"
  ON public.trips
  FOR DELETE
  USING (auth.uid() = created_by);

-- Create trigger to automatically update updated_at on row changes
DROP TRIGGER IF EXISTS update_trips_updated_at ON public.trips;
CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON public.trips
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for performance
CREATE INDEX IF NOT EXISTS trips_created_by_idx ON public.trips(created_by);
CREATE INDEX IF NOT EXISTS trips_start_date_idx ON public.trips(start_date);