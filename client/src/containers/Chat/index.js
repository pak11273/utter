import React, {Component} from 'react'
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
    <div style={{alignSelf: 'flex-start'}}>
      {list.map(({author, message, id}) => {
        return <Msg key={id} author={author} message={message} />
      })}
    </div>
  )
}

class Chat extends Component {
  constructor(props) {
    super(props)

    // this.filterMessages = this.filterMessages.bind(this)
  }

  // TODO: filter messages by room id
  // filterMessages() {
  //   this.props.messageList.filter(
  //     room => room.room_id === this.props.roomId.selected
  //   )
  // }

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
    messageList: state.speakerReducer.messageList,
    roomId: state.roomReducer
  }
}

export default connect(mapStateToProps, null)(Chat)
