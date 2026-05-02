import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
    group: 'Content',
  },
  access: { read: () => true },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'District Partner', value: 'district' },
        { label: 'Pump Holder', value: 'pump-holder' },
        { label: 'Investment', value: 'investment' },
        { label: 'Operations', value: 'operations' },
        { label: 'Payment', value: 'payment' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
