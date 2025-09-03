'use client'

import { Bed, Bath, Car, Wifi, Star, Heart, MapPin, Building2 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const properties = [
  {
    id: 1,
    title: 'Modern Family Villa in Beverly Hills',
    price: 2500000,
    location: 'Beverly Hills, CA',
    type: 'Villa',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4500,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 127,
    amenities: ['Parking', 'Garden', 'Pool', 'Security'],
    featured: true
  },
  {
    id: 2,
    title: 'Downtown Luxury Apartment',
    price: 850000,
    location: 'Downtown, LA',
    type: 'Apartment',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 89,
    amenities: ['Gym', 'Pool', 'Security', 'Parking'],
    featured: true
  },
  {
    id: 3,
    title: 'Cozy Studio in Downtown',
    price: 1800,
    location: 'Downtown, LA',
    type: 'Studio',
    status: 'For Rent',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 156,
    amenities: ['WiFi', 'Furnished', 'Security'],
    featured: false
  },
  {
    id: 4,
    title: 'Spacious Family Home',
    price: 1200000,
    location: 'Pasadena, CA',
    type: 'House',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 203,
    amenities: ['Garden', 'Garage', 'Pool', 'Security'],
    featured: true
  },
  {
    id: 5,
    title: 'Modern Townhouse',
    price: 950000,
    location: 'Santa Monica, CA',
    type: 'Townhouse',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2200,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 94,
    amenities: ['Parking', 'Garden', 'Security'],
    featured: false
  },
  {
    id: 6,
    title: 'Luxury Penthouse Suite',
    price: 3200,
    location: 'Venice Beach, CA',
    type: 'Penthouse',
    status: 'For Rent',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 67,
    amenities: ['Ocean View', 'Pool', 'Gym', 'Security'],
    featured: true
  }
]

export function FeaturedProperties() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (propertyId: number) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium properties. From luxury villas to cozy studios, 
            find the perfect place that matches your lifestyle and budget.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group"
            >
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {property.featured && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300"
                      onClick={() => toggleFavorite(property.id)}
                    >
                      <Heart className={`h-5 w-5 transition-colors ${
                        favorites.includes(property.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                      }`} />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">{property.rating}</span>
                      <span className="text-xs text-gray-600">({property.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {property.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{property.type}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {property.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-1" />
                        <span>{property.sqft.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.amenities.slice(0, 3).map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">
                      {property.status === 'For Rent' ? `P${property.price}/mo` : `P${property.price.toLocaleString()}`}
                    </div>
                    <Button asChild size="sm" className="px-6 py-6 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors duration-300">
                      <Link href={`/properties/${property.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
            </div>
            
            <div className="relative z-10 p-0">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                Our extensive database has thousands more properties. Use our advanced search to find your perfect match.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <Link href="/properties">
                    Browse All Properties
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <Link href="/map">
                    Explore on Map
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
