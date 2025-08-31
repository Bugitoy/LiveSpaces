'use client'

import { TrendingUp, Users, Building2, MessageCircle, Globe, Award, Clock, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const stats = [
  {
    icon: Building2,
    value: '10,000+',
    label: 'Properties Listed',
    change: '+15%',
    changeType: 'positive',
    description: 'from last month',
    color: 'blue'
  },
  {
    icon: Users,
    value: '5,000+',
    label: 'Active Users',
    change: '+25%',
    changeType: 'positive',
    description: 'from last month',
    color: 'green'
  },
  {
    icon: MessageCircle,
    value: '100%',
    label: 'Verified Listings',
    change: 'Maintained',
    changeType: 'neutral',
    description: 'quality standard',
    color: 'purple'
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Satisfaction Rate',
    change: '+5%',
    changeType: 'positive',
    description: 'from last month',
    color: 'yellow'
  },
]

const getColorClasses = (color: string) => {
  const colorMap: { [key: string]: string } = {
    blue: 'bg-blue-500/20 text-blue-600',
    green: 'bg-green-500/20 text-green-600',
    purple: 'bg-purple-500/20 text-purple-600',
    yellow: 'bg-yellow-500/20 text-yellow-600',
    teal: 'bg-teal-500/20 text-teal-600',
    indigo: 'bg-indigo-500/20 text-indigo-600',
    orange: 'bg-blue-500/20 text-blue-600',
    red: 'bg-red-500/20 text-red-600'
  }
  return colorMap[color] || colorMap.blue
}

export function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background with pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-40 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Platform Statistics
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            See how LiveSpaces is growing and helping people find their perfect homes. 
            Our numbers tell the story of success and continuous improvement.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 h-full">
                <CardContent className="p-0">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${getColorClasses(stat.color)}`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  
                  <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  
                  <div className="text-blue-100 mb-3 font-medium">
                    {stat.label}
                  </div>
                  
                  <div className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-300' : 
                    stat.changeType === 'negative' ? 'text-red-300' : 'text-blue-300'
                  }`}>
                    {stat.change} {stat.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Growth Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <CardContent className="p-0">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <TrendingUp className="h-8 w-8 text-green-400" />
                <h3 className="text-2xl font-bold text-white">Growing Rapidly</h3>
              </div>
              <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                LiveSpaces continues to expand with new features, more properties, and better user experiences every month. 
                Join thousands of satisfied users who trust us with their property search.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">+25%</div>
                  <div className="text-blue-200">Monthly Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">50+</div>
                  <div className="text-blue-200">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">1000</div>
                  <div className="text-blue-200">New Properties Added</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-8 py-4 border-0">
            <CardContent className="p-0 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <span className="font-medium text-white">Join the fastest-growing real estate platform today!</span>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
