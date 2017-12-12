import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import io from 'socket.io-client'
import ApiMgr from '../../utils'
import shortid from 'shortid'
import {Rooms} from '../../containers'
import {Box, Button, Column, Input, Ol, Text} from '../../components'

// actions
import {
  channelSelect,
  loadChannelId,
  loadChannels,
  setChannelSocket,
  sortChannels
} from './actions.js'

import {updateMsg} from '../Chat/actions.js'

import {updateRoomLanguage, updateRoomTitle} from '../Rooms/actions.js'

import {nspConnect} from '../../services/socketio/actions.js'

const ChannelSort = ({channelSortAsc, sorting}) =>
  <Box
    flexdirection="row"
    height="20px"
    justifycontent="flex-start"
    padding="0">
    <Text fontsize="1rem" padding="0 20px 0 0 ">Sort By: </Text>
    <select
      value="car"
      defaultValue={sorting}
      onChange={e => onSortingChange(e.target.value)}>
      <option value="alphabetically">alphabetically</option>
    </select>
  </Box>

const StyledChannel = styled.div`
  color: ${props => (props.selected ? 'red' : 'black')};
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 0 0 0;
  text-align: left;
`
const Channel = ({name, id, onClick}) => {
  return (
    <StyledChannel onClick={onClick}>
      <br />
      <Text>{name}</Text>
    </StyledChannel>
  )
}

const ChannelsList = ({
  channelList,
  channelSortAsc,
  loadRooms,
  onSelect,
  selectedChannelId,
  nspConnect,
  updateRoomLanguage
}) =>
  <Box alignitems="flex-start" justifycontent="flex-start">
    <Ol fontsize="1.2rem" color="black" textalign="left">
      {channelList.map(({_id, name, language, socket}) => {
        const onChannelSelect = () => {
          updateRoomLanguage(language)
          loadRooms(_id)
          onSelect(_id, name)
          nspConnect(socket)
        }
        return (
          <Channel key={_id} id={_id} name={name} onClick={onChannelSelect} />
        )
      })}
    </Ol>
  </Box>

const getChannels = sorting => {
  return this.props.channelReducer.channels.sort((a, b) => {
    if (sorting == 'alphabetically') {
      return a.channel > b.channel ? 1 : a.channel < b.channel ? -1 : 0
    }
  })
}

class ChannelsContainer extends Component {
  constructor(props) {
    super(props)
    this.loadRooms = this.loadRooms.bind(this)
    this.onChannelSelect = this.onChannelSelect.bind(this)
    this.nspConnect = this.nspConnect.bind(this)
    this.updateRoomLanguage = this.updateRoomLanguage.bind(this)
  }

  componentDidMount() {
    axios
      .get('/api/channels')
      .then(res => {
        const channels = res.data.channel
        this.props.actions.loadChannels(channels)
      })
      .catch(err => {
        alert(
          'Sorry. There was an internal error.  Please contact the system administrator about the problem' +
            err
        )
      })
  }

  loadRooms(_id) {
    //load with actual channel id
    this.props.actions.loadChannelId(_id)
  }

  updateRoomLanguage(lang) {
    this.props.actions.updateRoomLanguage(lang)
  }

  channelSortAsc() {
    alert('sort')
    // load channels with sorted channels
  }

  onChannelSelect(id, name) {
    this.props.actions.channelSelect(id)
    this.props.actions.updateRoomTitle(name)
    // TODO: load rooms from the socket server
    // namespace from redux
    // const selected = this.props.channelReducer.selected
    console.log(
      'container/channels socket: ',
      _.find(this.props.channelReducer.channels, function(o) {
        return o._id === id
      }).socket
    )
    //TODO: render the chat component
  }

  nspConnect(socketName) {
    this.props.actions.nspConnect(socketName)
  }

  render() {
    if (this.props.channelReducer.channelId) {
      var channel_room = <Rooms />
    } else {
      var channel_room = (
        <Column
          alignitems="flex-start"
          flexdirection="column"
          fontsize="1.5rem"
          height="500px"
          justifycontent="top"
          overflowy="scroll"
          overflowx="none"
          textalign="left">
          <ChannelSort channelSortAsc={this.channelSortAsc} sorting={'hello'} />
          <ChannelsList
            nspConnect={this.nspConnect}
            channelList={this.props.channelReducer.channels}
            loadRooms={this.loadRooms}
            onSelect={this.onChannelSelect}
            updateRoomLanguage={this.updateRoomLanguage}
          />
        </Column>
      )
    }
    return <div style={{width: '100%'}}>{channel_room}</div>
  }
}

const mapStateToProps = state => {
  return {
    channelReducer: state.channelReducer,
    socketReducer: state.socketReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        channelSelect,
        loadChannelId,
        loadChannels,
        updateMsg,
        sortChannels,
        nspConnect,
        updateRoomLanguage,
        updateRoomTitle
      },
      dispatch
    )
  }
}

// rooms should have a language property
export default connect(mapStateToProps, mapDispatchToProps)(ChannelsContainer)
