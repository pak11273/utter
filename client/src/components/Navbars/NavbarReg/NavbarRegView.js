import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import LoginView from '../../Logins/LoginReg/LoginRegView'

const Section = styled.section`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px; 
    margin: 0 auto;
    max-width: 1024px;
    position: ${props => (props.fixed ? 'fixed' : 'initial')}
  `
const SectionLeft = styled.section`
    display: none;
    @media (min-width: 480px) {
        display: flex;
      }
    justify-content: flex-start;
    align-items: center;
  `
const SectionRight = styled.section`
    background: none;
  `
const Logo = styled.h1`
    padding: .5rem;
    font-size: 2rem;
  `
const Nav = styled.ul`
    li {
      display: inline;
      font-size: 1rem;
   margin-left: 4rem;
    }
  `

const NavbarRegView = ({logo, list, fixed}) =>
  <Section fixed={fixed}>
    <SectionLeft>
      <Logo>{logo}</Logo>
      <Nav>
        <ul>
          {list.map((item, i) => {
            return <li key={i}>{item}</li>
          })}
        </ul>
      </Nav>
    </SectionLeft>
    <SectionRight>
      <LoginView />
    </SectionRight>
  </Section>

export default NavbarRegView
