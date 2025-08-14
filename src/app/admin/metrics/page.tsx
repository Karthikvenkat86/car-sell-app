'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { getEstimateStats, getEstimateStatsByMake } from '@/lib/database'
import { LogOut, BarChart2, PieChart } from 'lucide-react'

type MakeStats = Record<string, { total: number; pending: number; completed: number }>

export default function AdminMetricsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, pending: 0, inspected: 0, approved: 0, rejected: 0, completed: 0 })
  const [makeStats, setMakeStats] = useState<MakeStats>({})
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

  const fetchStats = useCallback(async () => {
    const [s, ms] = await Promise.all([getEstimateStats(), getEstimateStatsByMake()])
    setStats(s)
    setMakeStats(ms)
  }, [])

  useEffect(() => {
    checkAuth()
    fetchStats()
  }, [checkAuth, fetchStats])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
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
              <a href="/admin/callbacks" className="text-sm font-medium text-gray-600 hover:text-gray-900">Callbacks</a>
              <a href="/admin/metrics" className="text-sm font-medium text-primary-700">Metrics</a>
              <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-gray-900">
                <LogOut className="h-5 w-5 mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Usage & Metrics</h2>
          <p className="text-gray-600">Overview of requests and performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <div className="card md:col-span-1"><div className="text-2xl font-bold">{stats.total}</div><div className="text-sm text-gray-600">Total</div></div>
          <div className="card md:col-span-1"><div className="text-2xl font-bold text-yellow-600">{stats.pending}</div><div className="text-sm text-gray-600">Pending</div></div>
          <div className="card md:col-span-1"><div className="text-2xl font-bold text-blue-600">{stats.inspected}</div><div className="text-sm text-gray-600">Inspected</div></div>
          <div className="card md:col-span-1"><div className="text-2xl font-bold text-green-600">{stats.approved}</div><div className="text-sm text-gray-600">Approved</div></div>
          <div className="card md:col-span-1"><div className="text-2xl font-bold text-red-600">{stats.rejected}</div><div className="text-sm text-gray-600">Rejected</div></div>
          <div className="card md:col-span-1"><div className="text-2xl font-bold text-gray-700">{stats.completed}</div><div className="text-sm text-gray-600">Completed</div></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Requests by Make</h3>
              <BarChart2 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {Object.entries(makeStats).map(([make, s]) => (
                <div key={make} className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-800">{make}</div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span>Total: {s.total}</span>
                    <span>Pending: {s.pending}</span>
                    <span>Completed: {s.completed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Status Distribution</h3>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-between"><span>Pending</span><span>{stats.pending}</span></div>
              <div className="flex items-center justify-between"><span>Inspected</span><span>{stats.inspected}</span></div>
              <div className="flex items-center justify-between"><span>Approved</span><span>{stats.approved}</span></div>
              <div className="flex items-center justify-between"><span>Rejected</span><span>{stats.rejected}</span></div>
              <div className="flex items-center justify-between"><span>Completed</span><span>{stats.completed}</span></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


