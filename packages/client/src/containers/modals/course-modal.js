import React, {Component} from "react"
import {connect} from "react-redux"
import {withFormik} from "formik"
import {Form, Modal, Button} from "semantic-ui-react"
import {graphql} from "react-apollo"
import gql from "graphql-tag"

import orm from "../../app/schema.js"
import {closeModal} from "./actions.js"
/* import courseActions from "../../api/course/actions/course-actions.js" */

const courseDeleteMutation = gql`
  mutation courseDeleteMutation($id: String!) {
    courseDelete(id: $id)
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
    course
  }
}

/* const actions = {closeModal, deleteCourse: courseActions.delete} */
const actions = {closeModal}

export default connect(
  mapStateToProps,
  actions
)(
  graphql(courseDeleteMutation)(
    withFormik({
      mapPropsToValues: ({course}) => ({
        id: course.id
      }),
      handleSubmit: async (values, {props}) => {
        const {data} = await props.mutate({
          variables: values
        })

        console.log("data: ", data)
        /* const onComplete = () => { */
        /*   history.push("/courses", { */
        /*     announcement: "Please check your email to confirm your address." */
        /*   }) */
        /* } */

        /* // if signup info is legit */
        /* if (typeof result === "string") { */
        /*   onComplete() */
        /*   props.addFlashMessage({ */
        /*     type: "success", */
        /*     text: "Your Course was deleted." */
        /*   }) */
        /* } else { */
        /*   // if singup info is not legit */
        /*   setErrors(result) */
        /* } */
      }
    })(ModalContainer)
  )
)
