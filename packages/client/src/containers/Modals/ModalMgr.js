import React, {Component} from 'react'
import {connect} from 'react-redux'

import testModal from './testModal.js'
import courseModal from './courseModal.js'

const modalComponentLookupTable = {
  courseModal,
  testModal
}

const mapStateToProps = state => ({currentModals: state.modalReducer})

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

export default connect(mapStateToProps)(ModalMgr)
