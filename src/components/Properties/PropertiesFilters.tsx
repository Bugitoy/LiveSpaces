'use client'

import { useState, useEffect, useRef } from 'react'
import { Filter, MapPin } from 'lucide-react'

interface PropertiesFiltersProps {
  onFiltersChange?: (filters: {
    propertyStatus: 'all' | 'rent' | 'sale'
    selectedTypes: string[]
    locationSearch: string
    priceRange: number[]
  }) => void
}

export function PropertiesFilters({ onFiltersChange }: PropertiesFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [locationSearch, setLocationSearch] = useState('')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [propertyStatus, setPropertyStatus] = useState<'all' | 'rent' | 'sale'>('all')
  const locationRef = useRef<HTMLDivElement>(null)

  // Remove the problematic useEffect that was overriding initial state
  // The parent component should handle the initial filter state

  // Only call onFiltersChange when user actually changes filters
  const handlePropertyStatusChange = (status: 'all' | 'rent' | 'sale') => {
    setPropertyStatus(status)
    if (onFiltersChange) {
      onFiltersChange({
        propertyStatus: status,
        selectedTypes,
        locationSearch,
        priceRange
      })
    }
  }

  const handleTypeChange = (type: string) => {
    const newSelectedTypes = selectedTypes.includes(type) 
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type]
    
    setSelectedTypes(newSelectedTypes)
    if (onFiltersChange) {
      onFiltersChange({
        propertyStatus,
        selectedTypes: newSelectedTypes,
        locationSearch,
        priceRange
      })
    }
  }

  const handleLocationChange = (location: string) => {
    setLocationSearch(location)
    setShowLocationDropdown(false)
    if (onFiltersChange) {
      onFiltersChange({
        propertyStatus,
        selectedTypes,
        locationSearch: location,
        priceRange
      })
    }
  }

  const handlePriceRangeChange = (newPriceRange: number[]) => {
    setPriceRange(newPriceRange)
    if (onFiltersChange) {
      onFiltersChange({
        propertyStatus,
        selectedTypes,
        locationSearch,
        priceRange: newPriceRange
      })
    }
  }



  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'land', label: 'Land' },
    { value: 'commercial', label: 'Commercial' }
  ]

  // Botswana cities and areas for autocomplete
  const botswanaLocations = [
    'Gaborone',
    'Francistown', 
    'Maun',
    'Serowe',
    'Kanye',
    'Molepolole',
    'Mochudi',
    'Mahalapye',
    'Palapye',
    'Lobatse',
    'Tlokweng',
    'Ramotswa',
    'Thamaga',
    'Mogoditshane',
    'Gabane',
    'Oodi',
    'Kopong',
    'Mmopane',
    'Dikgatlhong',
    'Kgale'
  ]

  const filteredLocations = botswanaLocations.filter(location =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  )

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])



  const selectLocation = (location: string) => {
    handleLocationChange(location)
  }

  const clearFilters = () => {
    setPriceRange([0, 1000000])
    setSelectedTypes([])
    setLocationSearch('')
    setPropertyStatus('all')
    
    // Also notify parent component of the cleared filters
    if (onFiltersChange) {
      onFiltersChange({
        propertyStatus: 'all',
        selectedTypes: [],
        locationSearch: '',
        priceRange: [0, 1000000]
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Clear all
        </button>
      </div>

      {/* Location Search */}
      <div className="mb-6" ref={locationRef}>
        <h4 className="font-medium text-gray-900 mb-3">Location</h4>
        <div className="relative">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for locations"
              value={locationSearch}
              onChange={(e) => {
                setLocationSearch(e.target.value)
                setShowLocationDropdown(true)
                if (onFiltersChange) {
                  onFiltersChange({
                    propertyStatus,
                    selectedTypes,
                    locationSearch: e.target.value,
                    priceRange
                  })
                }
              }}
              onFocus={() => setShowLocationDropdown(true)}
                             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-gray-900"
            />
          </div>
          
          {/* Location Dropdown */}
          {showLocationDropdown && locationSearch && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => selectLocation(location)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none text-gray-900 font-medium"
                  >
                    {location}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 font-medium">No locations found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Property Status (Rent/Buy) */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Property Status</h4>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="propertyStatus"
              value="all"
              checked={propertyStatus === 'all'}
              onChange={(e) => handlePropertyStatusChange(e.target.value as 'all' | 'rent' | 'sale')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">All Properties</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="propertyStatus"
              value="rent"
              checked={propertyStatus === 'rent'}
              onChange={(e) => handlePropertyStatusChange(e.target.value as 'all' | 'rent' | 'sale')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">For Rent</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="propertyStatus"
              value="sale"
              checked={propertyStatus === 'sale'}
              onChange={(e) => handlePropertyStatusChange(e.target.value as 'all' | 'rent' | 'sale')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">For Sale</span>
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-900">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">P</span>
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              />
            </div>
            <span className="text-gray-500">to</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">P</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value) || 1000000])}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Property Type</h4>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type.value} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type.value)}
                onChange={() => handleTypeChange(type.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Bedrooms</h4>
        <select className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:border-blue-500 focus:outline-none">
          <option value="">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5+</option>
        </select>
      </div>

      {/* Bathrooms */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Bathrooms</h4>
        <select className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:border-blue-500 focus:outline-none">
          <option value="">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5+</option>
        </select>
      </div>

      {/* Square Footage */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Min Square Footage</h4>
        <input
          type="number"
          placeholder="Enter min sq ft"
          className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-300 transition-colors font-medium">
        Apply Filters
      </button>
    </div>
  )
}
