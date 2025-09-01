'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Home, Building2 } from 'lucide-react'
import Link from 'next/link'

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="text-center">
        <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
})

// Sample property data with coordinates
const sampleProperties = [
  {
    id: '1',
    title: 'Modern Gaborone Apartment',
    price: 15000,
    type: 'rent' as const,
    address: '123 Kgale Road, Gaborone',
    city: 'Gaborone',
    latitude: -24.6282,
    longitude: 25.9231,
    bedrooms: 2,
    bathrooms: 2,
    area: 120
  },
  {
    id: '2',
    title: 'Cozy Francistown House',
    price: 850000,
    type: 'sale' as const,
    address: '456 Tati Road, Francistown',
    city: 'Francistown',
    latitude: -21.1702,
    longitude: 27.5086,
    bedrooms: 4,
    bathrooms: 3,
    area: 220
  },
  {
    id: '3',
    title: 'Luxury Maun Villa',
    price: 12000,
    type: 'rent' as const,
    address: '789 Shorobe Road, Maun',
    city: 'Maun',
    latitude: -19.9953,
    longitude: 23.4181,
    bedrooms: 3,
    bathrooms: 2,
    area: 180
  },
  {
    id: '4',
    title: 'Spacious Serowe Townhouse',
    price: 650000,
    type: 'sale' as const,
    address: '321 Serowe Road, Serowe',
    city: 'Serowe',
    latitude: -22.3874,
    longitude: 26.7107,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 200
  }
]

interface MapViewProps {
  showPropertyPopup?: boolean
  focusedProperty?: {
    latitude: number
    longitude: number
    zoom?: number
  }
}

export function MapView({ showPropertyPopup = true, focusedProperty }: MapViewProps) {
  const [selectedProperty, setSelectedProperty] = useState<any>(null)

  return (
    <div className="relative h-full">
      {/* Map Component */}
      <MapComponent 
        properties={sampleProperties}
        onPropertySelect={setSelectedProperty}
        focusedProperty={focusedProperty}
      />
      
      {/* Property Details Popup */}
      {showPropertyPopup && selectedProperty && (
        <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">{selectedProperty.title}</h3>
            <button
              onClick={() => setSelectedProperty(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{selectedProperty.address}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                P${selectedProperty.price.toLocaleString()}
                {selectedProperty.type === 'rent' && '/mo'}
              </span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                selectedProperty.type === 'rent' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-green-500 text-white'
              }`}>
                {selectedProperty.type === 'rent' ? 'For Rent' : 'For Sale'}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Home className="h-4 w-4 mr-1" />
                <span>{selectedProperty.bedrooms} bed</span>
              </div>
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-1" />
                <span>{selectedProperty.bathrooms} bath</span>
              </div>
              <span>{selectedProperty.area} sq ft</span>
            </div>
            
            <Link 
              href={`/properties/${selectedProperty.id}`}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
            >
              View Details
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
