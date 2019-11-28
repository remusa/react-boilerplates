import { fireEvent, render } from '@testing-library/react'
import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { translationMessages } from '../i18n'
import { LanguageContext, LanguageProvider } from '../LanguageContext'
import en from '../translations/en.json'
import es from '../translations/es.json'

it('should be able to change locale', () => {
  const { getByText, getByTestId } = render(
    <LanguageProvider messages={translationMessages}>
      <MockComponent />
    </LanguageProvider>
  )

  const heading = getByTestId('homepage-heading')
  expect(heading).toHaveTextContent(en['containers.HomePage.title'])

  const radioEs = getByText(/es/)
  fireEvent.click(radioEs)

  expect(heading).toHaveTextContent(es['containers.HomePage.title'])
  const radioEn = getByText(/en/)
  fireEvent.click(radioEn)

  expect(heading).toHaveTextContent(en['containers.HomePage.title'])
})

// function MockComponent(): React.ReactElement {
function MockComponent() {
  const languageState = useContext(LanguageContext)
  const { formatMessage: format } = useIntl()

  return (
    <>
      <h1 data-testid='homepage-heading'>{format({ id: 'containers.HomePage.title' })}</h1>

      <label htmlFor='en'>
        en
        <input
          id='en'
          type='radio'
          name='locale'
          onClick={
            // (): void => languageState.setLocale('en')
            () => languageState.setLocale('en')
          }
        />
      </label>

      <label htmlFor='es'>
        es
        <input
          id='es'
          type='radio'
          name='locale'
          onClick={
            // (): void => languageState.setLocale('es')
            () => languageState.setLocale('es')
          }
        />
      </label>
    </>
  )
}
