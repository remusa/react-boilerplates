import React from 'react'
import styled from 'styled-components'

const HomeStyles = styled.section`
    height: 100%;
`

interface Props {}

const Home: React.FC<Props> = () => (
    <HomeStyles className='hero is-primary'>
        <div className='hero-body'>
            <div className='container'>
                <h1 className='title' data-testid='heading'>
                    React + TypeScript + Parcel Boilerplate
                </h1>

                <h2 className='subtitle'>
                    A simple boilerplate for React apps
                </h2>
            </div>
        </div>
    </HomeStyles>
)

export default Home
