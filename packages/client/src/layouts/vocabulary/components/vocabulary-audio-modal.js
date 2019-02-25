import React, {Component} from "react"
import {adopt} from "react-adopt"

import Button from "@material-ui/core/Button"
/* import DeleteIcon from "@material-ui/icons/Delete" */
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"
import SpeakerIcon from "@material-ui/icons/RecordVoiceOver"
import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import Typography from "@material-ui/core/Typography"

import RecordRTC from "recordrtc"
import VocabularyCtrl from "../containers/vocabulary-controller.js"
import {withStyles} from "@material-ui/core/styles"

const Composed = adopt({
  container: <VocabularyCtrl />
})

const styles = theme => ({
  record: {
    backgroundColor: theme.palette.error
  }
})

class VocabularyAudioModal extends Component {
  state = {
    record: false
  }

  disableStop = () => {
    this.setState({
      record: true
    })
  }

  enableStop = () => {
    this.setState({
      record: false
    })
  }

  saveAudioModal = () => {
    this.setState({
      record: false
    })
    // close modal
  }

  render() {
    var {props} = this
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.")
      navigator.mediaDevices
        .getUserMedia({audio: true})
        // Success callback
        .then(stream => {
          const recorder = RecordRTC(stream, {type: "audio"})
          var record = document.querySelector(".record")
          var stop = document.querySelector(".stop")
          var soundClips = document.querySelector(".sound-clips")
          console.log("record: ", record)
          record.onclick = () => {
            if (soundClips.childNodes.length === 1) {
              record.disabled = true
              alert(
                "You can only record 1 audio clip at a time.  Delete your audio clip to record another."
              )
            } else {
              recorder.startRecording()
              console.log("recorder started")
              record.style.background = "green"
              record.style.color = "black"
            }
          }

          stop.onclick = () => {
            var audio = document.createElement("audio")
            var clipContainer = document.createElement("Article")
            var deleteButton = document.createElement("button")

            recorder.stopRecording(audioURL => {
              audio.src = audioURL

              /* var recordedBlob = recorder.getBlob() */
              recorder.getDataURL(dataUrl => {
                var files = {
                  audio: {
                    /* author: props.userReducer.userProfile.username, */
                    author: "chino",
                    /* room: props.socketReducer.joined_room, */
                    /* name: "file" + fileCounter++ + ".wav", */
                    type: "audio/wav",
                    dataUrl
                  }
                }
                // add blob to redux
                props.actions.loadAudioBlob(files)
              })
            })
            console.log("recorder stopped")
            record.style.background = ""
            record.style.color = ""

            clipContainer.classList.add("clip")
            clipContainer.setAttribute(
              "style",
              "display: flex; justify-content: center; padding-top: 20px; width: 270px"
            )
            audio.setAttribute("controls", "")
            deleteButton.innerHTML = "DEL"

            clipContainer.appendChild(audio)
            clipContainer.appendChild(deleteButton)
            deleteButton.setAttribute(
              "style",
              "font-size: 10px; border-radius: 50%; width: 30px; height: 30px; padding: 3px; background: red; outline: none; border-color: transparent; margin: 12px; cursor: pointer;"
            )
            soundClips.appendChild(clipContainer)

            deleteButton.onclick = e => {
              this.enableStop()
              var evtTgt = e.target
              evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
              record.disabled = false
            }
          }
        })
        // Error callback
        .catch(err => {
          console.log("The following gUM error occured: " + err)
        })
    } else {
      console.log("getUserMedia not supported on your browser!")
    }
    const {classes} = this.props
    const {
      handleAudio,
      /* handleDelete, */
      /* openDeleteModal, */
      openAudioModal,
      closeAudioModal,
      /* closeDeleteModal, */
      /* courseId, */
      /* modalLevel, */
      /* modalTitle, */
      row
    } = this.props

    return (
      <Composed>
        {() => {
          /* {({container: {levelDelete}}) => { */
          /* const xhrDeleteLevel = async () => { */
          /*   const finished = await levelDelete.mutation({ */
          /*     variables: {courseId, level: modalLevel, title: modalTitle} */
          /*   }) */
          /*   if (finished.data.levelDelete.level.level) { */
          /*     closeAudioModal() */
          /*   } */
          /* } */

          return (
            <Typography>
              <IconButton onClick={handleAudio(row)}>
                <SpeakerIcon />
              </IconButton>
              <Dialog
                open={openAudioModal}
                onClose={closeAudioModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  Record your translation
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    You can either record your own or upload an audio file.
                    Files should be in mp3 format and under 300kbs.
                  </DialogContentText>
                  <div
                    className="sound-clips"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  />
                </DialogContent>
                <DialogActions
                  className="sound-clips"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                  <Button
                    variant="contained"
                    className="record"
                    color="secondary"
                    onClick={() => console.log("LOVE YOU")}>
                    <FiberSmartRecordIcon className={classes.leftIcon} />
                    Rec
                  </Button>
                  <Button
                    className="stop"
                    onClick={this.disableStop}
                    disabled={this.state.record}
                    style={{color: "black", marginLeft: "8px"}}>
                    stop
                  </Button>
                  <Button onClick={this.saveAudioModal} color="secondary">
                    Save
                  </Button>
                  <IconButton alt="upload" style={{paddingLeft: "20px"}}>
                    <CloudUploadIcon />
                  </IconButton>
                </DialogActions>
              </Dialog>
            </Typography>
          )
        }}
      </Composed>
    )
  }
}

export default withStyles(styles)(VocabularyAudioModal)
