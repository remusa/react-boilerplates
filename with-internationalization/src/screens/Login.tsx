import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import styled from 'styled-components'
import * as yup from 'yup'
import { emailValidation, passwordValidation } from '../utils/validationSchemas'

const validationSchema = yup.object().shape({
    email: emailValidation,
    password: passwordValidation,
})

const LoginStyles = styled.section`
    /* height: 100%; */
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

        // await signin()
        await actions.setSubmitting(false)
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
                        {({ values, dirty, handleChange, handleReset, isSubmitting }) => (
                            <Form>
                                {/* <fieldset disabled={isSubmitting} aria-busy={isSubmitting}> */}
                                <h1 data-testid='login-page'>Login</h1>

                                {/* <Error error={error} /> */}

                                <div className='field'>
                                    <label className='label' htmlFor='email'>
                                        <p className='control has-icons-left has-icons-right'>
                                            <input
                                                required
                                                className='input'
                                                name='email'
                                                type='email'
                                                placeholder='Email'
                                                value={values.email}
                                                onChange={handleChange}
                                            />

                                            <span className='icon is-small is-left'>
                                                <i className='fas fa-envelope'></i>
                                            </span>

                                            <span className='icon is-small is-right'>
                                                <i className='fa fa-check'></i>
                                            </span>
                                        </p>

                                        <ErrorMessage
                                            name='email'
                                            component='div'
                                            className='errorMessage'
                                        />
                                    </label>
                                </div>

                                <div className='field'>
                                    <label className='label' htmlFor='password'>
                                        <p className='control has-icons-left'>
                                            <input
                                                required
                                                className='input'
                                                name='password'
                                                type='password'
                                                placeholder='*****'
                                                value={values.password}
                                                onChange={handleChange}
                                            />

                                            <span className='icon is-small is-left'>
                                                <i className='fas fa-lock'></i>
                                            </span>
                                        </p>

                                        <ErrorMessage
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
                                            disabled={!dirty || isSubmitting}
                                        >
                                            Login
                                        </button>

                                        <button
                                            type='button'
                                            className='button is-danger'
                                            disabled={!dirty}
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </button>
                                    </p>
                                </div>
                                {/* </fieldset> */}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </LoginStyles>
    )
}

export default Login
