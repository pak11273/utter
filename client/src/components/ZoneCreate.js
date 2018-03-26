import React, {Component} from 'react'
import {Button, Box, Input} from '../components'

class ZoneCreate extends Component {
  constructor() {
    super()
    this.state = {
      zone: {
        name: '',
        zipCodes: [],
        numComments: ''
      }
    }
  }

  addZone = () => {
    this.props.addZone(this.state.zone)
  };

  updateName = e => {
    e.preventDefault
    const updatedZone = this.state.zone
    updatedZone[e.target.name] = e.target.value
    this.setState({
      zone: updatedZone
    })
  };

  render() {
    return (
      <Box>
        <Box>
          <Input onChange={this.updateName} placeholder="zone" name="name" />
          <Input
            onChange={this.updateName}
            placeholder="zipcodes"
            name="zipCodes"
          />
        </Box>
        <Box>
          <Input
            onChange={this.updateName}
            placeholder="# of comments"
            name="numComments"
          />
          <Button onClick={this.addZone} color="black">
            Create Zone
          </Button>
        </Box>
      </Box>
    )
  }
}

export default ZoneCreate
