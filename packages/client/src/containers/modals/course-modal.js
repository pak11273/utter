import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {withFormik} from "formik"
import {Form, Modal, Button} from "semantic-ui-react"
import {graphql} from "react-apollo"
import {history} from "@utterzone/connector"
import gql from "graphql-tag"

import orm from "../../core/schema.js"
import {closeModal} from "./actions.js"
/* import course-actions from "../../api/course/actions/course-actions.js" */

// actions
import {addFlashMessage} from "../../core/actions/flashMessages.js"
import {deleteData} from "../../api/actions.js"

const courseDeleteMutation = gql`
  mutation courseDeleteMutation($resourceID: String!) {
    courseDelete(resourceID: $resourceID)
  }
`

export class ModalContainer extends Component {
  /* deleteCourse = () => { */
  /*   this.props.deleteCourse(this.props.course) */
  /* } */

  render() {
    /* const {closeModal, deleteCourse} = this.props */
    const {closeModal, handleSubmit} = this.props
    return (
      <Modal closeIcon="close" open={true} onClose={closeModal}>
        <Modal.Header>Delete Course</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <h3>
              Deleting this course is irreversible. Click &apos;Delete&apos; to
              permanently remove this course from the database.
            </h3>
            <Form onSubmit={handleSubmit}>
              <Button color="red" type="Submit">
                Delete
              </Button>
              <Button onClick={closeModal}>Cancel</Button>
            </Form>
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
    course,
    deleteData
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      addFlashMessage,
      closeModal,
      deleteData
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  graphql(courseDeleteMutation)(
    withFormik({
      mapPropsToValues: ({course}) => ({
        resourceID: course.id
      }),
      handleSubmit: async (values, {props}, setErrors) => {
        const result = await props.mutate({
          variables: values
        })

        const onComplete = () => {
          console.log("props: ", props)
          props.actions.closeModal()
          props.actions.deleteData("course")
          history.push("/courses/created")
        }

        // if delete was successfull
        if (result.data.courseDelete) {
          onComplete()
          props.actions.addFlashMessage({
            type: "success",
            text: "Your Course was deleted."
          })
        } else {
          console.log("result.data.errors: ", result.data.errors)
          setErrors(result.data.errors)
        }
      }
    })(ModalContainer)
  )
)
