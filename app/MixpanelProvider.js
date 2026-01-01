'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initMixpanel, track } from '@/lib/mixpanel'

function MixpanelTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    initMixpanel()
    
    // Capture UTM parameters
    const utmSource = searchParams?.get('utm_source')
    const utmCampaign = searchParams?.get('utm_campaign')
    const utmContent = searchParams?.get('utm_content')
    
    const utmParams = {}
    if (utmSource) utmParams.utm_source = utmSource
    if (utmCampaign) utmParams.utm_campaign = utmCampaign
    if (utmContent) utmParams.utm_content = utmContent
    
    track('Session Start', { 
      entry_page: pathname,
      ...utmParams
    })
  }, [pathname, searchParams])

  useEffect(() => {
    track('Page View', { 
      page: pathname,
      timestamp: new Date().toISOString()
    })
  }, [pathname])

  return null
}

export default function MixpanelProvider() {
  return (
    <Suspense fallback={null}>
      <MixpanelTracker />
    </Suspense>
  )
}
