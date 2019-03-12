import React from "react"
import {Section} from "../index.js"
import FlashMessage from "./flashmessage.js"

function FlashMessagesList(props) {
  const messages = props.messages.map(message => (
    <FlashMessage key={message.id} message={message} />
  ))
  return <Section>{messages}</Section>
}

export default FlashMessagesList
