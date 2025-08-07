import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface CarEstimate {
  id: string
  created_at: string
  user_id: string
  car_make: string
  car_model: string
  car_year: number
  mileage: number
  condition: string
  expected_price: number
  photos: string[]
  status: 'pending' | 'inspected' | 'approved' | 'rejected' | 'completed'
  admin_notes?: string
  final_price?: number
  inspection_date?: string
  callback_requested: boolean
  callback_phone?: string
  callback_time?: string
}

export interface User {
  id: string
  email: string
  role: 'admin' | 'user'
  created_at: string
  phone?: string
  name?: string
}
