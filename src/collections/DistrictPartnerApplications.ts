import type { CollectionConfig } from 'payload'

export const DistrictPartnerApplications: CollectionConfig = {
  slug: 'district-partner-applications',
  labels: {
    singular: 'District Partner Application',
    plural: 'District Partner Applications',
  },
  admin: {
    useAsTitle: 'entityName',
    defaultColumns: ['entityName', 'preferredDistrict', 'status', 'createdAt'],
    group: 'Applications',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    // Section A: Applicant Identity
    { name: 'entityName', type: 'text', required: true, label: 'Entity / Applicant Name' },
    {
      name: 'entityType',
      type: 'select',
      required: true,
      options: [
        { label: 'Pvt. Ltd. Company', value: 'pvt-ltd' },
        { label: 'LLP', value: 'llp' },
        { label: 'Partnership', value: 'partnership' },
        { label: 'Proprietorship', value: 'proprietorship' },
        { label: 'Individual', value: 'individual' },
        { label: 'HUF', value: 'huf' },
      ],
    },
    { name: 'cin', type: 'text', label: 'CIN / Registration No.' },
    { name: 'pan', type: 'text', required: true, label: 'PAN Number' },
    { name: 'gst', type: 'text', label: 'GST Registration No.' },
    { name: 'aadhaar', type: 'text', label: 'Aadhaar (if individual/proprietorship)' },

    // Section B: Contact
    { name: 'contactPerson', type: 'text', required: true },
    { name: 'designation', type: 'text' },
    { name: 'mobile', type: 'text', required: true },
    { name: 'alternateMobile', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'alternateEmail', type: 'email' },

    // Section C: Address
    { name: 'address', type: 'textarea', required: true },
    { name: 'city', type: 'text', required: true },
    { name: 'district', type: 'text', required: true },
    { name: 'state', type: 'text', defaultValue: 'Maharashtra' },
    { name: 'pincode', type: 'text', required: true },

    // Section D: Business Background
    { name: 'businessNature', type: 'text' },
    { name: 'yearsInBusiness', type: 'number' },
    { name: 'employees', type: 'number' },
    { name: 'annualTurnover', type: 'text' },
    {
      name: 'experience',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Fuel / Petroleum', value: 'fuel' },
        { label: 'Agriculture', value: 'agri' },
        { label: 'Transport / Logistics', value: 'transport' },
        { label: 'Retail / Distribution', value: 'retail' },
        { label: 'Govt. Contracting', value: 'govt' },
        { label: 'Real Estate', value: 'real-estate' },
        { label: 'Other', value: 'other' },
      ],
    },

    // Section E: Territory Preference
    { name: 'preferredDistrict', type: 'text', required: true },
    { name: 'secondPreference', type: 'text' },
    { name: 'blocksOfInterest', type: 'text' },
    {
      name: 'operationalReadiness',
      type: 'select',
      options: [
        { label: 'Ready immediately', value: 'immediate' },
        { label: 'Need time to set up', value: 'needs-time' },
      ],
    },

    // Section F: Documents
    {
      type: 'collapsible',
      label: 'Documents',
      fields: [
        { name: 'registrationCert', type: 'upload', relationTo: 'media', label: 'Registration Certificate' },
        { name: 'panCard', type: 'upload', relationTo: 'media', label: 'PAN Card' },
        { name: 'gstCert', type: 'upload', relationTo: 'media', label: 'GST Certificate' },
        { name: 'aadhaarCard', type: 'upload', relationTo: 'media', label: 'Aadhaar Card' },
        { name: 'bankDetails', type: 'upload', relationTo: 'media', label: 'Cancelled Cheque' },
        { name: 'financials', type: 'upload', relationTo: 'media', label: 'Financial Statements / ITR' },
        { name: 'photograph', type: 'upload', relationTo: 'media', label: 'Photograph' },
      ],
    },

    // Section G: Payment
    {
      type: 'collapsible',
      label: 'Payment Details',
      fields: [
        {
          name: 'paymentMode',
          type: 'select',
          options: [
            { label: 'RTGS / NEFT', value: 'rtgs' },
            { label: 'Cheque', value: 'cheque' },
            { label: 'DD', value: 'dd' },
            { label: 'Online', value: 'online' },
            { label: 'Razorpay', value: 'razorpay' },
          ],
        },
        { name: 'transactionId', type: 'text', label: 'UTR / Transaction ID' },
        { name: 'amountPaid', type: 'number' },
        { name: 'paymentDate', type: 'date' },
        { name: 'razorpayOrderId', type: 'text', admin: { readOnly: true } },
        { name: 'razorpayPaymentId', type: 'text', admin: { readOnly: true } },
      ],
    },

    // Section H: Status
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Under Review', value: 'review' },
        { label: 'Documents Verified', value: 'verified' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'MOU Executed', value: 'mou-executed' },
      ],
    },
    { name: 'partnerCode', type: 'text', label: 'Partner Code (DP-xxx)', admin: { readOnly: true } },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: { description: 'Internal notes (not visible to applicant)' },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          req.payload.logger.info(
            `New District Partner application: ${doc.entityName} for ${doc.preferredDistrict}`,
          )
        }
        return doc
      },
    ],
  },
}
