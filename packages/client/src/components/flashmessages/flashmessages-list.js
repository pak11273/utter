import React from "react"
import {connect} from "react-redux"
import {Section} from "../index.js"
import FlashMessage from "./flashmessage.js"
import {deleteFlashMessage} from "../../core/actions/flashMessages.js"

function FlashMessagesList(props) {
  const messages = props.messages.map(message => (
    <FlashMessage
      key={message.id}
      message={message}
      deleteFlashMessage={props.deleteFlashMessage}
    />
  ))
  return <Section>{messages}</Section>
}

const mapStateToProps = state => {
  return {
    messages: state.flashMessages
  }
}

export default connect(
  mapStateToProps,
  {deleteFlashMessage}
)(FlashMessagesList)
