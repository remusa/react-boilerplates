import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import nprogress from 'nprogress'
import Footer from './components/Footer'
import Header from './components/Header'
import Login from './components/Login'
import Main from './components/Main'
import Register from './components/Register'

import 'normalize.css'
import './static/nprogress.css'
import './index.scss'

const AppStyles = styled.div`
    text-align: center;
    height: 100vh;

    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto minmax(auto, 1fr) auto;
    grid-template-areas: 'header header header' '. main .' 'footer footer footer';

    @media all and (max-width: 500px) {
        grid-template-columns: auto minmax(auto, 1fr) auto;
        grid-template-areas:
            'header header header'
            '. main .'
            'footer footer footer';
    }
`

const App = () => {
    nprogress.start()
    nprogress.done()

    return (
        <AppStyles className='App'>
            <Header />

            <Switch>
                <Route path='/' component={Main} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
            </Switch>

            <Footer />
        </AppStyles>
    )
}

export default App
