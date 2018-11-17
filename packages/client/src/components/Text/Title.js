import styled from 'styled-components'

const Title = styled.div`
  color: ${props => props.color};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  width: ${props => props.width};

  @media (min-width: 640px) {
    font-size: ${props => props.fontsize640};
  }
`
Title.defaultProps = {
  fontsize: '2rem',
  fontweight: '600',
  fontfamily: 'Arial',
  padding: '20px 0 0 0',
  width: '100%',
  textalign: 'center'
}

export default Title
