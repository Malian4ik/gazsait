'use client'
import { useEffect, RefObject } from 'react'

/**
 * Attach IntersectionObserver to all .reveal / .reveal-left / .reveal-right
 * elements inside the given containerRef.
 */
export function useReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    )
    const el = containerRef.current
    if (!el) return
    el.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [containerRef])
}
