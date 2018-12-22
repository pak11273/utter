import React, {Component} from "react"
import styled from "styled-components"
import Text from "../Text/Text.js"
import Button from "../Buttons/Button.js"
import "./styles.css"

const StyledMessage = styled.div`
  align-items: center;
  background: #8b1a87;
  display: flex;
  justify-content: center;
  margin: ${props => props.margin};
  z-index: 99;
`
class FlashMessage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    switch (this.props.message.type) {
      case "success":
      case "error":
        // setTimeout(this.props.deleteFlashMessage(this.props.message.id), 10000)
        window.setTimeout(() => {
          this.props.deleteFlashMessage(this.props.message.id)
        }, 3000)
        break
      default:
        ;(() => null)()
    }
  }

  onClick = () => {
    this.props.deleteFlashMessage(this.props.message.id)
  }

  render() {
    const {text} = this.props.message
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
