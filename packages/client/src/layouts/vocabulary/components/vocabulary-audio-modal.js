import React, {Component} from "react"
import {withApollo} from "react-apollo"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord"
import Typography from "@material-ui/core/Typography"

/* import classNames from "classnames" */
import {LoadingButton} from "../../../components"
import {session} from "brownies"

/* import axios from "axios" */
import Dropzone from "react-dropzone"
import {bytesToSize} from "../../../utils/helpers.js"
/* import CryptoJS from "crypto-js" */
import {handleCloudinaryUpload} from "../../../utils/cloudinary-utils.js"
import isEmpty from "lodash/isEmpty"
import RecordRTCPromisesHandler from "recordrtc"
import {withStyles} from "@material-ui/core/styles"

/* import {GET_VOCABULARIES, VOCABULARY_AUDIO_SAVE} from "../xhr.js" */
import {VOCABULARY_AUDIO_SAVE} from "../xhr.js"

const styles = theme => ({
  record: {
    backgroundColor: theme.palette.error
  },
  recording: {
    background: "green",
    color: "black"
  },
  dropzone: {
    alignItems: "center",
    borderWidth: "2px",
    borderColor: "rgb(102, 102, 102)",
    borderStyle: "dashed",
    borderRadius: "5px",
    display: "flex",
    height: "100px",
    justifyContent: "center",
    margin: "20px auto 0",
    padding: "3px",
    position: "relative",
    width: "200px"
  }
})

const initialState = {
  audioBlob: null,
  blob: null,
  audioFileName: "Click in the box or drag n&apos; drop an audio file.",
  public_id: "",
  record: false,
  recording: false,
  recordedBlobSize: 0,
  readableBlobSize: "",
  isSaving: false,
  secure_url: "",
  signature: "",
  url: "",
  vocabId: null
}

class VocabularyAudioModal extends Component {
  blob = null

  recorder = null

  constructor() {
    super()
    this.myRef = React.createRef()

    this.state = initialState
  }

  componentDidMount = async () => {
    if (window.stream) {
      this.recorder = new RecordRTCPromisesHandler(window.stream, {
        disableLogs: true,
        type: "audio"
      })
    }
  }

  stopRecording = async () => {
    try {
      await this.recorder.stopRecording(audioUrl => {
        var recordedBlob = this.recorder.getBlob()
        this.setState({
          recording: false,
          recordedBlobSize: recordedBlob.size,
          readableBlobSize: bytesToSize(recordedBlob.size)
        })

        this.recorder.getDataURL(dataUrl => {
          this.setState({
            audioFileName: "recorded.webm",
            audioBlob: dataUrl
          })
        })

        var soundClips = this.myRef.current
        var audio = document.createElement("audio")
        var clipContainer = document.createElement("Article")
        var deleteButton = document.createElement("button")
        var audioSize = document.createElement("span")

        audio.src = audioUrl

        audioSize.innerHTML = this.state.readableBlobSize

        clipContainer.classList.add("clip")
        clipContainer.setAttribute(
          "style",
          "display: flex; justify-content: center; padding-top: 20px; width: 390px"
        )
        audio.setAttribute("controls", "")
        deleteButton.innerHTML = "DEL"

        clipContainer.appendChild(audio)
        clipContainer.appendChild(deleteButton)
        deleteButton.classList.add("deleteButton")
        deleteButton.setAttribute(
          "style",
          "font-size: 10px; border-radius: 50%; width: 30px; height: 30px; padding: 3px; background: red; outline: none; border-color: transparent; margin: 12px; cursor: pointer;"
        )
        clipContainer.appendChild(audioSize)
        audioSize.setAttribute(
          "style",
          "display: inline-block,font-size: 18px; width: 200px; height: 30px; padding: 3px; margin: 12px; "
        )
        soundClips.appendChild(clipContainer)

        deleteButton.onclick = e => {
          this.resetState()
          this.enableStop()
          var evtTgt = e.target
          evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
          /* var record = document.getElementById(classId) */
          /* record.disabled = false */
        }
      })

      /* this.setState( */
      /*   { */
      /*     blob */
      /*   }, */
      /*   console.log("blob: ", this.state) */
      /* ) */

      this.setState({
        record: true
      })
    } catch (err) {
      console.log("The following gUM error occured: " + err)
    }
  }

  startRecording = async () => {
    this.recorder.startRecording()

    this.setState({
      recording: true,
      vocabId: this.props.rowData._id
    })
  }

  enableStop = () => {
    this.setState({
      record: false
    })
  }

  saveAudioModal = closeModal => async () => {
    var deleteButton = document.querySelector(".deleteButton")
    if (deleteButton) {
      deleteButton.style.visibility = "hidden"
    }

    if (this.state.audioBlob) {
      this.setState({
        isSaving: true
      })
      const prom = new Promise(async resolve => {
        // save to cdn
        const file = this.state.audioBlob
        const type = "video"
        const folder = "vocabulary-audio"
        const tags = [session.user.username]
        const response = await handleCloudinaryUpload(file, type, folder, tags)
        resolve(response)
      })
      prom
        .then(res => {
          this.setState({
            isSaving: false,
            audioBlob: null
          })
          closeModal()

          // save audioUrl to db
          this.props.client
            .mutate({
              mutation: VOCABULARY_AUDIO_SAVE,

              variables: {
                audioUrl: res.secure_url,
                _id: this.state.vocabId,
                tags: res.tags
              }
            })
            .then(res => {
              console.log("res: ", res)
              this.props.causeRender(
                // TODO: fix
                res.data.vocabularyAudioSave.vocabulary.level
              )
            })
        })
        .catch(err => console.log("err: ", err))
    }
  }

  resetState = () => {
    this.setState({
      ...initialState
    })
  }

  resetOpenModal = () => {
    this.recorder.stopRecording()
    this.props.resetOpenModal()
    this.resetState()
  }

  onAudioDrop = rowData => (files, rejected) => {
    this.resetState()
    this.setState({
      vocabId: rowData._id
    })
    if (!isEmpty(rejected)) {
      alert(
        "Please check the file format and/or decrease the file size to less than 500kb."
      )
    }

    if (!isEmpty(files)) {
      this.setState({
        audioBlob: files[0],
        audioFileName: files[0].name
      })

      // TODO: upload to cdn and save to db
      this.saveAudioModal(this.props.closeModal)
    }
  }

  render() {
    const {
      classes,
      /* handleDelete, */
      /* openDeleteModal, */
      openModal,
      closeModal,
      /* closeDeleteModal, */
      /* courseId, */
      /* modalLevel, */
      /* modalTitle, */
      rowData
    } = this.props
    return (
      <div>
        {/*			{() => {
          {({container: {levelDelete}}) => {
          const xhrDeleteLevel = async () => {
            const finished = await levelDelete.mutation({
              variables: {courseId, level: modalLevel, title: modalTitle}
            })
            if (finished.data.levelDelete.level.level) {
              closeModal()
            }
          }
        return (
					*/}
        <Typography>
          <Dialog
            open={openModal}
            /* onClose={closeModal} */
            onBackdropClick={this.resetOpenModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Record your audio</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You can either record your own or upload an audio file. Audio
                files should be in .wav, webm, or mp3 format and under 500 KB.
                Click Save when done. Clicking outside the window will reset
                everything.
              </DialogContentText>
              <div>
                <Dropzone
                  accept="audio/*"
                  maxSize={500000}
                  multiple={false}
                  onDrop={this.onAudioDrop(rowData)}>
                  {({getRootProps, getInputProps}) => (
                    <section>
                      <div className={classes.dropzone} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p style={{cursor: "pointer", textAlign: "center"}}>
                          {this.state.audioFileName}
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              <div
                ref={this.myRef}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              />
            </DialogContent>
            <DialogActions
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px"
              }}>
              <Button
                id={rowData && rowData._id}
                className={this.state.recording && classes.recording}
                onClick={this.startRecording}
                disabled={!!this.state.audioBlob}
                variant="contained"
                color="secondary">
                <FiberSmartRecordIcon />
                <span style={{paddingLeft: "10px"}}>REC</span>
              </Button>
              <Button
                /* className="stop" */
                onClick={this.stopRecording}
                disabled={!this.state.recording}
                style={{color: "black", marginLeft: "8px"}}>
                stop
              </Button>
              <LoadingButton
                spinner="#2979FF"
                loading={this.state.isSaving}
                disabled={!this.state.audioBlob}
                onClick={this.saveAudioModal(closeModal)}
                style={{position: "absolute", right: "20px"}}
                color="secondary">
                Save
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </Typography>
      </div>
    )
  }
}
export default withStyles(styles)(withApollo(VocabularyAudioModal))
