/* eslint no-debugger: 0 */

/* import cuid from "cuid" */
import RecordRTC from "recordrtc"
import React, {PureComponent} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
/* import filename from "../../../../assets/images/play.svg" */
import schema from "../../../../core/schema.js"
import Button from "@material-ui/core/Button"
import {Box} from "../../../../components"
import styled from "styled-components"
import ceoImg from "../../../../assets/images/ceo.jpg"
import TextField from "@material-ui/core/TextField"
/* import FloatingActionButton from "@material-ui/core/Fab" */
import {withStyles} from "@material-ui/core/styles"
/* import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice" */
import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import SendIcon from "@material-ui/icons/Send"
import Typography from "@material-ui/core/Typography"

/* import Overlay from './Overlay'; */

// actions
import {updateReviewList} from "../../../../containers/Pictures/actions.js"
import {addAudio, addMsg, setCurrentMsg, updateMsg} from "./actions.js"
import {
  deleteAudioBlob,
  loadAudioBlob,
  sendAudioBlob,
  sendMsg
} from "../../../../services/socketio/actions.js"
import "./styles.css"

const ChatWindow = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  box-sizing: border-box;
`

const ChatPanel = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
`

/* const Header = styled.div` */
/*   display: flex; */
/*   align-items: center; */
/*   justify-content: space-between; */
/*   margin: 0 20px; */
/*   z-index: 1; */
/*   color: #fafafa !important; */
/*   border-bottom: 1px solid; */
/* ` */

/* const Title = styled.p` */
/*   text-align: center; */
/*   font-size: 24px; */
/* ` */

const NoDots = styled.div`
  hr {
    visibility: hidden;
  }
`

const InputPanel = styled.div`
  background-color: #a1a1a1;
  display: flex;
  height: 38px;
  align-items: center;
  align-self: center;
  width: 90%;
`

const Scrollable = styled.div`
  height: 640px;
  margin-bottom: 10px;
  overflow: auto;
`

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  more: {
    color: "black",
    "&:hover": {
      color: "black" // not working
    }
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  outputText: {
    fontSize: "1rem",
    whiteSpace: "normal",
    wordBreak: "break-all",
    overflow: "initial",
    width: "100%",
    height: "auto",
    color: "#3e3e3e"
  }
})

class Chat extends PureComponent {
  constructor(props, context) {
    super(props, context)

    /* const {chatHistory} = props */

    this.state = {
      chatHistory: [],
      input: ""
    }
  }

  componentDidMount() {
    this.props.registerHandler(this.onMessageReceived)
    this.scrollChatToBottom()

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
  }

  componentWillReceiveProps(props) {
    if (props.receiveMsg.data) {
      this.setState({
        chatHistory: [...this.state.chatHistory, props.receiveMsg.data]
      })
    }
  }

  componentDidUpdate() {
    this.scrollChatToBottom()
  }

  componentWillUnmount() {
    /* this.props.unregisterHandler() */
  }

  onInput = e => {
    this.setState({
      input: e.target.value
    })
  }

  onSendMessage = () => {
    if (!this.state.input) return

    this.props.onSendMessage(this.state.input, err => {
      if (err) return console.error(err)
      return this.setState({input: ""})
    })

    /* const audio = this.props.socketReducer.audioBlob */

    // send audio file
    /* if (audio) { */
    /*   this.props.actions.addAudio({ */
    /*     author: audio.audio.author, */
    /*     dataUrl: audio.audio.dataUrl */
    /*   }) */
    /*   this.props.actions.sendAudioBlob(audio) */
    /* } */

    // TODO: remove the soundclips
    /* var soundClips = document.querySelector(".sound-clips") */
    /* if (soundClips.firstChild) { */
    /*   soundClips.removeChild(soundClips.firstChild) */
    /* } */

    // delete the audio
    /* this.props.actions.deleteAudioBlob() */
  }

  onMessageReceived(entry) {
    this.updateChatHistory(entry)
  }

  updateChatHistory(entry) {
    this.setState({chatHistory: this.state.chatHistory.concat(entry)})
  }

  scrollChatToBottom() {
    this.panel.scrollTo(0, this.panel.scrollHeight)
  }

  render() {
    const {classes} = this.props
    /* const {username} = this.props.user */
    /* const Msg = ({author, audio, msg}) => ( */
    /*   <ListItem alignitems="center" display="flex" padding="10px 0"> */
    /*     <span style={{fontSize: "1rem", width: "200px"}}>{author}</span>:{" "} */
    /*     {audio ? ( */
    /*       <audio className="msg-audio" src={audio} controls> */
    /*         Your browser does not support the */
    /*         <code>audio</code> element. */
    /*         <track kind="captions" /> */
    /*       </audio> */
    /*     ) : null}{" "} */
    /*     <span style={{fontSize: "1rem"}}>{msg}</span> */
    /*   </ListItem> */
    /* ) */
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "row",
          justifyContent: "center"
        }}>
        <ChatWindow>
          <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{padding: "13px", minWidth: "250px"}}>
              <Typography className={classes.outputText}>
                ({this.props.usersList.length}) {this.props.zone.zoneName}
              </Typography>
            </div>
            <div style={{paddingTop: "20px"}}>
              <Button color="secondary" onClick={this.props.onLeave}>
                Leave Zone
              </Button>
            </div>
          </div>
          <ChatPanel>
            <Scrollable
              innerRef={panel => {
                this.panel = panel
              }}>
              <List>
                {this.state.chatHistory.map(({username, message, event}, i) => [
                  <NoDots key={i}>
                    <ListItem button style={{color: "#fafafa"}}>
                      <ListItemAvatar>
                        <Avatar alt={`Avatar n°${0 + 1}`} src={`${ceoImg}`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${username} ${event}`}
                        secondary={
                          <Typography className={classes.outputText}>
                            {message}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <div className={classes.more}>:</div>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </NoDots>
                ])}
              </List>
            </Scrollable>
            <InputPanel>
              <TextField
                fullWidth
                multiline
                rows={2}
                rowsMax={2}
                onChange={this.onInput}
                value={this.state.input}
                onKeyPress={e =>
                  e.key === "Enter" ? this.onSendMessage() : null
                }
              />
            </InputPanel>
            <div
              className="sound-clips"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            />
            <Box flexdirection="row" margin="20px 0 0 0">
              <Button variant="contained" className="record" color="secondary">
                <FiberSmartRecordIcon className={classes.leftIcon} />
                Rec
              </Button>
              <Button
                className="stop"
                style={{color: "black", marginLeft: "8px"}}>
                stop
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onSendMessage}
                className={classes.button}>
                Send
                <SendIcon className={classes.rightIcon}>send</SendIcon>
              </Button>
            </Box>
          </ChatPanel>
        </ChatWindow>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {Zone, User} = session
  const zoneObj = Zone.all().toRefArray()
  const userObj = User.all().toRefArray()
  const zone = zoneObj[0]
  const user = userObj[0]

  return {
    channelReducer: state.channelReducer,
    chatReducer: state.chatReducer,
    messages: state.messages,
    pictureReducer: state.pictureReducer,
    roomReducer: state.roomReducer,
    socketReducer: state.socketReducer,
    userReducer: state.userReducer,
    utteredList: state.utteredReducer.utteredList,
    user,
    zone
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addAudio,
        addMsg,
        deleteAudioBlob,
        loadAudioBlob,
        sendAudioBlob,
        sendMsg,
        setCurrentMsg,
        updateMsg,
        updateReviewList
      },
      dispatch
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chat))