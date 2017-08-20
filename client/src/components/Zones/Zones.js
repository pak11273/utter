import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Zone from '../../components/Zones/Zone.js'
import styled from 'styled-components'
import Box from '../../components/Boxes/Box.js'
import Button from '../../components/Buttons/Button.js'
import Input from '../../components/Inputs/Input.js'
import superagent from 'superagent'
import ApiMgr from '../../utils'

class Zones extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zone: {
        name: '',
        zipCodes: [],
        numComments: ''
      },
      list: []
    }

    this.updateName = this.updateName.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  //TODO: implement the apimgr
  // componentDidMount() {
  //   ApiMgr.get('/api/zones', null, (err, res) => {
  //     if (err) {
  //       alert(err.message)
  //       return
  //     }
  //     const results = res.body.zone

  //     this.setState({
  //       // add zones from db
  //       list: results
  //     })
  //   })
  // }

  componentDidMount() {
    superagent
      .get('/api/zones')
      .query(null)
      .set('Accept', 'accept/json')
      .end((err, res) => {
        if (err) {
          alert(err)
          return
        }
        const results = res.body.zone

        this.setState({
          // add zones from db
          list: results
        })
      })
  }

  updateName(e) {
    e.preventDefault
    const updatedZone = Object.assign({}, this.state.zone)
    updatedZone[e.target.name] = e.target.value
    this.setState({
      zone: updatedZone
    })
  }

  updateList(e) {
    e.preventDefault
    const updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.zone)
    this.setState({
      list: updatedList
    })
  }

  render() {
    return (
      <Box>
        <ol>
          {this.state.list.map((zone, i) => {
            return (
              <li key={i}>
                <Zone currentZone={zone} />
              </li>
            )
          })}
        </ol>
        <Input onChange={this.updateName} placeholder="zone" name="name" />
        <Input
          onChange={this.updateName}
          placeholder="zipcodes"
          name="zipCodes"
        />
        <Input
          onChange={this.updateName}
          placeholder="# of comments"
          name="numComments"
        />
        <Button onClick={this.updateList} color="black">Create Zone</Button>
      </Box>
    )
  }
}

export default Zones
