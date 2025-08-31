'use client'

import { Search, MapPin, Building2, DollarSign, Bed, Bath, Car, Wifi, Shield, Home, Filter } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function SearchSection() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    minSqft: '',
    parking: '',
    amenities: [] as string[]
  })

  const handleSearch = () => {
    console.log('Searching with filters:', searchFilters)
  }

  const clearFilters = () => {
    setSearchFilters({
      location: '',
      propertyType: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      minSqft: '',
      parking: '',
      amenities: []
    })
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-gray-900 mb-6">
            Advanced Property Search
          </h2>
          <p className="body-text text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Use our powerful search tools to find exactly what you're looking for. 
            Filter by location, price, amenities, and more to narrow down your options.
          </p>
        </motion.div>

        {/* Main Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-12"
        >
          <Card className="bg-white rounded-3xl shadow-2xl border border-gray-100">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <Input
                    type="text"
                    placeholder="Location"
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all duration-300 border-0"
                  />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <Select value={searchFilters.propertyType} onValueChange={(value) => setSearchFilters({...searchFilters, propertyType: value})}>
                    <SelectTrigger className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all duration-300 border-0">
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
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <Input
                    type="number"
                    placeholder="Max Price"
                    value={searchFilters.maxPrice}
                    onChange={(e) => setSearchFilters({...searchFilters, maxPrice: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all duration-300 border-0"
                  />
                </div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Search
                  </Button>
                </div>
              </div>

              {/* Advanced Filters Toggle */}
              <div className="text-center">
                <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                    >
                      <Filter className="h-5 w-5" />
                      <span>{showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters</span>
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="mt-6">
                    <div className="space-y-6 pt-6 border-t border-gray-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Advanced Filters</h3>
                      
                      <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="basic">Basic</TabsTrigger>
                          <TabsTrigger value="amenities">Amenities</TabsTrigger>
                          <TabsTrigger value="advanced">Advanced</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="basic" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                              <Label htmlFor="bedrooms">Bedrooms</Label>
                              <Select value={searchFilters.bedrooms} onValueChange={(value) => setSearchFilters({...searchFilters, bedrooms: value})}>
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
                              <Select value={searchFilters.bathrooms} onValueChange={(value) => setSearchFilters({...searchFilters, bathrooms: value})}>
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
                            <div>
                              <Label htmlFor="minSqft">Min Square Feet</Label>
                              <Input
                                id="minSqft"
                                type="number"
                                placeholder="500"
                                value={searchFilters.minSqft}
                                onChange={(e) => setSearchFilters({...searchFilters, minSqft: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all duration-300 border-0"
                              />
                            </div>
                            <div>
                              <Label htmlFor="parking">Parking</Label>
                              <Select value={searchFilters.parking} onValueChange={(value) => setSearchFilters({...searchFilters, parking: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Any" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="garage">Garage</SelectItem>
                                  <SelectItem value="street">Street</SelectItem>
                                  <SelectItem value="none">None</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="amenities" className="space-y-4">
                          <div>
                            <Label>Amenities</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                              {[
                                { icon: Wifi, label: 'WiFi', value: 'wifi' },
                                { icon: Car, label: 'Parking', value: 'parking' },
                                { icon: Shield, label: 'Security', value: 'security' },
                                { icon: Home, label: 'Furnished', value: 'furnished' },
                                { icon: Bed, label: 'Furnished Bedrooms', value: 'furnished-bedrooms' },
                                { icon: Bath, label: 'En-suite Bathrooms', value: 'ensuite-bathrooms' }
                              ].map((amenity) => (
                                <div key={amenity.value} className="flex items-center space-x-3">
                                  <Checkbox
                                    id={amenity.value}
                                    checked={searchFilters.amenities.includes(amenity.value)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSearchFilters({
                                          ...searchFilters,
                                          amenities: [...searchFilters.amenities, amenity.value]
                                        })
                                      } else {
                                        setSearchFilters({
                                          ...searchFilters,
                                          amenities: searchFilters.amenities.filter(a => a !== amenity.value)
                                        })
                                      }
                                    }}
                                  />
                                  <Label htmlFor={amenity.value} className="text-sm cursor-pointer">
                                    <amenity.icon className="h-4 w-4 inline mr-2" />
                                    {amenity.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="advanced" className="space-y-4">
                          <div>
                            <Label>Price Range</Label>
                            <div className="mt-2 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <Input
                                  type="number"
                                  placeholder="Min Price"
                                  className="w-full"
                                />
                                <Input
                                  type="number"
                                  placeholder="Max Price"
                                  className="w-full"
                                />
                              </div>
                              <Slider
                                defaultValue={[0, 1000000]}
                                max={1000000}
                                step={10000}
                                className="w-full"
                              />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>

                      {/* Clear Filters */}
                      <div className="text-center pt-4">
                        <Button
                          variant="outline"
                          onClick={clearFilters}
                          className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300"
                        >
                          Clear All Filters
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <Card className="text-center group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-all duration-300">
                <Search className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Search</h3>
              <p className="body-text text-gray-600 leading-relaxed">
                Our intelligent search algorithm learns from your preferences and suggests the best matches.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 group-hover:bg-green-200 transition-all duration-300">
                <Filter className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Filters</h3>
              <p className="body-text text-gray-600 leading-relaxed">
                Narrow down your search with detailed filters for amenities, location, and property features.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6 group-hover:bg-purple-200 transition-all duration-300">
                <MapPin className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Location Intelligence</h3>
              <p className="body-text text-gray-600 leading-relaxed">
                Find properties in the perfect neighborhoods with our location-based insights and mapping.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
