'use client'

import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Property Buyer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    content: 'LiveSpaces made finding our dream home incredibly easy. The interactive map feature helped us understand the neighborhood better, and the direct communication with sellers was seamless.',
    rating: 5,
    property: 'Modern Family Villa in Beverly Hills'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Property Seller',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    content: 'Selling my property through LiveSpaces was a breeze. The platform attracted serious buyers, and the messaging system made negotiations smooth and professional.',
    rating: 5,
    property: 'Downtown Luxury Apartment'
  },
  {
    id: 3,
    name: 'Manny Rodriguez',
    role: 'Property Renter',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face',
    content: 'I found my perfect rental apartment in just a few days! The search filters were precise, and I could easily compare different properties side by side.',
    rating: 5,
    property: 'Cozy Studio in Downtown'
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Real Estate Agent',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'As a real estate agent, LiveSpaces has become my go-to platform. The quality of listings and the professional interface help me serve my clients better.',
    rating: 5,
    property: 'Various Properties'
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-gray-900 mb-6">
            What Our Users Say
          </h2>
          <p className="body-text text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what real users have to say about their experience
            with LiveSpaces and how we helped them find their perfect properties.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100">
                <CardContent className="p-0">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <Quote className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="body-text text-gray-700 text-lg leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Property */}
                  <div className="mb-6">
                    <div className="caption text-blue-600 font-medium">
                      {testimonial.property}
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="caption text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                  <div className="caption text-gray-600">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">15,000+</div>
                  <div className="caption text-gray-600">Happy Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
                  <div className="caption text-gray-600">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
                  <div className="caption text-gray-600">Support Available</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
