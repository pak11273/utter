/* eslint react/no-unescaped-entities: 0 */
/* eslint react/prefer-stateless-function: 0 */

import React, {PureComponent} from "react"
import {history, SignupConnector} from "@utterzone/connector"
import {local} from "brownies"

import {Footer} from "../../containers"
import SignupView from "./signup-view.js"

export default class SignupCtrl extends PureComponent {
  componentDidMount() {
    const token = local.AUTH_TOKEN
    if (token) {
      history.push("/")
    }
  }

  render() {
    return (
      <React.Fragment>
        <SignupConnector>
          {({submit}) => <SignupView submit={submit} />}
        </SignupConnector>
        <Footer style={{width: "100%"}} />
      </React.Fragment>
    )
  }
}
