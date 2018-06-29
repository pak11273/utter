import React, {Component} from 'react'
import {TabBarContainer} from '../../../containers'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'
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
import UserInfo from './features/UserInfo.js'
import Notifications from '../../../layouts/Settings/features/Notifications'

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
class Users extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const tabs = [
      {name: 'userInfo', label: 'User Info', component: UserInfo},
      {name: 'notifications', label: 'Notifications', component: Notifications}
    ]

    return (
      <Flex>
        <div>
          <Title padding="20px">Edit Your Settings</Title>
          <div className="App">
            <div className="App-header">
              <Header inverted as="h1">
                Project Mini-Mek
              </Header>
            </div>
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
  return {}
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

export default connect(mapStateToProps, mapDispatchToProps)(Users)
