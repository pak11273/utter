/* eslint react/no-unescaped-entities: 0 */
/* eslint react/prefer-stateless-function: 0 */

import React, {PureComponent} from "react"
import {LoginConnector} from "@utterzone/connector"

import LoginView from "./LoginView.js"

export default class SignupCtrl extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <LoginConnector>
          {({submit}) => <LoginView submit={submit} />}
        </LoginConnector>
      </React.Fragment>
    )
  }
}
