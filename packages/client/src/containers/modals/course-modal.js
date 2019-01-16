import React, {Component} from "react"
import {connect} from "react-redux"
import orm from "../../app/schema.js"
import {Modal, Button} from "semantic-ui-react"

import {closeModal} from "./actions.js"
import courseActions from "../../api/course/actions/course-actions.js"

export class ModalContainer extends Component {
  deleteCourse = () => {
    this.props.deleteCourse(this.props.course)
  }

  render() {
    const {closeModal, deleteCourse} = this.props

    return (
      <Modal closeIcon="close" open={true} onClose={closeModal}>
        <Modal.Header>Delete Course</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <h3>
              Deleting this course is irreversible. Click 'Delete' to
              permanently remove this course from the database.
            </h3>
            <div>
              <Button onClick={this.deleteCourse} color="red">
                Delete
              </Button>
              <Button onClick={closeModal}>Cancel</Button>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions />
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  const session = orm.session(state.apiReducer)
  const {Course} = session
  const course = Course.first().ref

  return {
    course
  }
}

const actions = {closeModal, deleteCourse: courseActions.delete}

export default connect(
  mapStateToProps,
  actions
)(ModalContainer)
