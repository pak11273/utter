/* eslint react/no-unescaped-entities: 0 */
/* eslint react/prefer-stateless-function: 0 */

import React, {PureComponent} from "react"
import {ChangePasswordConnector} from "@utterzone/connector"

import ChangePasswordView from "./change-password-view.js"

export default class ChangePasswordCtrl extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <ChangePasswordConnector>
          {({submit}) => (
            <ChangePasswordView
              submit={submit}
              token={this.props.match.params.token}
            />
          )}
        </ChangePasswordConnector>
      </React.Fragment>
    )
  }
}
