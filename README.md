# CarSell - Car Selling Web Application

A modern web application for selling cars with instant cash offers. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

### End User Features
- **Car Details Submission**: Users can submit car information including make, model, year, mileage, and condition
- **Photo Upload**: Upload up to 5 photos of the car
- **Price Estimation**: Submit expected price for the car
- **Callback Requests**: Request a callback from the company
- **Mobile Responsive**: Fully responsive design that works on all devices

### Admin Features
- **Dashboard**: View all car estimate requests with status tracking
- **Status Management**: Update request status (pending → inspected → approved → completed)
- **Photo Review**: View uploaded car photos
- **Price Management**: Set final prices after inspection
- **Notes System**: Add admin notes for each request
- **Statistics**: View summary statistics of all requests

## Business Workflow

1. **Customer submits car details** with photos and expected price
2. **Admin reviews** the submission and schedules inspection
3. **In-person inspection** is conducted
4. **Immediate payment** is made to the customer
5. **Car ownership transfer** is completed
6. **Customer hands over keys**

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Backend**: Supabase (Database, Authentication, Storage)
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd car-sell-app
npm install
```

### 2. Set up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

Run the following SQL in your Supabase SQL editor:

```sql
-- Create users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  phone TEXT,
  name TEXT
);

-- Create car_estimates table
CREATE TABLE car_estimates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  car_make TEXT NOT NULL,
  car_model TEXT NOT NULL,
  car_year INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  condition TEXT NOT NULL,
  expected_price DECIMAL(10,2) NOT NULL,
  photos TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'inspected', 'approved', 'rejected', 'completed')),
  admin_notes TEXT,
  final_price DECIMAL(10,2),
  inspection_date TIMESTAMP WITH TIME ZONE,
  callback_requested BOOLEAN DEFAULT FALSE,
  callback_phone TEXT,
  callback_time TEXT
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_estimates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can insert car estimates" ON car_estimates
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all estimates" ON car_estimates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update estimates" ON car_estimates
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );
```

### 4. Storage Setup

1. In your Supabase dashboard, go to Storage
2. Create a new bucket called `car-media`
3. Set the bucket to public
4. Create a storage policy:

```sql
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'car-media');

CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'car-media' AND auth.role() = 'authenticated');
```

### 5. Create Admin User

1. Sign up a new user through the application
2. In Supabase SQL editor, update the user role:

```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

### 6. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx          # Admin login page
│   │   └── page.tsx              # Admin dashboard
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main landing page
├── components/                   # Reusable components
├── lib/
│   └── supabase.ts              # Supabase client and types
└── types/                       # TypeScript type definitions
```

## Key Features Implementation

### Mobile Responsive Design
- Uses Tailwind CSS responsive classes
- Mobile-first approach with breakpoints
- Touch-friendly interface elements

### File Upload
- Supabase Storage integration
- Multiple file upload support
- Image preview functionality

### Real-time Updates
- Supabase real-time subscriptions
- Toast notifications for user feedback

### Security
- Row Level Security (RLS) policies
- Role-based access control
- Secure file upload with authentication

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
