import React, {Component} from "react"

import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"

class VocabularyDeleteModal extends Component {
  render() {
    const {
      handleDelete,
      openDeleteModal,
      closeDeleteModal,
      courseId,
      modalLevel,
      modalTitle,
      row
    } = this.props

    return (
      <div>
        {({container: {vocabularyDelete}}) => {
          const xhrDeleteVocabulary = async () => {
            const finished = await vocabularyDelete.mutation({
              variables: {courseId, level: modalLevel, title: modalTitle}
            })
            if (finished.data.vocabularyDelete.level.level) {
              closeDeleteModal()
            }
          }

          return (
            <Typography>
              <IconButton status="danger" onClick={handleDelete(row)}>
                <DeleteIcon />
              </IconButton>
              <Dialog
                open={openDeleteModal}
                onClose={closeDeleteModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    By deleting this level you will also be deleting everything
                    associated with this level ie. vocabulary, grammar,
                    examples, phrases and notes. This delete is unrecoverable.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={xhrDeleteVocabulary}
                    variant="outlined"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      margin: "12px"
                    }}>
                    Delete
                  </Button>
                  <Button onClick={closeDeleteModal} color="secondary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </Typography>
          )
        }}
      </div>
    )
  }
}

export default VocabularyDeleteModal
