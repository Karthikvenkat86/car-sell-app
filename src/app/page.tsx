'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Car, Camera, Phone, DollarSign, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { createCarEstimate, getCarMakes, getCarModelsByMakeName } from '@/lib/database'
import type { CarMake, CarModel } from '@/lib/supabase'

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
  const [carMakes, setCarMakes] = useState<CarMake[]>([])
  const [carModels, setCarModels] = useState<CarModel[]>([])
  const [isLoadingModels, setIsLoadingModels] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<CarFormData>()
  const callbackRequested = watch('callback_requested')
  const selectedCarMake = watch('car_make')

  // Load car makes on component mount
  useEffect(() => {
    const loadCarMakes = async () => {
      try {
        const makes = await getCarMakes()
        console.log('Loaded car makes:', makes)
        setCarMakes(makes)
      } catch (error) {
        console.error('Failed to load car makes:', error)
        toast.error('Failed to load car makes')
      }
    }
    loadCarMakes()
  }, [])

  // Load car models when make changes
  useEffect(() => {
    const loadCarModels = async () => {
      if (selectedCarMake) {
        try {
          setIsLoadingModels(true)
          console.log('Loading models for make:', selectedCarMake)
          const models = await getCarModelsByMakeName(selectedCarMake)
          console.log('Loaded car models:', models)
          setCarModels(models)
          setValue('car_model', '') // Reset model when make changes
        } catch (error) {
          console.error('Failed to load car models:', error)
          toast.error('Failed to load car models')
        } finally {
          setIsLoadingModels(false)
        }
      } else {
        setCarModels([])
        setIsLoadingModels(false)
      }
    }
    loadCarModels()
  }, [selectedCarMake, setValue])

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
      const filePath = `car-media/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('car-media')
        .upload(filePath, file)

      if (uploadError) {
        throw new Error('Failed to upload photo')
      }

      const { data: { publicUrl } } = supabase.storage
        .from('car-media')
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

                    // Create car estimate record using the database service
       await createCarEstimate({
         car_make: data.car_make,
         car_model: data.car_model,
         car_year: data.car_year,
         mileage: data.mileage,
         condition: data.condition,
         expected_price: data.expected_price,
         photos: photoUrls,
         customer_name: data.name,
         customer_phone: data.phone,
         customer_email: data.email,
         callback_requested: data.callback_requested,
         callback_phone: data.callback_requested ? data.phone : undefined,
         callback_time: data.callback_requested ? data.callback_time : undefined,
         status: 'pending'
       })

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
       <header className="bg-white shadow-lg">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center py-6">
             <div className="flex items-center">
               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                 <Car className="h-6 w-6 text-white" />
               </div>
               <h1 className="ml-3 text-2xl font-bold text-gray-900">CarSell</h1>
               <span className="ml-3 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                 Hyderabad
               </span>
             </div>
             <div className="flex items-center space-x-4">
               <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
                 <span>📞 +91 98765 43210</span>
                 <span>📧 info@carsell.com</span>
               </div>
               <a href="/admin" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium">
                 Admin Login
               </a>
             </div>
           </div>
         </div>
       </header>

             {/* Hero Section */}
       <section className="py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-6xl mx-auto text-center">
                       <div className="mb-8">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Sell Your Car Fast & Get Instant Cash
              </h2>
              
              {/* Handover Keys Tagline - Moved to top */}
              <div className="inline-flex items-center bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-lg mb-6">
                <span className="text-2xl font-bold">🔑 We Pay First. Take Keys After Name Transfer. 100% Hassle-Free 🔑</span>
              </div>
              
              <p className="text-xl text-gray-600 mb-6">
                Upload photos, get an estimate, and receive instant cash payment. 
                We handle the complete ownership transfer - you get cash first, then handover keys. 
                No hassle, no tracking, complete peace of mind.
              </p>
              
              {/* State Coverage Badge */}
              <div className="inline-flex items-center bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg mb-8">
                <span className="text-lg font-semibold">🚗 We Buy Cars from All States!</span>
              </div>
            </div>
           
           {/* State Coverage Section */}
           <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
             <h3 className="text-2xl font-bold text-gray-900 mb-6">Pan-India Car Buying Service</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="text-center group">
                 <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                   <span className="text-2xl">🏛️</span>
                 </div>
                 <h4 className="text-lg font-semibold text-gray-900 mb-2">Karnataka</h4>
                 <p className="text-gray-600 text-sm">Bangalore, Mysore, Mangalore & more</p>
                 <div className="mt-3">
                   <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Active</span>
                 </div>
               </div>
               
               <div className="text-center group">
                 <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                   <span className="text-2xl">🏛️</span>
                 </div>
                 <h4 className="text-lg font-semibold text-gray-900 mb-2">Tamil Nadu</h4>
                 <p className="text-gray-600 text-sm">Chennai, Coimbatore, Madurai & more</p>
                 <div className="mt-3">
                   <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Active</span>
                 </div>
               </div>
               
               <div className="text-center group">
                 <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                   <span className="text-2xl">🏛️</span>
                 </div>
                 <h4 className="text-lg font-semibold text-gray-900 mb-2">All States</h4>
                 <p className="text-gray-600 text-sm">Maharashtra, Kerala, AP & Telangana</p>
                 <div className="mt-3">
                   <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">Active</span>
                 </div>
               </div>
             </div>
             
                           <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-gray-700 font-medium">
                  💡 <strong>Why Choose Us?</strong> We provide doorstep inspection and instant payment across all major cities in South India!
                </p>
              </div>
              
              {/* Secure Transfer Process */}
              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <h4 className="text-lg font-bold text-green-800 mb-3">🔒 Secure Transfer Process</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 font-bold">1.</span>
                    <div>
                      <span className="font-semibold text-green-800">Get Cash First</span>
                      <p className="text-green-700">Receive instant payment after inspection</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 font-bold">2.</span>
                    <div>
                      <span className="font-semibold text-green-800">We Handle Transfer</span>
                      <p className="text-green-700">Complete ownership transfer to our company</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 font-bold">3.</span>
                    <div>
                      <span className="font-semibold text-green-800">Then Handover Keys</span>
                      <p className="text-green-700">No hassle, no tracking, complete peace of mind</p>
                    </div>
                  </div>
                </div>
              </div>
           </div>
           
           {/* Features */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
             <div className="flex flex-col items-center group">
               <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                 <Camera className="h-8 w-8 text-white" />
               </div>
               <h3 className="font-semibold text-gray-900 mb-2">Upload Photos</h3>
               <p className="text-gray-600 text-sm text-center">Take photos of your car and upload them</p>
             </div>
             <div className="flex flex-col items-center group">
               <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                 <DollarSign className="h-8 w-8 text-white" />
               </div>
               <h3 className="font-semibold text-gray-900 mb-2">Get Estimate</h3>
               <p className="text-gray-600 text-sm text-center">Receive a fair market estimate</p>
             </div>
             <div className="flex flex-col items-center group">
               <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                 <CheckCircle className="h-8 w-8 text-white" />
               </div>
               <h3 className="font-semibold text-gray-900 mb-2">Instant Payment</h3>
               <p className="text-gray-600 text-sm text-center">Get paid immediately after inspection</p>
             </div>
           </div>
         </div>
       </section>

             {/* Benefits Section */}
       <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
         <div className="max-w-6xl mx-auto">
                       <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Sell Your Car to Us?</h3>
              <p className="text-lg text-gray-600">The most trusted car buying service in Hyderabad</p>
            </div>
           
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Best Price Guarantee</h4>
                <p className="text-gray-600 text-sm">Get the highest market value for your car</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Free Pickup Service</h4>
                <p className="text-gray-600 text-sm">We'll pick up your car from anywhere</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Instant Payment</h4>
                <p className="text-gray-600 text-sm">Get paid immediately after inspection</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Doorstep Service</h4>
                <p className="text-gray-600 text-sm">Inspection and payment at your location</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔑</span>
                </div>
                                 <h4 className="font-semibold text-gray-900 mb-2">Secure Transfer</h4>
                 <p className="text-gray-600 text-sm">Get cash first, then handover keys after transfer</p>
              </div>
            </div>
           
           <div className="bg-white rounded-2xl p-8 shadow-lg">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
               <div>
                 <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
                 <div className="text-gray-600">Cars Bought</div>
               </div>
               <div>
                 <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                 <div className="text-gray-600">Cities Covered</div>
               </div>
               <div>
                 <div className="text-3xl font-bold text-purple-600 mb-2">4.9★</div>
                 <div className="text-gray-600">Customer Rating</div>
               </div>
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
                   <select
                     {...register('car_make', { required: 'Car make is required' })}
                     className="input-field"
                   >
                     <option value="">Select car make</option>
                     {carMakes.map((make) => (
                       <option key={make.id} value={make.name}>
                         {make.name}
                       </option>
                     ))}
                   </select>
                   {errors.car_make && (
                     <p className="text-red-500 text-sm mt-1">{errors.car_make.message}</p>
                   )}
                   {/* Debug info */}
                   <p className="text-xs text-gray-500 mt-1">
                     Available makes: {carMakes.length} | Selected: {selectedCarMake || 'None'}
                   </p>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Car Model
                   </label>
                   <select
                     {...register('car_model', { required: 'Car model is required' })}
                     className="input-field"
                     disabled={!selectedCarMake || isLoadingModels}
                   >
                     <option value="">
                       {isLoadingModels ? 'Loading models...' : 'Select car model'}
                     </option>
                     {carModels.map((model) => (
                       <option key={model.id} value={model.name}>
                         {model.name} ({model.year_start}-{model.year_end || 'Present'})
                       </option>
                     ))}
                   </select>
                   {errors.car_model && (
                     <p className="text-red-500 text-sm mt-1">{errors.car_model.message}</p>
                   )}
                   {/* Debug info */}
                   <p className="text-xs text-gray-500 mt-1">
                     Available models: {carModels.length} | Loading: {isLoadingModels ? 'Yes' : 'No'}
                   </p>
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

             {/* Call to Action Section */}
       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-700">
                   <div className="max-w-4xl mx-auto text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Sell Your Car?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who got the best price for their cars
            </p>
                         <div className="mb-8 inline-block bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full shadow-lg border border-white/30">
               <span className="text-2xl font-bold">🔑 "Get Cash First, Then Handover Keys!" 🔑</span>
             </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
               <div className="text-3xl mb-2">🚗</div>
               <div className="font-semibold">All Brands</div>
               <div className="text-sm opacity-80">Maruti, Hyundai, Tata & more</div>
             </div>
             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
               <div className="text-3xl mb-2">📍</div>
               <div className="font-semibold">All Locations</div>
               <div className="text-sm opacity-80">Karnataka, Tamil Nadu & more</div>
             </div>
             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
               <div className="text-3xl mb-2">💰</div>
               <div className="font-semibold">Best Prices</div>
               <div className="text-sm opacity-80">Guaranteed market value</div>
             </div>
           </div>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
               📞 Call Now: +91 98765 43210
             </button>
             <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
               💬 WhatsApp Us
             </button>
           </div>
         </div>
       </section>

       {/* Footer */}
       <footer className="bg-gray-900 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             <div>
               <div className="flex items-center mb-4">
                 <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                   <Car className="h-5 w-5 text-white" />
                 </div>
                 <h3 className="ml-2 text-xl font-bold">CarSell</h3>
               </div>
               <p className="text-gray-400 mb-4">The most trusted car buying service in Hyderabad</p>
               <div className="flex space-x-4">
                 <span className="text-2xl">📞</span>
                 <span className="text-2xl">📧</span>
                 <span className="text-2xl">💬</span>
               </div>
             </div>
             
             <div>
               <h4 className="font-semibold mb-4">Our Services</h4>
               <ul className="space-y-2 text-gray-400">
                 <li>Car Buying</li>
                 <li>Instant Payment</li>
                 <li>Free Pickup</li>
                 <li>Doorstep Inspection</li>
               </ul>
             </div>
             
             <div>
               <h4 className="font-semibold mb-4">Coverage Areas</h4>
               <ul className="space-y-2 text-gray-400">
                 <li>Hyderabad</li>
                 <li>Bangalore</li>
                 <li>Chennai</li>
                 <li>All South India</li>
               </ul>
             </div>
             
             <div>
               <h4 className="font-semibold mb-4">Contact Info</h4>
               <ul className="space-y-2 text-gray-400">
                 <li>📞 +91 98765 43210</li>
                 <li>📧 info@carsell.com</li>
                 <li>📍 Hyderabad, Telangana</li>
                 <li>🕒 24/7 Service</li>
               </ul>
             </div>
           </div>
           
           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
             <p>&copy; 2024 CarSell. All rights reserved. | Serving Hyderabad & South India</p>
           </div>
         </div>
       </footer>
    </div>
  )
}
