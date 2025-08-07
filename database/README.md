# CarSell Database Setup

This directory contains SQL scripts to set up and manage the CarSell application database.

## Files Overview

### 1. `schema.sql`
Complete database schema with all tables, indexes, and triggers.
- **Use this for**: Fresh database setup
- **Contains**: All table definitions, indexes, and triggers

### 2. `seed_data.sql`
Sample data to populate the database with initial content.
- **Use this for**: Adding sample data after schema setup
- **Contains**: Sample car makes, models, conditions, and test data

### 3. `migrations.sql`
Migration scripts to update existing database structure.
- **Use this for**: Updating existing database without losing data
- **Contains**: Safe migration scripts that check for existing structures

## Setup Instructions

### Option 1: Fresh Database Setup

1. **Create the database schema:**
   ```sql
   \i database/schema.sql
   ```

2. **Add sample data:**
   ```sql
   \i database/seed_data.sql
   ```

### Option 2: Update Existing Database

1. **Run migrations to update existing structure:**
   ```sql
   \i database/migrations.sql
   ```

2. **Add sample data (optional):**
   ```sql
   \i database/seed_data.sql
   ```

## Database Structure

### Core Tables

#### `users`
- Stores user accounts (customers and admins)
- Supports role-based access (user/admin)

#### `car_makes`
- Reference table for car manufacturers
- Examples: Toyota, Honda, Ford, BMW

#### `car_models`
- Reference table for car models
- Linked to car_makes via foreign key
- Examples: Camry, Accord, F-150

#### `car_estimates`
- Main table for customer car submissions
- Stores all car details, photos, and contact info
- Tracks status through the estimation process

### Supporting Tables

#### `car_conditions`
- Reference data for car conditions
- Includes price multipliers for different conditions

#### `callback_time_slots`
- Available callback time periods
- Used for scheduling customer callbacks

#### `price_estimates`
- Historical price estimates
- Tracks all price changes and who made them

#### `admin_activity_log`
- Audit trail for admin actions
- Records all changes made by administrators

## Key Features

### Data Integrity
- Foreign key constraints ensure data consistency
- Check constraints validate status and condition values
- Unique constraints prevent duplicate entries

### Performance
- Strategic indexes on frequently queried columns
- Composite indexes for complex queries
- Optimized for common admin dashboard queries

### Audit Trail
- Automatic `updated_at` timestamps via triggers
- Admin activity logging
- Price estimate history tracking

### Scalability
- UUID primary keys for distributed systems
- Proper indexing strategy
- Normalized structure to prevent data redundancy

## Usage Examples

### Query all pending estimates
```sql
SELECT * FROM car_estimates WHERE status = 'pending' ORDER BY created_at DESC;
```

### Get car models for a specific make
```sql
SELECT cm.name, cm.body_type, cm.year_start, cm.year_end
FROM car_models cm
JOIN car_makes cmk ON cm.make_id = cmk.id
WHERE cmk.name = 'Toyota' AND cm.is_active = true;
```

### Get admin activity for a specific estimate
```sql
SELECT aal.action, aal.old_value, aal.new_value, aal.created_at, u.name as admin_name
FROM admin_activity_log aal
JOIN users u ON aal.admin_id = u.id
WHERE aal.car_estimate_id = 'your-estimate-id'
ORDER BY aal.created_at DESC;
```

## Environment Variables

Make sure your Supabase environment variables are set:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Notes

- All scripts use `IF NOT EXISTS` and `ON CONFLICT` clauses for safe execution
- Migrations are designed to be run multiple times safely
- Sample data includes realistic car makes and models
- Admin user is created with email: `admin@carsell.com`
