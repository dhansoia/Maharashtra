import type { Metadata } from 'next'
import { LegalPage } from '@/components/shared/LegalPage'

export const metadata: Metadata = { title: 'Disclaimer' }

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="01 May 2026">
      <p>
        All earnings, ROI, payback periods and projected income figures presented on this website are
        illustrative, based on stated assumptions (e.g. 10,000 L/month per pump). Actual results vary by
        location, market conditions, operational discipline and other factors.
      </p>
      <p>
        No representation is made that any partner will or is likely to achieve the indicative figures.
        Investments carry risk and prospective partners are advised to perform independent due diligence
        before committing capital.
      </p>
      <p>
        AIVC iFuel Maharashtra reserves the right to amend programme details, fees and territories at its
        discretion in accordance with the master AIVC framework.
      </p>
    </LegalPage>
  )
}
