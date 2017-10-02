import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import superagent from 'superagent'
import ApiMgr from '../../utils'
import shortid from 'shortid'
import {Box, Button, Input, Text} from '../../components'
import RoomCreator from './RoomCreator.js'

// actions
import {loadRooms, roomSelect, updateRoomLevel} from './actions.js'
import {loadWordList, updateOriginalWordList} from '../Pictures/actions.js'

const StyledRoom = styled.div`
  color: ${props => (props.selected ? 'red' : 'black')};
  cursor: pointer;
  font-size: 1rem;
  padding: 10px;
  text-align: left;
`

const Room = ({level, isSelected, onClick, creator, people, title}) => {
  return (
    <StyledRoom onClick={onClick} selected={isSelected}>
      <Text>Title: {title}</Text>
      Level:{level} People:{people}<br />
      Creator:{creator}
    </StyledRoom>
  )
}

const RoomList = ({
  loadWordList,
  rooms,
  selectedRoomId,
  onSelect,
  updateRoomLevel,
  updateOriginalWordList
}) => {
  return (
    <div>
      {rooms.list.map(({_id, level, creator, people, title}) => {
        const isSelected = selectedRoomId == _id
        const onRoomSelect = () => {
          // update wordList when room is selected
          const roomLevel = level
          const listObj = require(`../../data/level${roomLevel}/query.js`)
          updateOriginalWordList(listObj.default)

          loadWordList(listObj.default)

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
            title={title}
          />
        )
      })}
    </div>
  )
}

class Rooms extends Component {
  constructor(props) {
    super(props)

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
    //TODO: this doesn't work anymore, we got rid of local state
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
        <Box
          alignitems="flex-start"
          height="500px"
          overflowy="scroll"
          overflowx="none">
          <RoomList
            loadWordList={this.props.actions.loadWordList}
            onSelect={this.onRoomSelect}
            rooms={this.props.roomReducer}
            selectedRoomId={this.props.roomReducer.selected}
            updateOriginalWordList={this.props.actions.updateOriginalWordList}
            updateRoomLevel={this.props.actions.updateRoomLevel}
          />
        </Box>
        <Box>
          <RoomCreator addRoom={this.addRoom} />
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    roomReducer: state.roomReducer,
    speakerReducer: state.speakerReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        loadRooms,
        loadWordList,
        roomSelect,
        updateOriginalWordList,
        updateRoomLevel
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)
