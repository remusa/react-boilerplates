import React from 'react'
import { translationMessages } from './Language/i18n'
import { LanguageProvider } from './Language/LanguageContext'
import { ThemeProvider } from './Theme/ThemeContext'
// import { BrowserRouter as Router } from 'react-router-dom'
// import { HelmetProvider, Helmet } from 'react-helmet-async'

interface Props {
  children: HTMLElement | any // ReactNode
}

const AppProviders: React.FC<Props> = ({ children }) => (
  <LanguageProvider messages={translationMessages}>
    <ThemeProvider>{children}</ThemeProvider>
  </LanguageProvider>
)

export default AppProviders

/*
<HelmetProvider>
    <Helmet>
        <meta name="description" content="" />
    </Helmet>
    <App />
</HelmetProvider>
*/
