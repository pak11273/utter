import React, {Component} from "react"
import cloneDeep from "lodash/cloneDeep"
import Select from "react-select"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import orm from "../../../../core/schema.js"
import {updateEntity} from "../../../../api/entities/actions.js"
import updateAccount from "../../../../api/user/actions/account-actions.js"
import languageData from "../../../../data/languageData.js"

const initialState = {
  multi: true,
  multiValue: [],
  options: [],
  value: undefined
}

class AccountInfo extends Component {
  constructor(props) {
    super(props)

    this.state = cloneDeep(initialState)
  }

  nativeDropdownChange = value => {
    const newValues = {nativeLang: value}
    const {id} = this.props.user
    this.props.updateEntity("User", id, newValues)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.updateAccount(this.props.user)
  }

  render() {
    return (
      <Grid>
        <Grid>
          <form size="large" onSubmit={this.handleSubmit}>
            <label htmlFor="username">
              Username
              <input
                id="username"
                placeholder="Name"
                defaultValue="todo changeme"
                disabled
              />
            </label>
            <div>Using Language</div>
            <Select
              id="usingLang"
              ref={ref => {
                this.select = ref
              }}
              onBlurResetsInput={false}
              onSelectResetsInput={false}
              options={languageData}
              simpleValue
              clearable={this.state.clearable}
              wrapperStyle={{
                margin: "20px 0 0 0",
                width: "100%"
              }}
              style={{
                width: "100%"
              }}
              menuContainerStyle={{
                width: "100%"
              }}
              menuStyle={{
                width: "100%"
              }}
              name="usingLang"
              disabled={this.state.disabled}
              value="native lang changeme"
              onChange={this.nativeDropdownChange}
              rtl={this.state.rtl}
              searchable={this.state.searchable}
            />
            <label htmlFor="email">
              Email
              <input
                id="email"
                placeholder="example@gmail.com"
                defaultValue="todo: email change"
              />
            </label>
            <h6>Change Password</h6>
            <label htmlFor="password">
              New Password
              <input id="password" placeholder="Password" />
            </label>
            <label htmlFor="confirm-password">
              Confirm Password
              <input id="confirm-password" placeholder="password" />
            </label>
            <Button style={{background: "#F6D155"}} loading={this.props.loader}>
              Save
            </Button>
            <Button color="orange">Reset</Button>
          </form>
        </Grid>
      </Grid>
    )
  }
}

export default AccountInfo
