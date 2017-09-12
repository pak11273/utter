import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Box} from '../../components'

const Msg = ({author, message, username}) =>
  <div className="Message" style={{textAlign: 'left', fontSize: '1rem'}}>
    <div className="Message-username">
      {username}:
      <span className="Message-message"> {message}</span>
    </div>
  </div>

const MsgList = props => {
  let list = props.messageList
  !list ? (list = []) : list
  list.push(props.message)
  return (
    <div style={{alignSelf: 'flex-start'}}>
      {list.map(({username, author, message, id}) => {
        return (
          <Msg key={id} username={username} author={author} message={message} />
        )
      })}
    </div>
  )
}

class Chat extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Box>
        <Box overflowy="scroll" overflowx="none" height="500px">
          <MsgList
            message={this.props.message}
            messageList={this.props.messageList}
          />
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    message: state.speakerReducer.message,
    messageList: state.speakerReducer.messageList
  }
}

export default connect(mapStateToProps)(Chat)
