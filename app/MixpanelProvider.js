'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initMixpanel, track } from '@/lib/mixpanel'
import mixpanel from 'mixpanel-browser'

function MixpanelTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    initMixpanel()
    
    // Capture UTM parameters
    const utmSource = searchParams.get('utm_source')
    const utmMedium = searchParams.get('utm_medium')
    const utmCampaign = searchParams.get('utm_campaign')
    const utmContent = searchParams.get('utm_content')
    const utmTerm = searchParams.get('utm_term')
    
    const utmParams = {}
    if (utmSource) utmParams.utm_source = utmSource
    if (utmMedium) utmParams.utm_medium = utmMedium
    if (utmCampaign) utmParams.utm_campaign = utmCampaign
    if (utmContent) utmParams.utm_content = utmContent
    if (utmTerm) utmParams.utm_term = utmTerm
    
    // Register UTM params to be sent with all future events
    if (Object.keys(utmParams).length > 0) {
      mixpanel.register(utmParams)
    }
    
    // Identify prospect if utm_content contains their name/email
    if (utmContent) {
      mixpanel.identify(utmContent)
    }
    
    track('Session Start', { 
      entry_page: pathname,
      ...utmParams
    })
  }, [])

  useEffect(() => {
    const startTime = Date.now()

    track('Page View', { 
      page: pathname,
      timestamp: new Date().toISOString()
    })

    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      track('Page Exit', { 
        page: pathname,
        time_spent_seconds: timeSpent
      })
    }
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
