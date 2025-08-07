#!/usr/bin/env node

/**
 * Database Setup Script for CarSell Application
 * 
 * This script helps you set up your Supabase database with the required schema and sample data.
 * 
 * Usage:
 * 1. Make sure you have your Supabase credentials in your .env.local file
 * 2. Run: node scripts/setup-database.js
 */

const fs = require('fs')
const path = require('path')

console.log('🚗 CarSell Database Setup Script')
console.log('================================')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!')
  console.log('Please create a .env.local file with your Supabase credentials:')
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
  process.exit(1)
}

console.log('✅ .env.local file found')

// Read the SQL files
const schemaPath = path.join(process.cwd(), 'database', 'schema.sql')
const seedPath = path.join(process.cwd(), 'database', 'seed_data.sql')

if (!fs.existsSync(schemaPath)) {
  console.error('❌ database/schema.sql not found!')
  process.exit(1)
}

if (!fs.existsSync(seedPath)) {
  console.error('❌ database/seed_data.sql not found!')
  process.exit(1)
}

const schemaSQL = fs.readFileSync(schemaPath, 'utf8')
const seedSQL = fs.readFileSync(seedPath, 'utf8')

console.log('✅ SQL files found')

console.log('\n📋 Setup Instructions:')
console.log('=====================')
console.log('1. Go to your Supabase dashboard')
console.log('2. Navigate to the SQL Editor')
console.log('3. Run the following SQL commands in order:')
console.log('')

console.log('📝 Step 1: Create the database schema')
console.log('Copy and paste this into your Supabase SQL Editor:')
console.log('----------------------------------------')
console.log(schemaSQL)
console.log('----------------------------------------')

console.log('\n📝 Step 2: Add sample data')
console.log('Copy and paste this into your Supabase SQL Editor:')
console.log('----------------------------------------')
console.log(seedSQL)
console.log('----------------------------------------')

console.log('\n✅ Setup complete!')
console.log('\n🎉 Your CarSell database is now ready!')
console.log('\n📊 What was created:')
console.log('- Users table (for customers and admins)')
console.log('- Car makes and models reference tables')
console.log('- Car estimates table (main application data)')
console.log('- Supporting tables (conditions, time slots, etc.)')
console.log('- Sample data including 15 car makes and 20+ models')
console.log('- Admin user: admin@carsell.com')
console.log('- 5 sample car estimates for testing')

console.log('\n🔧 Next steps:')
console.log('1. Set up authentication in your Supabase dashboard')
console.log('2. Create a user with email: admin@carsell.com')
console.log('3. Set the user role to "admin" in the users table')
console.log('4. Test your application!')

console.log('\n📚 For more information, see database/README.md')
