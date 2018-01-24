import React, {Component} from 'react'
import styled from 'styled-components'
import Text from '../../components/Text/Text.js'
import Button from '../../components/Buttons/Button.js'

const Success = styled.div`
  align-items: center;
  background: #8b1a87;
  display: flex;
  justify-content: center;
  margin: ${props => props.margin};
`
class FlashMessage extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id)
  }

  render() {
    const {id, type, text} = this.props.message
    return (
      <Success>
        <Text color="white" fontsize="2rem" padding="2rem">{text}</Text>
        <Button
          border="none"
          background="none"
          color="black"
          fontsize="2rem"
          onClick={this.onClick}>
          &times;
        </Button>
      </Success>
    )
  }
}

export default FlashMessage
