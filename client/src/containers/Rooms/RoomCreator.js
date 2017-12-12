import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Box, Input, Text} from '../../components'

// actions
import {createRoom} from '../../services/socketio/actions.js'

class RoomCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: {
        language: '',
        level: '',
        creator: '',
        people: '',
        title: ''
      }
    }

    this.updateName = this.updateName.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

  updateName(e) {
    e.preventDefault
    const updatedRoom = this.state.room
    updatedRoom[e.target.name] = e.target.value
    this.setState({
      room: updatedRoom
    })
  }

  createRoom() {
    if (!this.state.room.title) {
      alert('You need a room title to create a room')
    } else {
      const room = this.state.room.title
      this.props.actions.createRoom(room)
    }
  }

  render() {
    return (
      <Box>
        <Text fontsize="1.5rem">Create your own Room</Text>
        <Box>
          <Input onChange={this.updateName} placeholder="title" name="title" />
          <Input onChange={this.updateName} placeholder="level" name="level" />
        </Box>
        <Box>
          <Button onClick={this.createRoom} color="black">
            Create Room{' '}
          </Button>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    channelReducer: state.channelReducer,
    roomReducer: state.roomReducer,
    socketReducer: state.socketReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        createRoom
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomCreator)
