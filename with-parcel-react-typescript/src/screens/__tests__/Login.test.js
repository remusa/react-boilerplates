import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { act, fireEvent, render, wait } from 'test-utils'
import Login from '../Login'

beforeEach(() => {
  window.localStorage.removeItem('token')
})

const mockLoginUser = {
  email: 'test@test.com',
  password: '1234567890',
}

// const handleSubmit = jest.fn()

const { getByLabelText, findByTestId, getByText } = render(<Login />)
const email = getByLabelText(/email/i)
const password = getByLabelText(/password/i)
const submitBtn = getByText('Login', { exact: true })
const resetBtn = getByText(/reset/i)

it('should throw errors when validation fails', () => {
  // Required email field
  act(() => {
    fireEvent.blur(email)
  })
  wait(() => {
    const emailErrors = findByTestId(`errors-email`)
    expect(emailErrors.innerHTML).toBe('Email is required')
  })

  // Required password field
  act(() => {
    fireEvent.blur(password)
  })
  wait(() => {
    const passwordErrors = findByTestId(`errors-password`)
    expect(passwordErrors.innerHTML).toBe('Password is required')
  })

  // Reset button is disabled
  wait(expect(resetBtn).toBeDisabled())

  // Reset button is enabled
  act(() => {
    fireEvent.change(email, { target: { value: mockLoginUser.email } })
  })
  act(() => {
    fireEvent.change(password, { target: { value: mockLoginUser.password } })
  })
  wait(() => expect(resetBtn).toBeEnabled())
})

it('should reset values', () => {
  // Fill email field
  act(() => {
    fireEvent.change(email, { target: { value: mockLoginUser.email } })
  })
  wait(() => expect(email).toHaveTextContent(mockLoginUser.email))

  // Fill password field
  act(() => {
    fireEvent.change(password, {
      target: { value: mockLoginUser.password },
    })
  })
  wait(() => expect(password).toHaveTextContent(mockLoginUser.password))

  // Reset values
  act(() => {
    fireEvent.click(resetBtn)
  })
  wait(() => expect(email).toHaveTextContent(''))
  wait(() => expect(password).toHaveTextContent(''))
})

it('should submit correct values and login an user', () => {
  // Fill email field
  act(() => {
    fireEvent.change(email, { target: { value: mockLoginUser.email } })
  })
  wait(() => expect(email).toHaveTextContent(mockLoginUser.email))

  // Fill password field
  act(() => {
    fireEvent.change(password, {
      target: { value: mockLoginUser.password },
    })
  })
  wait(() => expect(password).toHaveTextContent(mockLoginUser.password))

  // Submit form
  act(() => {
    fireEvent.click(submitBtn)
  })

  const token = wait(() => JSON.parse(localStorage.getItem('token')))
  wait(() => expect(token).toBe(mockLoginUser))
})
