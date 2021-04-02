import React, { useState } from 'react'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import useWindowDimensions from '../hooks/useWindowDimensions'

const MAX_WIDTH = 1024

const HeaderStyles = styled.header`
  grid-area: header;
  background-color: transparent;
`

interface Props extends RouteComponentProps {}

const Header: React.FC<Props> = props => {
  const [showHeader, setShowHeader] = useState<boolean>(false)
  const { width } = useWindowDimensions()

  const toggleHeader = () => {
    if (width >= MAX_WIDTH) {
      setShowHeader(true)
      return
    }
    setShowHeader(!showHeader)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter') {
      setShowHeader(true)
    }
  }

  const handleLogout = () => {
    const token = localStorage.getItem('token') || null

    if (token) {
      window.localStorage.removeItem('token')
      props.history.push('/login')
    }
  }

  return (
    <HeaderStyles>
      <nav className='navbar ' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <NavLink className='navbar-item' href='https://bulma.io' to='/'>
            <img src='https://bulma.io/images/bulma-logo.png' alt='logo' width='60' height='20' />
          </NavLink>

          <a
            tabIndex={0}
            role='button'
            className='navbar-burger burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
            onClick={toggleHeader}
            onKeyPress={handleKeyPress}
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>

        <div
          id='navbarBasicExample'
          className={width > MAX_WIDTH || showHeader ? 'navbar-menu is-active' : 'navbar-menu'}
        >
          <div className='navbar-start'>
            <div className='navbar-item'>
              <NavLink className='navbar-item' to='/about'>
                About
              </NavLink>

              <NavLink className='navbar-item' to='/contact'>
                Contact
              </NavLink>

              <hr className='navbar-divider' />

              <NavLink className='navbar-item' to='/issues'>
                Report an issue
              </NavLink>
            </div>
          </div>

          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='buttons'>
                <NavLink className='button is-light' to='/login'>
                  Log in
                </NavLink>

                <NavLink className='button is-primary' to='/register'>
                  <strong>Sign up</strong>
                </NavLink>

                <button className='button is-danger' onClick={handleLogout}>
                  <strong>Logout</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </HeaderStyles>
  )
}

export default withRouter(Header)
