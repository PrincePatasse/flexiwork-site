'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initMixpanel, track } from '@/lib/mixpanel'

export default function MixpanelProvider() {
  const pathname = usePathname()

  useEffect(() => {
    initMixpanel()
    track('Session Start', { 
      entry_page: window.location.pathname,
      referrer: document.referrer || 'direct',
      timestamp: new Date().toISOString()
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
