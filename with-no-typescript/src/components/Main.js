import React from 'react'
import styled from 'styled-components'

const MainStyles = styled.section`
    grid-area: main;
`

const Main = () => (
    <MainStyles className='hero is-primary'>
        <div className='hero-body'>
            <div className='container'>
                <h1 className='title'>React + Parcel Boilerplate</h1>
                <h2 className='subtitle'>A simple boilerplate for React apps</h2>
            </div>
        </div>
    </MainStyles>
)

export default Main
