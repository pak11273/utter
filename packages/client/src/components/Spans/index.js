import styled from 'styled-components'

const Span = styled.span`
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  line-height: ${props => props.lineheight};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  width: ${props => props.width};

  @media (min-width: 640px) {
    display: ${props => props.display640};
  }
`
Span.defaultProps = {}

export default Span
