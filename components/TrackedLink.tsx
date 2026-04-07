'use client'
import { useEffect, useState } from 'react'

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export default function TrackedLink({ href, children, ...props }: TrackedLinkProps) {
  const [url, setUrl] = useState(href)

  useEffect(() => {
    // Append current URL search params to external links to carry over UTMs
    if (window.location.search && (href.startsWith('http') || href.startsWith('https'))) {
      try {
        const base = new URL(href)
        const params = new URLSearchParams(window.location.search)
        // Only append if it doesn't already exist to avoid overriding predefined link params
        params.forEach((value, key) => {
          if (!base.searchParams.has(key)) {
            base.searchParams.append(key, value)
          }
        })
        setUrl(base.toString())
      } catch (e) {
        // Fallback in case URL parsing fails
        const char = href.includes('?') ? '&' : '?'
        setUrl(`${href}${char}${window.location.search.substring(1)}`)
      }
    }
  }, [href])

  return (
    <a href={url} {...props}>
      {children}
    </a>
  )
}
