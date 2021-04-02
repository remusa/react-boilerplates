import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import styled from 'styled-components'
import * as yup from 'yup'
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
  usernameValidation,
} from '../utils/validationSchemas'
import { IUser } from './Login'

const validationSchema = yup.object().shape({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
})

const RegisterStyles = styled.section`
  height: 100%;
  label {
    color: ${props => props.theme.colorFont};
  }

  .errorMessage {
    color: red;
  }
`

interface IRUser extends IUser {
  username: string
  confirmPassword: string
}

interface Props {}

const Register: React.FC<Props> = () => {
  const handleSubmit = async (
    { email, username, password, confirmPassword }: IRUser,
    actions: FormikHelpers<{
      email: string
      username: string
      password: string
      confirmPassword: string
    }>
  ) => {
    actions.setSubmitting(true)
    console.log('SUBMITING: ', email, username, password, confirmPassword)
    // await signin()
    actions.setSubmitting(false)
  }

  return (
    <RegisterStyles className='section'>
      <div className='columns'>
        <div className='column is-4 is-offset-4'>
          <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions)
            }}
          >
            {({ values, errors, dirty, handleReset, isSubmitting, isValid }) => (
              <Form>
                <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
                  <h1 data-testid='signup-page'>Sign Up</h1>

                  <div className='field'>
                    <label className='label' htmlFor='username'>
                      Username
                      <p className='control has-icons-left has-icons-right'>
                        <Field
                          name='username'
                          className='input'
                          placeholder='Username'
                          // as={TextField}
                        />

                        <span className='icon is-small is-left'>
                          <i className='fa fa-user'></i>
                        </span>

                        <span className='icon is-small is-right'>
                          <i className='fa fa-check'></i>
                        </span>
                      </p>
                      <ErrorMessage name='username' component='div' className='errorMessage' />
                    </label>
                  </div>

                  <div className='field'>
                    <label className='label' htmlFor='email'>
                      Email
                      <p className='control has-icons-left has-icons-right'>
                        <Field
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
                      <ErrorMessage name='email' component='div' className='errorMessage' />
                    </label>
                  </div>

                  <div className='field'>
                    <label className='label' htmlFor='password'>
                      Password
                      <p className='control has-icons-left'>
                        <Field
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
                      <ErrorMessage name='password' component='div' className='errorMessage' />
                    </label>
                  </div>

                  <div className='field'>
                    <label className='label' htmlFor='confirmPassword'>
                      Confirm Password
                      <p className='control has-icons-left'>
                        <Field
                          type='password'
                          name='confirmPassword'
                          className='input'
                          placeholder='*****'
                          // as={TextField}
                        />

                        <span className='icon is-small is-left'>
                          <i className='fas fa-lock'></i>
                        </span>
                      </p>
                      <ErrorMessage
                        name='confirmPassword'
                        component='div'
                        className='errorMessage'
                      />
                    </label>
                  </div>

                  <div className='field'>
                    <p className='control has-text-centered'>
                      <button
                        type='button'
                        className='button is-link'
                        disabled={!dirty || !isValid || isSubmitting}
                      >
                        Submit
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
    </RegisterStyles>
  )
}

export default Register
