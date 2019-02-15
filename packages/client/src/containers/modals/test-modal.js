import React, {Component} from "react"
import {connect} from "react-redux"

import {openModal} from "./actions.js"

const actions = {openModal}

export class ModalContainer extends Component {
  onNextModalClick = () => {
    const {counter} = this.props

    this.props.openModal("ModalContainer", {counter: counter + 1})
  }

  render() {
    console.log("test er")
    return <div>trash?</div>
  }
}

export default connect(
  null,
  actions
)(ModalContainer)
