import React, {PureComponent} from "react"

import SignupView from "./SignupView.js"

export default class SignupCtrl extends PureComponent {
  trashSubmit = async values => {
    console.log("values: ", values)
    return null
  }

  render() {
    return <SignupView submit={this.trashSubmit} />
  }
}
