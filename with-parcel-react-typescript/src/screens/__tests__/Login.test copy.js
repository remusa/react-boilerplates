import '@testing-library/jest-dom/extend-expect'
import user from '@testing-library/user-event'
import React from 'react'
import { act, fireEvent, render, screen, wait, waitForElementToBeRemoved } from 'test-utils'
import Login from '../Login'

beforeEach(() => {
  window.localStorage.removeItem('token')
})

const mockLoginUser = {
  email: 'test@test.com',
  password: '1234567890',
}

// const handleSubmit = jest.fn()

// const { getByLabelText, findByTestId, getByText } = render(<Login />)
// const email = getByLabelText(/email/i)
// const password = getByLabelText(/password/i)
// const submitBtn = getByText('Login', { exact: true })
// const resetBtn = getByText(/reset/i)

it.only('should throw errors when validation fails', async () => {
  const promise = Promise.resolve()

  render(<Login />)
  console.log('screen', screen)

  const email = screen.getByLabelText(/email/i)
  const password = screen.getByLabelText(/password/i)
  const submitBtn = screen.getByText('Login', { exact: true })
  const resetBtn = screen.getByText(/reset/i)

  // Required email field
  fireEvent.blur(email)
  const emailErrors = screen.findByTestId(`errors-email`)
  expect(emailErrors.innerHTML).toBe('Email is required')

  // Required password field
  fireEvent.blur(password)
  const passwordErrors = screen.findByTestId(`errors-password`)
  expect(passwordErrors.innerHTML).toBe('Password is required')

  // Reset button is disabled
  expect(resetBtn).toBeDisabled()

  // Reset button is enabled
  user.type(email, mockLoginUser.email)
  user.type(password, mockLoginUser.password)
  expect(resetBtn).toBeEnabled()

  await waitForElementToBeRemoved(() => promise)
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
