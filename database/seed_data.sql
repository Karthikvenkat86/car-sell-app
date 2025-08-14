-- CarSell Application Seed Data
-- This file contains sample data to populate the database

-- =============================================
-- INSERT SAMPLE CAR MAKES
-- =============================================
INSERT INTO car_makes (name, logo_url, vehicle_type) VALUES
('Toyota', 'https://example.com/logos/toyota.png', 'car'),
('Honda', 'https://example.com/logos/honda.png', 'car'),
('Ford', 'https://example.com/logos/ford.png', 'car'),
('Chevrolet', 'https://example.com/logos/chevrolet.png', 'car'),
('Nissan', 'https://example.com/logos/nissan.png', 'car'),
('BMW', 'https://example.com/logos/bmw.png', 'car'),
('Mercedes-Benz', 'https://example.com/logos/mercedes.png', 'car'),
('Audi', 'https://example.com/logos/audi.png', 'car'),
('Hyundai', 'https://example.com/logos/hyundai.png', 'car'),
('Kia', 'https://example.com/logos/kia.png', 'car'),
('Volkswagen', 'https://example.com/logos/volkswagen.png', 'car'),
('Mazda', 'https://example.com/logos/mazda.png', 'car'),
('Subaru', 'https://example.com/logos/subaru.png', 'car'),
('Lexus', 'https://example.com/logos/lexus.png', 'car'),
('Acura', 'https://example.com/logos/acura.png', 'car'),
-- Bike makes
('Hero', 'https://example.com/logos/hero.png', 'bike'),
('Bajaj', 'https://example.com/logos/bajaj.png', 'bike'),
('TVS', 'https://example.com/logos/tvs.png', 'bike'),
('Royal Enfield', 'https://example.com/logos/royalenfield.png', 'bike'),
('Yamaha', 'https://example.com/logos/yamaha.png', 'bike'),
('Suzuki', 'https://example.com/logos/suzuki.png', 'bike'),
('KTM', 'https://example.com/logos/ktm.png', 'bike')
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- INSERT SAMPLE CAR MODELS
-- =============================================

-- Toyota Models
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Camry', 1982, 2024, 'sedan' FROM car_makes WHERE name = 'Toyota'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Corolla', 1966, 2024, 'sedan' FROM car_makes WHERE name = 'Toyota'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'RAV4', 1994, 2024, 'SUV' FROM car_makes WHERE name = 'Toyota'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Highlander', 2000, 2024, 'SUV' FROM car_makes WHERE name = 'Toyota'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Tacoma', 1995, 2024, 'truck' FROM car_makes WHERE name = 'Toyota'
ON CONFLICT (make_id, name) DO NOTHING;

-- Honda Models
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Accord', 1976, 2024, 'sedan' FROM car_makes WHERE name = 'Honda'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Civic', 1972, 2024, 'sedan' FROM car_makes WHERE name = 'Honda'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'CR-V', 1995, 2024, 'SUV' FROM car_makes WHERE name = 'Honda'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Pilot', 2002, 2024, 'SUV' FROM car_makes WHERE name = 'Honda'
ON CONFLICT (make_id, name) DO NOTHING;

-- Ford Models
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'F-150', 1975, 2024, 'truck' FROM car_makes WHERE name = 'Ford'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Mustang', 1964, 2024, 'coupe' FROM car_makes WHERE name = 'Ford'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Explorer', 1990, 2024, 'SUV' FROM car_makes WHERE name = 'Ford'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Escape', 2000, 2024, 'SUV' FROM car_makes WHERE name = 'Ford'
ON CONFLICT (make_id, name) DO NOTHING;

-- Chevrolet Models
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Silverado', 1998, 2024, 'truck' FROM car_makes WHERE name = 'Chevrolet'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Malibu', 1964, 2024, 'sedan' FROM car_makes WHERE name = 'Chevrolet'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Equinox', 2004, 2024, 'SUV' FROM car_makes WHERE name = 'Chevrolet'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Camaro', 1966, 2024, 'coupe' FROM car_makes WHERE name = 'Chevrolet'
ON CONFLICT (make_id, name) DO NOTHING;

-- Nissan Models
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Altima', 1992, 2024, 'sedan' FROM car_makes WHERE name = 'Nissan'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Sentra', 1982, 2024, 'sedan' FROM car_makes WHERE name = 'Nissan'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Rogue', 2007, 2024, 'SUV' FROM car_makes WHERE name = 'Nissan'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'Maxima', 1981, 2024, 'sedan' FROM car_makes WHERE name = 'Nissan'
ON CONFLICT (make_id, name) DO NOTHING;

-- BMW Models
INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, '3 Series', 1975, 2024, 'sedan' FROM car_makes WHERE name = 'BMW'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, '5 Series', 1972, 2024, 'sedan' FROM car_makes WHERE name = 'BMW'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'X3', 2003, 2024, 'SUV' FROM car_makes WHERE name = 'BMW'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type) 
SELECT id, 'X5', 1999, 2024, 'SUV' FROM car_makes WHERE name = 'BMW'
ON CONFLICT (make_id, name) DO NOTHING;

-- =============================================
-- INSERT SAMPLE BIKE MODELS
-- =============================================
INSERT INTO car_models (make_id, name, year_start, year_end, body_type)
SELECT id, 'Splendor', 1994, 2024, 'motorcycle' FROM car_makes WHERE name = 'Hero'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type)
SELECT id, 'Pulsar 150', 2001, 2024, 'motorcycle' FROM car_makes WHERE name = 'Bajaj'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type)
SELECT id, 'Apache RTR 160', 2007, 2024, 'motorcycle' FROM car_makes WHERE name = 'TVS'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type)
SELECT id, 'Classic 350', 2009, 2024, 'motorcycle' FROM car_makes WHERE name = 'Royal Enfield'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type)
SELECT id, 'FZ-S', 2008, 2024, 'motorcycle' FROM car_makes WHERE name = 'Yamaha'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type)
SELECT id, 'Gixxer', 2014, 2024, 'motorcycle' FROM car_makes WHERE name = 'Suzuki'
ON CONFLICT (make_id, name) DO NOTHING;

INSERT INTO car_models (make_id, name, year_start, year_end, body_type)
SELECT id, 'Duke 200', 2012, 2024, 'motorcycle' FROM car_makes WHERE name = 'KTM'
ON CONFLICT (make_id, name) DO NOTHING;

-- =============================================
-- INSERT CAR CONDITIONS
-- =============================================
INSERT INTO car_conditions (name, description, price_multiplier) VALUES
('excellent', 'Like new condition, no visible damage, all systems working perfectly', 1.00),
('good', 'Minor wear and tear, some small scratches or dents, mechanically sound', 0.85),
('fair', 'Visible damage, some mechanical issues, needs some repairs', 0.70),
('poor', 'Significant damage, major mechanical problems, requires extensive repairs', 0.50)
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- INSERT CALLBACK TIME SLOTS
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
('admin@carsell.com', '+1234567890', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- =============================================
-- INSERT SAMPLE CAR ESTIMATES (for testing)
-- =============================================
INSERT INTO car_estimates (
    vehicle_type,
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
('car','Toyota', 'Camry', 2020, 45000, 'excellent', 25000.00, 'John Doe', '+1234567890', 'john@example.com', true, '+1234567890', 'morning', 'pending'),
('car','Honda', 'Accord', 2018, 65000, 'good', 18000.00, 'Jane Smith', '+1234567891', 'jane@example.com', false, NULL, NULL, 'pending'),
('car','Ford', 'F-150', 2019, 35000, 'excellent', 35000.00, 'Mike Johnson', '+1234567892', 'mike@example.com', true, '+1234567892', 'afternoon', 'inspected'),
('car','BMW', '3 Series', 2021, 25000, 'excellent', 40000.00, 'Sarah Wilson', '+1234567893', 'sarah@example.com', false, NULL, NULL, 'approved'),
('car','Chevrolet', 'Malibu', 2017, 80000, 'fair', 12000.00, 'David Brown', '+1234567894', 'david@example.com', true, '+1234567894', 'evening', 'completed'),
('bike','Hero', 'Splendor', 2019, 22000, 'good', 550.00, 'Ravi Kumar', '+1234567800', 'ravi@example.com', true, '+1234567800', 'morning', 'pending');
