import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
    group: 'System',
  },
  auth: true,
  access: {
    create: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'partner',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'State Partner', value: 'state-partner' },
        { label: 'District Partner', value: 'partner' },
        { label: 'Pump Holder', value: 'pump-holder' },
      ],
    },
    {
      name: 'application',
      type: 'relationship',
      relationTo: 'district-partner-applications',
      admin: { description: 'Linked District Partner application (for partner role)' },
    },
    { name: 'phone', type: 'text' },
    { name: 'district', type: 'text' },
  ],
}
