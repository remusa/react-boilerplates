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

it('should throw errors when validation fails', async () => {
  const { getByLabelText, findByTestId, getByText } = render(<Login />)

  const email = getByLabelText(/email/i)
  const password = getByLabelText(/password/i)
  const resetBtn = getByText('Reset', { exact: true })

  // Required email field
  wait(() => fireEvent.blur(email))
  const emailValidationErrors = await findByTestId(`errors-email`)
  wait(() => expect(emailValidationErrors.innerHTML).toBe('Email is required'))

  // Required password field
  wait(() => fireEvent.blur(password))
  const passwordValidationErrors = await findByTestId(`errors-password`)
  wait(() => expect(passwordValidationErrors.innerHTML).toBe('Password is required'))

  // Reset button is disabled
  wait(expect(resetBtn).toBeDisabled())

  // Reset button is enabled
  wait(() => fireEvent.change(email, { target: { value: mockLoginUser.email } }))
  wait(() => fireEvent.change(password, { target: { value: mockLoginUser.password } }))
  wait(() => expect(resetBtn).toBeEnabled())
})
