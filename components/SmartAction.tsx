'use client'

import Link from 'next/link'
import type { MouseEvent, ReactNode } from 'react'

type SmartActionProps = {
  href: string
  className?: string
  children: ReactNode
  ariaLabel?: string
}

export default function SmartAction({ href, className, children, ariaLabel }: SmartActionProps) {
  if (!href.startsWith('#')) {
    return (
      <Link className={className} href={href} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  const targetId = href.slice(1)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const target = document.getElementById(targetId)
    if (!target) {
      return
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <button className={className} type="button" aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </button>
  )
}
