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

// const handleSubmit = jest.fn()

it('should submit correct values and login an user', () => {
  const { getByLabelText, getByText } = render(<Login />)

  const email = getByLabelText(/email/i)
  const password = getByLabelText(/password/i)
  const submitBtn = getByText('Login', { exact: true })

  // Fill email field
  wait(() => fireEvent.change(email, { target: { value: mockLoginUser.email } }))
  wait(() => expect(email).toHaveTextContent(mockLoginUser.email))

  // Fill password field
  wait(() => fireEvent.change(password, { target: { value: mockLoginUser.password } }))
  wait(() => expect(password).toHaveTextContent(mockLoginUser.password))

  // Submit form
  wait(() => fireEvent.click(submitBtn))

  const token = JSON.parse(localStorage.getItem('token'))
  console.log('token', token)
  // expect(token).toBe(mockLoginUser)
})
