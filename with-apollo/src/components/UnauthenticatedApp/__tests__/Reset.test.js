import React from 'react'
import { cleanup, render, fireEvent, wait } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'
import Login from '../Login'

beforeEach(() => {
  window.localStorage.removeItem('token')
})

afterEach(cleanup)

const mockLoginUser = {
  email: 'test@test.com',
  password: '1234567890',
}

it('should reset values', () => {
  const { getByLabelText, getByText } = render(<Login />)

  const email = getByLabelText(/email/i)
  const password = getByLabelText(/password/i)
  const resetBtn = getByText(/reset/i)

  // Fill email field
  wait(() => fireEvent.change(email, { target: { value: mockLoginUser.email } }))
  wait(() => expect(email).toHaveTextContent(mockLoginUser.email))

  // Fill password field
  wait(() => fireEvent.change(password, { target: { value: mockLoginUser.password } }))
  wait(() => expect(password).toHaveTextContent(mockLoginUser.password))

  // Reset values
  wait(() => fireEvent.click(resetBtn))
  wait(() => expect(email).toHaveTextContent(''))
  wait(() => expect(password).toHaveTextContent(''))
})
