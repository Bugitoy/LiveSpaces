'use client'

import { PropertiesList } from '@/components/Properties/PropertiesList'
import { PropertiesFilters } from '@/components/Properties/PropertiesFilters'
import { MapView } from '@/components/Map/MapView'

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Properties in Botswana</h1>
          <p className="text-gray-600 mt-2">Find your perfect home across beautiful Botswana</p>
        </div>
      </div>
      
      {/* Map View Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Property Map</h2>
          <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
            <MapView />
          </div>
        </div>
      </div>
      
      {/* Properties Listings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <PropertiesFilters />
          </div>
          <div className="lg:w-3/4">
            <PropertiesList />
          </div>
        </div>
      </div>
    </div>
  )
}
