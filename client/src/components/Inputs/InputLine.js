import React from 'react'
import styled from 'styled-components'

const Input = styled.input.attrs({
  size: props => props.size || '1.5rem',
  weight: props => props.weight || '100',
  color: props => props.color || props.theme.color,
  font: props => props.font,
  padding: props => props.padding || '3px 5% 2px 5%',
  width: props => props.width || '200px',
  textalign: props => props.textalign || 'center',
  height: props => props.height || '2rem',
  margin: props => props.margin || '10px auto'
})`
  padding: ${props => props.padding};
  color: ${props => props.color};
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  font-family: ${props => props.font};
  width: ${props => props.width};
  text-align: ${props => props.textalign};
  height: ${props => props.height};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #CCC;
  color: #555;
  box-sizing: border-box;
  font-family: 'Arvo';
  font-size: 18px;
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
