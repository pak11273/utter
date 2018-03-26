import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Box} from '../components'

const StyledLink = styled(Link)`
  font-size: '2rem';
  color: ${props => (props.selected ? 'red' : 'green')};
`
class Zone extends Component {
  selectTitle = () => {
    this.props.selectZone(this.props.index)
  };

  render() {
    const title = this.props.isSelected
      ? <StyledLink to="#" selected>
          {this.props.currentZone.name}
        </StyledLink>
      : <StyledLink to="#">
          {this.props.currentZone.name}
        </StyledLink>
    return (
      <Box
        margin="20px"
        padding="20px"
        alignitems="flex-start"
        background="#fff"
        style={{background: '#333'}}>
        <h6 onClick={this.selectTitle}>{title}</h6>
        <div>{this.props.currentZone.zipCodes}</div>
        <div>{this.props.currentZone.numComments} comments</div>
      </Box>
    )
  }
}

// we use an object(zone) inside of props
export default Zone
