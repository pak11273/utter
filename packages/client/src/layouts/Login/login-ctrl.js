/* eslint react/no-unescaped-entities: 0 */
/* eslint react/prefer-stateless-function: 0 */

import React, {PureComponent} from "react"
import {Footer} from "../../containers"
import LoginView from "./login-view.js"

export default class LoginCtrl extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <LoginView {...this.props} />
        <Footer style={{width: "100%"}} />
      </React.Fragment>
    )
  }
}
