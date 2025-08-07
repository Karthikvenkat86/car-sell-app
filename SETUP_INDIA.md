# 🚗 CarSell App - India Market Setup Guide

## Overview
Your CarSell application has been updated for the Indian market with:
- **Indian car makes and models** (Maruti Suzuki, Hyundai, Tata Motors, etc.)
- **Storage bucket "car-media"** for photo uploads
- **Indian pricing examples** (in INR)
- **Indian phone number format** (+91)

## 📋 Setup Steps

### 1. Database Schema Setup

1. **Go to your Supabase dashboard**
2. **Navigate to SQL Editor**
3. **Run the schema creation script**

Copy and paste the contents of `database/schema.sql` into your Supabase SQL Editor and execute it.

### 2. Indian Car Data Setup

1. **In the same SQL Editor**
2. **Run the Indian seed data script**

Copy and paste the contents of `database/seed_data_india.sql` into your Supabase SQL Editor and execute it.

**OR** if you have existing data and want to migrate:

Copy and paste the contents of `database/migration_to_india.sql` into your Supabase SQL Editor and execute it.

### 3. Storage Bucket Setup (IMPORTANT)

1. **In your Supabase dashboard, go to Storage**
2. **Create a new bucket called `car-media`**
3. **Set the bucket to public**
4. **Create storage policies by running this SQL:**

```sql
-- Public access for viewing images
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'car-media');

-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'car-media' AND auth.role() = 'authenticated');

-- Users can update own files
CREATE POLICY "Users can update own files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'car-media' AND auth.role() = 'authenticated');

-- Users can delete own files
CREATE POLICY "Users can delete own files" ON storage.objects
  FOR DELETE USING (bucket_id = 'car-media' AND auth.role() = 'authenticated');
```

### 4. Authentication Setup

1. **In your Supabase dashboard, go to Authentication > Settings**
2. **Enable Email authentication**
3. **Create an admin user:**
   - Go to Authentication > Users
   - Click "Add User"
   - Email: `admin@carsell.com`
   - Password: `admin123` (or your preferred password)

### 5. Set Admin Role

Run this SQL in your Supabase SQL Editor:

```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'admin@carsell.com';
```

## 🎉 What's New for India

### Indian Car Makes Included:
- **Maruti Suzuki** (Most popular in India)
- **Hyundai** (Second largest)
- **Tata Motors** (Indian manufacturer)
- **Mahindra** (Indian manufacturer)
- **Honda** (Popular sedans)
- **Toyota** (Premium segment)
- **Kia** (Growing presence)
- **MG Motor** (New entrant)
- **Renault** (Budget segment)
- **Nissan** (Compact SUVs)
- **Ford** (SUV focus)
- **Volkswagen** (Premium hatchbacks)
- **Skoda** (Premium sedans)
- **BMW** (Luxury segment)
- **Mercedes-Benz** (Luxury segment)
- **Audi** (Luxury segment)
- **Volvo** (Premium safety)
- **Jaguar** (Luxury performance)
- **Land Rover** (Premium SUVs)
- **Lexus** (Ultra luxury)

### Popular Indian Car Models:
- **Maruti Suzuki**: Swift, Dzire, Baleno, Brezza, Ertiga, Alto, WagonR
- **Hyundai**: i20, Verna, Creta, Venue, i10, Aura
- **Tata Motors**: Nexon (EV), Punch, Harrier, Safari, Tiago, Altroz
- **Mahindra**: Thar, XUV700, XUV300, Scorpio, Bolero
- **Honda**: City, Amaze, Jazz, WR-V
- **Toyota**: Innova, Fortuner, Glanza, Camry
- **Kia**: Seltos, Sonet, Carens
- **MG Motor**: Hector, Astor, Comet EV
- **Renault**: Kwid, Triber, Kiger
- **Nissan**: Magnite, Kicks
- **Ford**: EcoSport, Endeavour
- **Volkswagen**: Polo, Vento, Taigun
- **Skoda**: Rapid, Kushaq, Superb

### Indian Market Features:
- **Pricing in INR** (Indian Rupees)
- **Indian phone numbers** (+91 format)
- **Indian customer names** in sample data
- **Popular Indian car segments** (hatchback, sedan, SUV, MPV)

## 🔧 Testing Your Setup

### 1. Test Customer Form
1. Go to your app homepage
2. Fill out the car estimate form
3. You should see Indian car makes in the dropdown:
   - Maruti Suzuki (should be first)
   - Hyundai
   - Tata Motors
   - etc.
4. Select a make and see Indian models
5. Submit the form - data should be saved to database

### 2. Test Photo Upload
1. Upload car photos in the form
2. Photos should be stored in the `car-media` bucket
3. Check Supabase Storage to verify uploads

### 3. Test Admin Panel
1. Go to `/admin` and login with `admin@carsell.com`
2. You should see the estimates list with statistics
3. Try updating an estimate status
4. Check that activity is logged

### 4. Verify Database
1. In Supabase dashboard, go to Table Editor
2. Check that data appears in `car_estimates` table
3. Verify customer information is saved correctly
4. Check `car_makes` and `car_models` tables for Indian data

## 🚀 Next Steps

### Optional Enhancements:
1. **Add more Indian car models** - Edit `database/seed_data_india.sql`
2. **Add regional pricing** - Implement city-based pricing
3. **Add Hindi language support** - Implement localization
4. **Add Indian payment gateways** - Integrate Razorpay/PayU
5. **Add Indian address fields** - Include city, state, pincode

### Production Considerations:
1. **Set up proper authentication** - Configure Supabase Auth
2. **Add data validation** - Implement form validation
3. **Set up backups** - Configure database backups
4. **Monitor performance** - Add analytics and monitoring
5. **Add Indian compliance** - GDPR, data protection laws

## 📚 Files Created/Modified

### New Files:
- `database/seed_data_india.sql` - Indian car market data
- `database/migration_to_india.sql` - Migration script for existing databases
- `SETUP_INDIA.md` - This setup guide

### Modified Files:
- `src/app/page.tsx` - Updated to use 'car-media' storage bucket
- `README.md` - Updated storage bucket instructions

## 🔍 Troubleshooting

### Storage Issues:
- **Error: "Bucket not found"** - Make sure you created the `car-media` bucket
- **Error: "Access denied"** - Check storage policies are set correctly
- **Photos not uploading** - Verify bucket is set to public

### Database Issues:
- **Car makes not showing** - Run the seed data script again
- **Models not loading** - Check foreign key relationships
- **Data not saving** - Verify RLS policies are correct

### Authentication Issues:
- **Admin login failing** - Check user exists and role is set to 'admin'
- **User creation failing** - Verify email authentication is enabled

## 📞 Support

For support with the Indian market setup:
1. Check the troubleshooting section above
2. Verify all SQL scripts executed successfully
3. Ensure storage bucket is configured correctly
4. Test with the provided sample data

## 🎯 Key Indian Market Insights

### Popular Segments:
- **Hatchback**: Most popular segment (Swift, i20, Baleno)
- **SUV**: Fastest growing segment (Brezza, Creta, Thar)
- **Sedan**: Premium segment (City, Verna, Dzire)
- **MPV**: Family segment (Innova, Ertiga, Triber)

### Price Ranges (INR):
- **Budget**: 3-8 lakhs (Alto, Kwid, Tiago)
- **Mid-range**: 8-15 lakhs (Swift, i20, Brezza)
- **Premium**: 15-25 lakhs (City, Creta, Thar)
- **Luxury**: 25+ lakhs (BMW, Mercedes, Audi)

### Popular Features:
- **Fuel efficiency** - Important for Indian buyers
- **Low maintenance** - Maruti Suzuki advantage
- **Resale value** - Toyota, Honda, Maruti Suzuki
- **Safety ratings** - Tata Motors, Mahindra focus
- **Electric vehicles** - Tata Nexon, MG Comet EV
