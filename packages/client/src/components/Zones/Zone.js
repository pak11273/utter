import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Box from '../Boxes/Box.js'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  color: red;
`

function Zone(props) {
  return (
    <Box
      margin="20px"
      padding="20px"
      alignitems="flex-start"
      background="#fff"
      style={{background: '#333'}}>
      <StyledLink to="#" style={{fontSize: '3rem'}}>
        {props.currentZone.name}
      </StyledLink>
      <div>{props.currentZone.zipCodes[0]}</div>
      <div>{props.currentZone.numComments} comments</div>
    </Box>
  );
}

// we use an object(zone) inside of props
export default Zone
