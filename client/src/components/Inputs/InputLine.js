import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #CCC;
  box-sizing: border-box;
  color: ${props => props.color};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  font-family: ${props => props.fontfamily};
  width: ${props => props.width};
  text-align: ${props => props.textalign};
  height: ${props => props.height};
  padding: ${props => props.padding};
  height: 50px;
  left: 50%;
  padding: 10px 0px;
  width: 200px;
    &:focus {
      outline: none;    
    }
  &::-webkit-input-placeholder {
    color: #AAA;
  }
  
  &:focus::-webkit-input-placeholder {
    color: dodgerblue;
  }
  
  &:focus+.underline {
    transform: scale(1);
  }
`
Input.defaultProps = {
  color: 'black',
  fontsize: '1.5rem',
  fontfamily: 'Arial',
  height: '2rem',
  margin: '10px auto',
  padding: '3px 5% 2px 5%',
  textalign: 'center',
  weight: '100',
  width: '200px'
}

const Underline = styled.div`
  background-color: dodgerblue;
  display: inline-block;
  height: 2px;
  left: 50px;
  margin-top: -4px;
  position: absolute;
  top: 185px;
  -webkit-transform: scale(0, 1);
  transform: scale(0, 1);
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  width: 202px;
`
export default props =>
  <div>
    <Input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
    <Underline />
  </div>

// ref: https://codepen.io/fongfan999/pen/ozVYoW?editors=0100
