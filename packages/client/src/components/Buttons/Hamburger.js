import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Menu = styled.div`
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`

Menu.defaultProps = {
  margin: '0 1rem'
}

const Bar = styled.div`
  background: ${props => props.background};
  color: ${props => props.color};
  height: 5px;
  margin: 3px 0;
  width: 35px;
`
Bar.defaultProps = {
  background: 'white',
  color: 'white'
}

export default props => (
  <Menu
    role="button"
    padding={props.padding}
    onClick={props.onClick}
    id={props.id}>
    <Bar />
    <Bar />
    <Bar />
  </Menu>
)
