'use client'

import { useState } from 'react'
import { Heart, MapPin, Bed, Bath, Square, Star, Grid, List } from 'lucide-react'
import Link from 'next/link'

// Sample data - in a real app this would come from the database
const sampleProperties = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    price: 2500,
    type: 'rent',
    address: '123 Main St, Downtown',
    city: 'New York',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 24,
    featured: true
  },
  {
    id: '2',
    title: 'Cozy Family House',
    price: 750000,
    type: 'sale',
    address: '456 Oak Ave, Suburbs',
    city: 'Los Angeles',
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    image: 'https://images.unsplash.com/photo-1718150997685-6a20748d4973?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.9,
    reviews: 31,
    featured: true
  },
  {
    id: '3',
    title: 'Luxury Waterfront Condo',
    price: 1800,
    type: 'rent',
    address: '789 Harbor Blvd, Waterfront',
    city: 'Miami',
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 18,
    featured: true
  },
  {
    id: '4',
    title: 'Spacious Townhouse',
    price: 520000,
    type: 'sale',
    address: '321 Pine St, Midtown',
    city: 'Chicago',
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1800,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    rating: 4.6,
    reviews: 22,
    featured: true
  },
  {
    id: '5',
    title: 'Urban Studio Loft',
    price: 1900,
    type: 'rent',
    address: '567 Urban Ave, Downtown',
    city: 'San Francisco',
    bedrooms: 1,
    bathrooms: 1,
    area: 750,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    rating: 4.5,
    reviews: 15,
    featured: false
  },
  {
    id: '6',
    title: 'Suburban Family Home',
    price: 680000,
    type: 'sale',
    address: '890 Suburban Dr, Suburbs',
    city: 'Dallas',
    bedrooms: 5,
    bathrooms: 4,
    area: 2800,
    image: 'https://images.unsplash.com/photo-1649083048337-4aeb6dda80bb?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 4.7,
    reviews: 28,
    featured: false
  }
]

export function PropertiesList() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const propertiesPerPage = 6

  const totalPages = Math.ceil(sampleProperties.length / propertiesPerPage)
  const startIndex = (currentPage - 1) * propertiesPerPage
  const endIndex = startIndex + propertiesPerPage
  const currentProperties = sampleProperties.slice(startIndex, endIndex)

  return (
    <div>
      {/* Header with view toggle and results count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, sampleProperties.length)} of {sampleProperties.length} properties
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${
              viewMode === 'grid' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Properties Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'space-y-4'
      }>
        {currentProperties.map((property) => (
          <div key={property.id} className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
            viewMode === 'list' ? 'flex' : ''
          }`}>
            {/* Property Image */}
            <div className={`relative overflow-hidden ${
              viewMode === 'list' ? 'w-1/3 h-48' : 'h-48'
            }`}>
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  property.type === 'rent' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-green-500 text-white'
                }`}>
                  {property.type === 'rent' ? 'For Rent' : 'For Sale'}
                </span>
              </div>
              <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Property Details */}
            <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
                  {property.title}
                </h3>
              </div>

              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.city}</span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  <span>{property.area} sq ft</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl font-bold text-gray-900">
                  {property.type === 'rent' ? `P${property.price.toLocaleString()}/mo` : `P${property.price.toLocaleString()}`}
                </div>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-gray-600">{property.rating}</span>
                  <span className="text-gray-400 ml-1">({property.reviews})</span>
                </div>
              </div>

              <Link
                href={`/properties/${property.id}`}
                className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 border rounded-md ${
                currentPage === page
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
