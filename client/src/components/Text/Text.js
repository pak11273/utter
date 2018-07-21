import styled from 'styled-components'

const Text = styled.div`
  align-items: ${props => props.alignitems};
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  height: ${props => props.height};
  line-height: ${props => props.lineheight};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`
Text.defaultProps = {
  display: 'block',
  fontsize: '1rem',
  textalign: 'left'
}

export default Text
