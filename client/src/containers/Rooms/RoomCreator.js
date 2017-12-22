import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Box, Input, Text} from '../../components'

// actions
import {updateRoomCreator, updateRoomLevel, updateListType} from './actions.js'

import {loadWordList, loadOriginalWordList} from '../Pictures/actions.js'

import {createRoom, joinRoom} from '../../services/socketio/actions.js'

class RoomCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: {
        language: '',
        level: '',
        listType: '',
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
    } else if (!this.state.room.level) {
      alert('You need to input a level for your room')
    } else if (
      this.state.room.level > this.props.userReducer.userProfile.level
    ) {
      alert('You cannot create or join rooms above your level')
    } else {
      const room = this.state.room
      this.props.actions.updateRoomCreator(
        this.props.userReducer.userProfile.username
      )

      // const roomLevel = this.props.roomReducer.roomLevel
      const roomLevel = this.state.room.level
      const roomLanguage = this.props.roomReducer.language
      const listObj = require(`../../data/${roomLanguage}/level${roomLevel}/query.js`)
      const listType = require(`../../data/${roomLanguage.toLowerCase()}/level${roomLevel}/vocab.js`)
        .default
      this.props.actions.updateListType(listType.meta.listType)
      this.originalWordList = listObj.default
      this.props.actions.loadOriginalWordList(this.originalWordList)

      // Put list in redux
      this.props.actions.loadWordList(listObj.default)

      this.props.actions.createRoom(room)
      this.props.actions.joinRoom(room.title)
      this.props.actions.updateRoomLevel(room.level)
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
    socketReducer: state.socketReducer,
    userReducer: state.userReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        createRoom,
        joinRoom,
        loadOriginalWordList,
        loadWordList,
        updateListType,
        updateRoomCreator,
        updateRoomLevel
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomCreator)
