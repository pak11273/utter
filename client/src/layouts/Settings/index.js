import React, {Component} from 'react'
import {NavLink, Route, Link} from 'react-router-dom'
import FaCaretDown from 'react-icons/fa/caret-down'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead, Navbar, Profile} from '../../containers'
import {
  Button,
  Box,
  Column,
  Container,
  Grid,
  Spacer,
  Subtitle,
  Text,
  Title
} from '../../components'
import {Sidebar} from '../../containers'

const UserSettings = () => <div>settings</div>
const Misc1 = () => <div>misc 1</div>
const Misc2 = () => <div>misc 2</div>

const StyledLink = styled(Link)`
  color: ${props => props.color};
`

const Dropdown = styled(Button)`
  background: transparent;
  border: none;
  font-size: 1.2rem;
  outline: none;
  text-align: left;
`
class Settings extends Component {
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
      <Container>
        <Grid gridtemplatecolumns="15% 85%" gridtemplatecolumns650="25% 75%">
          <Sidebar padding="20px 0 0 20px">
            <Text color="white" fontsize="1.5rem">
              Settings
            </Text>
            <Spacer margin="20px" />
            <StyledLink color="white" to="/dashboard" className="dropButton">
              Dashboard
            </StyledLink>
            <Spacer margin="20px" />
            <Link to="/settings/profile" className="dropButton">
              Profile
            </Link>
            <Dropdown color="white" name="misc" onClick={this.DropFunc}>
              Dropdown
              <FaCaretDown />
            </Dropdown>
            <Box id="misc" className="hide">
              <Link to="/settings/misc1" className="dropButton">
                misc 1
              </Link>
              <Link to="/settings/misc2" className="dropButton">
                misc 2
              </Link>
            </Box>
            <Spacer margin="10px" />
            <Link to="/settings/billing" className="dropButton">
              Profile
            </Link>
            <Spacer margin="10px" />
          </Sidebar>
          <Column>
            <Route path="/settings/profile" component={Profile}>
              <Text color="black" fontsize="2rem" />
            </Route>
            <Route path="/settings/settings" component={UserSettings}>
              <Text color="black" fontsize="2rem" />
            </Route>
            <Route path="/settings/misc1" component={Misc1}>
              <Text color="black" fontsize="2rem" />
            </Route>
            <Route path="/settings/misc2" component={Misc2}>
              <Text color="black" fontsize="2rem" />
            </Route>
          </Column>
        </Grid>
      </Container>
    )
  }
}

export default Settings
