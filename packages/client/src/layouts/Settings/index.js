import React, {Component} from "react"
// TODO import {validateInput} from '../../utils/validations/courseUpdate.js'

import {Flex, Title} from "../../components"
import {TabBarContainer} from "../../containers"

import Account from "./containers/account/account.js"
import Profile from "./containers/profile.js"
import Notifications from "./containers/notifications.js"

// actions
import {toggleFooter} from "../../core/actions/toggle-footer-action.js"

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
      {name: "account", label: "Account", component: Account},
      {name: "profile", label: "Profile", component: Profile},
      {name: "notifications", label: "Notifications", component: Notifications}
    ]

    return (
      <Flex>
        <div>
          <Title padding="20px">Edit Your Settings</Title>
          <div className="App">
            <div>
              <TabBarContainer tabs={tabs} size="massive" />
            </div>
          </div>
        </div>
      </Flex>
    )
  }
}

export default Settings
