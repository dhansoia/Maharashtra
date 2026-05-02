import type { CollectionConfig } from 'payload'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'subject', 'status', 'createdAt'],
    group: 'Applications',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    {
      name: 'interest',
      type: 'select',
      options: [
        { label: 'District Partner', value: 'district' },
        { label: 'Pump Holder', value: 'pump-holder' },
        { label: 'General Enquiry', value: 'general' },
        { label: 'Media / Press', value: 'media' },
      ],
    },
    { name: 'district', type: 'text' },
    { name: 'subject', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    { name: 'internalNotes', type: 'textarea' },
  ],
}
