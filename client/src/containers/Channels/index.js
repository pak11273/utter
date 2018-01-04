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
  setChannelId,
  loadChannels,
  setChannelSocket,
  sortChannels
} from './actions.js'

import {updateMsg} from '../Chat/actions.js'

import {updateRoomLanguage, updateRoomTitle} from '../Rooms/actions.js'

import {nspConnect} from '../../services/socketio/actions.js'

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

const ChannelsList = ({channelList, channelSortAsc, onChannelSelect}) =>
  <Box alignitems="flex-start" justifycontent="flex-start">
    <Ol fontsize="1.2rem" color="black" textalign="left">
      {channelList.map(({_id, name, language, socket}) => {
        const handleClick = () => {
          onChannelSelect(_id, name, language, socket)
        }
        return <Channel key={_id} id={_id} name={name} onClick={handleClick} />
      })}
    </Ol>
  </Box>

class ChannelsContainer extends Component {
  constructor(props) {
    super(props)
    this.onChannelSelect = this.onChannelSelect.bind(this)
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

  onChannelSelect(_id, name, language, socket) {
    let obj = this.props.userReducer.userProfile.courses.filter(
      obj => obj.name === name
    )[0]
    if (obj) {
      this.props.actions.channelSelect(_id)
      this.props.actions.updateRoomTitle(name)
      this.props.actions.updateRoomLanguage(language)
      this.props.actions.setChannelId(_id)
      this.props.actions.nspConnect(socket)
    } else {
      alert('you must be enrolled in that course to join a channel')
    }
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
          <ChannelsList
            channelList={this.props.channelReducer.channels}
            onChannelSelect={this.onChannelSelect}
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
    socketReducer: state.socketReducer,
    userReducer: state.userReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        channelSelect,
        setChannelId,
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
