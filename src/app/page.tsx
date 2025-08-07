'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Car, Camera, Phone, DollarSign, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'

interface CarFormData {
  car_make: string
  car_model: string
  car_year: number
  mileage: number
  condition: string
  expected_price: number
  name: string
  phone: string
  email: string
  callback_requested: boolean
  callback_time?: string
}

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])
  const [photoUrls, setPhotoUrls] = useState<string[]>([])

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<CarFormData>()
  const callbackRequested = watch('callback_requested')

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 5) {
      toast.error('Maximum 5 photos allowed')
      return
    }
    setUploadedPhotos(files)
  }

  const uploadPhotos = async (files: File[]) => {
    const urls: string[] = []
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `car-photos/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('car-photos')
        .upload(filePath, file)

      if (uploadError) {
        throw new Error('Failed to upload photo')
      }

      const { data: { publicUrl } } = supabase.storage
        .from('car-photos')
        .getPublicUrl(filePath)

      urls.push(publicUrl)
    }

    return urls
  }

  const onSubmit = async (data: CarFormData) => {
    if (uploadedPhotos.length === 0) {
      toast.error('Please upload at least one photo of your car')
      return
    }

    setIsSubmitting(true)

    try {
      // Upload photos first
      const photoUrls = await uploadPhotos(uploadedPhotos)

      // Create car estimate record
      const { error } = await supabase
        .from('car_estimates')
        .insert({
          car_make: data.car_make,
          car_model: data.car_model,
          car_year: data.car_year,
          mileage: data.mileage,
          condition: data.condition,
          expected_price: data.expected_price,
          photos: photoUrls,
          callback_requested: data.callback_requested,
          callback_phone: data.callback_requested ? data.phone : null,
          callback_time: data.callback_requested ? data.callback_time : null,
          status: 'pending'
        })

      if (error) throw error

      toast.success('Car estimate request submitted successfully!')
      reset()
      setUploadedPhotos([])
      setPhotoUrls([])

    } catch (error) {
      toast.error('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-primary-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">CarSell</h1>
            </div>
            <a href="/admin" className="text-primary-600 hover:text-primary-700 font-medium">
              Admin Login
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sell Your Car Fast & Get Instant Cash
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Upload photos, get an estimate, and receive immediate payment after inspection. 
            No hassle, no waiting - just quick cash for your car.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center">
              <Camera className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Upload Photos</h3>
              <p className="text-gray-600 text-sm">Take photos of your car and upload them</p>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Get Estimate</h3>
              <p className="text-gray-600 text-sm">Receive a fair market estimate</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant Payment</h3>
              <p className="text-gray-600 text-sm">Get paid immediately after inspection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Car Details</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Car Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Car Make
                  </label>
                  <input
                    type="text"
                    {...register('car_make', { required: 'Car make is required' })}
                    className="input-field"
                    placeholder="e.g., Toyota"
                  />
                  {errors.car_make && (
                    <p className="text-red-500 text-sm mt-1">{errors.car_make.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Car Model
                  </label>
                  <input
                    type="text"
                    {...register('car_model', { required: 'Car model is required' })}
                    className="input-field"
                    placeholder="e.g., Camry"
                  />
                  {errors.car_model && (
                    <p className="text-red-500 text-sm mt-1">{errors.car_model.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    {...register('car_year', { 
                      required: 'Year is required',
                      min: { value: 1900, message: 'Invalid year' },
                      max: { value: new Date().getFullYear() + 1, message: 'Invalid year' }
                    })}
                    className="input-field"
                    placeholder="e.g., 2020"
                  />
                  {errors.car_year && (
                    <p className="text-red-500 text-sm mt-1">{errors.car_year.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mileage
                  </label>
                  <input
                    type="number"
                    {...register('mileage', { 
                      required: 'Mileage is required',
                      min: { value: 0, message: 'Mileage must be positive' }
                    })}
                    className="input-field"
                    placeholder="e.g., 50000"
                  />
                  {errors.mileage && (
                    <p className="text-red-500 text-sm mt-1">{errors.mileage.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <select
                  {...register('condition', { required: 'Condition is required' })}
                  className="input-field"
                >
                  <option value="">Select condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
                {errors.condition && (
                  <p className="text-red-500 text-sm mt-1">{errors.condition.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Price ($)
                </label>
                <input
                  type="number"
                  {...register('expected_price', { 
                    required: 'Expected price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                  className="input-field"
                  placeholder="e.g., 15000"
                />
                {errors.expected_price && (
                  <p className="text-red-500 text-sm mt-1">{errors.expected_price.message}</p>
                )}
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car Photos (Max 5)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="input-field"
                />
                {uploadedPhotos.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {uploadedPhotos.length} photo(s) selected
                  </p>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="input-field"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="input-field"
                    placeholder="Your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="input-field"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Callback Request */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="callback_requested"
                  {...register('callback_requested')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="callback_requested" className="text-sm font-medium text-gray-700">
                  Request a callback
                </label>
              </div>

              {callbackRequested && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Callback Time
                  </label>
                  <select
                    {...register('callback_time')}
                    className="input-field"
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Car Estimate Request'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 CarSell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
