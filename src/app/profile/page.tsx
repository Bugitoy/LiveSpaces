'use client'

import { useEffect, useState } from 'react'
import { User as UserIcon, Mail, Phone, MapPin, Edit, Camera, Save, X, Building2, Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function ProfilePage() {
  const { status, data: session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
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

  useEffect(() => {
    if (status !== 'authenticated') return
    const load = async () => {
      const res = await fetch('/api/me', { cache: 'no-store' })
      if (!res.ok) return
      const user = await res.json()
      const normalize = (val: unknown) => {
        if (typeof val !== 'string') return ''
        const v = val.trim()
        if (!v || v.toLowerCase() === 'null' || v.toLowerCase() === 'undefined') return ''
        // If it's a Google avatar URL without explicit size, append a sane default
        if (v.startsWith('http://') || v.startsWith('https://') || v.startsWith('/')) {
          if (v.includes('googleusercontent.com') && !/=s\d+/.test(v) && !/[?&]sz=\d+/.test(v)) {
            return v + '=s160-c'
          }
          return v
        }
        return ''
      }
      const avatarFromDb = normalize(user.avatar)
      const avatarFromSession = normalize((session?.user as any)?.image)
      const resolvedAvatar = avatarFromDb || avatarFromSession || '/placeholder.svg'

      setProfileData((prev) => ({
        ...prev,
        name: user.name ?? '',
        email: user.email ?? '',
        avatar: resolvedAvatar,
      }))
      setTempData((prev) => ({
        ...prev,
        name: user.name ?? '',
        email: user.email ?? '',
        avatar: resolvedAvatar,
      }))
    }
    load()
  }, [status, session])

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <Card className="rounded-2xl">
          <CardContent className="p-8 text-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">Sign in to view your profile</h1>
            <p className="text-gray-600">Access and manage your account details.</p>
            <Button onClick={() => signIn('google')} className="bg-blue-600 text-white hover:bg-blue-700">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

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
            <Card className="rounded-2xl">
              <CardContent className="p-6">
              {/* Profile Picture Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src={profileData.avatar} alt="Profile" referrerPolicy="no-referrer" onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      if (img.src.endsWith('/placeholder.svg')) return
                      img.src = '/placeholder.svg'
                    }} />
                    <AvatarFallback>
                      <UserIcon className="w-16 h-16 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" className="absolute bottom-4 right-0 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-2 mx-auto"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </Button>
                ) : (
                  <div className="flex space-x-2 justify-center">
                    <Button
                      onClick={handleSave}
                      className="bg-green-600 text-white hover:bg-green-700 flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="text-gray-700 border-gray-300 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </Button>
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
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl">
              <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={tempData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <UserIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{profileData.name}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
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
                    <Input
                      type="tel"
                      value={tempData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
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
                    <Input
                      type="text"
                      value={tempData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
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
                    <Textarea
                      value={tempData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900">{profileData.bio}</p>
                    </div>
                  )}
                </div>

                {/* Sign Out */}
                <div>
                  <Button
                    onClick={() => signOut()}
                    variant="destructive"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6 rounded-2xl">
              <CardContent className="p-6">
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
                    <UserIcon className="w-6 h-6 text-purple-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Account Settings</h3>
                      <p className="text-sm text-gray-600">Security & preferences</p>
                    </div>
                  </div>
                </div>
              </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
