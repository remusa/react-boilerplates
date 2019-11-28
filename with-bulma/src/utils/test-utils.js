import React from 'react'
import { render } from '@testing-library/react'
// import { TranslationProvider } from 'my-i18n-lib'
// import defaultStrings from 'i18n/en-x-default'
import PropTypes from 'prop-types'
import { ThemeProvider } from '../context/ThemeContext'

const AllTheProviders = ({ children }) => (
    <ThemeProvider theme='light'>
        {/* <TranslationProvider messages={defaultStrings}> */}
        {children}
        {/* </TranslationProvider> */}
    </ThemeProvider>
)

AllTheProviders.propTypes = {
    children: PropTypes.element,
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
