import React, {Component} from "react"
import schema from "../../core/schema.js"
/* import {Link} from "react-router-dom" */
import {bindActionCreators} from "redux"
import {find} from "lodash"
import {connect} from "react-redux"
import {Box, List, ListItem, Section, TextArea} from "../../components"

/* import {List, ListItem} from "@material-ui/core/List" */

import {Button, Header} from "semantic-ui-react"
import styled from "styled-components"
import cuid from "cuid"
import socketio from "socket.io-client"
import RecordRTC from "recordrtc"
/* import filename from "../../assets/images/play.svg" */

// actions
import {updateReviewList} from "../Pictures/actions.js"
import {addAudio, addMsg, setCurrentMsg, updateMsg} from "./actions.js"
import {
  deleteAudioBlob,
  loadAudioBlob,
  sendAudioBlob,
  sendMsg
} from "../../services/socketio/actions.js"
import "./styles.css"

const socket = socketio()

const ChatWindow = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 420px;
  box-sizing: border-box;
`
/* const ChatPanel = styled.div` */
/*   position: relative; */
/*   display: inline-flex; */
/*   flex-direction: column; */
/*   justify-content: flex-end; */
/*   height: 100%; */
/*   width: 100%; */
/*   box-sizing: border-box; */
/*   z-index: 1; */
/* ` */

const Msg = ({author, audio, msg}) => (
  <ListItem alignitems="center" display="flex" padding="10px 0">
    {author}:{" "}
    {audio ? (
      <audio className="msg-audio" src={audio} controls>
        Your browser does not support the
        <code>audio</code> element.
        <track kind="captions" />
      </audio>
    ) : null}{" "}
    {msg}
  </ListItem>
)

function MsgList(props) {
  const {list, onMsgClick} = props
  return (
    <div style={{width: "90%"}}>
      <Box
        id="chatList"
        alignitems="flex-start"
        height="600px"
        justifycontent="flex-start"
        margin="0 0 20px 0"
        overflowy="scroll"
        padding="20px"
        wordbreak="break-all">
        <List className="Message" style={{textAlign: "left", fontSize: "1rem"}}>
          {list.map(item => (
            <Msg
              key={cuid()}
              author={item.author}
              audio={item.dataUrl}
              msg={item.msg}
              onClick={() => onMsgClick(item.id)}
            />
          ))}
        </List>
      </Box>
    </div>
  )
}

class MsgBox extends Component {
  render() {
    const {onKeyUp} = this.props
    return (
      <TextArea
        id="inputMessageBox"
        name="msg"
        placeholder="enter a message"
        defaultValue={this.props.value}
        onChange={e => this.props.onChange(e.target.value)}
        onKeyUp={onKeyUp}
        width="90%"
      />
    )
  }
}

const Article = styled.article`
  display: flex;
  flex-direction: column;
`

class ChatContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      msg: ""
    }
  }

  componentDidMount() {
    const {zoneName} = this.props.zone

    socket.on("connect", () => {
      console.log("yeah, user connected!")

      var params = {
        zone: zoneName
      }

      socket.emit("join", params, () => {
        console.log(`User has joined "${zoneName}."`)
      })
    })

    /* var fileCounter = 0 */
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

  componentDidUpdate() {
    var node = document.getElementById("chatList")
    if (this.shouldScrollBottom) {
      node.scrollTop = node.scrollHeight
    }
  }

  onKeyUp = e => {
    const {value} = e.target
    this.setState({msg: value})

    if (e.keyCode === 13 && value) {
      const body = {
        id: cuid.generate(),
        msg: value,
        /* author: this.props.userReducer.userProfile.username, */
        author: "chino"
        /* room: this.props.socketReducer.joined_room */
      }

      this.props.actions.addMsg(body)
      this.props.actions.sendMsg(body)
      e.target.value = ""
    }
  }

  onSend = e => {
    e.preventDefault()

    console.log("msg: ", this.state.msg)

    /* socket.emit("createMessage", { */
    /*   msg: this.state.msg, */
    /*   zone: this.props.zone.zoneName */
    /* }) */

    const audio = this.props.socketReducer.audioBlob
    // send audio file
    if (audio) {
      this.props.actions.addAudio({
        author: audio.audio.author,
        dataUrl: audio.audio.dataUrl
      })
      this.props.actions.sendAudioBlob(audio)
    }
    // send typed messages
    const body = {
      id: cuid(),
      msg: this.state.msg,
      /* author: this.props.userReducer.userProfile.username, */
      author: "chino"
      /* room: this.props.socketReducer.joined_room */
    }
    if (body.msg) {
      this.props.actions.addMsg(body)
      this.props.actions.sendMsg(body)
      this.setState({msg: null})
    }

    // clear input for messages
    document.getElementById("inputMessageBox").value = ""
    // remove the soundclips
    var soundClips = document.querySelector(".sound-clips")
    if (soundClips.firstChild) {
      soundClips.removeChild(soundClips.firstChild)
    }

    // TODO: code below for uttered lists
    // const obj = {
    //   // author: this.props.userReducer.userProfile.username,
    //   room_id: this.props.roomReducer.selected,
    //   message: this.props.chatReducer.msg
    // }

    // if (obj.message) {
    //   // update utteredList
    //   let utteredArray = utteredString.split(' ')
    //   let utteredMap = utteredArray.map(word => {
    //     return {word: word, uttered: 1}
    //   })
    //   let newUtteredList = this.props.utteredList.concat(utteredMap)

    //   // first, convert data into a Map with reduce
    //   let counts = newUtteredList.reduce((prev, curr) => {
    //     let count = prev.get(curr.word) || 0
    //     prev.set(curr.word, curr.uttered + count)
    //     return prev
    //   }, new Map())

    //   // then, map your counts object back to an array
    //   let reducedObjArr = [...counts].map(([word, uttered]) => {
    //     return {word, uttered}
    //   })

    //   // TODO: save utterlist to db (this feature to halted for now)
    //   const userObjId = this.props.userReducer.userProfile._id
    //   console.log('userObjId: ', userObjId)
    //   superagent
    //     .put(`/api/users/${userObjId}`)
    //     .send({utteredList: reducedObjArr})
    //     .end((err, res) => {
    //       if (err) {
    //         console.log(err)
    //       } else {
    //         this.props.actions.updateUtteredList(reducedObjArr)
    //       }
    //     })
    // }

    // delete the audio
    this.props.actions.deleteAudioBlob()
  }

  filteredMessages = () => {
    const list = this.props.chatReducer.msgList
    // return list.filter(item => {
    //   if (item.message.room_id === this.props.roomReducer.selected) return true
    // })
    return list
  }

  updateReview = e => {
    e.preventDefault()
    const {originalList, query} = this.props.pictureReducer
    const reviewObj = find(originalList, {word: query})

    if (!this.props.pictureReducer.reviewList) {
      this.props.actions.updateReviewList(reviewObj)
      console.log('reviewlist "', this.props.pictureReducer.reviewList)
    } else {
      // reviewList
      this.props.actions.updateReviewList(reviewObj)
    }
  }

  updateScroll = () => {
    var element = document.getElementById("chatList")
    element.scrollTop = element.scrollHeight
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  UNSAFE_componentWillUpdate() {
    // scroll ref: http://blog.vjeux.com/2013/javascript/scroll-position-with-react.html
    var node = document.getElementById("chatList")

    if (node) {
      this.shouldScrollBottom =
        node.scrollTop + node.offsetHeight === node.scrollHeight
    }
  }

  render() {
    /* socket.on("newMessge", data => { */
    /*   console.log("new message: ", data) */
    /*   console.log("dat: , ", data.msg) */
    /*   /1* console.log("dat: , ", data.zoneName) *1/ */
    /* }) */

    const {zoneName} = this.props.zone
    /* console.log("process: ", process.env.SOCKETIO_SERVER_URL) */
    var recordBtn = (
      <Box flexdirection="row">
        <Button
          style={{height: "50px", margin: "5px 10px 0 0"}}
          circular
          className="record"
          toggle
          color="red"
          size="tiny">
          rec
        </Button>
        <Button
          style={{height: "50px", margin: "5px 40px 0 0"}}
          className="stop"
          color="teal"
          size="tiny">
          stop
        </Button>
      </Box>
    )
    return (
      <Section>
        <ChatWindow>
          <Box padding="20px">
            <Header>{zoneName}</Header>
          </Box>
          <MsgList list={this.filteredMessages()} />
          <Box padding="20px">
            <Article className="sound-clips" />
          </Box>
          <MsgBox
            onKeyUp={this.onKeyUp}
            onChange={x => this.setState({msg: x})}
            value={this.state.msg}
          />
          <Box alignitems="flex-start" flexdirection="row" width="200px">
            {this.props.roomReducer.creator ? (
              <Button
                color="black"
                fontsize="1.2rem"
                margin="5px"
                padding="3px"
                onClick={this.updateReview}
                width="50px">
                review{" "}
              </Button>
            ) : null}
            {recordBtn}
            <Button
              style={{height: "50px", margin: "5px 10px 0 0"}}
              color="yellow"
              onClick={this.onSend}
              type="button">
              send
            </Button>
          </Box>
        </ChatWindow>
      </Section>
    )
  }
}

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {Zone} = session
  const zoneObj = Zone.all().toRefArray()
  const zone = zoneObj[0]

  return {
    channelReducer: state.channelReducer,
    chatReducer: state.chatReducer,
    messages: state.messages,
    pictureReducer: state.pictureReducer,
    roomReducer: state.roomReducer,
    socketReducer: state.socketReducer,
    userReducer: state.userReducer,
    utteredList: state.utteredReducer.utteredList,
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
)(ChatContainer)
