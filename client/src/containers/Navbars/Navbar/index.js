import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import Login from '../../Logins/Login.js'
import Hamburger from '../../../components/Buttons/Hamburger'

const Section = styled.section`
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60px; 
    position: ${props => (props.fixed ? 'fixed' : 'initial')}
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
      font-size: 10rem;
   margin-left: 4rem;
    }
  `

const Navbar = ({logo, list, fixed}) =>
  <Section fixed={fixed}>
    <Hamburger />
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
      <Login />
    </SectionRight>
  </Section>

export default Navbar
