'use client'

import { useEffect, useState } from 'react'
import { MapPin, Bed, Bath, Calendar, Phone, Mail, Heart, Share2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { MapView } from '@/components/Map/MapView'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'

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
  const [showContactModal, setShowContactModal] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)

  useEffect(() => {
    if (!carouselApi) return
    const onSelect = () => setSelectedImage(carouselApi.selectedScrollSnap())
    onSelect()
    carouselApi.on('select', onSelect)
    return () => {
      carouselApi.off('select', onSelect)
    }
  }, [carouselApi])

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
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-pressed={isFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                onClick={() => setIsFavorite(!isFavorite)}
                className={`${isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} rounded-full`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Share"
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Images */}
            <Card className="overflow-hidden">
              <div className="relative">
                <Carousel setApi={setCarouselApi} opts={{ loop: false }}>
                  <CarouselContent>
                    {sampleProperty.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={image}
                          alt={`${sampleProperty.title} ${index + 1}`}
                          className="w-full h-96 object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2">
                    {sampleProperty.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => carouselApi?.scrollTo(index)}
                        aria-label={`Go to image ${index + 1}`}
                        aria-pressed={index === selectedImage}
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
                      onClick={() => carouselApi?.scrollTo(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                        index === selectedImage ? 'border-blue-500' : 'border-gray-200'
                      }`}
                      aria-label={`Select thumbnail ${index + 1}`}
                      aria-pressed={index === selectedImage}
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
            </Card>

            {/* Property Details */}
            <Card>
              <CardContent className="p-6">
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
                    <Badge
                      className={`${
                        sampleProperty.type === 'rent' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      } border-none px-3 py-1 text-sm`}
                    >
                      {sampleProperty.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </Badge>
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
                  <div className="h-96 rounded-lg overflow-hidden">
                    <MapView 
                      showPropertyPopup={false} 
                      focusedProperty={{
                        latitude: sampleProperty.latitude,
                        longitude: sampleProperty.longitude,
                        zoom: 15 // Zoom in to street level
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Agent */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Agent</h3>
                <div className="flex items-center mb-4">
                  <Avatar className="w-16 h-16 mr-4">
                    <AvatarImage src={sampleProperty.agent.avatar} alt={sampleProperty.agent.name} />
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{sampleProperty.agent.name}</div>
                    <div className="text-sm text-gray-600">LiveSpaces Agent</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowContactModal(true)}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Agent
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Property Info */}
            <Card>
              <CardContent className="p-6">
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
                      {new Date(sampleProperty.postedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available From</span>
                    <span className="font-medium text-gray-900">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      {new Date(sampleProperty.availableFrom).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference</span>
                    <span className="font-medium text-gray-900">#{sampleProperty.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Agent Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Agent</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Agent Info */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={sampleProperty.agent.avatar} alt={sampleProperty.agent.name} />
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{sampleProperty.agent.name}</h3>
                <p className="text-sm text-gray-600">LiveSpaces Agent</p>
                <p className="text-sm text-gray-500">Property: {sampleProperty.title}</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <p className="text-sm text-gray-600">{sampleProperty.agent.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">{sampleProperty.agent.email}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button 
                onClick={() => {
                  window.location.href = `tel:${sampleProperty.agent.phone}`
                }}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button 
                onClick={() => {
                  window.location.href = `mailto:${sampleProperty.agent.email}`
                }}
                variant="outline"
                className="flex-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
