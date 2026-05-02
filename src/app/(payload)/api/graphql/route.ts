import { GRAPHQL_POST, REST_OPTIONS } from '@payloadcms/next/routes'
import config from '@payload-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const POST = GRAPHQL_POST(config)
export const OPTIONS = REST_OPTIONS(config)
