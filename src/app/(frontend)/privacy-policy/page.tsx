import type { Metadata } from 'next'
import { LegalPage } from '@/components/shared/LegalPage'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="01 May 2026">
      <p>
        AIVC iFuel Maharashtra ("we", "us", or "our") respects your privacy and is committed to protecting it
        through this Privacy Policy. This policy applies to information collected through our website and any
        related services.
      </p>
      <h2>Information We Collect</h2>
      <ul>
        <li>Personal identifiers: name, mobile, email, address.</li>
        <li>KYC data: PAN, Aadhaar, GST, business registration documents.</li>
        <li>Application data: site details, financial readiness, district preference.</li>
        <li>Payment data: order IDs, transaction references (we do not store card details).</li>
      </ul>
      <h2>How We Use Information</h2>
      <ul>
        <li>To process and review applications.</li>
        <li>To communicate updates about your application or partnership.</li>
        <li>To comply with legal and regulatory obligations.</li>
        <li>For aggregated, non-personal analytics to improve our services.</li>
      </ul>
      <h2>Data Sharing</h2>
      <p>
        We share data only with our infrastructure partners (AIVC, iFuel) and authorised payment/messaging
        processors (Razorpay, Resend, Meta WhatsApp). We never sell personal data.
      </p>
      <h2>Your Rights</h2>
      <p>
        You may request access, correction or deletion of your personal data by emailing contact@maharashtra-fuel.in.
      </p>
    </LegalPage>
  )
}
