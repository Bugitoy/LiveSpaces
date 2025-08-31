'use client'

import { Map, MessageCircle, Search, Shield, Star, Users, Home, Building2, Heart, Zap, Globe, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: Search,
    title: 'Advanced Search',
    description: 'Find properties with detailed filters including location, price, amenities, and more. Our intelligent search algorithm learns from your preferences.',
    color: 'blue'
  },
  {
    icon: Map,
    title: 'Interactive Maps',
    description: 'View properties on interactive maps to understand neighborhood context, nearby amenities, and location advantages.',
    color: 'green'
  },
  {
    icon: MessageCircle,
    title: 'Direct Communication',
    description: 'Connect directly with property owners and agents through our secure messaging system for quick responses.',
    color: 'purple'
  },
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'All properties are verified to ensure accuracy and prevent fraudulent listings. Your safety is our priority.',
    color: 'indigo'
  },
  {
    icon: Star,
    title: 'User Reviews',
    description: 'Read authentic reviews from previous tenants and buyers to make informed decisions about properties.',
    color: 'yellow'
  },
  {
    icon: Heart,
    title: 'Favorites & Alerts',
    description: 'Save your favorite properties and get instant notifications when similar properties become available.',
    color: 'red'
  }
]

const getColorClasses = (color: string) => {
  const colorMap: { [key: string]: string } = {
    blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    green: 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white',
    purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
    indigo: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
    yellow: 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white',
    pink: 'bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white',
    red: 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white',
    orange: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    teal: 'bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white',
    gray: 'bg-gray-100 text-gray-600 group-hover:bg-gray-600 group-hover:text-white'
  }
  return colorMap[color] || colorMap.blue
}

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-blue-50/50"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-gray-900 mb-6">
            Why Choose LiveSpaces?
          </h2>
          <p className="body-text text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide everything you need to find your perfect home, from advanced search tools 
            to direct communication with property owners. Our platform is designed with you in mind.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full">
                <CardContent className="p-0">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 ${getColorClasses(feature.color)}`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="body-text text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
