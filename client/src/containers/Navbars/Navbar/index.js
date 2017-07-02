import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import styled from 'styled-components'
import Login from '../../Logins/Login.js'
import Hamburger from '../../../components/Buttons/Hamburger'

const Section = styled.section.attrs({
  height: props => props.height || '60px',
  fixed: props => (props.fixed ? 'fixed' : 'initial')
})`
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: ${props => props.height}; 
    position: ${props => props.fixed};
    @media (min-width: 960px) {
        justify-content: flex-start;
      }
  `
const SectionLeft = styled.section`
    display: none;
    align-items: center;
    @media (min-width: 960px) {
        display: flex;
        justify-content: flex-start;
        margin: 0 auto;
      }
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

const Navbar = props =>
  <Section height={props.height} fixed={props.fixed}>
    <Hamburger />
    <SectionLeft>
      <Logo>{props.logo}</Logo>
      <Nav>
        <ul>
          {props.list.map((item, i) => {
            return <li key={i}><NavLink to={'/' + item}>{item}</NavLink></li>
          })}
        </ul>
      </Nav>
    </SectionLeft>
    <SectionRight>
      <Login />
    </SectionRight>
  </Section>

export default Navbar
