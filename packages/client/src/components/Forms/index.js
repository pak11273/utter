import styled from 'styled-components'

const Form = styled.form`
  display: grid;
  width: ${props => props.width};
`

Form.defaultProps = {
  width: '100%'
}

export default Form
