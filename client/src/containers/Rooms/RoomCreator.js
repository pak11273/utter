import React, {Component} from 'react'
import {Button, Box, Input, Text} from '../../components'

class RoomCreator extends Component {
  constructor() {
    super()
    this.state = {
      room: {
        level: '',
        creator: '',
        people: ''
      }
    }

    this.updateName = this.updateName.bind(this)
    this.addRoom = this.addRoom.bind(this)
  }

  updateName(e) {
    e.preventDefault
    const updatedRoom = this.state.room
    updatedRoom[e.target.name] = e.target.value
    this.setState({
      room: updatedRoom
    })
  }

  addRoom() {
    this.props.addRoom(this.state.room)
  }

  render() {
    return (
      <Box>
        <Text fontsize="1.5rem">Create your own Room</Text>
        <Box>
          <Input onChange={this.updateName} placeholder="level" name="level" />
          <Input
            onChange={this.updateName}
            placeholder="creator"
            name="creator"
          />
        </Box>
        <Box>
          <Button onClick={this.addRoom} color="black">
            Create A Room{' '}
          </Button>
        </Box>
      </Box>
    )
  }
}

export default RoomCreator
