/**
 * Maharashtra: 36 districts with codes, regions and approximate centroids
 * (lng, lat) for use with react-simple-maps and territory tooling.
 */
export type DistrictRegion =
  | 'Konkan'
  | 'Western Maharashtra'
  | 'North Maharashtra'
  | 'Marathwada'
  | 'Vidarbha'

export interface DistrictInfo {
  name: string
  code: string
  region: DistrictRegion
  centroid: [number, number]
}

export const MAHARASHTRA_DISTRICTS: DistrictInfo[] = [
  { name: 'Mumbai City', code: 'MUM', region: 'Konkan', centroid: [72.83, 18.94] },
  { name: 'Mumbai Suburban', code: 'MMS', region: 'Konkan', centroid: [72.86, 19.16] },
  { name: 'Thane', code: 'THN', region: 'Konkan', centroid: [73.0, 19.22] },
  { name: 'Palghar', code: 'PLG', region: 'Konkan', centroid: [72.77, 19.7] },
  { name: 'Raigad', code: 'RGD', region: 'Konkan', centroid: [73.2, 18.55] },
  { name: 'Ratnagiri', code: 'RTG', region: 'Konkan', centroid: [73.32, 17.0] },
  { name: 'Sindhudurg', code: 'SDG', region: 'Konkan', centroid: [73.55, 16.0] },
  { name: 'Pune', code: 'PUN', region: 'Western Maharashtra', centroid: [73.85, 18.52] },
  { name: 'Satara', code: 'STR', region: 'Western Maharashtra', centroid: [74.0, 17.7] },
  { name: 'Sangli', code: 'SAN', region: 'Western Maharashtra', centroid: [74.57, 16.86] },
  { name: 'Kolhapur', code: 'KOL', region: 'Western Maharashtra', centroid: [74.24, 16.7] },
  { name: 'Solapur', code: 'SOL', region: 'Western Maharashtra', centroid: [75.91, 17.66] },
  { name: 'Ahmednagar', code: 'ANG', region: 'Western Maharashtra', centroid: [74.75, 19.1] },
  { name: 'Nashik', code: 'NSK', region: 'North Maharashtra', centroid: [73.79, 19.99] },
  { name: 'Dhule', code: 'DHL', region: 'North Maharashtra', centroid: [74.78, 20.9] },
  { name: 'Nandurbar', code: 'NDB', region: 'North Maharashtra', centroid: [74.24, 21.37] },
  { name: 'Jalgaon', code: 'JLG', region: 'North Maharashtra', centroid: [75.56, 21.0] },
  { name: 'Aurangabad (Sambhajinagar)', code: 'AUR', region: 'Marathwada', centroid: [75.34, 19.88] },
  { name: 'Jalna', code: 'JLN', region: 'Marathwada', centroid: [75.88, 19.83] },
  { name: 'Beed', code: 'BED', region: 'Marathwada', centroid: [75.76, 18.99] },
  { name: 'Latur', code: 'LTR', region: 'Marathwada', centroid: [76.57, 18.4] },
  { name: 'Osmanabad (Dharashiv)', code: 'OSM', region: 'Marathwada', centroid: [76.04, 18.18] },
  { name: 'Nanded', code: 'NND', region: 'Marathwada', centroid: [77.32, 19.15] },
  { name: 'Hingoli', code: 'HNG', region: 'Marathwada', centroid: [77.15, 19.71] },
  { name: 'Parbhani', code: 'PRB', region: 'Marathwada', centroid: [76.78, 19.27] },
  { name: 'Buldhana', code: 'BLD', region: 'Vidarbha', centroid: [76.18, 20.53] },
  { name: 'Akola', code: 'AKL', region: 'Vidarbha', centroid: [77.0, 20.7] },
  { name: 'Washim', code: 'WSM', region: 'Vidarbha', centroid: [77.13, 20.11] },
  { name: 'Amravati', code: 'AMR', region: 'Vidarbha', centroid: [77.75, 20.93] },
  { name: 'Yavatmal', code: 'YVT', region: 'Vidarbha', centroid: [78.13, 20.39] },
  { name: 'Wardha', code: 'WRD', region: 'Vidarbha', centroid: [78.6, 20.74] },
  { name: 'Nagpur', code: 'NGP', region: 'Vidarbha', centroid: [79.09, 21.15] },
  { name: 'Bhandara', code: 'BHN', region: 'Vidarbha', centroid: [79.65, 21.17] },
  { name: 'Gondia', code: 'GND', region: 'Vidarbha', centroid: [80.19, 21.46] },
  { name: 'Chandrapur', code: 'CHN', region: 'Vidarbha', centroid: [79.3, 19.95] },
  { name: 'Gadchiroli', code: 'GDC', region: 'Vidarbha', centroid: [80.0, 20.18] },
]

export const REGIONS: DistrictRegion[] = [
  'Konkan',
  'Western Maharashtra',
  'North Maharashtra',
  'Marathwada',
  'Vidarbha',
]

export const REGION_COLORS: Record<DistrictRegion, string> = {
  Konkan: '#0ea5e9',
  'Western Maharashtra': '#10b981',
  'North Maharashtra': '#f59e0b',
  Marathwada: '#ef4444',
  Vidarbha: '#8b5cf6',
}
