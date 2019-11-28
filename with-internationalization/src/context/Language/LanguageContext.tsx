import React, { createContext, ReactNode, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { ITranslationMessages } from './i18n'

interface ILanguageContext {
  setLocale: (locale: string) => void
}

const LanguageContext = createContext<ILanguageContext | undefined>(undefined)

interface LanguageProps {
  children: ReactNode
  messages: ITranslationMessages
}

const LanguageProvider: React.FC<LanguageProps> = ({ children, messages }) => {
  const localeLanguage = navigator.language.split('-')[0]
  const [locale, setLocale] = useState(localeLanguage)
  const languageState = { setLocale }

  return (
    <LanguageContext.Provider value={languageState}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

export { LanguageProvider, LanguageContext }
