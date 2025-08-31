'use client'

import { useState } from 'react'
import { MapPin, Bed, Bath, Calendar, Phone, Mail, Heart, Share2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { MapView } from '@/components/Map/MapView'

// Sample property data - in a real app, this would come from an API
const sampleProperty = {
  id: '1',
  title: 'Modern Gaborone Apartment',
  price: 15000,
  type: 'rent',
  address: '123 Kgale Road, Gaborone',
  city: 'Gaborone',
  latitude: -24.6282,
  longitude: 25.9231,
  bedrooms: 2,
  bathrooms: 2,
  area: 120,
  description: 'Beautiful modern apartment located in the heart of Gaborone. This spacious 2-bedroom apartment features contemporary design, modern amenities, and stunning city views. Perfect for young professionals or small families.',
  features: [
    'Air Conditioning',
    'Balcony',
    'Built-in Wardrobes',
    'Modern Kitchen',
    'Security System',
    'Parking Space',
    'Garden View',
    '24/7 Security'
  ],
  images: [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448205-17d3a46c84de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1725905803121-dd123b058a5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2l0Y2hlbiUyMGludGVyaW9yfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1670360414646-9dfd2eb3b002?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D'
  ],
  agent: {
    name: 'Sarah Motsumi',
    phone: '+267 71 234 567',
    email: 'sarah.motsumi@livespaces.co.bw',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
  },
  postedDate: '2024-01-15',
  availableFrom: '2024-02-01'
}

export default function PropertyPostPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/properties" 
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Images */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                <img
                  src={sampleProperty.images[selectedImage]}
                  alt={sampleProperty.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2">
                    {sampleProperty.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === selectedImage ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {sampleProperty.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                        index === selectedImage ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${sampleProperty.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{sampleProperty.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{sampleProperty.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    P{sampleProperty.price.toLocaleString()}
                    {sampleProperty.type === 'rent' && <span className="text-lg text-gray-600">/mo</span>}
                  </div>
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    sampleProperty.type === 'rent' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {sampleProperty.type === 'rent' ? 'For Rent' : 'For Sale'}
                  </span>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Bed className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-900 mr-2">{sampleProperty.bedrooms}</span>
                    <span className="text-sm text-gray-600">bed</span>
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Bath className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-900 mr-2">{sampleProperty.bathrooms}</span>
                    <span className="text-sm text-gray-600">bath</span>
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">m²</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-900 mr-2">{sampleProperty.area}</span>
                    <span className="text-sm text-gray-600">sq m</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{sampleProperty.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {sampleProperty.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
                <div className="h-64 rounded-lg overflow-hidden">
                  <MapView showPropertyPopup={false} />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Agent */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Agent</h3>
              <div className="flex items-center mb-4">
                <img
                  src={sampleProperty.agent.avatar}
                  alt={sampleProperty.agent.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{sampleProperty.agent.name}</div>
                  <div className="text-sm text-gray-600">LiveSpaces Agent</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Agent
                </button>
                <button className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium text-gray-900 capitalize">{sampleProperty.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium text-gray-900">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {new Date(sampleProperty.postedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available From</span>
                  <span className="font-medium text-gray-900">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {new Date(sampleProperty.availableFrom).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference</span>
                  <span className="font-medium text-gray-900">#{sampleProperty.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
