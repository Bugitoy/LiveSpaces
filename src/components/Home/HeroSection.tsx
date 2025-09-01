'use client'

import { Search, MapPin, Building2, Star, Users, Shield, Filter, X } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'

export function HeroSection() {
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [advancedFilters, setAdvancedFilters] = useState({
    bedrooms: '',
    bathrooms: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    amenities: [] as string[]
  })

  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching with filters:', advancedFilters)
    setSearchModalOpen(false)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-20 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="hero-title text-white mb-6 leading-tight">
            Find Your Dream
            <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Home in Botswana
            </span>
          </h1>
          <p className="body-text text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Discover premium properties across beautiful Botswana with our advanced search, interactive maps, 
            and direct communication with property owners. Your perfect home in the heart of Africa awaits.
          </p>
        </motion.div>

        {/* Enhanced search section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-12"
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <Input
                    type="text"
                    placeholder="location"
                    className="w-full pl-12 pr-4 py-4 bg-white/90 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg border-0"
                  />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <Select>
                    <SelectTrigger className="w-full pl-12 pr-4 py-4 bg-white/90 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-md border-0">
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <Input
                    type="number"
                    placeholder="Max Budget"
                    className="w-full pl-12 pr-4 py-4 bg-white/90 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg border-0"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => handleSearch()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Search Properties
                </Button>
                
                <Dialog open={searchModalOpen} onOpenChange={setSearchModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="px-6 py-4 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                      <Filter className="h-5 w-5 mr-2" />
                      Advanced Search
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Advanced Property Search</DialogTitle>
                      <DialogDescription>
                        Use advanced filters to find your perfect property match.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="bedrooms">Bedrooms</Label>
                          <Select value={advancedFilters.bedrooms} onValueChange={(value) => setAdvancedFilters({...advancedFilters, bedrooms: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1+</SelectItem>
                              <SelectItem value="2">2+</SelectItem>
                              <SelectItem value="3">3+</SelectItem>
                              <SelectItem value="4">4+</SelectItem>
                              <SelectItem value="5">5+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="bathrooms">Bathrooms</Label>
                          <Select value={advancedFilters.bathrooms} onValueChange={(value) => setAdvancedFilters({...advancedFilters, bathrooms: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1+</SelectItem>
                              <SelectItem value="2">2+</SelectItem>
                              <SelectItem value="3">3+</SelectItem>
                              <SelectItem value="4">4+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="minPrice">Min Price</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10">P</span>
                            <Input
                              id="minPrice"
                              type="number"
                              placeholder="0"
                              value={advancedFilters.minPrice}
                              onChange={(e) => setAdvancedFilters({...advancedFilters, minPrice: e.target.value})}
                              className="pl-8"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="maxPrice">Max Price</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10">P</span>
                            <Input
                              id="maxPrice"
                              type="number"
                              placeholder="No limit"
                              value={advancedFilters.maxPrice}
                              onChange={(e) => setAdvancedFilters({...advancedFilters, maxPrice: e.target.value})}
                              className="pl-8"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Amenities</Label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {['WiFi', 'Parking', 'Security', 'Pool', 'Gym', 'Garden'].map((amenity) => (
                            <div key={amenity} className="flex items-center space-x-2">
                              <Checkbox
                                id={amenity}
                                checked={advancedFilters.amenities.includes(amenity)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setAdvancedFilters({
                                      ...advancedFilters,
                                      amenities: [...advancedFilters.amenities, amenity]
                                    })
                                  } else {
                                    setAdvancedFilters({
                                      ...advancedFilters,
                                      amenities: advancedFilters.amenities.filter(a => a !== amenity)
                                    })
                                  }
                                }}
                              />
                              <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setAdvancedFilters({
                            bedrooms: '',
                            bathrooms: '',
                            minPrice: '',
                            maxPrice: '',
                            propertyType: '',
                            amenities: []
                          })}
                        >
                          Clear Filters
                        </Button>
                        <Button onClick={handleSearch}>
                          Search with Filters
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
              <Building2 className="h-8 w-8 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">10,000+</div>
            <div className="caption text-blue-200">Properties Listed</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
              <Users className="h-8 w-8 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">50,000+</div>
            <div className="caption text-blue-200">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4">
              <Star className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">4.9/5</div>
            <div className="caption text-blue-200">User Rating</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-full mb-4">
              <Shield className="h-8 w-8 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">100%</div>
            <div className="caption text-blue-200">Verified</div>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button asChild size="lg" className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            <Link href="/properties">
              Browse Properties
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <Link href="/map">
              View on Map
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  )
}
