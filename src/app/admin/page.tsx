'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { CarEstimate } from '@/lib/supabase'
import { Car, LogOut, Eye, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [estimates, setEstimates] = useState<CarEstimate[]>([])
  const [selectedEstimate, setSelectedEstimate] = useState<CarEstimate | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')
  const [finalPrice, setFinalPrice] = useState('')
  const router = useRouter()

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      // Check if user is admin
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

  const fetchEstimates = useCallback(async () => {
    const { data, error } = await supabase
      .from('car_estimates')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch estimates')
    } else {
      setEstimates(data || [])
    }
  }, [])

  useEffect(() => {
    checkAuth()
    fetchEstimates()
  }, [checkAuth, fetchEstimates])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const updateEstimateStatus = async (id: string, status: CarEstimate['status'], notes?: string, price?: number) => {
    const updateData: any = { status }
    
    if (notes) updateData.admin_notes = notes
    if (price) updateData.final_price = price
    if (status === 'inspected') updateData.inspection_date = new Date().toISOString()

    const { error } = await supabase
      .from('car_estimates')
      .update(updateData)
      .eq('id', id)

    if (error) {
      toast.error('Failed to update estimate')
    } else {
      toast.success('Estimate updated successfully')
      fetchEstimates()
      setShowModal(false)
      setSelectedEstimate(null)
      setAdminNotes('')
      setFinalPrice('')
    }
  }

  const getStatusColor = (status: CarEstimate['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inspected': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: CarEstimate['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'inspected': return <Eye className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      case 'completed': return <DollarSign className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-primary-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">CarSell Admin</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Car Estimates</h2>
          <p className="text-gray-600">Manage car estimate requests from customers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="card">
            <div className="text-2xl font-bold text-gray-900">{estimates.length}</div>
            <div className="text-sm text-gray-600">Total Requests</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-yellow-600">
              {estimates.filter(e => e.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-blue-600">
              {estimates.filter(e => e.status === 'inspected').length}
            </div>
            <div className="text-sm text-gray-600">Inspected</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-green-600">
              {estimates.filter(e => e.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-gray-600">
              {estimates.filter(e => e.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Estimates List */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expected Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {estimates.map((estimate) => (
                  <tr key={estimate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {estimate.car_year} {estimate.car_make} {estimate.car_model}
                        </div>
                        <div className="text-sm text-gray-500">
                          {estimate.mileage.toLocaleString()} miles • {estimate.condition}
                        </div>
                        {estimate.callback_requested && (
                          <div className="text-xs text-blue-600 mt-1">
                            Callback requested: {estimate.callback_phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${estimate.expected_price.toLocaleString()}
                      </div>
                      {estimate.final_price && (
                        <div className="text-sm text-green-600">
                          Final: ${estimate.final_price.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(estimate.status)}`}>
                        {getStatusIcon(estimate.status)}
                        <span className="ml-1">{estimate.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(estimate.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedEstimate(estimate)
                          setShowModal(true)
                        }}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && selectedEstimate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Car Estimate Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Car Information</h4>
                  <p><strong>Make:</strong> {selectedEstimate.car_make}</p>
                  <p><strong>Model:</strong> {selectedEstimate.car_model}</p>
                  <p><strong>Year:</strong> {selectedEstimate.car_year}</p>
                  <p><strong>Mileage:</strong> {selectedEstimate.mileage.toLocaleString()} miles</p>
                  <p><strong>Condition:</strong> {selectedEstimate.condition}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Pricing</h4>
                  <p><strong>Expected Price:</strong> ${selectedEstimate.expected_price.toLocaleString()}</p>
                  {selectedEstimate.final_price && (
                    <p><strong>Final Price:</strong> ${selectedEstimate.final_price.toLocaleString()}</p>
                  )}
                  <p><strong>Status:</strong> {selectedEstimate.status}</p>
                  {selectedEstimate.inspection_date && (
                    <p><strong>Inspection Date:</strong> {new Date(selectedEstimate.inspection_date).toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              {/* Photos */}
              {selectedEstimate.photos && selectedEstimate.photos.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Car Photos</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedEstimate.photos.map((photo, index) => (
                      <Image
                        key={index}
                        src={photo}
                        alt={`Car photo ${index + 1}`}
                        width={96}
                        height={96}
                        className="w-full h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Actions */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="input-field"
                    rows={3}
                    placeholder="Add notes about the inspection..."
                  />
                </div>

                {selectedEstimate.status === 'pending' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Final Price ($)
                    </label>
                    <input
                      type="number"
                      value={finalPrice}
                      onChange={(e) => setFinalPrice(e.target.value)}
                      className="input-field"
                      placeholder="Enter final price after inspection"
                    />
                  </div>
                )}

                <div className="flex space-x-2">
                  {selectedEstimate.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateEstimateStatus(selectedEstimate.id, 'inspected', adminNotes)}
                        className="btn-primary"
                      >
                        Mark as Inspected
                      </button>
                      <button
                        onClick={() => updateEstimateStatus(selectedEstimate.id, 'rejected', adminNotes)}
                        className="btn-secondary"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  
                  {selectedEstimate.status === 'inspected' && (
                    <>
                      <button
                        onClick={() => updateEstimateStatus(selectedEstimate.id, 'approved', adminNotes, Number(finalPrice))}
                        className="btn-primary"
                        disabled={!finalPrice}
                      >
                        Approve with Price
                      </button>
                      <button
                        onClick={() => updateEstimateStatus(selectedEstimate.id, 'rejected', adminNotes)}
                        className="btn-secondary"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {selectedEstimate.status === 'approved' && (
                    <button
                      onClick={() => updateEstimateStatus(selectedEstimate.id, 'completed', adminNotes)}
                      className="btn-primary"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
