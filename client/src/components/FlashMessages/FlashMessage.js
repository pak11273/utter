import React, {Component} from 'react'
import styled from 'styled-components'
import Text from '../../components/Text/Text.js'
import Button from '../../components/Buttons/Button.js'
import './styles.css'

const StyledMessage = styled.div`
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

  componentDidMount() {
    switch (this.props.message.type) {
      case 'success':
      case 'error':
        // setTimeout(this.props.deleteFlashMessage(this.props.message.id), 10000)
        window.setTimeout(() => {
          this.props.deleteFlashMessage(this.props.message.id)
        }, 10000)
      default:
        null
    }
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id)
  }

  render() {
    const {id, type, text} = this.props.message
    return (
      <StyledMessage>
        <Text color="white" fontsize="2rem" padding="2rem">
          {text}
        </Text>
        <Button
          border="none"
          background="none"
          color="black"
          fontsize="2rem"
          onClick={this.onClick}>
          &times;
        </Button>
      </StyledMessage>
    )
  }
}

export default FlashMessage
