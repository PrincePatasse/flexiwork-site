'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initMixpanel, track } from '@/lib/mixpanel'

export default function MixpanelProvider() {
  const pathname = usePathname()

  useEffect(() => {
    initMixpanel()
    track('Session Start', { 
      entry_page: pathname
    })
  }, [])

  useEffect(() => {
    track('Page View', { 
      page: pathname,
      timestamp: new Date().toISOString()
    })
  }, [pathname])

  return null
}
