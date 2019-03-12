import React, {Component} from "react"
import styled from "styled-components"
import Text from "../Text/Text.js"
import Button from "../buttons/button.js"

const StyledMessage = styled.div`
  align-items: center;
  background: #cc1abf;
  color: white;
  display: flex;
  justify-content: center;
  margin: ${props => props.margin};
  width: 100%;
  z-index: 1400;
`
class FlashMessage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    switch (this.props.message.type) {
      case "success":
      case "error":
        // setTimeout(this.props.deleteFlashMessage(this.props.message.id), 10000)
        window.setTimeout(() => {
          // TODO: delete the flash message
        }, 3000)
        break
      default:
        ;(() => null)()
    }
  }

  onClick = () => {
    // TODO: delete the flash message
  }

  render() {
    const {text} = this.props.message
    return (
      <StyledMessage>
        <Text color="white" fontsize="1.4rem" padding="2rem">
          {text}
        </Text>
        <Button
          border="none"
          background="none"
          color="white"
          fontsize="2rem"
          onClick={this.onClick}>
          &times;
        </Button>
      </StyledMessage>
    )
  }
}

export default FlashMessage
