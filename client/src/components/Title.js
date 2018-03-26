import styled from 'styled-components'

const Title = styled.div`
  color: ${props => props.color};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign} 
  width: ${props => props.width};
`
Title.defaultProps = {
  fontsize: '4rem',
  fontweight: '600',
  padding: '5% 0 0 0',
  width: '100%',
  textalign: 'center'
}

export default Title
