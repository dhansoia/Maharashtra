/**
 * Business constants for AIVC x iFuel — Maharashtra.
 * Single source of truth for all financial calculations.
 */
export const BUSINESS = {
  PUMP_BASE: 1_200_000,
  GST_RATE: 0.18,
  DISCOUNT: 0.1,
  PUMP_MRP: 1_416_000,
  PUMP_DISCOUNTED: 1_296_000,
  PUMP_MARGIN: 120_000,
  INCENTIVE_PER_PUMP: 120_000,

  STATE_REG: 10_000_000,
  STATE_PUMPS: 30,
  STATE_TOTAL: 48_880_000,

  DISTRICT_REG: 2_500_000,
  DISTRICT_REG_STATE_SHARE: 1_000_000,
  DISTRICT_REG_AIVC_SHARE: 1_500_000,
  DISTRICT_PUMPS: 6,
  DISTRICT_TOTAL: 10_276_000,
  DISTRICT_TOTAL_PUMPS: 40,

  FUEL_COMMISSION: {
    PUMP_HOLDER: 2.5,
    DISTRICT: 0.4,
    STATE: 0.3,
    NATIONAL: 0.3,
    TOTAL: 3.5,
  },

  LITRES_PER_MONTH: 10_000,
  DISTRICTS_PER_STATE: 12,
} as const

export const SITE = {
  name: 'Maharashtra Fuel Partner',
  legalName: 'AIVC iFuel Maharashtra (State Partner)',
  tagline: "Maharashtra's Fuel Revolution Starts Here",
  description:
    'Official AIVC-iFuel State Partner for Maharashtra. Recruiting District Partners and Mini Fuel Pump Holders across all 36 districts.',
  email: 'contact@maharashtra-fuel.in',
  phone: '+91 99999 99999',
  whatsapp: '919999999999',
  address: 'Mumbai, Maharashtra, India',
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
    youtube: '#',
  },
} as const

export const formatINR = (amount: number, opts?: { compact?: boolean }) => {
  if (opts?.compact) {
    if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`
    if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(2)} L`
    if (amount >= 1_000) return `₹${(amount / 1_000).toFixed(1)} K`
    return `₹${amount}`
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
