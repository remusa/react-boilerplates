import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik'
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
        await actions.setSubmitting(false)
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
                        {({ values, dirty, handleChange, handleReset, isSubmitting }) => (
                            <Form>
                                <h1 data-testid='signup-page'>Sign Up</h1>

                                <div className='field'>
                                    <label className='label' htmlFor='username'>
                                        Username
                                        <p className='control has-icons-left has-icons-right'>
                                            <input
                                                required
                                                className='input'
                                                name='username'
                                                type='text'
                                                placeholder='Username'
                                                value={values.username}
                                                onChange={handleChange}
                                            />

                                            <span className='icon is-small is-left'>
                                                <i className='fa fa-user'></i>
                                            </span>

                                            <span className='icon is-small is-right'>
                                                <i className='fa fa-check'></i>
                                            </span>
                                        </p>
                                        <ErrorMessage
                                            name='username'
                                            component='div'
                                            className='errorMessage'
                                        />
                                    </label>
                                </div>

                                <div className='field'>
                                    <label className='label' htmlFor='email'>
                                        Email
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
                                        Password
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
                                    <label className='label' htmlFor='confirmPassword'>
                                        Confirm Password
                                        <p className='control has-icons-left'>
                                            <input
                                                required
                                                className='input'
                                                name='confirmPassword'
                                                type='password'
                                                placeholder='*****'
                                                value={values.confirmPassword}
                                                onChange={handleChange}
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
                                            disabled={!dirty || isSubmitting}
                                        >
                                            Submit
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
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </RegisterStyles>
    )
}

export default Register
