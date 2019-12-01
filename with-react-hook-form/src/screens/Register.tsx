import React from 'react'
import useForm from 'react-hook-form'
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

  .error-message {
    color: red;
  }
`

interface IRUser extends IUser {
  username: string
  confirmPassword: string
}

interface Props {}

const Register: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    getValues,
    formState: { isSubmitting, dirty, isValid },
  } = useForm<IRUser>({
    validationSchema,
  })

  const onSubmit = async ({ email, username, password, confirmPassword }: IRUser) => {
    // actions.setSubmitting(true)
    console.log('SUBMITING: ', email, username, password, confirmPassword)
    // await signin()
    // actions.setSubmitting(false)
  }

  return (
    <RegisterStyles className='section'>
      <div className='columns'>
        <div className='column is-4 is-offset-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
              <h1 data-testid='login-page'>Sign Up</h1>

              <div className='field'>
                <label className='label' htmlFor='email'>
                  Email
                  <p className='control has-icons-left has-icons-right'>
                    <input
                      type='email'
                      name='email'
                      className='input'
                      placeholder='Email'
                      ref={register}
                      // as={TextField}
                    />

                    <span className='icon is-small is-left'>
                      <i className='fas fa-envelope'></i>
                    </span>

                    <span className='icon is-small is-right'>
                      <i className='fa fa-check'></i>
                    </span>
                  </p>
                  {errors.email && <span className='error-message'>{errors.email.message}</span>}
                </label>
              </div>

              <div className='field'>
                <label className='label' htmlFor='username'>
                  Username
                  <p className='control has-icons-left has-icons-right'>
                    <input
                      name='username'
                      className='input'
                      placeholder='Username'
                      ref={register({ required: true })}
                      // as={TextField}
                    />

                    <span className='icon is-small is-left'>
                      <i className='fa fa-user'></i>
                    </span>

                    <span className='icon is-small is-right'>
                      <i className='fa fa-check'></i>
                    </span>
                  </p>
                  {errors.username && (
                    <span className='error-message'>{errors.username.message}</span>
                  )}
                </label>
              </div>

              <div className='field'>
                <label className='label' htmlFor='password'>
                  Password
                  <p className='control has-icons-left'>
                    <input
                      type='password'
                      name='password'
                      className='input'
                      placeholder='*****'
                      ref={register}
                      // as={TextField}
                    />

                    <span className='icon is-small is-left'>
                      <i className='fas fa-lock'></i>
                    </span>
                  </p>
                  {errors.password && (
                    <span className='error-message'>{errors.password.message}</span>
                  )}
                </label>
              </div>

              <div className='field'>
                <label className='label' htmlFor='confirmPassword'>
                  Confirm Password
                  <p className='control has-icons-left'>
                    <input
                      type='password'
                      name='confirmPassword'
                      className='input'
                      placeholder='*****'
                      ref={register}
                      // as={TextField}
                    />

                    <span className='icon is-small is-left'>
                      <i className='fas fa-lock'></i>
                    </span>
                  </p>
                  {errors.confirmPassword && (
                    <span className='error-message'>{errors.confirmPassword.message}</span>
                  )}
                </label>
              </div>

              <div className='field'>
                <p className='control has-text-centered'>
                  <button
                    type='submit'
                    className='button is-success'
                    // disabled={!dirty || !isValid || isSubmitting}
                  >
                    Sign Up
                  </button>

                  <button
                    type='reset'
                    className='button is-danger'
                    disabled={!dirty || isSubmitting}
                  >
                    Reset
                  </button>
                </p>
              </div>
            </fieldset>

            {/* <div style={{ color: 'red' }}>
              <pre>
                {Object.keys(errors).length > 0 && (
                  <label>Errors: {JSON.stringify(errors, null, 2)}</label>
                )}
              </pre>
            </div> */}
          </form>
        </div>
      </div>
    </RegisterStyles>
  )
}

export default Register
