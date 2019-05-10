/* eslint react/no-unescaped-entities: 0 */
/* eslint react/prefer-stateless-function: 0 */

import React, {PureComponent} from "react"

import ChangePasswordView from "./change-password-view.js"

export default class ChangePasswordCtrl extends PureComponent {
  render() {
    return <ChangePasswordView token={this.props.match.params.token} />
  }
}
