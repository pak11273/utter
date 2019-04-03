import React, {Component} from "react"
/* import {adopt} from "react-adopt" */

import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"

import LevelsCtrl from "../containers/levels-controller.js"

const Composed = {container: <LevelsCtrl />}

class LevelDeleteModal extends Component {
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
      <Composed>
        {({container: {levelDelete}}) => {
          const xhrDeleteLevel = async () => {
            const finished = await levelDelete.mutation({
              variables: {courseId, level: modalLevel, title: modalTitle}
            })
            if (finished.data.levelDelete.level.level) {
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
                    onClick={xhrDeleteLevel}
                    variant="outlined"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      margin: "12px"
                    }}>
                    Delete
                  </Button>
                  <Button onClick={closeDeleteModal} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </Typography>
          )
        }}
      </Composed>
    )
  }
}

export default LevelDeleteModal
