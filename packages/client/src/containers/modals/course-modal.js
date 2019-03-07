import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
/* import {withFormik} from "formik" */
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import {graphql} from "react-apollo"
/* import {history} from "@utterzone/connector" */
import gql from "graphql-tag"

// actions
import {addFlashMessage} from "../../core/actions/flashMessages.js"

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
    /* const {closeModal, handleSubmit} = this.props */
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
          <Button>Delete</Button>
        </DialogActions>
      </Dialog>
    )

    /* <Modal closeIcon="close" open={true} onClose={closeModal}>
        <Modal.Header>Delete Course</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <h3>
              Deleting this course is irreversible. Click &apos;Delete&apos; to
              permanently remove this course from the database.
            </h3>
            <form onSubmit={handleSubmit}>
              <Button color="red" type="Submit">
                Delete
              </Button>
              <Button onClick={closeModal}>Cancel</Button>
            </form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions />
      </Modal> */
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
  graphql(courseDeleteMutation)(
    /* withFormik({ */
    /*   mapPropsToValues: ({course}) => ({ */
    /*     resourceID: course._id */
    /*   }), */
    /*   handleSubmit: async (values, {props}, setErrors) => { */
    /*     const result = await props.mutate({ */
    /*       variables: values */
    /*     }) */

    /*     const onComplete = () => { */
    /*       console.log("props: ", props) */
    /*       props.actions.closeModal() */
    /*       history.push("/courses/created") */
    /*     } */

    /*     // if delete was successfull */
    /*     if (result.data.courseDelete) { */
    /*       onComplete() */
    /*       props.actions.addFlashMessage({ */
    /*         type: "success", */
    /*         text: "Your Course was deleted." */
    /*       }) */
    /*     } else { */
    /*       console.log("result.data.errors: ", result.data.errors) */
    /*       setErrors(result.data.errors) */
    /*     } */
    /*   } */
    /* }) */
    ModalContainer
  )
)
