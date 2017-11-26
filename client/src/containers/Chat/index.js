import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Box, List, ListItem, TextArea} from '../../components'
import io from 'socket.io-client'
import shortid from 'shortid'

// actions
import {updateReviewList} from '../Pictures/actions.js'
import {addMsg, setCurrentMsg, updateMsg} from './actions.js'

const Msg = ({author, msg}) =>
  <ListItem>
    {author}: {msg}
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
  //       this.props.onSubmit(trimmedMessage)
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
      />
    )
  }
}

class Chat extends Component {
  constructor(props) {
    super(props)

    this.filteredMessages = this.filteredMessages.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.updateReview = this.updateReview.bind(this)
  }

  componentDidMount() {
    this.socket = io()
    this.socket.on('message', body => {
      console.log('body: ', body)
      this.props.actions.addMsg({
        msg: body.body.msg,
        author: body.body.author
      })
    })

    //TODO: restore after testing, this grabs messages from the database on load
    // superagent
    //   .get('/api/messages')
    //   .query(null)
    //   .set('Accept', 'application/json')
    //   .end((err, res) => {
    //     if (err) {
    //       alert(err)
    //       return
    //     }
    //     const results = res.body.message
    //     this.props.actions.loadMessages(results)// no more loading from server, so remove this line
    //   })
    // set username
    // console.log('user: ', this.props.userReducer.userProfile.username)
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

  onSubmit(e) {
    e.preventDefault()
    const obj = {
      // author: this.props.authReducer.userProfile.username,
      room_id: this.props.roomReducer.selected,
      message: this.props.chatReducer.current_msg
    }

    if (obj.message) {
      // save messge to db

      // superagent.post('/api/messages').send(obj).end((err, res) => {
      //   if (err) {
      //     console.log(err)
      //   } else {
      //     this.props.actions.addMsg(res.body)
      //   }
      // })

      // update utteredList
      let utteredArray = utteredString.split(' ')
      let utteredMap = utteredArray.map(word => {
        return {word: word, uttered: 1}
      })
      let newUtteredList = this.props.utteredList.concat(utteredMap)

      // first, convert data into a Map with reduce
      let counts = newUtteredList.reduce((prev, curr) => {
        let count = prev.get(curr.word) || 0
        prev.set(curr.word, curr.uttered + count)
        return prev
      }, new Map())

      // then, map your counts object back to an array
      let reducedObjArr = [...counts].map(([word, uttered]) => {
        return {word, uttered}
      })

      // save utterlist to db
      const userObjId = this.props.authReducer.userProfile._id
      console.log('userObjId: ', userObjId)
      superagent
        .put(`/api/users/${userObjId}`)
        .send({utteredList: reducedObjArr})
        .end((err, res) => {
          if (err) {
            console.log(err)
          } else {
            this.props.actions.updateUtteredList(reducedObjArr)
          }
        })
    }

    // clear input for messages
    document.getElementById('inputMessageBox').value = ''
  }

  filteredMessages() {
    let list = this.props.chatReducer
    // return list.filter(item => {
    //   if (item.message.room_id === this.props.roomReducer.selected) return true
    // })
    return list
  }

  handleSubmit(e) {
    const value = e.target.value
    if (e.keyCode === 13 && value) {
      const body = {
        id: shortid.generate(),
        msg: value,
        author: this.props.userReducer.userProfile.username
      }

      this.props.actions.addMsg(body)
      this.socket.emit('message', body)
      e.target.value = ''
    }
  }

  render() {
    return (
      <Box>
        <MsgList
          list={this.filteredMessages()}
          msgs={this.props.chatReducer.messages}
        />
        <MsgBox onKeyUp={this.handleSubmit} />
        <Box alignitems="flex-start" width="100px">
          <Button
            color="black"
            fontsize="1.4rem"
            margin="5px"
            padding="3px"
            onClick={this.updateReview}
            width="100px">
            review{' '}
          </Button>
          <Button
            color="black"
            fontsize="1.4rem"
            margin="5px"
            padding="3px"
            onClick={this.onSubmit}
            width="100px">
            send
          </Button>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    chatReducer: state.chatReducer,
    messages: state.messages,
    pictureReducer: state.pictureReducer,
    roomReducer: state.roomReducer,
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
        setCurrentMsg,
        updateMsg,
        updateReviewList
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
