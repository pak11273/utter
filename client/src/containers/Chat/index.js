import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Box} from '../../components'

const Msg = ({author, message}) =>
  <div className="Message" style={{textAlign: 'left', fontSize: '1rem'}}>
    <div className="Message-username">
      {author}: <span className="Message-message"> {message}</span>
    </div>
  </div>

const MsgList = props => {
  let list = props.messageList
  !list ? (list = []) : list
  list.push(props.message)
  return (
    <Box alignitems="flex-start" justifycontent="flex-start" overflow="visible">
      {list.map(({author, message, id}) => {
        return <Msg key={id} author={author} message={message} />
      })}
    </Box>
  )
}

class Chat extends Component {
  constructor(props) {
    super(props)

    this.filteredMessages = this.filteredMessages.bind(this)
  }

  filteredMessages() {
    let list = this.props.speakerReducer.messageList
    if (Array.isArray(list)) {
      return list.filter(
        ({room_id}) => room_id === this.props.roomReducer.selected
      )
    } else {
      return []
    }
  }

  render() {
    return (
      <Box
        height="600px"
        justifycontent="flex-start"
        overflowy="scroll"
        overflowx="none">
        <MsgList
          message={this.props.speakerReducer.message}
          messageList={this.filteredMessages()}
        />
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    speakerReducer: state.speakerReducer,
    roomReducer: state.roomReducer,
    message: state.speakerReducer.message
  }
}

export default connect(mapStateToProps, null)(Chat)
