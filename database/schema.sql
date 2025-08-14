-- CarSell Application Database Schema
-- This file contains all the necessary tables for the car selling application

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    name VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CAR MAKES TABLE (e.g., Toyota, Honda, Ford)
-- =============================================
CREATE TABLE IF NOT EXISTS car_makes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    logo_url VARCHAR(500),
    vehicle_type VARCHAR(10) NOT NULL DEFAULT 'car' CHECK (vehicle_type IN ('car','bike')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CAR MODELS TABLE (e.g., Camry, Accord, F-150)
-- =============================================
CREATE TABLE IF NOT EXISTS car_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    make_id UUID NOT NULL REFERENCES car_makes(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    year_start INTEGER,
    year_end INTEGER,
    body_type VARCHAR(50), -- sedan, SUV, truck, etc.
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(make_id, name)
);

-- =============================================
-- CAR ESTIMATES TABLE (main table for customer submissions)
-- =============================================
CREATE TABLE IF NOT EXISTS car_estimates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Car Information
    vehicle_type VARCHAR(10) NOT NULL DEFAULT 'car' CHECK (vehicle_type IN ('car','bike')),
    car_make VARCHAR(100) NOT NULL,
    car_model VARCHAR(100) NOT NULL,
    car_year INTEGER NOT NULL,
    mileage INTEGER NOT NULL,
    condition VARCHAR(20) NOT NULL CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
    expected_price DECIMAL(10,2) NOT NULL,
    
    -- Photos
    photos TEXT[], -- Array of photo URLs
    
    -- Contact Information
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    
         -- Callback Information
     callback_requested BOOLEAN DEFAULT false,
     callback_phone VARCHAR(20),
     callback_time VARCHAR(20), -- morning, afternoon, evening
     
     -- Admin Information
     status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'inspected', 'approved', 'rejected', 'completed')),
    admin_notes TEXT,
    final_price DECIMAL(10,2),
    inspection_date TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CAR CONDITIONS TABLE (for reference data)
-- =============================================
CREATE TABLE IF NOT EXISTS car_conditions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    price_multiplier DECIMAL(3,2) DEFAULT 1.00, -- Multiplier for base price
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CALLBACK TIME SLOTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS callback_time_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    start_time TIME,
    end_time TIME,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- PRICE ESTIMATES TABLE (for tracking price history)
-- =============================================
CREATE TABLE IF NOT EXISTS price_estimates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_estimate_id UUID NOT NULL REFERENCES car_estimates(id) ON DELETE CASCADE,
    estimated_price DECIMAL(10,2) NOT NULL,
    estimated_by UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ADMIN ACTIVITY LOG TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS admin_activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES users(id),
    car_estimate_id UUID REFERENCES car_estimates(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- 'status_update', 'price_update', 'notes_added', etc.
    old_value TEXT,
    new_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
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
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_car_makes_updated_at BEFORE UPDATE ON car_makes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_car_models_updated_at BEFORE UPDATE ON car_models FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_car_estimates_updated_at BEFORE UPDATE ON car_estimates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
