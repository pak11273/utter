import React, {Component} from "react"

import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
/* import IconButton from "@material-ui/core/IconButton" */
/* import MicIcon from "@material-ui/icons/Mic" */
import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord"
import Typography from "@material-ui/core/Typography"

import {LoadingButton} from "../../../components"

/* import axios from "axios" */
import Dropzone from "react-dropzone"
import {bytesToSize} from "../../../utils/helpers.js"
/* import CryptoJS from "crypto-js" */
import isEmpty from "lodash/isEmpty"
import RecordRTC from "recordrtc"
import {withStyles} from "@material-ui/core/styles"

const styles = theme => ({
  record: {
    backgroundColor: theme.palette.error
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
  audioFileName: "Click here to upload or just drop an audio file.",
  public_id: "",
  record: false,
  recordedBlobSize: 0,
  isSaving: false,
  secure_url: "",
  signature: "",
  url: "",
  vocabId: null
}

class VocabularyAudioModal extends Component {
  constructor() {
    super()

    this.state = initialState
  }

  disableStop = () => {
    this.setState({
      record: true
    })
  }

  setVocabId = () => {
    console.log("vocab props: ", this.props)
  }

  enableStop = () => {
    this.setState({
      record: false
    })
  }

  saveAudioModal = closeModal => () => {
    if (this.state.audioBlob) {
      // TODO: save loading button
      this.setState({
        isSaving: true
      })
      const prom = new Promise(resolve => {
        setTimeout(() => {
          // TODO: save to db
          resolve("hello")
        }, 3000)
      })
      prom
        .then(res => {
          this.setState({
            isSaving: false,
            audioBlob: null
          })
          closeModal(this.state)
          alert(res)
        })
        .catch(err => console.log("err: ", err))
      // succesful: change mic icon to play icon w/ delete
    }
  }

  resetState = () => {
    console.log("gahahahahaha")
    this.setState({
      ...initialState
    })
  }

  onAudioDrop = (files, rejected) => {
    this.resetState()
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

      /* this.handleImageUpload(files) */
    }
  }

  /* handleAudioDelete = async state => { */
  handleAudioDelete = async () => {
    /* const timestamp = await (Date.now() / 1000 || 0).toString() */
    /* const apiSecret = "cWVpcWZDHFMA9H5Djue1uWHXcLo" */
    /* const hashString = `public_id=${ */
    /* state.public_id */
    /* }&timestamp=${timestamp}${apiSecret}` */
    /* const signature = CryptoJS.SHA1(hashString).toString() */
    /* axios({ */
    /*   method: "post", */
    /*   url: "https://api.cloudinary.com/v1_1/dgvw5b6pf/image/destroy/", */
    /*   data: { */
    /*     api_key: "225688292439754", */
    /*     public_id: state.public_id, */
    /*     resource_type: "image", */
    /*     signature, */
    /*     timestamp */
    /*   } */
    /* }) */
    /* .then(res => { */
    /*   return res */
    /* }) */
    /* .catch(err => { */
    /*   throw err.response.data.error */
    /* }) */
  }

  render() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({audio: true})
        // Success callback
        .then(stream => {
          const recorder = RecordRTC(stream, {type: "audio", disableLogs: true})
          var record = document.querySelector(".record")
          var stop = document.querySelector(".stop")
          var soundClips = document.querySelector(".sound-clips")
          record.onclick = () => {
            /* if (soundClips.childNodes.length === 1) { */
            /*   record.disabled = true */
            /*   alert( */
            /*     "You can only record 1 audio clip at a time.  Delete your audio clip to record another." */
            /*   ) */
            /* } else { */
            recorder.startRecording()
            record.style.background = "green"
            record.style.color = "black"
            /* } */
          }

          stop.onclick = async () => {
            var audio = document.createElement("audio")
            var clipContainer = document.createElement("Article")
            var deleteButton = document.createElement("button")
            var audioSize = document.createElement("span")

            recorder.stopRecording(audioURL => {
              audio.src = audioURL

              var recordedBlob = recorder.getBlob()
              this.setState(
                {
                  recordedBlobSize: recordedBlob.size
                },
                () => {
                  var recordedBlobSize = bytesToSize(
                    this.state.recordedBlobSize
                  )
                  audioSize.innerHTML = recordedBlobSize
                }
              )

              recorder.getDataURL(dataUrl => {
                /* var files = { */
                /*   audio: { */
                /*     author: "utterzone", */
                /*     type: "audio/wav", */
                /*     dataUrl */
                /*   } */
                /* } */
                this.setState({
                  audioFileName: "recorded.webm",
                  audioBlob: dataUrl
                })
              })
            })

            record.style.background = ""
            record.style.color = ""

            clipContainer.classList.add("clip")
            clipContainer.setAttribute(
              "style",
              "display: flex; justify-content: center; padding-top: 20px; width: 390px"
            )
            audio.setAttribute("controls", "")
            deleteButton.innerHTML = "DEL"

            clipContainer.appendChild(audio)
            clipContainer.appendChild(deleteButton)
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
    const {
      classes,
      /* handleAudio, */
      /* handleDelete, */
      /* openDeleteModal, */
      openModal,
      closeModal,
      resetOpenModal
      /* closeDeleteModal, */
      /* courseId, */
      /* modalLevel, */
      /* modalTitle, */
      /* rowData */
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
          {/*
          <IconButton onClick={handleAudio}>
            <MicIcon />
          </IconButton>
          */}
          <Dialog
            open={openModal}
            /* onClose={closeModal} */
            onBackdropClick={resetOpenModal}
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
              <div className={classes.dropzone}>
                <Dropzone
                  accept="audio/*"
                  maxSize={500000}
                  multiple={false}
                  onDrop={this.onAudioDrop}>
                  {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p style={{cursor: "pointer", textAlign: "center"}}>
                          Click this <span style={{color: "blue"}}>link</span>{" "}
                          or drop an audio file.
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
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
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px"
              }}>
              <Button
                className="record"
                onClick={this.setVocabId}
                variant="contained"
                color="secondary">
                <FiberSmartRecordIcon />
                <span style={{paddingLeft: "10px"}}>REC</span>
              </Button>
              <Button
                className="stop"
                onClick={this.disableStop}
                disabled={this.state.record}
                style={{color: "black", marginLeft: "8px"}}>
                stop
              </Button>
              <LoadingButton
                spinner="#2979FF"
                loading={this.state.isSaving}
                disabled={this.state.isSaving}
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
export default withStyles(styles)(VocabularyAudioModal)
