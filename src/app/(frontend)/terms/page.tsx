import type { Metadata } from 'next'
import { LegalPage } from '@/components/shared/LegalPage'

export const metadata: Metadata = { title: 'Terms & Conditions' }

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="01 May 2026">
      <p>
        These terms govern your use of the AIVC iFuel Maharashtra website. By accessing the site or submitting
        any application, you agree to these terms.
      </p>
      <h2>Application & Allotment</h2>
      <p>
        Submission of an online application does not constitute a contract or guarantee of allotment. Final
        partnerships are governed by a separate signed MOU executed after due diligence and payment.
      </p>
      <h2>Payments</h2>
      <p>
        Application fees and registration payments processed through Razorpay are non-refundable except where
        explicitly stated in the MOU. All amounts are in INR and inclusive of applicable taxes.
      </p>
      <h2>Intellectual Property</h2>
      <p>
        The AIVC and iFuel marks, the Mini Fuel Pump design, this website's content, and all related materials
        are the property of their respective owners and may not be reproduced without permission.
      </p>
      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, our liability for any claim arising out of the website or
        partnership is limited to the amount paid by you under the relevant programme.
      </p>
      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of India and subject to the exclusive jurisdiction of courts in
        Maharashtra.
      </p>
    </LegalPage>
  )
}
