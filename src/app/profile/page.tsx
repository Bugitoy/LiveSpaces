'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin, Edit, Camera, Save, X, Building2, Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+267 71 234 567',
    location: 'Gaborone, Botswana',
    bio: 'Real estate enthusiast and property investor with over 5 years of experience in the Botswana market.',
    avatar: '/placeholder.svg'
  })

  const [tempData, setTempData] = useState({ ...profileData })

  const handleSave = () => {
    setProfileData(tempData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempData(profileData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setTempData(prev => ({ ...prev, [field]: value }))
  }

  const stats = [
    { label: 'Properties Listed', value: '12', icon: Building2, color: 'text-blue-600' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              {/* Profile Picture Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                    {profileData.avatar ? (
                      <img 
                        src={profileData.avatar} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <button className="absolute bottom-4 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-2 justify-center">
                    <button
                      onClick={handleSave}
                      className="btn bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="space-y-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{profileData.name}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{profileData.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{profileData.phone}</span>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{profileData.location}</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={tempData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900">{profileData.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  href="/my-listings"
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Privacy Policy</h3>
                      <p className="text-sm text-gray-600">View our privacy policy</p>
                    </div>
                  </div>
                </Link>
                
                <Link 
                  href="/favorites"
                  className="p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-red-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">Terms of Service</h3>
                      <p className="text-sm text-gray-600">View our terms of service</p>
                    </div>
                  </div>
                </Link>
                
                <Link 
                  href="/messages"
                  className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Help Center</h3>
                      <p className="text-sm text-gray-600">Get help with your account</p>
                    </div>
                  </div>
                </Link>
                
                <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <User className="w-6 h-6 text-purple-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Account Settings</h3>
                      <p className="text-sm text-gray-600">Security & preferences</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
