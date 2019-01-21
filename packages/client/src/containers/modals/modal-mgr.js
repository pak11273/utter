import React, {Component} from "react"
import {connect} from "react-redux"

import testModal from "./test-modal.js"
import courseModal from "./course-modal.js"

const modalComponentLookupTable = {
  courseModal,
  testModal
}

class ModalMgr extends Component {
  render() {
    const {currentModals} = this.props

    const renderedModals = currentModals.map((modalDescription, index) => {
      const {modalType, modalProps = {}} = modalDescription
      const ModalComponent = modalComponentLookupTable[modalType]

      return <ModalComponent {...modalProps} key={modalType + index} />
    })

    return <span>{renderedModals}</span>
  }
}

const mapStateToProps = state => ({currentModals: state.modalReducer})

export default connect(mapStateToProps)(ModalMgr)
