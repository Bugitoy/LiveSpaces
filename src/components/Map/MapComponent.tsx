'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface Property {
  id: string
  title: string
  price: number
  type: 'rent' | 'sale'
  address: string
  city: string
  latitude: number
  longitude: number
  bedrooms: number
  bathrooms: number
  area: number
}

interface MapComponentProps {
  properties: Property[]
  onPropertySelect: (property: Property) => void
  focusedProperty?: {
    latitude: number
    longitude: number
    zoom?: number
  }
}

// Sample property data with coordinates
const sampleProperties = [
  {
    id: '1',
    title: 'Modern Gaborone Apartment',
    price: 15000,
    type: 'rent' as const,
    address: '123 Kgale Road, Gaborone',
    city: 'Gaborone',
    latitude: -24.6282,
    longitude: 25.9231,
    bedrooms: 2,
    bathrooms: 2,
    area: 120
  },
  {
    id: '2',
    title: 'Cozy Francistown House',
    price: 850000,
    type: 'sale' as const,
    address: '456 Tati Road, Francistown',
    city: 'Francistown',
    latitude: -21.1702,
    longitude: 27.5086,
    bedrooms: 4,
    bathrooms: 3,
    area: 220
  },
  {
    id: '3',
    title: 'Luxury Maun Villa',
    price: 12000,
    type: 'rent' as const,
    address: '789 Shorobe Road, Maun',
    city: 'Maun',
    latitude: -19.9953,
    longitude: 23.4181,
    bedrooms: 3,
    bathrooms: 2,
    area: 180
  },
  {
    id: '4',
    title: 'Spacious Serowe Townhouse',
    price: 650000,
    type: 'sale' as const,
    address: '321 Serowe Road, Serowe',
    city: 'Serowe',
    latitude: -22.3874,
    longitude: 26.7107,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 200
  }
]

export default function MapComponent({ properties, onPropertySelect, focusedProperty }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map with focused property or default to Botswana center
    const initialLat = focusedProperty?.latitude || -24.6282
    const initialLng = focusedProperty?.longitude || 25.9231
    const initialZoom = focusedProperty?.zoom || 4
    
    const map = L.map(mapRef.current).setView([initialLat, initialLng], initialZoom)
    mapInstanceRef.current = map

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    // Add property markers
    properties.forEach((property) => {
      const markerColor = property.type === 'rent' ? '#3B82F6' : '#10B981'
      
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${markerColor};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            cursor: pointer;
          "></div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })

      const marker = L.marker([property.latitude, property.longitude], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: 600;">${property.title}</h3>
            <p style="margin: 0 0 8px 0; color: #666;">${property.address}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 18px; font-weight: bold; color: #111;">
                P${property.price.toLocaleString()}
                ${property.type === 'rent' ? '/mo' : ''}
              </span>
              <span style="
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
                color: white;
                background-color: ${property.type === 'rent' ? '#3B82F6' : '#10B981'};
              ">
                ${property.type === 'rent' ? 'For Rent' : 'For Sale'}
              </span>
            </div>
            <div style="display: flex; gap: 16px; font-size: 14px; color: #666;">
              <span>${property.bedrooms} bed</span>
              <span>${property.bathrooms} bath</span>
              <span>${property.area} sq ft</span>
            </div>
          </div>
        `)

      marker.on('click', () => {
        onPropertySelect(property)
      })

      markersRef.current.push(marker)
    })

    // Fit map to show all markers only if no focused property
    if (properties.length > 0 && !focusedProperty) {
      const group = L.featureGroup(markersRef.current)
      map.fitBounds(group.getBounds().pad(0.1))
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [properties, onPropertySelect, focusedProperty])

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full"
      style={{ zIndex: 1 }}
    />
  )
}
