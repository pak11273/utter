import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import ApiMgr from '../../utils'
import shortid from 'shortid'
import {Rooms} from '../../containers'
import {Box, Button, Column, Input, Ol, Text} from '../../components'

// actions
import {
  channelSelect,
  loadChannelId,
  loadChannels,
  sortChannels
} from './actions.js'

import {updateRoomLanguage} from '../Rooms/actions.js'

const ChannelSorter = ({channelSortAsc, sorting}) =>
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
  padding: 10px;
  text-align: left;
`
const Channel = ({channel, id, onClick, people}) => {
  return (
    <StyledChannel onClick={onClick}>
      <br />
      <Text>{channel} ({people})</Text>
    </StyledChannel>
  )
}

const ChannelsList = ({
  channelList,
  channelSortAsc,
  loadRooms,
  onSelect,
  selectedChannelId,
  updateRoomLanguage
}) =>
  <Box alignitems="flex-start" justifycontent="flex-start">
    <Ol fontsize="1.2rem" color="black" textalign="left">
      {channelList.map(({_id, channel, language, people}) => {
        const onChannelSelect = () => {
          updateRoomLanguage(language)
          loadRooms(_id)
          onSelect(_id)
        }
        return (
          <Channel
            key={_id}
            id={_id}
            channel={channel}
            onClick={onChannelSelect}
            people={people}
          />
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
    //load with actual chnnel id
    this.props.actions.loadChannelId(_id)
  }

  updateRoomLanguage(lang) {
    this.props.actions.updateRoomLanguage(lang)
  }

  channelSortAsc() {
    alert('sort')
    // load channels with sorted channels
  }

  onChannelSelect(id) {
    this.props.actions.channelSelect(id)
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
          <ChannelSorter
            channelSortAsc={this.channelSortAsc}
            sorting={'hello'}
          />
          <ChannelsList
            channelList={this.props.channelReducer.channels}
            loadRooms={this.loadRooms}
            onSelect={this.onChannelSelect}
            updateRoomLanguage={this.updateRoomLanguage}
          />
        </Column>
      )
    }
    return <div>{channel_room}</div>
  }
}

const mapStateToProps = state => {
  return {channelReducer: state.channelReducer}
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        channelSelect,
        loadChannelId,
        loadChannels,
        sortChannels,
        updateRoomLanguage
      },
      dispatch
    )
  }
}

// rooms should have a language property
export default connect(mapStateToProps, mapDispatchToProps)(ChannelsContainer)