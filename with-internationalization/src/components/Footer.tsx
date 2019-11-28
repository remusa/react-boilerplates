import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../context/Theme/ThemeContext'
import Toggle from './Toggle/Toggle'

const FooterStyles = styled.div`
    grid-area: footer;

    footer {
        padding: 1rem;
    }
`

interface Props {}

const Footer: React.FC<Props> = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <FooterStyles>
            <footer className={'footer'}>
                <div className='content has-text-centered'>
                    <span className='credits'>
                        Built with <span className='emoticon has-text-danger'>❤</span>
                        {' by '}
                        <a href='https://renems.com' target='_blank' rel='noopener noreferrer'>
                            RMS
                        </a>
                    </span>

                    <Toggle isOn={theme === 'dark' ? true : false} handleToggle={toggleTheme} />
                </div>
            </footer>
        </FooterStyles>
    )
}

export default Footer
