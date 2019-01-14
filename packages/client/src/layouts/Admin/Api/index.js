import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'
import orm from '../../../app/schema.js'
import {TabBarContainer} from '../../../containers'
import {Header, Container} from 'semantic-ui-react'

import {
  Box,
  Button,
  Column,
  Flex,
  Grid,
  Input,
  Label,
  Line,
  Section,
  Select,
  Text,
  Title
} from '../../../components'

import actionCreators from './actions.js'
import Users from '../Users/containers/Users.js'
import Courses from '../Courses/containers/Courses.js'
import ClubsList from '../Clubs/containers/ClubsList.js'
import Tools from '../Tools'

const StyledButton = styled(Button)`
  border-radius: 50px;
  color: #02598b;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 80px 0 0 0;
  outline: none;
  padding: 7px 36px;
  &:hover {
    background: #4fa0d1;
    color: #ecf12a;
  }
`
class Api extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const tabs = [
      {name: 'users', label: 'Users', component: Users},
      {name: 'courses', label: 'Courses', component: Courses},
      {name: 'clubs', label: 'Clubs', component: ClubsList},
      {name: 'tools', label: 'Tools', component: Tools}
    ]

    return (
      <Flex>
        <div>
          <Title padding="20px">Edit Your Settings</Title>
          <div className="App">
            <Container>
              <TabBarContainer tabs={tabs} size="massive" />
            </Container>
          </div>
          <Box flexdirection="row">
            <StyledButton type="submit">Save Changes</StyledButton>
          </Box>
        </div>
      </Flex>
    )
  }
}

const mapStateToProps = state => {
  const session = orm.session(state.apiReducer)
  const {User} = session
  let users = User.all().toRefArray()
  return {users}
}

const mapDispatchToProps = dispatch => {
  // let updateWord = actionCreators.update
  return {
    actions: bindActionCreators(
      {
        // updateWord
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Api)
