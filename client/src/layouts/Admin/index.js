import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import styled from 'styled-components'
import Vocabulary from './Vocabulary'
import {Box, Button, Grid, Spacer, Text} from '../../components'
import FaCaretDown from 'react-icons/fa/caret-down'
import './styles.css'
import Phrases from './Phrases'
import Challenges from './Challenges'
import Users from './Users'
import Team from './Team'
import Etc from './Etc'

const Dropdown = styled(Button)`
  background:transparent;
  border:none;
  font-size:1.2rem;
  outline:none;
  text-align:left;
`

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

const SideBar = styled.div`
  background: black;
  display: flex;
  flex-direction: column;
`

const Main = () =>
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
  constructor(props) {
    super(props)

    this.DropFunc = this.DropFunc.bind(this)
  }

  DropFunc(e) {
    let name = e.target.name
    let x = document.getElementById(name)
    if (x.className.indexOf('show') == -1) {
      x.className += ' show'
      x.previousElementSibling.className += ' w3-green'
    } else {
      x.className = x.className.replace(' show', '')
      x.previousElementSibling.className = x.previousElementSibling.className.replace(
        ' w3-green',
        ''
      )
    }
  }

  render() {
    return (
      <Router>
        <Container>
          <Grid
            gridtemplatecolumns="200px 75%"
            gridtemplatecolumns650="25% 75%">
            <SideBar>
              <Spacer margin="20px" />
              <Link to="/admin" className="dropButton">Dashboard</Link>
              <Spacer margin="10px" />
              <Dropdown color="white" name="userAcc" onClick={this.DropFunc}>
                User Module
                <FaCaretDown />
              </Dropdown>
              <Box id="userAcc" className="hide">
                <Link to="/admin/users" className="dropButton">
                  Users{' '}
                </Link>
                <Link to="/admin/team" className="dropButton">Team</Link>
                <Link to="/admin/etc" className="dropButton">
                  Etc{' '}
                </Link>
              </Box>
              <Spacer margin="10px" />
              <Dropdown
                color="white"
                name="languageAcc"
                onClick={this.DropFunc}>
                Language Module{' '}
                <FaCaretDown />
              </Dropdown>
              <Box id="languageAcc" className="hide">
                <Link to="/admin/vocabulary" className="dropButton">
                  Vocabulary
                </Link>
                <Link to="/admin/phrases" className="dropButton">Phrases</Link>
                <Link to="/admin/challenges" className="dropButton">
                  Challenges
                </Link>
              </Box>
              <Link to="/misc" className="dropButton">Link</Link>
            </SideBar>
            <Route exact path="/admin" component={Main} />
            <Route exact path="/admin/users" component={Users} />
            <Route exact path="/admin/team" component={Team} />
            <Route exact path="/admin/etc" component={Etc} />
            <Route exact path="/admin/vocabulary" component={Vocabulary} />
            <Route exact path="/admin/phrases" component={Phrases} />
            <Route exact path="/admin/challenges" component={Challenges} />
          </Grid>
        </Container>
      </Router>
    )
  }
}

export default Admin
