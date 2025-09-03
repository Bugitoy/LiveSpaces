'use client'

import { useState, useEffect } from 'react'
import { Heart, MapPin, Bed, Bath, Square, Star, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface PropertiesListProps {
  filters?: {
    propertyStatus: 'all' | 'rent' | 'sale'
    selectedTypes: string[]
    locationSearch: string
    priceRange: number[]
  }
}

// Sample data - in a real app this would come from the database
const sampleProperties = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    price: 2500,
    type: 'rent',
    address: '123 Main St, Downtown',
    city: 'New York',
    latitude: 40.7128,
    longitude: -74.0060,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448205-17d3a46c84de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
      'https://images.unsplash.com/photo-1725905803121-dd123b058a5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2l0Y2hlbiUyMGludGVyaW9yfGVufDB8fDB8fHww'
    ],
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
    latitude: 34.0522,
    longitude: -118.2437,
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    images: [
      'https://images.unsplash.com/photo-1718150997685-6a20748d4973?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1564013796-729b203e9a76?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
    ],
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
    latitude: 25.7617,
    longitude: -80.1918,
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448205-17d3a46c84de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D'
    ],
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
    latitude: 41.8781,
    longitude: -87.6298,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1800,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013796-729b203e9a76?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1718150997685-6a20748d4973?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
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
    latitude: 37.7749,
    longitude: -122.4194,
    bedrooms: 1,
    bathrooms: 1,
    area: 750,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1725905803121-dd123b058a5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2l0Y2hlbiUyMGludGVyaW9yfGVufDB8fDB8fHww'
    ],
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
    latitude: 32.7767,
    longitude: -96.7970,
    bedrooms: 5,
    bathrooms: 4,
    area: 2800,
    images: [
      'https://images.unsplash.com/photo-1649083048337-4aeb6dda80bb?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1564013796-729b203e9a76?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
    ],
    rating: 4.7,
    reviews: 28,
    featured: false
  }
]

export function PropertiesList({ filters }: PropertiesListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const propertiesPerPage = 6
  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({})
  const [sortBy, setSortBy] = useState<'relevance' | 'price_asc' | 'price_desc' | 'reviews'>('relevance')

  // Apply filters to properties
  const filteredProperties = sampleProperties.filter(property => {
    // Filter by property status (rent/sale)
    if (filters?.propertyStatus && filters.propertyStatus !== 'all') {
      if (filters.propertyStatus === 'rent' && property.type !== 'rent') return false
      if (filters.propertyStatus === 'sale' && property.type !== 'sale') return false
    }

    // Filter by property types
    if (filters?.selectedTypes && filters.selectedTypes.length > 0) {
      // For now, we'll use a simple mapping since our sample data doesn't have property types
      // In a real app, you'd have property.type matching the selected types
      const propertyType = property.type === 'rent' ? 'apartment' : 'house' // Simple mapping
      if (!filters.selectedTypes.includes(propertyType)) return false
    }

    // Filter by location
    if (filters?.locationSearch && filters.locationSearch.trim() !== '') {
      const searchLocation = filters.locationSearch.toLowerCase()
      if (!property.city.toLowerCase().includes(searchLocation) && 
          !property.address.toLowerCase().includes(searchLocation)) {
        return false
      }
    }

    // Filter by price range
    if (filters?.priceRange && filters.priceRange.length === 2) {
      const [minPrice, maxPrice] = filters.priceRange
      if (property.price < minPrice || property.price > maxPrice) return false
    }

    return true
  })

  const nextImage = (propertyId: string, totalImages: number) => {
    setImageIndices(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages
    }))
  }

  const prevImage = (propertyId: string, totalImages: number) => {
    setImageIndices(prev => ({
      ...prev,
      [propertyId]: prev[propertyId] === 0 ? totalImages - 1 : (prev[propertyId] || 0) - 1
    }))
  }

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage)
  const startIndex = (currentPage - 1) * propertiesPerPage
  const endIndex = startIndex + propertiesPerPage
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price
      case 'price_desc':
        return b.price - a.price
      case 'reviews':
        return b.rating - a.rating || b.reviews - a.reviews
      default:
        return 0
    }
  })
  const currentProperties = sortedProperties.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters?.propertyStatus, filters?.selectedTypes, filters?.locationSearch, filters?.priceRange, sortBy])

  return (
    <div>
      {/* Header with view toggle and results count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <div className="mb-4 sm:mb-0">
            <p className="text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProperties.length)} of {filteredProperties.length} properties
              {filters?.propertyStatus && filters.propertyStatus !== 'all' && (
                <span className="ml-2 text-blue-600 font-medium">
                  ({filters.propertyStatus === 'rent' ? 'For Rent' : 'For Sale'})
                </span>
              )}
            </p>
          </div>
        
        <div className="flex items-center space-x-2">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'relevance' | 'price_asc' | 'price_desc' | 'reviews')}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Recommended</SelectItem>
              <SelectItem value="price_asc">Lowest price</SelectItem>
              <SelectItem value="price_desc">Highest price</SelectItem>
              <SelectItem value="reviews">Best reviews</SelectItem>
            </SelectContent>
          </Select>
          <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as 'grid' | 'list')}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Properties Grid/List */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search criteria
          </p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {currentProperties.map((property) => (
          <Card key={property.id} className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
            viewMode === 'list' ? 'flex' : ''
          }`}>
            {/* Property Image */}
            <div className={`relative overflow-hidden ${
              viewMode === 'list' ? 'w-1/3' : ''
            }`}>
              {viewMode === 'list' ? (
                <div className="relative h-full min-h-[12rem]">
                  <img
                    src={property.images[imageIndices[property.id] || 0]}
                    alt={property.title}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <AspectRatio ratio={16/9}>
                  <img
                    src={property.images[imageIndices[property.id] || 0]}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </AspectRatio>
              )}
              
              {/* Carousel Navigation Arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage(property.id, property.images.length)
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-md"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage(property.id, property.images.length)
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-md"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-700" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {(imageIndices[property.id] || 0) + 1} / {property.images.length}
                  </div>
                </>
              )}
              
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
          </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(Math.max(1, currentPage - 1)); }} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#" isActive={currentPage === page} onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(Math.min(totalPages, currentPage + 1)); }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
