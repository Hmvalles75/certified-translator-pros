-- Add admin role to users (extend auth.users with profiles table)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add more fields to translators table
ALTER TABLE translators
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'USA',
ADD COLUMN IF NOT EXISTS services TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS certifications TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS profile_photo TEXT,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS price_per_page INTEGER,
ADD COLUMN IF NOT EXISTS hourly_rate INTEGER,
ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'USA',
  translator_count INTEGER DEFAULT 0
);

-- Create leads table (translator inquiry leads)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  translator_id UUID REFERENCES translators(id) ON DELETE SET NULL,
  city TEXT,
  is_handled BOOLEAN NOT NULL DEFAULT false,
  handled_at TIMESTAMP WITH TIME ZONE,
  handled_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);
CREATE INDEX IF NOT EXISTS translators_city_idx ON translators(city);
CREATE INDEX IF NOT EXISTS translators_is_public_idx ON translators(is_public);
CREATE INDEX IF NOT EXISTS cities_slug_idx ON cities(slug);
CREATE INDEX IF NOT EXISTS leads_translator_id_idx ON leads(translator_id);
CREATE INDEX IF NOT EXISTS leads_is_handled_idx ON leads(is_handled);

-- Enable RLS on new tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for cities
CREATE POLICY "Anyone can view cities"
  ON cities FOR SELECT
  USING (true);

-- RLS Policies for leads
CREATE POLICY "Anyone can create leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update translator count in cities
CREATE OR REPLACE FUNCTION update_city_translator_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE cities
    SET translator_count = (
      SELECT COUNT(*)
      FROM translators
      WHERE translators.city = cities.name
      AND translators.is_active = true
    )
    WHERE cities.name = NEW.city;
  END IF;

  IF TG_OP = 'DELETE' OR (TG_OP = 'UPDATE' AND OLD.city != NEW.city) THEN
    UPDATE cities
    SET translator_count = (
      SELECT COUNT(*)
      FROM translators
      WHERE translators.city = cities.name
      AND translators.is_active = true
    )
    WHERE cities.name = OLD.city;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for translator count updates
DROP TRIGGER IF EXISTS update_translator_count ON translators;
CREATE TRIGGER update_translator_count
  AFTER INSERT OR UPDATE OR DELETE ON translators
  FOR EACH ROW EXECUTE FUNCTION update_city_translator_count();

-- Create trigger for translators updated_at
DROP TRIGGER IF EXISTS update_translators_updated_at ON translators;
CREATE TRIGGER update_translators_updated_at
  BEFORE UPDATE ON translators
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
