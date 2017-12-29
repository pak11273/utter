import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Box, List, ListItem, TextArea} from '../../components'
import styled from 'styled-components'
import shortid from 'shortid'
import io from 'socket.io-client'
import RecordRTC from 'recordrtc'
import filename from '../../assets/images/play.svg'

// actions
import {updateReviewList} from '../Pictures/actions.js'
import {addMsg, setCurrentMsg, updateMsg} from './actions.js'
import {
  sendAudioBlob,
  loadAudioBlob,
  sendMsg
} from '../../services/socketio/actions.js'

const Msg = ({author, audio, msg}) =>
  <ListItem>
    {author}: {audio}{msg}
  </ListItem>

const MsgList = ({list, onMsgClick}) =>
  <Box
    alignitems="flex-start"
    height="600px"
    justifycontent="flex-start"
    margin="0 0 20px 0"
    overflowy="scroll">
    <List className="Message" style={{textAlign: 'left', fontSize: '1rem'}}>
      {list.map(item =>
        <Msg
          key={item.id}
          author={item.author}
          audio={item.audio}
          msg={item.msg}
          onClick={() => onMsgClick(id)}
        />
      )}
    </List>
  </Box>

class MsgBox extends Component {
  constructor(props) {
    super(props)
  }

  onChange(e) {
    // set the current message
  }

  // onKeyPress(e) {
  //   if (e.which === 13) {
  //     const trimmedMessage = this.props.value.trim()
  //     if (trimmedMessage) {
  //       this.props.onSend(trimmedMessage)
  //     }
  //     e.preventDefault()
  //   }
  // }

  render() {
    const {current_msg, onKeyUp} = this.props
    return (
      <TextArea
        id="inputMessageBox"
        placeholder="enter a message"
        value={current_msg}
        onChange={this.onChange}
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

    this.filteredMessages = this.filteredMessages.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onSend = this.onSend.bind(this)
    this.updateReview = this.updateReview.bind(this)
  }

  componentDidMount() {
    var fileCounter = 0
    var props = this.props
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.')
      navigator.mediaDevices
        .getUserMedia({audio: true})
        // Success callback
        .then(function(stream) {
          const recorder = RecordRTC(stream, {type: 'audio'})
          var record = document.querySelector('.record')
          var stop = document.querySelector('.stop')
          var soundClips = document.querySelector('.sound-clips')
          record.onclick = function() {
            console.log('child:; ', soundClips.childNodes)
            if (soundClips.childNodes.length === 1) {
              record.disabled = true
              alert(
                'You can only record 1 audio clip at a time.  Delete your audio clip to record another.'
              )
            } else {
              recorder.startRecording()
              console.log('recorder started')
              record.style.background = 'red'
              record.style.color = 'black'
            }
          }
          var chunks = []

          stop.onclick = function() {
            recorder.stopRecording(function(audioURL) {
              audio.src = audioURL

              // add blob to redux
              var recordedBlob = recorder.getBlob()
              recorder.getDataURL(function(dataUrl) {
                var files = {
                  audio: {
                    author: props.userReducer.userProfile.username,
                    room: props.socketReducer.joined_room,
                    name: 'file' + fileCounter++ + '.wav',
                    type: 'audio/wav',
                    dataUrl: dataUrl
                  }
                }
                props.actions.loadAudioBlob(files)
              })
            })
            console.log('recorder stopped')
            record.style.background = ''
            record.style.color = ''

            var clipContainer = document.createElement('Article')
            var audio = document.createElement('audio')
            var deleteButton = document.createElement('button')

            clipContainer.classList.add('clip')
            clipContainer.setAttribute(
              'style',
              'display: flex; justify-content: center'
            )
            audio.setAttribute('controls', '')
            deleteButton.innerHTML = 'Delete'

            clipContainer.appendChild(audio)
            clipContainer.appendChild(deleteButton)
            soundClips.appendChild(clipContainer)

            // var blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'})
            // chunks = []
            // var audioURL = window.URL.createObjectURL(blob)
            // audio.src = audioURL

            deleteButton.onclick = function(e) {
              var evtTgt = e.target
              evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
              record.disabled = false
            }
          }
        })
        // Error callback
        .catch(function(err) {
          console.log('The following gUM error occured: ' + err)
        })
    } else {
      console.log('getUserMedia not supported on your browser!')
    }
  }

  updateReview(e) {
    e.preventDefault()
    const wordList = this.props.pictureReducer.wordList
    const originalList = this.props.pictureReducer.originalList
    const query = this.props.pictureReducer.query
    if (query) {
      const reviewObj = {
        [query]: originalList[query]
      }

      if (!this.props.pictureReducer.reviewList) {
        this.props.actions.updateReviewList(reviewObj)
        console.log('reviewlist "', this.props.pictureReducer.reviewList)
      } else {
        const newList = Object.assign(
          this.props.pictureReducer.reviewList,
          reviewObj
        )
        this.props.actions.updateReviewList(newList)
      }
    }
    console.log(this.props.pictureReducer.reviewList)
  }

  onSend(e) {
    e.preventDefault()
    // console.log('audio: ', audio.src)
    // var files = {
    //   audio: {
    //     name: fileName + '.wav',
    //     type: 'audio/wav',
    //     dataURL: audio.src
    //   }
    // }

    if (true) {
      var data = this.props.socketReducer.audioBlob
      this.props.actions.sendAudioBlob(data)
    }
    // TODO: code below for uttered lists
    // const obj = {
    //   // author: this.props.authReducer.userProfile.username,
    //   room_id: this.props.roomReducer.selected,
    //   message: this.props.chatReducer.current_msg
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
    //   const userObjId = this.props.authReducer.userProfile._id
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

    // clear input for messages
    document.getElementById('inputMessageBox').value = ''
  }

  filteredMessages() {
    let list = this.props.chatReducer.msgList
    // return list.filter(item => {
    //   if (item.message.room_id === this.props.roomReducer.selected) return true
    // })
    return list
  }

  onKeyUp(e) {
    const value = e.target.value
    if (e.keyCode === 13 && value) {
      const body = {
        id: shortid.generate(),
        msg: value,
        author: this.props.userReducer.userProfile.username,
        room: this.props.socketReducer.joined_room
      }

      this.props.actions.addMsg(body)
      this.props.actions.sendMsg(body)
      e.target.value = ''
    }
  }

  render() {
    if (this.props.socketReducer.joined_room !== 'Lobby') {
      var recordBtn = (
        <Box flexdirection="row">
          <Button
            className="record"
            color="black"
            fontsize="1.2rem"
            margin="5px"
            padding="3px"
            width="100px">
            rec
          </Button>
          <Button
            className="stop"
            color="black"
            fontsize="1.2rem"
            margin="5px"
            padding="3px"
            width="100px">
            stop{' '}
          </Button>
        </Box>
      )
    }
    if (!this.props.socketReducer.joined_room) {
      return <div>'Join or create a room'</div>
    } else {
      return (
        <Box>
          <MsgList list={this.filteredMessages()} />
          <Box style={{padding: '20px'}}>
            {' '}<Article className="sound-clips" />
          </Box>
          <MsgBox onKeyUp={this.onKeyUp} />
          <Box alignitems="flex-start" flexdirection="row" width="200px">
            <Button
              color="black"
              fontsize="1.2rem"
              margin="5px"
              padding="3px"
              onClick={this.updateReview}
              width="50px">
              review{' '}
            </Button>
            {recordBtn}
            <Button
              color="black"
              fontsize="1.2rem"
              margin="5px"
              padding="3px"
              onClick={this.onSend}
              width="50px">
              send
            </Button>
          </Box>
        </Box>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    channelReducer: state.channelReducer,
    chatReducer: state.chatReducer,
    messages: state.messages,
    pictureReducer: state.pictureReducer,
    roomReducer: state.roomReducer,
    socketReducer: state.socketReducer,
    authReducer: state.authReducer,
    userReducer: state.userReducer,
    utteredList: state.utteredReducer.utteredList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        addMsg,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
