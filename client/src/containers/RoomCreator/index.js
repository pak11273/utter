import React, {Component} from 'react'
import {Section, Box} from '../../components'

class RoomCreator extends Component {
  render() {
    return (
      <Section>
        <RoomCreate addRoom={this.addRoom} />
      </Section>
    )
  }
}

export default RoomCreator
