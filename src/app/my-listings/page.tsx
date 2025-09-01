'use client'

import { useState } from 'react'
import { Plus, Building2, Home, MapPin, DollarSign, Bed, Bath, Square, Eye, Edit, Trash2, Filter, Search, X, Upload, Image as ImageIcon, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface Property {
  id: string
  title: string
  type: 'sale' | 'rent'
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  status: 'active' | 'pending' | 'sold' | 'rented'
  views: number
  createdAt: string
}

export default function MyListingsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  
  type LeaseDuration = '1_month' | '6_months' | '1_year' | 'rent_to_own' | 'sublet' | 'na'
  
  interface NewListingData {
    title: string
    streetAddress: string
    plotNumber: string
    propertyType: string
    listingKind: 'rent' | 'sale'
    yearBuilt?: number | ''
    squareFootage: number | ''
    bedrooms: number | ''
    bathrooms: number | ''
    description: string
    upgrades: string
    showAddress: boolean
    monthlyRent?: number | ''
    salePrice?: number | ''
    chargeSecurityDeposit: boolean
    securityDepositAmount?: number | ''
    availableDate: string
    leaseDuration: LeaseDuration
    leaseDescription: string
    amenities: string[]
    photos: File[]
    contactRole: 'owner' | 'company'
    contactName: string
    contactEmail: string
    contactPhone: string
    allowPhone: boolean
  }
  
  const [formStep, setFormStep] = useState(0)
  const [amenityInput, setAmenityInput] = useState('')
  const [userListings, setUserListings] = useState<Property[]>([])
  const [formData, setFormData] = useState<NewListingData>({
    title: '',
    streetAddress: '',
    plotNumber: '',
    propertyType: '',
    listingKind: 'rent',
    yearBuilt: '',
    squareFootage: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    upgrades: '',
    showAddress: true,
    monthlyRent: '',
    salePrice: '',
    chargeSecurityDeposit: false,
    securityDepositAmount: '',
    availableDate: '',
    leaseDuration: 'na',
    leaseDescription: '',
    amenities: [],
    photos: [],
    contactRole: 'owner',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    allowPhone: true,
  })

  // Sample data - replace with real data from your backend
  const properties: Property[] = [
    {
      id: '1',
      title: 'Modern 3-Bedroom Villa in Gaborone',
      type: 'sale',
      price: 2500000,
      location: 'Gaborone, Botswana',
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      image: '/placeholder.svg',
      status: 'active',
      views: 156,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Cozy 2-Bedroom Apartment',
      type: 'rent',
      price: 8500,
      location: 'Francistown, Botswana',
      bedrooms: 2,
      bathrooms: 1,
      area: 95,
      image: '/placeholder.svg',
      status: 'rented',
      views: 89,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'Luxury 4-Bedroom House',
      type: 'sale',
      price: 3800000,
      location: 'Maun, Botswana',
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
      image: '/placeholder.svg',
      status: 'pending',
      views: 234,
      createdAt: '2024-01-05'
    },
    {
      id: '4',
      title: 'Studio Apartment in City Center',
      type: 'rent',
      price: 6500,
      location: 'Gaborone, Botswana',
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      image: '/placeholder.svg',
      status: 'active',
      views: 67,
      createdAt: '2024-01-01'
    }
  ]

  const steps = [
    'Basic Info',
    'Location',
    'Property Details',
    'Pricing & Lease',
    'Amenities & Photos',
    'Contact',
    'Preview',
  ]

  const allProperties = [...properties, ...userListings]
  const filteredProperties = allProperties.filter(property => {
    const matchesTab = activeTab === 'all' || property.type === activeTab
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'sold': return 'bg-blue-100 text-blue-800'
      case 'rented': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'pending': return 'Pending'
      case 'sold': return 'Sold'
      case 'rented': return 'Rented'
      default: return 'Unknown'
    }
  }

  const formatPrice = (price: number, type: string) => {
    if (type === 'rent') {
      return `P${price.toLocaleString()}/month`
    }
    return `P${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
            <p className="text-gray-600">Manage your property listings</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn bg-green-600 text-white px-6 py-3 rounded-lg hover:!bg-green-700 transition-colors flex items-center space-x-2 mt-4 md:mt-0"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Listing</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">{allProperties.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Home className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {allProperties.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {allProperties.reduce((sum, p) => sum + p.views, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">For Sale</p>
                <p className="text-2xl font-bold text-gray-900">
                  {allProperties.filter(p => p.type === 'sale').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Tab Filters */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {[
                { key: 'all', label: 'All Listings' },
                { key: 'sale', label: 'For Sale' },
                { key: 'rent', label: 'For Rent' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by city, address or title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-96 lg:w-[550px]"
              />
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Property Image */}
              <div className="relative h-48 bg-gray-200">
                {property.image ? (
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                    {getStatusText(property.status)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-black bg-opacity-50 text-white">
                    {property.type === 'sale' ? 'Sale' : 'Rent'}
                  </span>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {property.title}
                </h3>
                
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(property.price, property.type)}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{property.views}</span>
                  </div>
                </div>

                {/* Property Features */}
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square className="w-4 h-4" />
                    <span>{property.area}m²</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    View Details
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first listing.'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Your First Listing
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Listing Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-0 max-w-3xl w-full mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Create New Listing</h2>
                <p className="text-sm text-gray-500">Step {formStep + 1} of {steps.length}: {steps[formStep]}</p>
              </div>
              <button onClick={() => { setShowCreateModal(false); setFormStep(0); }} className="text-gray-500 rounded-sm p-1 hover:!bg-red-400 focus:!bg-red-400 active:!bg-red-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="px-6 py-6 max-h-[75vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                {steps.map((label, idx) => (
                  <div key={label} className="flex-1 flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${idx <= formStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {idx < formStep ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`h-1 flex-1 mx-2 ${idx < formStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    )}
                  </div>
                ))}
              </div>

              {formStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Modern 3-Bedroom House" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                      <select value={formData.propertyType} onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select type</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="duplex">Duplex</option>
                        <option value="plot">Plot/Land</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
                      <div className="flex items-center space-x-4 border border-gray-300 rounded-lg px-3 py-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" checked={formData.listingKind === 'rent'} onChange={() => setFormData({ ...formData, listingKind: 'rent' })} />
                          <span className="text-sm">For Rent</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" checked={formData.listingKind === 'sale'} onChange={() => setFormData({ ...formData, listingKind: 'sale' })} />
                          <span className="text-sm">For Sale</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                    <input type="number" min="1800" max={new Date().getFullYear()} value={formData.yearBuilt as number | ''} onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value ? Number(e.target.value) : '' })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 2015" />
                  </div>
                </div>
              )}

              {formStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input type="text" value={formData.streetAddress} onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 123 Main St, Gaborone" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Plot Number</label>
                      <input type="text" value={formData.plotNumber} onChange={(e) => setFormData({ ...formData, plotNumber: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 4567" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display property address?</label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input type="radio" checked={formData.showAddress === true} onChange={() => setFormData({ ...formData, showAddress: true })} />
                          <span className="text-sm">Yes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" checked={formData.showAddress === false} onChange={() => setFormData({ ...formData, showAddress: false })} />
                          <span className="text-sm">No</span>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">You may hide the address if privacy is a concern, but the listing may receive fewer views and contacts than listings that show the property address.</p>
                    </div>
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Square Footage</label>
                      <input type="number" min="0" value={formData.squareFootage as number | ''} onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value ? Number(e.target.value) : '' })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 180" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                      <input type="number" min="0" value={formData.bedrooms as number | ''} onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value ? Number(e.target.value) : '' })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                      <input type="number" min="0" step="0.5" value={formData.bathrooms as number | ''} onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value ? Number(e.target.value) : '' })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description of Property</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full h-28 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Describe the property" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upgrades & Desirable Features</label>
                    <textarea value={formData.upgrades} onChange={(e) => setFormData({ ...formData, upgrades: e.target.value })} className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Freshly painted home with new appliances and carpeting. Easy walking..." />
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="space-y-4">
                  {formData.listingKind === 'rent' ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent (Pula)</label>
                          <input type="number" min="0" value={formData.monthlyRent as number | ''} onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value ? Number(e.target.value) : '' })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Security Deposit</label>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" checked={formData.chargeSecurityDeposit} onChange={(e) => setFormData({ ...formData, chargeSecurityDeposit: e.target.checked, securityDepositAmount: e.target.checked ? formData.securityDepositAmount : '' })} />
                              <span className="text-sm">Charge deposit</span>
                            </label>
                            <input type="number" min="0" disabled={!formData.chargeSecurityDeposit} value={formData.securityDepositAmount as number | ''} onChange={(e) => setFormData({ ...formData, securityDepositAmount: e.target.value ? Number(e.target.value) : '' })} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" placeholder="Amount (Pula)" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Available Date</label>
                          <input type="date" value={formData.availableDate} onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Lease Duration</label>
                          <select value={formData.leaseDuration} onChange={(e) => setFormData({ ...formData, leaseDuration: e.target.value as any })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="na">N/A</option>
                            <option value="1_month">1 month</option>
                            <option value="6_months">6 months</option>
                            <option value="1_year">1 year</option>
                            <option value="rent_to_own">Rent to own</option>
                            <option value="sublet">Sublet/temporary</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lease Description</label>
                        <textarea value={formData.leaseDescription} onChange={(e) => setFormData({ ...formData, leaseDescription: e.target.value })} className="w-full h-28 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex. Owner pays for water. Renter responsible for gas and electric. Last month’s rent due at signing. No smoking allowed. Small pets permitted." />
                        <p className="text-xs text-gray-500 mt-1">Be upfront about fees, utilities, pet/smoking/parking policies, etc.</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (Pula)</label>
                      <input type="number" min="0" value={formData.salePrice as number | ''} onChange={(e) => setFormData({ ...formData, salePrice: e.target.value ? Number(e.target.value) : '' })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                  )}
                </div>
              )}

              {formStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.amenities.map((am) => (
                        <span key={am} className="inline-flex items-center space-x-2 bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-md">
                          <span>{am}</span>
                          <button className="text-gray-500 hover:text-gray-700" onClick={() => setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== am) })}>×</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="text" value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., A/C, balcony, furnished, garage parking" />
                      <button type="button" onClick={() => { if (amenityInput.trim()) { setFormData({ ...formData, amenities: Array.from(new Set([...formData.amenities, amenityInput.trim()])) }); setAmenityInput('') } }} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">Add</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="flex justify-center mb-3 text-gray-400">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Drag photos here or click to upload.</p>
                      <input id="photo-upload" type="file" multiple accept="image/*" onChange={(e) => {
                        const files = e.target.files ? Array.from(e.target.files) : []
                        setFormData({ ...formData, photos: [...formData.photos, ...files] })
                      }} className="sr-only" />
                      <div className="flex justify-center">
                        <label htmlFor="photo-upload" className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                          Choose files
                        </label>
                      </div>
                      {formData.photos.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {formData.photos.map((file, idx) => (
                            <div key={`${file.name}-${idx}`} className="relative">
                              <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-24 object-cover rounded" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Photos help renters imagine living in your place.</p>
                  </div>
                </div>
              )}

              {formStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">For rent by</label>
                    <div className="flex items-center space-x-4 border border-gray-300 rounded-lg px-3 py-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" checked={formData.contactRole === 'owner'} onChange={() => setFormData({ ...formData, contactRole: 'owner' })} />
                        <span className="text-sm">Property owner</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" checked={formData.contactRole === 'company'} onChange={() => setFormData({ ...formData, contactRole: 'company' })} />
                        <span className="text-sm">Management company or broker</span>
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input type="text" value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Allow phone contact?</label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input type="radio" checked={formData.allowPhone === true} onChange={() => setFormData({ ...formData, allowPhone: true })} />
                          <span className="text-sm">Yes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" checked={formData.allowPhone === false} onChange={() => setFormData({ ...formData, allowPhone: false })} />
                          <span className="text-sm">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {formStep === 6 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2 text-sm text-gray-700">
                    <p><span className="font-medium">Title:</span> {formData.title || '—'}</p>
                    <p><span className="font-medium">Type:</span> {formData.propertyType || '—'} ({formData.listingKind === 'rent' ? 'For Rent' : 'For Sale'})</p>
                    <p><span className="font-medium">Year Built:</span> {formData.yearBuilt || '—'}</p>
                    <p><span className="font-medium">Address:</span> {formData.streetAddress || '—'} {formData.plotNumber ? `(Plot ${formData.plotNumber})` : ''} {formData.showAddress ? '' : '(hidden)'}</p>
                    <p><span className="font-medium">Area:</span> {formData.squareFootage || '—'} m²</p>
                    <p><span className="font-medium">Beds/Baths:</span> {formData.bedrooms || '—'} / {formData.bathrooms || '—'}</p>
                    <p><span className="font-medium">Description:</span> {formData.description || '—'}</p>
                    <p><span className="font-medium">Upgrades:</span> {formData.upgrades || '—'}</p>
                    {formData.listingKind === 'rent' ? (
                      <p><span className="font-medium">Monthly Rent:</span> {formData.monthlyRent ? `P${formData.monthlyRent}` : '—'} {formData.chargeSecurityDeposit && formData.securityDepositAmount ? `(Deposit: P${formData.securityDepositAmount})` : ''}</p>
                    ) : (
                      <p><span className="font-medium">Sale Price:</span> {formData.salePrice ? `P${formData.salePrice}` : '—'}</p>
                    )}
                    {formData.listingKind === 'rent' && (
                      <>
                        <p><span className="font-medium">Available:</span> {formData.availableDate || '—'}</p>
                        <p><span className="font-medium">Lease:</span> {formData.leaseDuration.replace('_', ' ')}</p>
                        <p><span className="font-medium">Lease Details:</span> {formData.leaseDescription || '—'}</p>
                      </>
                    )}
                    <p><span className="font-medium">Amenities:</span> {formData.amenities.length ? formData.amenities.join(', ') : '—'}</p>
                    <p><span className="font-medium">Contact:</span> {formData.contactName || '—'} ({formData.contactRole === 'owner' ? 'Owner' : 'Company'}) • {formData.contactEmail || '—'} • {formData.allowPhone ? formData.contactPhone || '—' : 'Phone hidden'}</p>
                    <p className="text-xs text-gray-500">Preview, edit, complete</p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t flex items-center justify-between">
              <button disabled={formStep === 0} onClick={() => setFormStep(Math.max(0, formStep - 1))} className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${formStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}>
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              {formStep < steps.length - 1 ? (
                <button onClick={() => setFormStep(Math.min(steps.length - 1, formStep + 1))} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
              <button
                  onClick={() => {
                    const id = String(Date.now())
                    const newProperty: Property = {
                      id,
                      title: formData.title || 'Untitled Listing',
                      type: formData.listingKind,
                      price: formData.listingKind === 'rent' ? Number(formData.monthlyRent || 0) : Number(formData.salePrice || 0),
                      location: formData.streetAddress ? `${formData.streetAddress}${formData.plotNumber ? ` (Plot ${formData.plotNumber})` : ''}` : 'Location hidden',
                      bedrooms: Number(formData.bedrooms || 0),
                      bathrooms: Number(formData.bathrooms || 0),
                      area: Number(formData.squareFootage || 0),
                      image: '/placeholder.svg',
                      status: 'active',
                      views: 0,
                      createdAt: new Date().toISOString().split('T')[0],
                    }
                    setUserListings((prev) => [newProperty, ...prev])
                    setFormStep(0)
                    setFormData({
                      title: '', streetAddress: '', plotNumber: '', propertyType: '', listingKind: 'rent', yearBuilt: '', squareFootage: '', bedrooms: '', bathrooms: '', description: '', upgrades: '', showAddress: true, monthlyRent: '', salePrice: '', chargeSecurityDeposit: false, securityDepositAmount: '', availableDate: '', leaseDuration: 'na', leaseDescription: '', amenities: [], photos: [], contactRole: 'owner', contactName: '', contactEmail: '', contactPhone: '', allowPhone: true,
                    })
                    setShowCreateModal(false)
                    alert('Congratulations! You published your listing and it will be posted shortly. Renters will start contacting you soon. Once you find a renter, deactivate the listing. The listing will automatically expire after one month, but you can extend if you need more time.')
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Listing</span>
              </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
