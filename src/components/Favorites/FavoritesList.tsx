'use client'

import { useState } from 'react'
import { Heart, MapPin, Bed, Bath, Square, Star, Trash2, MessageCircle, Eye } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

// Sample data - in a real app this would come from the database
const sampleFavorites = [
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
    addedDate: '2024-01-15'
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
    image: 'https://images.unsplash.com/photo-1564013796-729b203e9a76?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 31,
    addedDate: '2024-01-10'
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
    addedDate: '2024-01-08'
  }
]

export function FavoritesList() {
  const [favorites, setFavorites] = useState(sampleFavorites)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(fav => fav.id !== id))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
        <p className="text-gray-600 mb-6">Start exploring properties and add them to your favorites</p>
        <Link
          href="/properties"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Browse Properties
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header with view toggle and count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <p className="text-gray-600">
            {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as 'grid' | 'list')}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <div className="grid grid-cols-2 gap-1 w-4 h-4">
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
            </div>
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <div className="space-y-1 w-4 h-4">
              <div className="bg-current rounded-sm h-1"></div>
              <div className="bg-current rounded-sm h-1"></div>
              <div className="bg-current rounded-sm h-1"></div>
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Favorites Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'space-y-4'
      }>
        {favorites.map((property) => (
          <Card key={property.id} className={`${viewMode === 'list' ? 'flex' : ''} rounded-xl hover:shadow-lg transition-shadow duration-300`}>
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
                <Badge className={`${property.type === 'rent' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'} border-none px-2 py-1 text-xs`}>
                  {property.type === 'rent' ? 'For Rent' : 'For Sale'}
                </Badge>
              </div>
              <div className="absolute top-3 right-3 flex space-x-1">
                <Button 
                  onClick={() => removeFavorite(property.id)}
                  size="icon"
                  variant="ghost"
                  className="p-2 bg-white/80 rounded-full hover:bg-red-100 hover:text-red-600"
                  title="Remove from favorites"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Property Details */}
            <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
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

              <div className="text-xs text-gray-500 mb-3">
                Added on {formatDate(property.addedDate)}
              </div>

              <div className="flex space-x-2">
                <Link href={`/properties/${property.id}`} className="flex-1">
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Link>
                <Button variant="outline" className="px-4">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/properties">
            <Button variant="outline" className="px-6 py-3 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              Browse More Properties
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="px-6 py-3 bg-gray-600 text-white hover:bg-gray-700">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Favorites
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear all favorites?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => setFavorites([])}>Clear</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
