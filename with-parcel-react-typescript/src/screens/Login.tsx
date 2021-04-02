import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import styled from 'styled-components'
import * as yup from 'yup'
import { emailValidation, passwordValidation } from '../utils/validationSchemas'

const validationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
})

const LoginStyles = styled.section`
  text-align: center;

  .errorMessage {
    color: red;
  }
`

export interface IUser {
  email: string
  password: string
}

interface Props {}

const Login: React.FC<Props> = () => {
  const handleSubmit = async (
    { email, password }: IUser,
    actions: FormikHelpers<{
      email: string
      password: string
    }>
  ) => {
    actions.setSubmitting(true)
    console.log('SUBMITING: ', email, password)
    window.localStorage.setItem('token', JSON.stringify({ email, password }))
    // await signin()
    actions.setSubmitting(false)
  }

  return (
    <LoginStyles className='section'>
      <div className='columns'>
        <div className='column is-4 is-offset-4'>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions)
            }}
          >
            {({ values, errors, dirty, handleReset, isSubmitting, isValid }) => (
              <Form>
                <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
                  <h1 data-testid='login-page'>Login to your account</h1>

                  {/* <Error error={error} /> */}

                  <div className='field'>
                    <label className='label' htmlFor='email'>
                      Email
                      <p className='control has-icons-left has-icons-right'>
                        <Field
                          aria-label='email'
                          type='email'
                          name='email'
                          className='input'
                          placeholder='Email'
                          // as={TextField}
                        />

                        <span className='icon is-small is-left'>
                          <i className='fas fa-envelope'></i>
                        </span>

                        <span className='icon is-small is-right'>
                          <i className='fa fa-check'></i>
                        </span>
                      </p>
                      <ErrorMessage
                        data-testid='errors-email'
                        name='email'
                        component='div'
                        className='errorMessage'
                      />
                    </label>
                  </div>

                  <div className='field'>
                    <label className='label' htmlFor='password'>
                      Password
                      <p className='control has-icons-left'>
                        <Field
                          aria-label='password'
                          type='password'
                          name='password'
                          className='input'
                          placeholder='*****'
                          // as={TextField}
                        />

                        <span className='icon is-small is-left'>
                          <i className='fas fa-lock'></i>
                        </span>
                      </p>
                      <ErrorMessage
                        data-testid='errors-password'
                        name='password'
                        component='div'
                        className='errorMessage'
                      />
                    </label>
                  </div>

                  <div className='field'>
                    <p className='control has-text-centered'>
                      <button
                        type='submit'
                        className='button is-success'
                        // disabled={!dirty || !isValid || isSubmitting}
                      >
                        Login
                      </button>

                      <button
                        type='button'
                        className='button is-danger'
                        disabled={!dirty || isSubmitting}
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                    </p>
                  </div>
                </fieldset>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </LoginStyles>
  )
}

export default Login
