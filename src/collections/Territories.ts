import type { CollectionConfig } from 'payload'

export const Territories: CollectionConfig = {
  slug: 'territories',
  admin: {
    useAsTitle: 'districtName',
    defaultColumns: ['districtName', 'districtCode', 'status', 'totalPumps'],
    group: 'Operations',
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
    create: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'districtName', type: 'text', required: true },
    { name: 'districtCode', type: 'text', required: true, unique: true },
    {
      name: 'region',
      type: 'select',
      options: [
        { label: 'Konkan', value: 'konkan' },
        { label: 'Western Maharashtra', value: 'western' },
        { label: 'North Maharashtra', value: 'north' },
        { label: 'Marathwada', value: 'marathwada' },
        { label: 'Vidarbha', value: 'vidarbha' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Reserved', value: 'reserved' },
        { label: 'Allotted', value: 'allotted' },
      ],
    },
    {
      name: 'districtPartner',
      type: 'relationship',
      relationTo: 'district-partner-applications',
    },
    { name: 'totalPumps', type: 'number', defaultValue: 0 },
    { name: 'targetPumps', type: 'number', defaultValue: 40 },
    {
      name: 'blocks',
      type: 'array',
      fields: [
        { name: 'blockName', type: 'text' },
        { name: 'pumpsInstalled', type: 'number', defaultValue: 0 },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
}
