import React, {Component} from "react"
import {connect} from "react-redux"

export class ModalContainer extends Component {
  onNextModalClick = () => {}

  render() {
    console.log("test er")
    return <div>trash?</div>
  }
}

export default connect(null)(ModalContainer)
