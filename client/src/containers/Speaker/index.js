import React, {Component} from 'react'
import superagent from 'superagent'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Box, Button, Img, Input, TextArea} from '../../components'

// actions
import {
  addMessage,
  loadMessages,
  setAuthor,
  setFinalTranscript,
  setInterimScript
} from './actions.js'

import {updateReviewList} from '../../containers/Pictures/actions.js'

import {updateUtteredList} from '../../containers/Uttered/actions.js'

// images
import mic from '../../assets/images/microphone.png'

class Speaker extends Component {
  constructor() {
    super()

    this.onSubmit = this.onSubmit.bind(this)
    this.updateReview = this.updateReview.bind(this)
    this.updateInterimScript = this.updateInterimScript.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateSpeech = this.updateSpeech.bind(this)
    this.speechStart = this.speechStart.bind(this)
  }

  componentDidMount() {
    superagent
      .get('/api/messages')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          alert(err)
          return
        }
        const results = res.body.message
        this.props.messages.loadMessages(results)
      })

    const upgrade = () => {
      alert('This application only works with the Google Chrome Browser.')
    }

    if (!window.webkitSpeechRecognition && !window.speechRecognition) {
      upgrade()
    } else {
      let recognizing = true

      const reset = () => {
        recognizing = false
        return recognizing
      }
    }

    const speech = new webkitSpeechRecognition() || speechRecognition()

    speech.continuous = true
    speech.interimResults = true
    // speech.lang = 'en-US'
    // speech.lang = 'fr-FR';
    // speech.lang = 'es-MX';
    speech.lang = 'ko-KR'

    speech.start() //enables recognition on default
    speech.onstart = () => {}
    speech.onresult = event => {
      var interim_transcript = ''
      var final_transcript = ''

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript
        } else {
          interim_transcript += event.results[i][0].transcript
        }
      }

      interim_transcript = interim_transcript.toLowerCase()
      final_transcript = final_transcript.toLowerCase()
      this.props.messages.setInterimScript(interim_transcript)
      this.props.messages.setFinalTranscript(final_transcript)
      // final_span.innerHTML = linebreak(final_transcript)
      // interim_span.innerHTML = linebreak(interim_transcript)
    }
  }

  speechStart() {
    const speech = new webkitSpeechRecognition() || speechRecognition()
    speech.lang = 'ko-KR'
    // speech.lang = 'en-US'
    // speech.lang = 'fr-FR';
    // speech.lang = 'es-MX';
    speech.continuous = true
    speech.start()
    speech.onresult = event => {
      var interim_transcript = ''
      var final_transcript = ''

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript
        } else {
          interim_transcript += event.results[i][0].transcript
        }
      }

      interim_transcript = interim_transcript.toLowerCase()
      final_transcript = final_transcript.toLowerCase()

      this.props.messages.setInterimScript(interim_transcript)
      this.props.messages.setFinalTranscript(final_transcript)

      // final_span.innerHTML = linebreak(final_transcript)
      // interim_span.innerHTML = linebreak(interim_transcript)
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
        this.props.messages.updateReviewList(reviewObj)
        console.log('reviewlist "', this.props.pictureReducer.reviewList)
      } else {
        const newList = Object.assign(
          this.props.pictureReducer.reviewList,
          reviewObj
        )
        this.props.messages.updateReviewList(newList)
      }
    }
    console.log(this.props.pictureReducer.reviewList)
  }

  onSubmit(e) {
    e.preventDefault()
    const obj = {
      author: this.props.message.author,
      message: this.props.message.final_transcript,
      room_id: this.props.roomId.selected
    }

    if (obj.message) {
      superagent.post('/api/messages').send(obj).end((err, res) => {
        if (err) {
          console.log(err)
        } else {
          this.props.messages.addMessage(res.body)
        }
      })

      // update utteredList
      let utteredString = this.props.message.final_transcript
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

      // save to db
      superagent
        .put('/api/users/59ba886955d0041e7a4a854a')
        .send({utteredList: reducedObjArr})
        .end((err, res) => {
          if (err) {
            console.log(err)
          } else {
            this.props.messages.updateUtteredList(reducedObjArr)
          }
        })
    }

    // clear the final_transcript input box
    this.props.messages.setFinalTranscript('')
  }

  updateName(e) {
    e.preventDefault()
    let letter = e.target.value.trim()
    this.props.messages.setAuthor(letter)
  }

  updateInterimScript(e) {
    e.preventDefault()
    let letter = e.target.value
    this.props.messages.setInterimScript(letter)
  }

  updateSpeech(e) {
    e.preventDefault()
    let letter = e.target.value
    this.props.messages.setFinalTranscript(letter)
  }

  render() {
    return (
      <Box>
        <p>Your uttered words appear below</p>
        <Box flexdirection="row">
          <Input
            onChange={this.updateInterimScript}
            border="none"
            color="black"
            textalign="center"
            width="100%"
            value={this.props.message.interim_script}
          />
          <Button
            onClick={this.speechStart}
            height="50px"
            width="50px"
            padding="0">
            <Img src={mic} height="50px" width="50px" />
          </Button>
        </Box>
        <Box flexdirection="row" justifycontent="center" margin="20px">
          <TextArea
            onChange={this.updateSpeech}
            color="black"
            fontsize="2.5rem"
            placeholder="edit this message before sending"
            textalign="left"
            width="500px"
            value={this.props.message.final_transcript}
          />
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
        <Box margin="40px">
          <Input
            fontsize="1.3rem"
            onChange={this.updateName}
            ref={node => {
              this.name_input = node
            }}
            type="text"
            placeholder="Your Name Here"
            value={this.props.message.author}
          />
        </Box>
        <Img
          height="80px"
          width="100%"
          src="http://static2.cdn.ubi.com/gamesites/gro/game/beginers-guide/tn_Advancement-ExperienceBar.jpg"
        />
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    message: state.speakerReducer,
    roomId: state.roomReducer,
    pictureReducer: state.pictureReducer,
    utteredList: state.utteredReducer.utteredList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    messages: bindActionCreators(
      {
        addMessage,
        loadMessages,
        setFinalTranscript,
        setAuthor,
        setInterimScript,
        updateUtteredList,
        updateReviewList
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Speaker)
