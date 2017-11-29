import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import superagent from 'superagent'
import ApiMgr from '../../utils'
import shortid from 'shortid'
import {Box, Button, Input, Text} from '../../components'
import RoomCreator from './RoomCreator.js'

// actions
import {loadRooms, roomSelect, updateRoomLevel} from './actions.js'
import {loadWordList, updateOriginalWordList} from '../Pictures/actions.js'
import {updateListType} from '../Rooms/actions.js'

const StyledRoom = styled.div`
  color: ${props => (props.selected ? 'red' : 'black')};
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 0 0 0;
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
  roomList,
  rooms,
  selectedRoomId,
  onSelect,
  updateRoomLevel,
  updateOriginalWordList,
  updateListType
}) => {
  let list = roomList
  !list ? (list = []) : list
  list.push(rooms)
  return (
    <div>
      {list.map(({_id, language, level, creator, people, title}) => {
        const isSelected = selectedRoomId == _id
        const onRoomSelect = () => {
          // update wordList when room is selected
          const roomLevel = level
          const listObj = require(`../../data/${language.toLowerCase()}/level${roomLevel}/query.js`)
            .default
          const listType = require(`../../data/${language.toLowerCase()}/level${roomLevel}/vocab.js`)
            .default
          updateListType(listType.meta.listType)
          updateOriginalWordList(listObj)
          loadWordList(listObj)

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

class RoomsContainer extends Component {
  constructor(props) {
    super(props)

    this.onRoomSelect = this.onRoomSelect.bind(this)
    this.updateName = this.updateName.bind(this)
    this.addRoom = this.addRoom.bind(this)
    this.selectRoom = this.selectRoom.bind(this)
  }

  componentDidMount() {
    //TODO: this.props.actions.loadRooms(results)
    // superagent
    //   .get('/api/rooms')
    //   .query(null)
    //   .set('Accept', 'accept/json')
    //   .end((err, res) => {
    //     if (err) {
    //       alert(
    //         'Sorry. There was an internal error.  Please contact the system administrator about the problem' +
    //           err
    //       )
    //       return
    //     }
    //     const results = res.body.room
    //     this.props.actions.loadRooms(results)
    //   })
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
    axios
      .post('/api/rooms', {
        channel_id: this.props.channelReducer.selected,
        language: room.language,
        level: room.level,
        creator: room.creator,
        title: room.title,
        people: 2,
        private: false
      })
      .then(res => {
        return this.props.actions.loadRooms()
      })
      .catch(err => {
        alert(
          'Sorry. There was an internal error.  Please contact technical support about this error: ' +
            err
        )
      })
  }

  filteredRooms() {
    let list = this.props.roomReducer.list
    if (Array.isArray(list)) {
      return list.filter(
        ({channel_id}) => channel_id === this.props.channelReducer.selected
      )
    } else {
      return []
    }
  }

  selectRoom(index) {
    this.setState({
      selected: index
    })
  }

  onRoomSelect(id) {
    this.props.actions.roomSelect(id)
  }

  onTrash() {
    const socket = this.props.channelReducer.socket
    console.log('rooms: ', socket)
    socket.to('trash').on('updated_rooms', list => {
      console.log('room list: ', list)
    })
  }

  render() {
    return (
      <Box>
        <Box
          flexdirection="row"
          justifycontent="flex-start"
          margin="0 0 20px 0">
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
          justifycontent="flex-start"
          overflowy="scroll"
          padding="20px 0 0 0">
          <RoomList
            loadWordList={this.props.actions.loadWordList}
            onSelect={this.onRoomSelect}
            rooms={this.props.roomReducer}
            roomList={this.filteredRooms()}
            selectedRoomId={this.props.roomReducer.selected}
            updateOriginalWordList={this.props.actions.updateOriginalWordList}
            updateRoomLevel={this.props.actions.updateRoomLevel}
            updateListType={this.props.actions.updateListType}
          />
        </Box>
        <Box margin="20px 0 0 0">
          <RoomCreator addRoom={this.addRoom} />
        </Box>
        <button onClick={this.onTrash.bind(this)}>
          trash
        </button>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    channelReducer: state.channelReducer,
    roomReducer: state.roomReducer,
    speakerReducer: state.speakerReducer,
    userReducer: state.userReducer
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
        updateRoomLevel,
        updateListType
      },
      dispatch
    )
  }
}

// rooms should have a language property
export default connect(mapStateToProps, mapDispatchToProps)(RoomsContainer)
