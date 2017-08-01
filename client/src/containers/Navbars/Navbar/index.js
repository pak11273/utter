import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import styled from 'styled-components'
import Login from '../../Logins/Login.js'
import Logo from '../../../components/Logos/Logo.js'
import Hamburger from '../../../components/Buttons/Hamburger'
import Graphic from '../../../assets/images/logo.svg'

const Section = styled.section`
  align-items: center;
  background: ${props => props.background};
  box-sizing: border-box;
  display: flex;
  height: ${props => props.height}; 
  justify-content: flex-end;
  position: ${props => props.position};
  z-index: ${props => props.zindex};
  width: ${props => props.width};

  @media (min-width: 640px) {
    justify-content: center;
    min-width: 640px;
    }
`

Section.defaultProps = {
  background: 'black',
  position: 'fixed',
  height: '90px',
  width: '100%',
  zindex: '99'
}

const SectionLeft = styled.section`
    display: none;
    align-items: center;

    @media (min-width: 640px) {
        display: flex;
        justify-content: 'flex-start';
        width: 800px;
      }
  `

SectionLeft.defaultProps = {
  margin: '0 auto'
}

const SectionRight = styled.section`
    background: none;
  `
const Nav = styled.ul`
    li {
     display: inline;
     font-size: 1rem;
     margin-left: 4rem;
    }
  `

const Navbar = props =>
  <Section {...props}>
    <Hamburger />
    <SectionLeft>
      <NavLink to="/">
        <Logo
          background={`url(${Graphic}) center/cover no-repeat`}
          to="/"
          display="none"
          display768="block"
          width="48px"
          height="48px"
        />
      </NavLink>
      <Nav>
        <ul>
          {props.list.map((item, i) => {
            return (
              <li key={i}>
                <NavLink
                  exact
                  activeStyle={{
                    color: 'red'
                  }}
                  to={'/' + item}>
                  {item}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </Nav>
    </SectionLeft>
    <SectionRight>
      <Login />
    </SectionRight>
  </Section>

export default Navbar
