import styled from 'styled-components'

const TextArea = styled.textarea`
  align-self: ${props => props.alignself};
  color: ${props => props.color};
  border: ${props => props.border};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  height: ${props => props.height};
  margin: ${props => props.margin};
  min-height: ${props => props.minheight};
  min-width: ${props => props.minwidth};
  padding: ${props => props.padding};
  resize: ${props => props.resize};
  text-align: ${props => props.textalign};
  width: ${props => props.width};

  &:focus {
    outline: ${props => props.focusoutline};
  }
`
TextArea.defaultProps = {
  color: 'black',
  display: 'block',
  fontsize: '1rem',
  fontfamily: 'Arial',
  margin: '10px auto',
  padding: '10px',
  textalign: 'left'
}

export default TextArea
