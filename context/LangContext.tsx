'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import type { Lang } from '@/lib/content'

const LangContext = createContext<{
  lang: Lang
  toggle: () => void
}>({ lang: 'ru', toggle: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')
  const toggle = () => setLang(l => (l === 'ru' ? 'en' : 'ru'))
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
