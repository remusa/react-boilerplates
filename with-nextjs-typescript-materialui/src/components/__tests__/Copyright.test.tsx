import { render } from '@testing-library/react'
import React from 'react'
import Copyright from '../Copyright'
import '@testing-library/jest-dom/extend-expect'

it('renders copyright text', () => {
  const { getByText } = render(<Copyright />)
  expect(getByText(/copyright/i)).toHaveTextContent('Copyright ©')
})

it('renders title text to your website', () => {
  const { getByTestId } = render(<Copyright />)
  expect(getByTestId('site')).toHaveTextContent('Your Website')
})
