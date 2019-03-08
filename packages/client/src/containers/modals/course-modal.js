import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {withFormik} from "formik"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import {graphql, Mutation} from "react-apollo"
/* import {history} from "@utterzone/connector" */
import {session} from "brownies"
import gql from "graphql-tag"

// actions
import {addFlashMessage} from "../../core/actions/flashMessages.js"

const COURSE_DELETE = gql`
  mutation courseDeleteMutation($resourceId: String!) {
    courseDelete(resourceId: $resourceId)
  }
`

export class ModalContainer extends Component {
  /* deleteCourse = () => { */
  /*   this.props.deleteCourse(this.props.course) */
  /* } */

  render() {
    const {handleSubmit} = this.props
    const {open, onClose} = this.props
    const {course} = this.props
    return (
      <Mutation mutation={COURSE_DELETE}>
        {courseDelete => (
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={onClose}>
            <DialogTitle id="simple-dialog-title">Delete Course</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Deleting this course is irreversible. Click &apos;Delete&apos;
                to permanently remove this course from the database.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <form onSubmit={handleSubmit}>
                <Button
                  type="Submit"
                  onClick={e => {
                    e.preventDefault()
                    courseDelete({
                      variables: {courseId: course._id}
                    })
                  }}>
                  Delete
                </Button>
              </form>
            </DialogActions>
          </Dialog>
        )}
      </Mutation>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      addFlashMessage
    },
    dispatch
  )
})

export default connect(
  null,
  mapDispatchToProps
)(
  graphql(COURSE_DELETE)(
    withFormik({
      /* mapPropsToValues: () => ({ */
      /*   resourceId: "" */
      /* }), */
      handleSubmit: async (values, {props}, setErrors) => {
        const {course} = session
        const result = await props.mutate({
          variables: {
            resourceId: course._id
          }
        })

        const onComplete = () => {
          console.log("props: ", props)
          props.actions.closeModal()
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
