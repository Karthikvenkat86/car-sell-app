-- CarSell Application Seed Data for India
-- This file contains sample data to populate the database with Indian car market data

-- =============================================
-- INSERT INDIAN CAR MAKES
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
-- INSERT INDIAN CAR MODELS
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

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Celerio', 2014, 2024, 'hatchback' FROM car_makes WHERE name = 'Maruti Suzuki'
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

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'i10', 2007, 2024, 'hatchback' FROM car_makes WHERE name = 'Hyundai'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Aura', 2020, 2024, 'sedan' FROM car_makes WHERE name = 'Hyundai'
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

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Altroz', 2020, 2024, 'hatchback' FROM car_makes WHERE name = 'Tata Motors'
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

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Bolero', 2000, 2024, 'SUV' FROM car_makes WHERE name = 'Mahindra'
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

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'WR-V', 2017, 2024, 'SUV' FROM car_makes WHERE name = 'Honda'
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

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Camry', 2002, 2024, 'sedan' FROM car_makes WHERE name = 'Toyota'
ON CONFLICT (make_id, name) DO NOTHING;

-- Kia Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Seltos', 2019, 2024, 'SUV' FROM car_makes WHERE name = 'Kia'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Sonet', 2020, 2024, 'SUV' FROM car_makes WHERE name = 'Kia'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Carens', 2022, 2024, 'MPV' FROM car_makes WHERE name = 'Kia'
ON CONFLICT (make_id, name) DO NOTHING;

-- MG Motor Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Hector', 2019, 2024, 'SUV' FROM car_makes WHERE name = 'MG Motor'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Astor', 2021, 2024, 'SUV' FROM car_makes WHERE name = 'MG Motor'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Comet EV', 2022, 2024, 'hatchback' FROM car_makes WHERE name = 'MG Motor'
ON CONFLICT (make_id, name) DO NOTHING;

-- Renault Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Kwid', 2015, 2024, 'hatchback' FROM car_makes WHERE name = 'Renault'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Triber', 2019, 2024, 'MPV' FROM car_makes WHERE name = 'Renault'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Kiger', 2021, 2024, 'SUV' FROM car_makes WHERE name = 'Renault'
ON CONFLICT (make_id, name) DO NOTHING;

-- Nissan Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Magnite', 2020, 2024, 'SUV' FROM car_makes WHERE name = 'Nissan'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Kicks', 2019, 2024, 'SUV' FROM car_makes WHERE name = 'Nissan'
ON CONFLICT (make_id, name) DO NOTHING;

-- Ford Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'EcoSport', 2013, 2024, 'SUV' FROM car_makes WHERE name = 'Ford'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Endeavour', 2003, 2024, 'SUV' FROM car_makes WHERE name = 'Ford'
ON CONFLICT (make_id, name) DO NOTHING;

-- Volkswagen Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Polo', 2010, 2024, 'hatchback' FROM car_makes WHERE name = 'Volkswagen'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Vento', 2010, 2024, 'sedan' FROM car_makes WHERE name = 'Volkswagen'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Taigun', 2021, 2024, 'SUV' FROM car_makes WHERE name = 'Volkswagen'
ON CONFLICT (make_id, name) DO NOTHING;

-- Skoda Models (India)
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Rapid', 2011, 2024, 'sedan' FROM car_makes WHERE name = 'Skoda'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Kushaq', 2021, 2024, 'SUV' FROM car_makes WHERE name = 'Skoda'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Superb', 2001, 2024, 'sedan' FROM car_makes WHERE name = 'Skoda'
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
SELECT id, 'X3', 2003, 2024, 'SUV' FROM car_makes WHERE name = 'BMW'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'A-Class', 1997, 2024, 'hatchback' FROM car_makes WHERE name = 'Mercedes-Benz'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'C-Class', 1993, 2024, 'sedan' FROM car_makes WHERE name = 'Mercedes-Benz'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'E-Class', 1984, 2024, 'sedan' FROM car_makes WHERE name = 'Mercedes-Benz'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'GLA', 2013, 2024, 'SUV' FROM car_makes WHERE name = 'Mercedes-Benz'
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

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Q5', 2008, 2024, 'SUV' FROM car_makes WHERE name = 'Audi'
ON CONFLICT (make_id, name) DO NOTHING;

-- =============================================
-- INSERT CAR CONDITIONS (Same as before)
-- =============================================
INSERT INTO car_conditions (name, description, price_multiplier) VALUES
('excellent', 'Like new condition, no visible damage, all systems working perfectly', 1.00),
('good', 'Minor wear and tear, some small scratches or dents, mechanically sound', 0.85),
('fair', 'Visible damage, some mechanical issues, needs some repairs', 0.70),
('poor', 'Significant damage, major mechanical problems, requires extensive repairs', 0.50)
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- INSERT CALLBACK TIME SLOTS (Same as before)
-- =============================================
INSERT INTO callback_time_slots (name, start_time, end_time) VALUES
('morning', '09:00:00', '12:00:00'),
('afternoon', '12:00:00', '17:00:00'),
('evening', '17:00:00', '20:00:00')
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- INSERT SAMPLE ADMIN USER
-- =============================================
INSERT INTO users (email, phone, name, role) VALUES
('admin@carsell.com', '+919876543210', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- =============================================
-- INSERT SAMPLE CAR ESTIMATES (Indian examples)
-- =============================================
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
