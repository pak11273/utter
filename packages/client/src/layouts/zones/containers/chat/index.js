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
import FloatingActionButton from "@material-ui/core/Fab"
import {withStyles} from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
/* import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice" */
import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord"
import CloseIcon from "@material-ui/icons/Close"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import SendIcon from "@material-ui/icons/Send"

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
  width: 420px;
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  z-index: 1;
  color: #fafafa !important;
  border-bottom: 1px solid;
`

/* const Title = styled.p` */
/*   text-align: center; */
/*   font-size: 24px; */
/* ` */

const NoDots = styled.div`
  hr {
    visibility: hidden;
  }
`

const OutputText = styled.span`
  white-space: normal !important;
  word-break: break-all !important;
  overflow: initial !important;
  width: 100%;
  height: auto !important;
  color: #fafafa !important;
`

const InputPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  align-self: center;
  border-top: 1px solid #fafafa;
`

/* const ChatroomImage = styled.img` */
/*   position: absolute; */
/*   top: 0; */
/*   width: 100%; */
/* ` */

const Scrollable = styled.div`
  height: 100%;
  overflow: auto;
`

/* const styles = () => ({ */
/*   root: { */
/*     width: "100%", */
/*     maxWidth: 360 */
/*   } */
/* }) */

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
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
              "display: flex; justify-content: center"
            )
            audio.setAttribute("controls", "")
            deleteButton.innerHTML = "Delete"

            clipContainer.appendChild(audio)
            clipContainer.appendChild(deleteButton)
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
    console.log("props: ", props)
    this.setState({
      chatHistory: [...this.state.chatHistory, props.receiveMsg.data]
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollChatToBottom()

    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    )
    Object.entries(this.state).forEach(
      ([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`)
    )
  }

  componentWillUnmount() {
    this.props.unregisterHandler()
  }

  onInput = e => {
    this.setState({
      input: e.target.value
    })
  }

  onSendMessage = () => {
    if (!this.state.input) return

    this.props.onSendMessage(this.state.input, (err, success) => {
      if (err) return console.error(err)
      console.log("success", success)
      /* if (success) { */
      /*   this.setState({chatHistory: [...this.state.chatHistory, success]}) */
      /* } */
      // clears the input
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
    console.log("onMessageReceived:", entry)
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
      <div style={{display: "flex", height: "100%", justifyContent: "center"}}>
        <ChatWindow>
          <Header>
            ChatTitle
            <IconButton color="primary" onClick={this.props.onLeave}>
              <CloseIcon />
            </IconButton>
          </Header>
          <ChatPanel>
            <Scrollable
              innerRef={panel => {
                this.panel = panel
              }}
            />
            <List dense>
              {this.state.chatHistory.map(({username, message, event}, i) => [
                <NoDots key={i}>
                  <ListItem button style={{color: "#fafafa"}}>
                    <ListItemAvatar>
                      <Avatar alt={`Avatar n°${0 + 1}`} src={`${ceoImg}`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${username} ${event}`}
                      secondary={<OutputText>{message}</OutputText>}
                    />
                    <ListItemSecondaryAction>
                      <div>:</div>
                    </ListItemSecondaryAction>
                  </ListItem>
                </NoDots>
              ])}
            </List>
            <InputPanel>
              <TextField
                multiline
                rows={4}
                rowsMax={4}
                onChange={this.onInput}
                value={this.state.input}
                onKeyPress={e =>
                  e.key === "Enter" ? this.onSendMessage() : null
                }
              />
              <FloatingActionButton onClick={null} style={{marginLeft: 20}}>
                Zone Rules
              </FloatingActionButton>
            </InputPanel>
            {/* <Article className="sound-clips" /> */}
            <Box flexdirection="row">
              <Button variant="contained" className="record" color="secondary">
                <FiberSmartRecordIcon className={classes.leftIcon} />
                Rec
              </Button>
              <Button color="primary">stop</Button>
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
