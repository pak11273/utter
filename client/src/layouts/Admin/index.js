import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Box, Grid, Text} from '../../components'

const Container = styled.div`
  display: grid;
  grid-template-columns: ${props => props.gridtemplatecolumns}; 
  margin: 0 auto;
  width: 100%;

  @media(min-width: 640px) {
    grid-template-columns: ${props => props.gridtemplatecolumns640}; 
    width: 100%;
  }
`

const styledSideBar = styled.div`
  height: '800px'
`

class SideBar extends Component {
  render() {
    return (
      <styledSideBar>
        {this.props.children}
      </styledSideBar>
    )
  }
}

const Section = () =>
  <Grid
    gridtemplatecolumns="25% 25% 25% 25%"
    gridtemplatecolumns650="25% 25% 25% 25%">
    <Box
      alignitems="flex-start"
      background="orange"
      color="white"
      display="block"
      fontsize="1.5rem"
      lineheight="100px"
      padding="0 20px 0 20px"
      textoverflow="ellipsis"
      whitespace="nowrap"
      width640="100%"
      minwidth640="100%">
      <Text>no. of rooms: 0</Text>
    </Box>
    <Box>pending</Box>
    <Box>pending</Box>
    <Box>pending</Box>
    <Box
      alignitems="flex-start"
      background="orange"
      color="white"
      display="block"
      fontsize="1.5rem"
      lineheight="100px"
      padding="0 20px 0 20px"
      textoverflow="ellipsis"
      whitespace="nowrap"
      width640="100%"
      minwidth640="100%">
      <Text>no. of rooms: 0</Text>
    </Box>
    <Box>pending</Box>
    <Box>pending</Box>
    <Box>pending</Box>
  </Grid>

class Admin extends Component {
  render() {
    return (
      <Container>
        <Grid gridtemplatecolumns="25% 75%" gridtemplatecolumns650="25% 75%">
          <SideBar>
            <Box
              alignitems="flex-start"
              background="black"
              color="white"
              display="block"
              fontsize="1.5rem"
              height="800px"
              lineheight="100px"
              padding="0 20px 0 20px"
              textoverflow="ellipsis"
              whitespace="nowrap"
              width640="100%"
              minwidth640="100%">
              <Text>Dashboard</Text>
              <Text>stuff</Text>
              <Text>stuff</Text>
            </Box>
          </SideBar>
          <Section />
        </Grid>
      </Container>
    )
  }
}

export default Admin
