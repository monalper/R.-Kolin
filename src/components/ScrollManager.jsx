import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      // On initial load (including F5), always start at top
      window.scrollTo(0, 0)
      return
    }

    // For back/forward navigations, restore scroll only for home routes
    if (navigationType === 'POP') {
      const key = `scroll:${location.pathname}`
      const saved = sessionStorage.getItem(key)
      if (saved !== null) {
        window.scrollTo(0, Number(saved) || 0)
        return
      }
    }

    // For all other navigations, scroll to top
    window.scrollTo(0, 0)
  }, [location.pathname, navigationType])

  return null
}
