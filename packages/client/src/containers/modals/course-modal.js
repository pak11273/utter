import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import {withFormik} from "formik"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import {compose, graphql, withApollo} from "react-apollo"
import {session} from "brownies"
import {toast} from "react-toastify"
import {GET_COURSES} from "../../graphql/queries/course-queries.js"
import {COURSE_DELETE} from "../../graphql/mutations/course-mutations.js"

export class ModalContainer extends Component {
  render() {
    const {handleSubmit} = this.props
    const {open, onClose} = this.props
    return (
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={onClose}>
        <DialogTitle id="simple-dialog-title">Delete Course</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this course is irreversible. Click &apos;Delete&apos; to
            permanently remove this course from the database.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <form onSubmit={handleSubmit}>
            <Button onClick={onClose} type="Submit">
              Delete
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  graphql(COURSE_DELETE),
  withFormik({
    mapPropsToValues: () => ({
      resourceId: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const {course} = session
      const result = props.mutate({
        variables: {
          resourceId: course._id
        },
        refetchQueries: [
          {query: GET_COURSES, variables: {usingLang: "", teachingLang: ""}}
        ]
      })
      const onComplete = () => {
        session.level = ""
        session.levels = []
        session.levelsIdsArr = []
        delete session.course
        props.history.push("/courses/created")
      }

      result
        .then(res => {
          // if delete was successfull
          if (res.data.courseDelete) {
            onComplete()

            const text = "Your Course was deleted."
            toast.success(text, {
              className: "toasty",
              bodyClassName: "toasty-body",
              hideProgressBar: true
            })
          } else {
            setErrors(result.errors)
          }
        })
        .catch(err => {
          props.history.push("/courses")
          const cleanErr = err.message
            .split(" ")
            .slice(2)
            .join(" ")
          toast.error(cleanErr, {
            className: "toasty",
            bodyClassName: "toasty-body",
            hideProgressBar: true
          })
        })
    }
  })
)(ModalContainer)
