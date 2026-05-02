import type { CollectionConfig } from 'payload'

export const PumpHolderApplications: CollectionConfig = {
  slug: 'pump-holder-applications',
  labels: {
    singular: 'Pump Holder Application',
    plural: 'Pump Holder Applications',
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'district', 'block', 'status', 'createdAt'],
    group: 'Applications',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    // Applicant
    { name: 'fullName', type: 'text', required: true },
    { name: 'fatherName', type: 'text', required: true },
    { name: 'dob', type: 'date', required: true },
    {
      name: 'gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'aadhaar', type: 'text', required: true },
    { name: 'pan', type: 'text', required: true },
    {
      name: 'education',
      type: 'select',
      options: [
        { label: 'Below 10th', value: 'below-10' },
        { label: '10th', value: '10' },
        { label: '12th', value: '12' },
        { label: 'Graduate', value: 'graduate' },
        { label: 'Post Graduate', value: 'post-graduate' },
        { label: 'Diploma / ITI', value: 'diploma' },
        { label: 'Professional Degree', value: 'professional' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'occupation',
      type: 'select',
      options: [
        { label: 'Farmer', value: 'farmer' },
        { label: 'Business Owner', value: 'business' },
        { label: 'Retired Govt.', value: 'retired-govt' },
        { label: 'Ex-Serviceman', value: 'ex-serviceman' },
        { label: 'Transport Operator', value: 'transport' },
        { label: 'Self-Employed', value: 'self' },
        { label: 'Salaried', value: 'salaried' },
        { label: 'Other', value: 'other' },
      ],
    },

    // Contact
    { name: 'mobile', type: 'text', required: true },
    { name: 'alternateMobile', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'whatsapp', type: 'text' },

    // Address
    { name: 'address', type: 'textarea', required: true },
    { name: 'village', type: 'text', required: true },
    { name: 'block', type: 'text', required: true, label: 'Block / Tehsil' },
    { name: 'district', type: 'text', required: true },
    { name: 'pincode', type: 'text', required: true },

    // Proposed Site
    {
      type: 'collapsible',
      label: 'Proposed Site',
      fields: [
        { name: 'siteAddress', type: 'textarea', required: true },
        { name: 'siteVillage', type: 'text' },
        { name: 'siteBlock', type: 'text' },
        { name: 'siteDistrict', type: 'text' },
        {
          name: 'locationType',
          type: 'select',
          options: [
            { label: 'Agricultural Land', value: 'agri' },
            { label: 'Commercial Property', value: 'commercial' },
            { label: 'Highway / Main Road', value: 'highway' },
            { label: 'Industrial Area', value: 'industrial' },
            { label: 'Market / Mandi', value: 'market' },
            { label: 'Transport Hub', value: 'transport' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'landOwnership',
          type: 'select',
          options: [
            { label: 'Own Land', value: 'own' },
            { label: 'Leased / Rented', value: 'leased' },
            { label: 'Family-Owned', value: 'family' },
            { label: 'To be arranged', value: 'tba' },
          ],
        },
        { name: 'areaAvailable', type: 'text', label: 'Area (min 20x20 ft)' },
        { name: 'distanceFromFuelStation', type: 'text' },
        {
          name: 'roadAccess',
          type: 'select',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
            { label: 'Under Construction', value: 'under-construction' },
          ],
        },
        {
          name: 'electricity',
          type: 'select',
          options: [
            { label: 'Yes – Single Phase', value: 'single' },
            { label: 'Yes – Three Phase', value: 'three' },
            { label: 'No', value: 'no' },
            { label: 'Can be arranged', value: 'arrangeable' },
          ],
        },
      ],
    },

    // Documents
    {
      type: 'collapsible',
      label: 'Documents',
      fields: [
        { name: 'aadhaarDoc', type: 'upload', relationTo: 'media' },
        { name: 'panDoc', type: 'upload', relationTo: 'media' },
        { name: 'photograph', type: 'upload', relationTo: 'media' },
        { name: 'addressProof', type: 'upload', relationTo: 'media' },
        { name: 'landDocument', type: 'upload', relationTo: 'media' },
        { name: 'bankDoc', type: 'upload', relationTo: 'media' },
        {
          name: 'sitePhotos',
          type: 'array',
          maxRows: 8,
          fields: [{ name: 'photo', type: 'upload', relationTo: 'media' }],
        },
      ],
    },

    // Payment
    {
      type: 'collapsible',
      label: 'Payment',
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
            { label: 'Cash', value: 'cash' },
          ],
        },
        { name: 'transactionId', type: 'text' },
        { name: 'amountPaid', type: 'number' },
        { name: 'paymentDate', type: 'date' },
        { name: 'razorpayOrderId', type: 'text', admin: { readOnly: true } },
        { name: 'razorpayPaymentId', type: 'text', admin: { readOnly: true } },
      ],
    },

    // Linkage to District Partner who submitted on behalf
    {
      name: 'submittedByPartner',
      type: 'relationship',
      relationTo: 'district-partner-applications',
    },

    // Status
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Site Verification Scheduled', value: 'site-scheduled' },
        { label: 'Site Verified', value: 'site-verified' },
        { label: 'Site Rejected', value: 'site-rejected' },
        { label: 'Approved', value: 'approved' },
        { label: 'Installation Ordered', value: 'installation-ordered' },
        { label: 'Installed', value: 'installed' },
        { label: 'Commissioned', value: 'commissioned' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    { name: 'pumpSerialNo', type: 'text', admin: { readOnly: true } },
    { name: 'applicationNo', type: 'text', label: 'Application No. (MFP-xxx)' },
    { name: 'commissionedDate', type: 'date' },
    { name: 'monthlyLitres', type: 'number', admin: { description: 'Average litres dispensed/month' } },
    { name: 'internalNotes', type: 'textarea' },
  ],
}
