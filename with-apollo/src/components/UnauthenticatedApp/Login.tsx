import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import styled from 'styled-components'
import * as yup from 'yup'
import { useAuth } from '../../context/Auth/AuthContext'
import { passwordValidation, usernameValidation } from '../../utils/validationSchemas'
import DisplayError from '../Shared/Error'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN_MUTATION } from '../../gql/Mutations'

const validationSchema = yup.object().shape({
  username: usernameValidation,
  password: passwordValidation,
})

const LoginStyles = styled.section`
  text-align: center;

  .errorMessage {
    color: red;
  }
`

export interface IUser {
  username: string
  password: string
}

interface Props {}

const Login: React.FC<Props> = props => {
  // const { login } = useAuth()
  const [tokenAuth, { error, loading, client }] = useMutation(LOGIN_MUTATION, {
    // refetchQueries: ME_QUERY,
  })

  const handleSubmit = async (
    { username, password }: IUser,
    actions: FormikHelpers<{
      username: string
      password: string
    }>
  ) => {
    // const res = await login(username, password)
    // if (res) {
    //   props.history.push('/')
    // }

    const res = await tokenAuth({ variables: { username, password } })
    if (res && client !== undefined) {
      // console.log('client', client.cache.data.data['UserType:2'])
      localStorage.setItem('authToken', res.data.tokenAuth.token)
      client.writeData({ data: { isLoggedIn: true } })
      props.history.push('/')
    }
  }

  return (
    <LoginStyles className='section'>
      <div className='columns'>
        <div className='column is-4 is-offset-4'>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions)
            }}
          >
            {({ values, errors, dirty, handleReset, isSubmitting, isValid }) => (
              <Form>
                <fieldset disabled={loading} aria-busy={isSubmitting}>
                  {/* <fieldset aria-busy={isSubmitting}> */}
                  <h1 data-testid='login-page'>Login to your account</h1>

                  <DisplayError error={error} />

                  <div className='field'>
                    <label className='label' htmlFor='username'>
                      Username
                      <p className='control has-icons-left has-icons-right'>
                        <Field
                          aria-label='username'
                          type='text'
                          name='username'
                          className='input'
                          placeholder='username'
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
                        data-testid='errors-username'
                        name='username'
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
                        // disabled={!dirty || isSubmitting}
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
