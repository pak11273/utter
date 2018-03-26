import styled from 'styled-components'

export default styled.div.attrs({
  color: props => props.color || props.theme.color,
  size: props => props.size || '2rem',
  font: props => props.font || props.theme.font,
  line: props => props.line || '3rem',
  padding: props => props.padding || '0 0 2rem 0',
  width: props => props.width || '100%',
  text: props => props.text || 'center'
})`
    margin: 0 auto;
    text-align: ${props => props.text};
    width: ${props => props.width};
    padding: ${props => props.padding};

  li {
    list-style-type: none;
    color: ${props => props.color};
    font-family: ${props => props.font};
    line-height: ${props => props.line};
    font-size: ${props => props.size};
  }

  @media(min-width: 464px) {    
    list-style-type: none;
    color: ${props => props.color};
    font-family: ${props => props.font};
    line-height: ${props => props.line};
    font-size: ${props => props.size};
  }
`
