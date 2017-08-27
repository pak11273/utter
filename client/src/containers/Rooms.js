import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import superagent from 'superagent'
import ApiMgr from '../utils'
import shortid from 'shortid'

import {Box, Button, Input, RoomCreate, Room, Text} from '../components'

class Rooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      list: []
    }

    this.updateName = this.updateName.bind(this)
    this.addRoom = this.addRoom.bind(this)
    this.selectRoom = this.selectRoom.bind(this)
  }

  //TODO: implement the apimgr
  // componentDidMount() {
  //   ApiMgr.get('/api/rooms', null, (err, res) => {
  //     if (err) {
  //       alert(err.message)
  //       return
  //     }
  //     const results = res.body.room

  //     this.setState({
  //       // add rooms from db
  //       list: results
  //     })
  //   })
  // }

  componentDidMount() {
    superagent
      .get('/api/rooms')
      .query(null)
      .set('Accept', 'accept/json')
      .end((err, res) => {
        if (err) {
          alert(err)
          return
        }
        const results = res.body.room

        this.setState({
          list: results
        })
      })
  }

  updateName(e) {
    e.preventDefault
    const updatedRoom = Object.assign({}, this.state.room)
    updatedRoom[e.target.name] = e.target.value
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
      const updatedList = Object.assign([], this.state.list)
      updatedList.push(room)
      this.setState({
        list: updatedList
      })
    })
  }

  selectRoom(index) {
    this.setState({
      selected: index
    })
  }

  render() {
    return (
      <Box>
        <Box flexdirection="row" justifycontent="space-aroudn">
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
          <ol>
            {this.state.list.map((room, i) => {
              let selected = i == this.state.selected
              return (
                <li key={shortid.generate()}>
                  <Room
                    index={i}
                    selectRoom={this.selectRoom}
                    isSelected={selected}
                    currentRoom={room}
                  />
                </li>
              )
            })}
          </ol>
        </Box>
        <Box>
          <RoomCreate addRoom={this.addRoom} />
        </Box>
      </Box>
    )
  }
}

export default Rooms
