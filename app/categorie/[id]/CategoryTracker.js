'use client'

import { useEffect } from 'react'
import { track } from '@/lib/mixpanel'

export default function CategoryTracker({ categoryId, categoryName }) {
  useEffect(() => {
    track('Category Page View', { 
      category_id: categoryId,
      category_name: categoryName,
      timestamp: new Date().toISOString()
    })
  }, [categoryId, categoryName])

  return null
}
