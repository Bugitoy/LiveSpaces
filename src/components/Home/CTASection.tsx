'use client'

import { ArrowRight, Building2, Map, MessageCircle, Heart, Mail, Phone, Clock, Users } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function CTASection() {
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false)
  const [newsletterForm, setNewsletterForm] = useState({
    email: '',
    name: '',
    preferences: [] as string[]
  })

  const handleNewsletterSignup = () => {
    console.log('Newsletter signup:', newsletterForm)
    setNewsletterModalOpen(false)
    // Reset form
    setNewsletterForm({ email: '', name: '', preferences: [] })
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-20 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="hero-title text-white mb-6 leading-tight">
              Ready to Find Your
              <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Dream Home?
              </span>
            </h2>
            <p className="body-text text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Join thousands of satisfied users who have found their perfect properties through LiveSpaces. 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Link href="/properties" className="flex items-center">
                  Start Searching Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Link href="/map">
                  Explore on Map
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <Card className="text-center group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6 group-hover:bg-white/20 transition-all duration-300">
                  <Building2 className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Premium Properties</h3>
                <p className="body-text text-blue-200 leading-relaxed">
                  Access to thousands of verified properties with detailed information, high-quality photos, and accurate pricing.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6 group-hover:bg-white/20 transition-all duration-300">
                  <Map className="h-10 w-10 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Interactive Maps</h3>
                <p className="body-text text-blue-200 leading-relaxed">
                  Explore properties on interactive maps to understand neighborhood context, amenities, and location advantages.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6 group-hover:bg-white/20 transition-all duration-300">
                  <MessageCircle className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Direct Communication</h3>
                <p className="body-text text-blue-200 leading-relaxed">
                  Connect directly with property owners and agents through our secure messaging system for quick responses.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">10,000+</div>
                    <div className="caption text-blue-200">Properties Listed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">50+</div>
                    <div className="caption text-blue-200">Cities Covered</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">5,000+</div>
                    <div className="caption text-blue-200">Happy Users</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">24/7</div>
                    <div className="caption text-blue-200">Support Available</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
                <p className="text-blue-200 mb-6">
                  Get the latest property listings and market insights delivered to your inbox.
                </p>
                
                <Dialog open={newsletterModalOpen} onOpenChange={setNewsletterModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                      <Mail className="h-5 w-5 mr-2" />
                      Subscribe to Newsletter
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
                      <DialogDescription>
                        Get the latest property updates and market insights.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={newsletterForm.name}
                          onChange={(e) => setNewsletterForm({...newsletterForm, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={newsletterForm.email}
                          onChange={(e) => setNewsletterForm({...newsletterForm, email: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm mb-2 block">Preferences</Label>
                        <div className="space-y-2">
                          {['New Listings', 'Market Updates', 'Investment Tips'].map((pref) => (
                            <div key={pref} className="flex items-center space-x-2">
                              <Checkbox
                                id={pref}
                                checked={newsletterForm.preferences.includes(pref)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setNewsletterForm({
                                      ...newsletterForm,
                                      preferences: [...newsletterForm.preferences, pref]
                                    })
                                  } else {
                                    setNewsletterForm({
                                      ...newsletterForm,
                                      preferences: newsletterForm.preferences.filter(p => p !== pref)
                                    })
                                  }
                                }}
                              />
                              <Label htmlFor={pref} className="text-sm">{pref}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button onClick={handleNewsletterSignup} className="w-full">
                        Subscribe
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Badge className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-8 py-4 text-lg">
              <Heart className="h-6 w-6 text-red-400" />
              <span className="body-text text-white font-medium">Join LiveSpaces today and find your perfect home!</span>
            </Badge>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
