/* eslint react/no-unescaped-entities: 0 */
/* eslint react/prefer-stateless-function: 0 */

import React, {PureComponent} from "react"
import {SignupConnector} from "@utterzone/connector"

import SignupView from "./signup-view.js"

export default class SignupCtrl extends PureComponent {

  render() {
    return (
      <React.Fragment>
        <SignupConnector>
          {({submit}) => (
            <SignupView submit={submit} />
          )}
        </SignupConnector>
      </React.Fragment>
    )
  }
}
