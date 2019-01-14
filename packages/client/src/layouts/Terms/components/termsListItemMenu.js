import React, {Component} from "react"
import {connect} from "react-redux"
import {Menu} from "semantic-ui-react"

import {selectTerm} from "../../../api/term/actions.js"
import {deleteEntity} from "../../../api/entities/actions.js"
import {hideContextMenu} from "../../../containers/ContextMenus/actions.js"

const actions = {
  selectTerm,
  deleteEntity,
  hideContextMenu
}

export class TermsListItemMenu extends Component {
  onSelectClicked = () => {
    this.props.selectTerm(this.props.termId)
    this.props.hideContextMenu()
  }

  onDeleteClicked = () => {
    this.props.deleteEntity("Term", this.props.termId)
    this.props.hideContextMenu()
  }

  render() {
    return (
      <Menu vertical>
        <Menu.Item>
          <Menu.Header>Term: {this.props.text} </Menu.Header>

          <Menu.Menu>
            <Menu.Item onClick={this.onSelectClicked}>Select Term</Menu.Item>
            <Menu.Item onClick={this.onDeleteClicked}>Delete Term</Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    )
  }
}

export default connect(
  null,
  actions
)(TermsListItemMenu)
