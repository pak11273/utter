import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {ZoneCreate, Zone} from '../components'
import styled from 'styled-components'
import Box from '../components/Boxes/Box.js'
import Button from '../components/Buttons/Button.js'
import Input from '../components/Inputs/Input.js'
import superagent from 'superagent'
import ApiMgr from '../utils'
import shortid from 'shortid'

class Zones extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      list: []
    }

    this.updateName = this.updateName.bind(this)
    this.addZone = this.addZone.bind(this)
    this.selectZone = this.selectZone.bind(this)
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

  addZone(zone) {
    superagent.post('/api/zones').send(zone).end((err, res) => {
      if (err) {
        alert(err)
        return
      }
      const updatedList = Object.assign([], this.state.list)
      updatedList.push(zone)
      this.setState({
        list: updatedList
      })
    })
  }

  selectZone(index) {
    this.setState({
      selected: index
    })
  }

  render() {
    return (
      <Box>
        <Box height="500px" overflow="scroll">
          <ol>
            {this.state.list.map((zone, i) => {
              let selected = i == this.state.selected
              return (
                <li key={shortid.generate()}>
                  <Zone
                    index={i}
                    selectZone={this.selectZone}
                    isSelected={selected}
                    currentZone={zone}
                  />
                </li>
              )
            })}
          </ol>
        </Box>
        <Box>
          <ZoneCreate addZone={this.addZone} />
        </Box>
      </Box>
    )
  }
}

export default Zones
