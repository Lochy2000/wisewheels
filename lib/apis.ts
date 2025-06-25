// OpenRouteService API integration
const ORS_API_KEY = process.env.EXPO_PUBLIC_OPENROUTESERVICE_API_KEY;
const ORS_BASE_URL = 'https://api.openrouteservice.org/v2';

export interface RouteRequest {
  coordinates: [number, number][];
  profile: 'wheelchair' | 'foot-walking';
  format: 'json';
  options?: {
    avoid_features?: string[];
    surface_type?: string[];
  };
}

export interface RouteResponse {
  features: Array<{
    geometry: {
      coordinates: [number, number][];
    };
    properties: {
      summary: {
        distance: number;
        duration: number;
      };
      segments: Array<{
        steps: Array<{
          instruction: string;
          distance: number;
          duration: number;
          type: number;
        }>;
      }>;
    };
  }>;
}

export const openRouteServiceApi = {
  async getDirections(request: RouteRequest): Promise<RouteResponse> {
    try {
      const response = await fetch(`${ORS_BASE_URL}/directions/${request.profile}`, {
        method: 'POST',
        headers: {
          'Authorization': ORS_API_KEY || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`ORS API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('OpenRouteService API error:', error);
      throw error;
    }
  },

  async getIsochrone(coordinates: [number, number], time: number) {
    try {
      const response = await fetch(`${ORS_BASE_URL}/isochrones/wheelchair`, {
        method: 'POST',
        headers: {
          'Authorization': ORS_API_KEY || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locations: [coordinates],
          range: [time],
          range_type: 'time',
        }),
      });

      if (!response.ok) {
        throw new Error(`ORS Isochrone API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('OpenRouteService Isochrone API error:', error);
      throw error;
    }
  }
};

// Wheelmap API integration
const WHEELMAP_API_KEY = process.env.EXPO_PUBLIC_WHEELMAP_API_KEY;
const WHEELMAP_BASE_URL = 'https://wheelmap.org/api';

export interface WheelmapNode {
  id: number;
  name: string;
  lat: number;
  lon: number;
  wheelchair: 'yes' | 'limited' | 'no';
  wheelchair_toilet?: 'yes' | 'no';
  category: string;
  type: string;
  website?: string;
  phone?: string;
}

export const wheelmapApi = {
  async searchNodes(
    lat: number,
    lon: number,
    radius: number = 1000,
    wheelchair?: 'yes' | 'limited'
  ): Promise<WheelmapNode[]> {
    try {
      const params = new URLSearchParams({
        api_key: WHEELMAP_API_KEY || '',
        bbox: this.getBoundingBox(lat, lon, radius),
        limit: '50',
        ...(wheelchair && { wheelchair }),
      });

      const response = await fetch(`${WHEELMAP_BASE_URL}/nodes?${params}`);
      
      if (!response.ok) {
        throw new Error(`Wheelmap API error: ${response.status}`);
      }

      const data = await response.json();
      return data.nodes || [];
    } catch (error) {
      console.error('Wheelmap API error:', error);
      throw error;
    }
  },

  getBoundingBox(lat: number, lon: number, radius: number): string {
    const latDelta = radius / 111000; // Approximate degrees per meter
    const lonDelta = radius / (111000 * Math.cos(lat * Math.PI / 180));
    
    const minLat = lat - latDelta;
    const maxLat = lat + latDelta;
    const minLon = lon - lonDelta;
    const maxLon = lon + lonDelta;
    
    return `${minLon},${minLat},${maxLon},${maxLat}`;
  }
};

// Overpass API for OpenStreetMap data
export const overpassApi = {
  async queryAccessiblePOIs(lat: number, lon: number, radius: number = 1000) {
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"]["wheelchair"="yes"](around:${radius},${lat},${lon});
        way["amenity"]["wheelchair"="yes"](around:${radius},${lat},${lon});
        relation["amenity"]["wheelchair"="yes"](around:${radius},${lat},${lon});
      );
      out geom;
    `;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
      });

      if (!response.ok) {
        throw new Error(`Overpass API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Overpass API error:', error);
      throw error;
    }
  },

  async queryAccessibleToilets(lat: number, lon: number, radius: number = 2000) {
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="toilets"]["wheelchair"="yes"](around:${radius},${lat},${lon});
        way["amenity"="toilets"]["wheelchair"="yes"](around:${radius},${lat},${lon});
      );
      out geom;
    `;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
      });

      if (!response.ok) {
        throw new Error(`Overpass API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Overpass API error:', error);
      throw error;
    }
  }
};