interface GeocodingResult {
  latitude: number
  longitude: number
  display_name?: string
}

interface NominatimResponse {
  lat: string
  lon: string
  display_name: string
  importance: number
}

export class GeocodingService {
  private readonly baseUrl = 'https://nominatim.openstreetmap.org/search'
  private readonly userAgent = 'teste-polgo-app/1.0'
  private lastRequestTime = 0
  private readonly minRequestInterval = 1100 

  private async waitForRateLimit(): Promise<void> {
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
    
    this.lastRequestTime = Date.now()
  }

  async getCoordinates(address: string, city: string, state: string): Promise<GeocodingResult | null> {
    try {
      await this.waitForRateLimit()

      const fullAddress = `${address}, ${city}, ${state}, Brasil`
      const encodedAddress = encodeURIComponent(fullAddress)
      
      const url = `${this.baseUrl}?q=${encodedAddress}&format=json&addressdetails=1&limit=1&countrycodes=br`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        console.error(`Geocoding API error: ${response.status} ${response.statusText}`)
        return null
      }

      const data: NominatimResponse[] = await response.json()

      if (!data || data.length === 0) {
        console.log(`No results found for address: ${fullAddress}`)
        return null
      }

      const result = data[0]
      
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        display_name: result.display_name
      }
    } catch (error) {
      console.error('Error in geocoding service:', error)
      return null
    }
  }

  async reverseGeocode(latitude: number, longitude: number): Promise<string | null> {
    try {
      await this.waitForRateLimit()

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        console.error(`Reverse geocoding API error: ${response.status} ${response.statusText}`)
        return null
      }

      const data = await response.json()
      
      return data.display_name || null
    } catch (error) {
      console.error('Error in reverse geocoding service:', error)
      return null
    }
  }
}
