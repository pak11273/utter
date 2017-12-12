import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import _ from 'lodash'
import axios from 'axios'
import superagent from 'superagent'
import ApiMgr from '../../utils'
import shortid from 'shortid'
import {Box, Button, Input, Text} from '../../components'
import RoomCreator from './RoomCreator.js'

// actions
import {roomSelect, updateRoomLevel} from './actions.js'
import {loadWordList, updateOriginalWordList} from '../Pictures/actions.js'
import {updateCurrentRoom, updateListType} from '../Rooms/actions.js'
import {getRooms} from '../../services/socketio/actions.js'

class Members extends Component {
  render() {
    const {currentRoom} = this.props
    console.log('members: ', currentRoom)
    return (
      <div style={{textAlign: 'left'}}>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Room{' '}
        </Text>
        <div>
          <span style={{color: 'red'}}>
            {currentRoom}
          </span>
        </div>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Members{' '}
        </Text>
        <div>Joe <span style={{color: 'red'}}>offline</span></div>
        <div>Martha <span style={{color: 'red'}}>online</span></div>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Spectators{' '}
        </Text>
        <div>Martha <span style={{color: 'orange'}}>afk</span></div>
      </div>
    )
  }
}

const StyledRoom = styled.div`
  color: ${props => (props.selected ? 'red' : 'black')};
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 0 0 0;
  text-align: left;
`

const Room = ({
  level,
  isSelected,
  updateCurrentRoom,
  creator,
  people,
  title
}) => {
  return (
    <StyledRoom onClick={updateCurrentRoom({title})} selected={isSelected}>
      <Text>Title: {title}</Text>
      Level:{level} People:{people}<br />
      Creator:{creator}
    </StyledRoom>
  )
}

// class RoomList extends Component {
//   render({
//   }) {
//     let list = roomList
//     !list ? (list = []) : list
//     list.push(rooms)
//     if (_.isEmpty(list)) {
//       var renderList = <div>hi</div>
//     } else {
//       var renderList = (
//         <div>
//           {list.map(({_id, language, level, creator, people, title}) => {
//             const isSelected = selectedRoomId == _id
//             const onRoomSelect = () => {
//               // update wordList when room is selected
//               const roomLevel = level
//               const listObj = require(`../../data/${language.toLowerCase()}/level${roomLevel}/query.js`)
//                 .default
//               const listType = require(`../../data/${language.toLowerCase()}/level${roomLevel}/vocab.js`)
//                 .default
//               updateListType(listType.meta.listType)
//               updateOriginalWordList(listObj)
//               loadWordList(listObj)

//               updateRoomLevel(level)
//               onSelect(_id)
//             }
//             return (
//               <Room
//                 creator={creator}
//                 isSelected={isSelected}
//                 key={_id}
//                 level={level}
//                 onClick={onRoomSelect}
//                 people={people}
//                 title={title}
//               />
//             )
//           })}
//         </div>
//       )
//     }
//     return {renderList}
//   }
// }

class RoomList extends Component {
  render() {
    const {
      loadWordList,
      roomList,
      rooms,
      selectedRoomId,
      onSelect,
      updateCurrentRoom,
      updateRoomLevel,
      updateOriginalWordList,
      updateListType
    } = this.props
    let list = roomList
    // !list ? (list = []) : list
    // list.push(rooms)
    if (_.isEmpty(list)) {
      var renderList = <div>No rooms available. Try creating your own.</div>
    } else {
      var renderList = (
        <div style={{padding: '10px'}}>
          {Object.keys(list).map((title, i) => {
            if (title.indexOf('/') !== -1) {
              return <div />
            } else {
              return <Room onClick={onSelect} title={title} />
            }
          })}
        </div>
      )
    }
    return (
      <div>
        {renderList}
      </div>
    )
  }
}

class RoomsContainer extends Component {
  constructor(props) {
    super(props)

    this.onRoomSelect = this.onRoomSelect.bind(this)
    this.updateName = this.updateName.bind(this)
    this.selectRoom = this.selectRoom.bind(this)
  }

  componentDidMount() {
    //TODO: get current rooms available for the current channel
    this.props.actions.getRooms()
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

  filteredRooms() {
    let list = this.props.socketReducer.list
    return list
    // was filtering the list when using mongodb rooms, but using socket rooms now, so this may not be needed anymore.
    // if (Array.isArray(list)) {
    //   return list.filter(
    //     ({channel_id}) => channel_id === this.props.channelReducer.selected
    //   )
    // } else {
    //   return []
    // }
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
    console.log('currentroom: ', this.props.roomReducer.currentRoom)
    if (!this.props.roomReducer.currentRoom) {
      var members = (
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
              updateCurrentRoom={this.props.actions.updateCurrentRoom}
              updateOriginalWordList={this.props.actions.updateOriginalWordList}
              updateRoomLevel={this.props.actions.updateRoomLevel}
              updateListType={this.props.actions.updateListType}
            />
          </Box>
          <Box margin="20px 0 0 0">
            <RoomCreator />
          </Box>
        </Box>
      )
    } else {
      var members = <Members roomReducer={this.props.roomReducer} />
    }
    return <div>{members}</div>
  }
}

const mapStateToProps = state => {
  return {
    channelReducer: state.channelReducer,
    roomReducer: state.roomReducer,
    speakerReducer: state.speakerReducer,
    socketReducer: state.socketReducer,
    userReducer: state.userReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getRooms,
        loadWordList,
        roomSelect,
        updateCurrentRoom,
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
