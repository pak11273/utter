import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Box} from '../components'

const StyledLink = styled(Link)`
  color: red;
`
class Message extends Component {
  render(props) {
    return (
      <Box
        margin="20px"
        padding="20px"
        alignitems="flex-start"
        background="#fff"
        style={{background: '#333'}}>
        <StyledLink to="#" style={{fontSize: '1.5rem'}}>
          {this.props.currentComment.username}
        </StyledLink>
        <div style={{textAlign: 'left'}}>
          {this.props.currentComment.message}
        </div>
        <p>{this.props.currentComment.timestamp}</p>
      </Box>
    )
  }
}

export default Message
