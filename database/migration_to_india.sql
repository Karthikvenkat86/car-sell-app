-- Migration Script: Update to Indian Car Market and Storage Configuration
-- This script updates the existing database for Indian market

-- =============================================
-- STEP 1: Clear existing car makes and models (if any)
-- =============================================
-- Note: This will remove existing data. Run this only if you want to start fresh with Indian data
-- DELETE FROM car_models;
-- DELETE FROM car_makes;

-- =============================================
-- STEP 2: Insert Indian Car Makes (if not exists)
-- =============================================
INSERT INTO car_makes (name, logo_url) VALUES
('Maruti Suzuki', 'https://example.com/logos/maruti-suzuki.png'),
('Hyundai', 'https://example.com/logos/hyundai.png'),
('Tata Motors', 'https://example.com/logos/tata-motors.png'),
('Mahindra', 'https://example.com/logos/mahindra.png'),
('Honda', 'https://example.com/logos/honda.png'),
('Toyota', 'https://example.com/logos/toyota.png'),
('Kia', 'https://example.com/logos/kia.png'),
('MG Motor', 'https://example.com/logos/mg-motor.png'),
('Renault', 'https://example.com/logos/renault.png'),
('Nissan', 'https://example.com/logos/nissan.png'),
('Ford', 'https://example.com/logos/ford.png'),
('Volkswagen', 'https://example.com/logos/volkswagen.png'),
('Skoda', 'https://example.com/logos/skoda.png'),
('BMW', 'https://example.com/logos/bmw.png'),
('Mercedes-Benz', 'https://example.com/logos/mercedes.png'),
('Audi', 'https://example.com/logos/audi.png'),
('Volvo', 'https://example.com/logos/volvo.png'),
('Jaguar', 'https://example.com/logos/jaguar.png'),
('Land Rover', 'https://example.com/logos/land-rover.png'),
('Lexus', 'https://example.com/logos/lexus.png')
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- STEP 3: Insert Popular Indian Car Models
-- =============================================

-- Maruti Suzuki Models (Most Popular in India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Swift', 2005, 2024, 'hatchback' FROM car_makes WHERE name = 'Maruti Suzuki'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Dzire', 2008, 2024, 'sedan' FROM car_makes WHERE name = 'Maruti Suzuki'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Baleno', 2015, 2024, 'hatchback' FROM car_makes WHERE name = 'Maruti Suzuki'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Brezza', 2016, 2024, 'SUV' FROM car_makes WHERE name = 'Maruti Suzuki'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Ertiga', 2012, 2024, 'MPV' FROM car_makes WHERE name = 'Maruti Suzuki'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Alto', 2000, 2024, 'hatchback' FROM car_makes WHERE name = 'Maruti Suzuki'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'WagonR', 1999, 2024, 'hatchback' FROM car_makes WHERE name = 'Maruti Suzuki'
ON CONFLICT (make_id, name) DO NOTHING;

-- Hyundai Models
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'i20', 2008, 2024, 'hatchback' FROM car_makes WHERE name = 'Hyundai'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Verna', 2006, 2024, 'sedan' FROM car_makes WHERE name = 'Hyundai'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Creta', 2015, 2024, 'SUV' FROM car_makes WHERE name = 'Hyundai'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Venue', 2019, 2024, 'SUV' FROM car_makes WHERE name = 'Hyundai'
ON CONFLICT (make_id, name) DO NOTHING;

-- Tata Motors Models
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Nexon', 2017, 2024, 'hatchback' FROM car_makes WHERE name = 'Tata Motors'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Punch', 2021, 2024, 'SUV' FROM car_makes WHERE name = 'Tata Motors'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Harrier', 2019, 2024, 'SUV' FROM car_makes WHERE name = 'Tata Motors'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Safari', 1998, 2024, 'SUV' FROM car_makes WHERE name = 'Tata Motors'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Tiago', 2016, 2024, 'hatchback' FROM car_makes WHERE name = 'Tata Motors'
ON CONFLICT (make_id, name) DO NOTHING;

-- Mahindra Models
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Thar', 2010, 2024, 'SUV' FROM car_makes WHERE name = 'Mahindra'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'XUV700', 2021, 2024, 'SUV' FROM car_makes WHERE name = 'Mahindra'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'XUV300', 2019, 2024, 'SUV' FROM car_makes WHERE name = 'Mahindra'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Scorpio', 2002, 2024, 'SUV' FROM car_makes WHERE name = 'Mahindra'
ON CONFLICT (make_id, name) DO NOTHING;

-- Honda Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'City', 1998, 2024, 'sedan' FROM car_makes WHERE name = 'Honda'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Amaze', 2013, 2024, 'sedan' FROM car_makes WHERE name = 'Honda'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Jazz', 2009, 2024, 'hatchback' FROM car_makes WHERE name = 'Honda'
ON CONFLICT (make_id, name) DO NOTHING;

-- Toyota Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Innova', 2005, 2024, 'MPV' FROM car_makes WHERE name = 'Toyota'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Fortuner', 2009, 2024, 'SUV' FROM car_makes WHERE name = 'Toyota'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Glanza', 2019, 2024, 'hatchback' FROM car_makes WHERE name = 'Toyota'
ON CONFLICT (make_id, name) DO NOTHING;

-- Kia Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Seltos', 2019, 2024, 'SUV' FROM car_makes WHERE name = 'Kia'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Sonet', 2020, 2024, 'SUV' FROM car_makes WHERE name = 'Kia'
ON CONFLICT (make_id, name) DO NOTHING;

-- MG Motor Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Hector', 2019, 2024, 'SUV' FROM car_makes WHERE name = 'MG Motor'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Astor', 2021, 2024, 'SUV' FROM car_makes WHERE name = 'MG Motor'
ON CONFLICT (make_id, name) DO NOTHING;

-- Renault Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Kwid', 2015, 2024, 'hatchback' FROM car_makes WHERE name = 'Renault'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Triber', 2019, 2024, 'MPV' FROM car_makes WHERE name = 'Renault'
ON CONFLICT (make_id, name) DO NOTHING;

-- Nissan Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Magnite', 2020, 2024, 'SUV' FROM car_makes WHERE name = 'Nissan'
ON CONFLICT (make_id, name) DO NOTHING;

-- Ford Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'EcoSport', 2013, 2024, 'SUV' FROM car_makes WHERE name = 'Ford'
ON CONFLICT (make_id, name) DO NOTHING;

-- Volkswagen Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Polo', 2010, 2024, 'hatchback' FROM car_makes WHERE name = 'Volkswagen'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Vento', 2010, 2024, 'sedan' FROM car_makes WHERE name = 'Volkswagen'
ON CONFLICT (make_id, name) DO NOTHING;

-- Skoda Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Rapid', 2011, 2024, 'sedan' FROM car_makes WHERE name = 'Skoda'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Kushaq', 2021, 2024, 'SUV' FROM car_makes WHERE name = 'Skoda'
ON CONFLICT (make_id, name) DO NOTHING;

-- Luxury Car Models
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, '3 Series', 1975, 2024, 'sedan' FROM car_makes WHERE name = 'BMW'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, '5 Series', 1972, 2024, 'sedan' FROM car_makes WHERE name = 'BMW'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'X1', 2009, 2024, 'SUV' FROM car_makes WHERE name = 'BMW'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'C-Class', 1993, 2024, 'sedan' FROM car_makes WHERE name = 'Mercedes-Benz'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'E-Class', 1984, 2024, 'sedan' FROM car_makes WHERE name = 'Mercedes-Benz'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'A3', 1996, 2024, 'sedan' FROM car_makes WHERE name = 'Audi'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'A4', 1994, 2024, 'sedan' FROM car_makes WHERE name = 'Audi'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Q3', 2011, 2024, 'SUV' FROM car_makes WHERE name = 'Audi'
ON CONFLICT (make_id, name) DO NOTHING;

-- =============================================
-- STEP 4: Update sample car estimates with Indian examples
-- =============================================
-- Note: This will replace existing sample data with Indian examples
-- Uncomment the following lines if you want to update sample data

/*
DELETE FROM car_estimates WHERE customer_email LIKE '%@example.com';

INSERT INTO car_estimates (
    car_make, 
    car_model, 
    car_year, 
    mileage, 
    condition, 
    expected_price,
    customer_name,
    customer_phone,
    customer_email,
    callback_requested,
    callback_phone,
    callback_time,
    status
) VALUES
('Maruti Suzuki', 'Swift', 2020, 45000, 'excellent', 650000.00, 'Rahul Sharma', '+919876543210', 'rahul@example.com', true, '+919876543210', 'morning', 'pending'),
('Hyundai', 'i20', 2019, 35000, 'good', 550000.00, 'Priya Patel', '+919876543211', 'priya@example.com', false, NULL, NULL, 'pending'),
('Tata Motors', 'Nexon', 2021, 25000, 'excellent', 1200000.00, 'Amit Kumar', '+919876543212', 'amit@example.com', true, '+919876543212', 'afternoon', 'inspected'),
('Mahindra', 'Thar', 2022, 15000, 'excellent', 1800000.00, 'Neha Singh', '+919876543213', 'neha@example.com', false, NULL, NULL, 'approved'),
('Honda', 'City', 2018, 60000, 'fair', 450000.00, 'Vikram Mehta', '+919876543214', 'vikram@example.com', true, '+919876543214', 'evening', 'completed');
*/

-- =============================================
-- STEP 5: Storage Bucket Configuration Instructions
-- =============================================
-- IMPORTANT: You need to manually create the 'car-media' bucket in Supabase Storage
-- 
-- 1. Go to your Supabase dashboard
-- 2. Navigate to Storage
-- 3. Create a new bucket called 'car-media'
-- 4. Set the bucket to public
-- 5. Create storage policies:
--
-- CREATE POLICY "Public Access" ON storage.objects
--   FOR SELECT USING (bucket_id = 'car-media');
--
-- CREATE POLICY "Authenticated users can upload" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'car-media' AND auth.role() = 'authenticated');
--
-- CREATE POLICY "Users can update own files" ON storage.objects
--   FOR UPDATE USING (bucket_id = 'car-media' AND auth.role() = 'authenticated');
--
-- CREATE POLICY "Users can delete own files" ON storage.objects
--   FOR DELETE USING (bucket_id = 'car-media' AND auth.role() = 'authenticated');
