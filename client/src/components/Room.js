import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Box, Text} from '../components'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  font-size: '2rem';
  color: ${props => (props.selected ? 'red' : 'green')};
`
class Room extends Component {
  constructor() {
    super()
    this.selectTitle = this.selectTitle.bind(this)
  }

  selectTitle() {
    this.props.selectRoom(this.props.index)
  }

  render() {
    const title = this.props.isSelected
      ? <StyledLink to="#" selected>
          {this.props.currentRoom.name}
        </StyledLink>
      : <StyledLink to="#">
          {this.props.currentRoom.name}
        </StyledLink>
    return (
      <Box
        margin="20px"
        padding="20px"
        alignitems="flex-start"
        background="#fff"
        style={{background: '#333'}}>
        <Text fontsize="2rem" fontweight="600" onClick={this.selectTitle}>
          level {this.props.currentRoom.level}
        </Text>
        <Text fontsize="1.5rem">people ({this.props.currentRoom.people})</Text>
        <Text fontsize="1rem">
          creator: {this.props.currentRoom.creator}
        </Text>
      </Box>
    )
  }
}

// we use an object(room) inside of props
export default Room
