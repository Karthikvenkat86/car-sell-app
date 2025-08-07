import { supabase } from './supabase'
import type { 
  CarEstimate, 
  User, 
  CarMake, 
  CarModel, 
  CarCondition, 
  CallbackTimeSlot,
  PriceEstimate,
  AdminActivityLog 
} from './supabase'

// =============================================
// CAR MAKES & MODELS
// =============================================

export async function getCarMakes(): Promise<CarMake[]> {
  console.log('getCarMakes called')
  const { data, error } = await supabase
    .from('car_makes')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) {
    console.error('Error getting car makes:', error)
    throw error
  }
  
  console.log('Car makes loaded:', data)
  return data || []
}

export async function getCarModels(makeId: string): Promise<CarModel[]> {
  const { data, error } = await supabase
    .from('car_models')
    .select('*')
    .eq('make_id', makeId)
    .eq('is_active', true)
    .order('name')

  if (error) throw error
  return data || []
}

export async function getCarModelsByMakeName(makeName: string): Promise<CarModel[]> {
  console.log('getCarModelsByMakeName called with:', makeName)
  
  // First, get the make ID
  const { data: makeData, error: makeError } = await supabase
    .from('car_makes')
    .select('id')
    .eq('name', makeName)
    .eq('is_active', true)
    .single()

  if (makeError) {
    console.error('Error getting make ID:', makeError)
    throw makeError
  }
  if (!makeData) {
    console.log('No make found for:', makeName)
    return []
  }

  console.log('Found make ID:', makeData.id)

  // Then, get the models for this make
  const { data, error } = await supabase
    .from('car_models')
    .select('*')
    .eq('make_id', makeData.id)
    .eq('is_active', true)
    .order('name')

  if (error) {
    console.error('Error getting models:', error)
    throw error
  }
  
  console.log('Found models:', data)
  return data || []
}

// =============================================
// CAR CONDITIONS
// =============================================

export async function getCarConditions(): Promise<CarCondition[]> {
  const { data, error } = await supabase
    .from('car_conditions')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) throw error
  return data || []
}

// =============================================
// CALLBACK TIME SLOTS
// =============================================

export async function getCallbackTimeSlots(): Promise<CallbackTimeSlot[]> {
  const { data, error } = await supabase
    .from('callback_time_slots')
    .select('*')
    .eq('is_active', true)
    .order('start_time')

  if (error) throw error
  return data || []
}

// =============================================
// CAR ESTIMATES
// =============================================

export async function createCarEstimate(estimate: Omit<CarEstimate, 'id' | 'created_at' | 'updated_at'>): Promise<CarEstimate> {
  const { data, error } = await supabase
    .from('car_estimates')
    .insert(estimate)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getCarEstimates(status?: CarEstimate['status']): Promise<CarEstimate[]> {
  let query = supabase
    .from('car_estimates')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) throw error
  return data || []
}

export async function getCarEstimateById(id: string): Promise<CarEstimate | null> {
  const { data, error } = await supabase
    .from('car_estimates')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // No rows returned
    throw error
  }
  return data
}

export async function updateCarEstimate(id: string, updates: Partial<CarEstimate>): Promise<CarEstimate> {
  const { data, error } = await supabase
    .from('car_estimates')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCarEstimate(id: string): Promise<void> {
  const { error } = await supabase
    .from('car_estimates')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// =============================================
// USERS
// =============================================

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// =============================================
// PRICE ESTIMATES
// =============================================

export async function createPriceEstimate(priceEstimate: Omit<PriceEstimate, 'id' | 'created_at'>): Promise<PriceEstimate> {
  const { data, error } = await supabase
    .from('price_estimates')
    .insert(priceEstimate)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getPriceEstimatesByCarEstimate(carEstimateId: string): Promise<PriceEstimate[]> {
  const { data, error } = await supabase
    .from('price_estimates')
    .select('*')
    .eq('car_estimate_id', carEstimateId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// =============================================
// ADMIN ACTIVITY LOG
// =============================================

export async function logAdminActivity(activity: Omit<AdminActivityLog, 'id' | 'created_at'>): Promise<AdminActivityLog> {
  const { data, error } = await supabase
    .from('admin_activity_log')
    .insert(activity)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getAdminActivityLog(carEstimateId?: string): Promise<AdminActivityLog[]> {
  let query = supabase
    .from('admin_activity_log')
    .select(`
      *,
      users!admin_id(name, email)
    `)
    .order('created_at', { ascending: false })

  if (carEstimateId) {
    query = query.eq('car_estimate_id', carEstimateId)
  }

  const { data, error } = await query

  if (error) throw error
  return data || []
}

// =============================================
// STATISTICS & ANALYTICS
// =============================================

export async function getEstimateStats() {
  const { data, error } = await supabase
    .from('car_estimates')
    .select('status')

  if (error) throw error

  const stats = {
    total: data?.length || 0,
    pending: data?.filter(e => e.status === 'pending').length || 0,
    inspected: data?.filter(e => e.status === 'inspected').length || 0,
    approved: data?.filter(e => e.status === 'approved').length || 0,
    rejected: data?.filter(e => e.status === 'rejected').length || 0,
    completed: data?.filter(e => e.status === 'completed').length || 0,
  }

  return stats
}

export async function getEstimateStatsByMake() {
  const { data, error } = await supabase
    .from('car_estimates')
    .select('car_make, status')

  if (error) throw error

  const makeStats: Record<string, { total: number; pending: number; completed: number }> = {}

  data?.forEach(estimate => {
    if (!makeStats[estimate.car_make]) {
      makeStats[estimate.car_make] = { total: 0, pending: 0, completed: 0 }
    }
    
    makeStats[estimate.car_make].total++
    if (estimate.status === 'pending') makeStats[estimate.car_make].pending++
    if (estimate.status === 'completed') makeStats[estimate.car_make].completed++
  })

  return makeStats
}

// =============================================
// SEARCH & FILTER
// =============================================

export async function searchCarEstimates(searchTerm: string): Promise<CarEstimate[]> {
  const { data, error } = await supabase
    .from('car_estimates')
    .select('*')
    .or(`car_make.ilike.%${searchTerm}%,car_model.ilike.%${searchTerm}%,customer_name.ilike.%${searchTerm}%,customer_email.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getEstimatesByDateRange(startDate: string, endDate: string): Promise<CarEstimate[]> {
  const { data, error } = await supabase
    .from('car_estimates')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}
