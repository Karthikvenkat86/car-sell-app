import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface CarEstimate {
  id: string
  created_at: string
  updated_at: string
  user_id?: string
  
  // Car Information
  vehicle_type: 'car' | 'bike'
  car_make: string
  car_model: string
  car_year: number
  mileage: number
  condition: string
  expected_price: number
  
  // Photos
  photos: string[]
  
  // Customer Information
  customer_name: string
  customer_phone: string
  customer_email: string
  
  // Callback Information
  callback_requested: boolean
  callback_phone?: string
  callback_time?: string
  
  // Admin Information
  status: 'pending' | 'inspected' | 'approved' | 'rejected' | 'completed'
  admin_notes?: string
  final_price?: number
  inspection_date?: string
}

export interface User {
  id: string
  email: string
  phone?: string
  name?: string
  role: 'admin' | 'user'
  created_at: string
  updated_at: string
}

export interface CarMake {
  id: string
  name: string
  logo_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
  vehicle_type: 'car' | 'bike'
}

export interface CarModel {
  id: string
  make_id: string
  name: string
  year_start?: number
  year_end?: number
  body_type?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CarCondition {
  id: string
  name: string
  description?: string
  price_multiplier: number
  is_active: boolean
  created_at: string
}

export interface CallbackTimeSlot {
  id: string
  name: string
  start_time?: string
  end_time?: string
  is_active: boolean
  created_at: string
}

export interface PriceEstimate {
  id: string
  car_estimate_id: string
  estimated_price: number
  estimated_by?: string
  notes?: string
  created_at: string
}

export interface AdminActivityLog {
  id: string
  admin_id: string
  car_estimate_id?: string
  action: string
  old_value?: string
  new_value?: string
  created_at: string
}
