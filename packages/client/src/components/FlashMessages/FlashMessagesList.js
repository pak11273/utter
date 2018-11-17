import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Section} from '../../components'
import FlashMessage from '../../components/FlashMessages/FlashMessage.js'
import {deleteFlashMessage} from '../../app/actions/flashMessages.js'

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

export default connect(mapStateToProps, {deleteFlashMessage})(FlashMessagesList)
