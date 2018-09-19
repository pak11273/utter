import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'
// TODO import {validateInput} from '../../utils/validations/courseUpdate.js'

import {Flex, Title} from '../../components'
import {TabBarContainer} from '../../containers'

import {Container} from 'semantic-ui-react'

import Account from './containers/account/account.js'
import Profile from './containers/profile.js'
import Notifications from './containers/notifications.js'
import 'semantic-ui-css/semantic.css'

// actions
import {toggleFooter} from '../../app/actions/toggleFooterAction.js'

class Settings extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  render() {
    const tabs = [
      {name: 'account', label: 'Account', component: Account},
      {name: 'profile', label: 'Profile', component: Profile},
      {name: 'notifications', label: 'Notifications', component: Notifications}
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
        </div>
      </Flex>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        toggleFooter
      },
      dispatch
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Settings)
