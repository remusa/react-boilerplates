import React from 'react'
import { ThemeProvider } from './ThemeContext'

interface Props {
    children: HTMLElement
}

const AppProviders: React.FC<Props> = ({ children }) => <ThemeProvider>{children}</ThemeProvider>

export default AppProviders
