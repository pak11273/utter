import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import superagent from 'superagent'
import ApiMgr from '../../utils'
import shortid from 'shortid'

// actions
import {loadRooms, roomSelect, updateRoomLevel} from './actions.js'

import RoomCreate from './RoomCreate.js'
import {Box, Button, Input, Text} from '../../components'

const StyledRoom = styled.div`
  color: ${props => (props.selected ? 'red' : 'black')};
  cursor: pointer;
  font-size: 1rem;
  padding: 10px;
  text-align: left;
`

const Room = ({level, isSelected, onClick, creator, people}) => {
  return (
    <StyledRoom onClick={onClick} selected={isSelected}>
      Level:{level} People:{people}<br />
      Creator:{creator}
    </StyledRoom>
  )
}

const RoomList = ({rooms, selectedRoomId, onSelect, updateRoomLevel}) => {
  return (
    <div>
      {rooms.list.map(({_id, level, creator, people}) => {
        const isSelected = selectedRoomId == _id
        const onRoomSelect = () => {
          updateRoomLevel(level)
          onSelect(_id)
        }
        return (
          <Room
            creator={creator}
            isSelected={isSelected}
            key={_id}
            level={level}
            onClick={onRoomSelect}
            people={people}
          />
        )
      })}
    </div>
  )
}

class Rooms extends Component {
  constructor(props) {
    super(props)

    this.filteredMessages = this.filteredMessages.bind(this)
    this.onRoomSelect = this.onRoomSelect.bind(this)

    this.updateName = this.updateName.bind(this)
    this.addRoom = this.addRoom.bind(this)
    this.selectRoom = this.selectRoom.bind(this)
  }

  componentDidMount() {
    superagent
      .get('/api/rooms')
      .query(null)
      .set('Accept', 'accept/json')
      .end((err, res) => {
        if (err) {
          alert(
            'Sorry. There was an internal error.  Please contact the system administrator about the problem' +
              err
          )
          return
        }
        const results = res.body.room
        this.props.actions.loadRooms(results)
      })
  }

  updateName(e) {
    e.preventDefault
    const updatedRoom = Object.assign({}, this.state.room)
    updatedRoom[e.target.level] = e.target.value
    this.setState({
      room: updatedRoom
    })
  }

  addRoom(room) {
    superagent.post('/api/rooms').send(room).end((err, res) => {
      if (err) {
        alert(err)
        return
      }
      this.props.actions.loadRooms()
    })
  }

  selectRoom(index) {
    this.setState({
      selected: index
    })
  }

  onRoomSelect(id) {
    this.props.actions.roomSelect(id)
  }

  filteredMessages() {
    return this.state.messages.filter(
      ({channel_id}) => channel_id === this.props.roomReducer.selected
    )
  }

  render() {
    return (
      <Box>
        <Box flexdirection="row" justifycontent="space-around">
          <Text>Sort By: </Text>
          <select>
            <option>Rooms</option>
            <option>levels</option>
            <option>creators</option>
          </select>
          <select>
            <option>Asc</option>
            <option>Desc</option>
          </select>
        </Box>
        <Box height="500px" overflowy="scroll" overflowx="none">
          <RoomList
            rooms={this.props.roomReducer}
            updateRoomLevel={this.props.actions.updateRoomLevel}
            selectedRoomId={this.props.roomReducer.selected}
            onSelect={this.onRoomSelect}
          />
        </Box>
        <Box>
          <RoomCreate addRoom={this.addRoom} />
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    roomReducer: state.roomReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {loadRooms, roomSelect, updateRoomLevel},
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)
