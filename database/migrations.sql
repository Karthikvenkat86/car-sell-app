-- CarSell Application Database Migrations
-- This file contains migration scripts to update existing database structure

-- =============================================
-- MIGRATION 1: Update car_estimates table structure
-- =============================================

-- Add new columns to car_estimates table if they don't exist
DO $$ 
BEGIN
    -- Add customer_name column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'car_estimates' AND column_name = 'customer_name') THEN
        ALTER TABLE car_estimates ADD COLUMN customer_name VARCHAR(255);
    END IF;
    
    -- Add customer_phone column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'car_estimates' AND column_name = 'customer_phone') THEN
        ALTER TABLE car_estimates ADD COLUMN customer_phone VARCHAR(20);
    END IF;
    
    -- Add customer_email column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'car_estimates' AND column_name = 'customer_email') THEN
        ALTER TABLE car_estimates ADD COLUMN customer_email VARCHAR(255);
    END IF;
    
    -- Add callback_phone column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'car_estimates' AND column_name = 'callback_phone') THEN
        ALTER TABLE car_estimates ADD COLUMN callback_phone VARCHAR(20);
    END IF;
    
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'car_estimates' AND column_name = 'updated_at') THEN
        ALTER TABLE car_estimates ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
END $$;

-- =============================================
-- MIGRATION 2: Create new tables if they don't exist
-- =============================================

-- Create car_makes table if it doesn't exist
CREATE TABLE IF NOT EXISTS car_makes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    logo_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create car_models table if it doesn't exist
CREATE TABLE IF NOT EXISTS car_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    make_id UUID NOT NULL REFERENCES car_makes(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    year_start INTEGER,
    year_end INTEGER,
    body_type VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(make_id, name)
);

-- Create car_conditions table if it doesn't exist
CREATE TABLE IF NOT EXISTS car_conditions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    price_multiplier DECIMAL(3,2) DEFAULT 1.00,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create callback_time_slots table if it doesn't exist
CREATE TABLE IF NOT EXISTS callback_time_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    start_time TIME,
    end_time TIME,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create price_estimates table if it doesn't exist
CREATE TABLE IF NOT EXISTS price_estimates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_estimate_id UUID NOT NULL REFERENCES car_estimates(id) ON DELETE CASCADE,
    estimated_price DECIMAL(10,2) NOT NULL,
    estimated_by UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_activity_log table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES users(id),
    car_estimate_id UUID REFERENCES car_estimates(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    old_value TEXT,
    new_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- MIGRATION 3: Add indexes if they don't exist
-- =============================================

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Car makes and models indexes
CREATE INDEX IF NOT EXISTS idx_car_models_make_id ON car_models(make_id);
CREATE INDEX IF NOT EXISTS idx_car_models_name ON car_models(name);
CREATE INDEX IF NOT EXISTS idx_car_makes_name ON car_makes(name);

-- Car estimates indexes
CREATE INDEX IF NOT EXISTS idx_car_estimates_user_id ON car_estimates(user_id);
CREATE INDEX IF NOT EXISTS idx_car_estimates_status ON car_estimates(status);
CREATE INDEX IF NOT EXISTS idx_car_estimates_created_at ON car_estimates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_car_estimates_car_make_model ON car_estimates(car_make, car_model);
CREATE INDEX IF NOT EXISTS idx_car_estimates_callback_requested ON car_estimates(callback_requested);

-- Price estimates indexes
CREATE INDEX IF NOT EXISTS idx_price_estimates_car_estimate_id ON price_estimates(car_estimate_id);
CREATE INDEX IF NOT EXISTS idx_price_estimates_created_at ON price_estimates(created_at DESC);

-- Admin activity log indexes
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_admin_id ON admin_activity_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_car_estimate_id ON admin_activity_log(car_estimate_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_log_created_at ON admin_activity_log(created_at DESC);

-- =============================================
-- MIGRATION 4: Create triggers for updated_at
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (only if they don't exist)
DO $$
BEGIN
    -- Check if trigger exists before creating
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_car_estimates_updated_at') THEN
        CREATE TRIGGER update_car_estimates_updated_at BEFORE UPDATE ON car_estimates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_car_makes_updated_at') THEN
        CREATE TRIGGER update_car_makes_updated_at BEFORE UPDATE ON car_makes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_car_models_updated_at') THEN
        CREATE TRIGGER update_car_models_updated_at BEFORE UPDATE ON car_models FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- =============================================
-- MIGRATION 5: Update existing data
-- =============================================

-- Update existing car_estimates to have customer information if missing
UPDATE car_estimates 
SET customer_name = 'Unknown Customer',
    customer_phone = '+1000000000',
    customer_email = 'unknown@example.com'
WHERE customer_name IS NULL;

-- Make customer fields NOT NULL after setting default values
ALTER TABLE car_estimates ALTER COLUMN customer_name SET NOT NULL;
ALTER TABLE car_estimates ALTER COLUMN customer_phone SET NOT NULL;
ALTER TABLE car_estimates ALTER COLUMN customer_email SET NOT NULL;
