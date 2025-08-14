'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { getCallbackRequests, updateCarEstimate } from '@/lib/database'
import type { CarEstimate } from '@/lib/supabase'
import { Phone, Clock, CheckCircle, XCircle, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminCallbacksPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [callbacks, setCallbacks] = useState<CarEstimate[]>([])
  const router = useRouter()

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single()
      if (userData?.role === 'admin') {
        setIsAuthenticated(true)
      } else {
        router.push('/')
      }
    } else {
      router.push('/')
    }
    setIsLoading(false)
  }, [router])

  const fetchCallbacks = useCallback(async () => {
    try {
      const data = await getCallbackRequests()
      setCallbacks(data)
    } catch (error) {
      toast.error('Failed to fetch callbacks')
    }
  }, [])

  useEffect(() => {
    checkAuth()
    fetchCallbacks()
  }, [checkAuth, fetchCallbacks])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const markContacted = async (estimateId: string) => {
    try {
      await updateCarEstimate(estimateId, { status: 'inspected' })
      toast.success('Marked as contacted')
      fetchCallbacks()
    } catch {
      toast.error('Failed to update status')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center logo-crop" style={{height: 82}}>
              <Image className="logo-img--tight" src="/green-carz-logo.svg" alt="green Carz" width={260} height={94} />
              <h1 className="sr-only">green Carz Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <a href="/admin" className="text-sm font-medium text-gray-600 hover:text-gray-900">Estimates</a>
              <a href="/admin/callbacks" className="text-sm font-medium text-primary-700">Callbacks</a>
              <a href="/admin/metrics" className="text-sm font-medium text-gray-600 hover:text-gray-900">Metrics</a>
              <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-gray-900">
                <LogOut className="h-5 w-5 mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Callback Requests</h2>
          <p className="text-gray-600">All customers who requested a callback</p>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {callbacks.map((cb) => (
                  <tr key={cb.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cb.customer_name}</div>
                      <div className="text-xs text-gray-500">{cb.customer_email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`tel:${cb.callback_phone || cb.customer_phone}`} className="inline-flex items-center text-primary-700 hover:text-primary-900">
                        <Phone className="h-4 w-4 mr-1" /> {cb.callback_phone || cb.customer_phone}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {cb.callback_time || 'Anytime'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {cb.car_year} {cb.car_make} {cb.car_model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(cb.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button onClick={() => markContacted(cb.id)} className="text-green-600 hover:text-green-800 inline-flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" /> Mark Contacted
                      </button>
                      <button onClick={() => router.push('/admin')} className="text-gray-600 hover:text-gray-900 inline-flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> View Estimate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}


