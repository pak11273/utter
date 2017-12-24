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
import {updateRoomLevel} from './actions.js'
import {loadWordList, updateOriginalWordList} from '../Pictures/actions.js'
import {updateCurrentRoom, updateListType} from '../Rooms/actions.js'
import {getRooms, joinRoom} from '../../services/socketio/actions.js'

class Members extends Component {
  render() {
    const {currentRoom} = this.props
    return (
      <div style={{textAlign: 'left'}}>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          {currentRoom}
        </Text>
        <Text color="blue" fontsize="1rem" padding="20px 0 10px 0">
          Members{' '}
        </Text>
        <div>Joe <span style={{color: 'red'}}>offline</span></div>
        <div>Martha <span style={{color: 'red'}}>online</span></div>
        <Text color="blue" fontsize="1rem" padding="20px 0 10px 0">
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
  joinRoom,
  updateCurrentRoom,
  creator,
  people,
  title
}) => {
  // if (!title) {
  //   console.log('wtf')
  //   var room = (
  //     <StyledRoom selected={isSelected}>
  //       <Text onClick={joinRoom}>Lobby (0)</Text>
  //     </StyledRoom>
  //   )
  // } else {
  var room = (
    <StyledRoom selected={isSelected}>
      <Text fontsize="20px" onClick={joinRoom}>
        {title} <span style={{fontSize: '15px'}}>( {people} )</span>
      </Text>
      <Text>level:{level}</Text>
      <Text>creator:{creator}</Text>
    </StyledRoom>
  )
  // }
  return room
}

// class RoomList extends Component {
//   render({
//   }) {
//     let list = filteredRoomList
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
      joinRoom,
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
      console.log('list: ', list)
      var renderList = Object.keys(list).map((item, i) => {
        if (item.indexOf('/') !== -1) {
          return <div />
        } else {
          console.log('item: ', list)
          return (
            <Room
              joinRoom={() => joinRoom(item)}
              title={item}
              people={list[item].length}
            />
          )
        }
      })
      // for (var x in list) {
      //   if (x.indexOf('/') !== -1) {
      //     return <div />
      //   } else {
      //     return <Room
      //         joinRoom={() => joinRoom(x)}
      //         title={x}
      //         people={list[x].length}
      //       />
      //   }}

      // var renderList = (
      //   <div style={{padding: '10px'}}>
      //     {Object.keys(list).map((title, i) => {
      //       if (title.indexOf('/') !== -1) {
      //         return <div />
      //       } else {
      //         return (
      //           <Room joinRoom={() => joinRoom(`${title}`)} title={title} />
      //         )
      //       }
      //     })}
      //   </div>
      // )
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

    this.joinRoom = this.joinRoom.bind(this)
    this.updateName = this.updateName.bind(this)
    this.selectRoom = this.selectRoom.bind(this)
    // this.filteredRoomList = this.filteredRoomList.bind(this)
  }

  componentDidMount() {
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

  // filteredRoomList() {
  //   let list = this.props.socketReducer.list
  //   return list
  // was filtering the list when using mongodb rooms, but using socket rooms now, so this may not be needed anymore.
  // if (Array.isArray(list)) {
  //   return list.filter(
  //     ({channel_id}) => channel_id === this.props.channelReducer.selected
  //   )
  // } else {
  //   return []
  // }
  // }

  selectRoom(index) {
    this.setState({
      selected: index
    })
  }

  joinRoom(name) {
    this.props.actions.joinRoom(name)
  }

  render() {
    if (!this.props.socketReducer.joined_room) {
      var roomCreator = <RoomCreator />
      var members = (
        <Box>
          <Box
            flexdirection="row"
            justifycontent="flex-start"
            margin="0 0 20px 0">
            <Text>Search: </Text>
          </Box>
          <Box
            alignitems="flex-start"
            height="500px"
            justifycontent="flex-start"
            overflowy="scroll"
            padding="20px 0 0 0">
            <RoomList
              loadWordList={this.props.actions.loadWordList}
              joinRoom={this.joinRoom}
              rooms={this.props.roomReducer}
              roomList={this.props.socketReducer.list}
              selectedRoomId={this.props.roomReducer.selected}
              updateCurrentRoom={this.props.actions.updateCurrentRoom}
              updateOriginalWordList={this.props.actions.updateOriginalWordList}
              updateRoomLevel={this.props.actions.updateRoomLevel}
              updateListType={this.props.actions.updateListType}
            />
          </Box>
          <Box margin="20px 0 0 0">
            {roomCreator}
          </Box>
        </Box>
      )
    } else {
      var members = (
        <Members currentRoom={this.props.socketReducer.joined_room} />
      )
      var roomCreator = null
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
        joinRoom,
        updateCurrentRoom,
        updateOriginalWordList,
        updateRoomLevel,
        updateListType
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsContainer)
