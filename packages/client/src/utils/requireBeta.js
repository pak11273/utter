import React, {PureComponent} from "react"
/* import {cookies} from "brownies" */

const requireBeta = WrappedComponent => {
  class Wrap extends PureComponent {
    componentDidMount = () => {
      // TODO: change before sending out beta links
      /* const isAuthenticated = cookies._uid */
      /* if (!isAuthenticated) { */
      /*   this.props.history.push("/login", { */
      /*     notification: "This page requires a beta key", */
      /*     type: "warn" */
      /*   }) */
      /* } */
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return Wrap
}

export default requireBeta
