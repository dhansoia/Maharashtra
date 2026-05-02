import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { DistrictPartnerApplications } from './collections/DistrictPartnerApplications'
import { PumpHolderApplications } from './collections/PumpHolderApplications'
import { Territories } from './collections/Territories'
import { BlogPosts } from './collections/BlogPosts'
import { FAQs } from './collections/FAQs'
import { Testimonials } from './collections/Testimonials'
import { TeamMembers } from './collections/TeamMembers'
import { Enquiries } from './collections/Enquiries'
import { Pages } from './collections/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— AIVC iFuel Maharashtra',
    },
  },
  collections: [
    Users,
    Media,
    DistrictPartnerApplications,
    PumpHolderApplications,
    Territories,
    BlogPosts,
    FAQs,
    Testimonials,
    TeamMembers,
    Enquiries,
    Pages,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'change-me-in-production',
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: { fileSize: 25_000_000 },
  },
})
