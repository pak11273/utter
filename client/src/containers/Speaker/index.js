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

// images
import mic from '../../assets/images/microphone.png'

class Speaker extends Component {
  constructor() {
    super()

    this.onSubmit = this.onSubmit.bind(this)
    this.updateInterimScript = this.updateInterimScript.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateSpeech = this.updateSpeech.bind(this)
    this.sendToSpeaker = this.sendToSpeaker.bind(this)
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

  onSubmit(e) {
    e.preventDefault()
    const obj = {
      author: this.props.message.author,
      message: this.props.message.final_transcript,
      room_id: this.props.roomId.selected
    }

    superagent.post('/api/messages').send(obj).end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        this.props.messages.addMessage(res.body)
      }
    })
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

  sendToSpeaker(dataFromForm) {
    this.props.sendToConnection(dataFromForm)
    const {author, message} = dataFromForm
    this.setState({
      author,
      message
    })
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
            fontsize="1.4rem"
            placeholder="edit this message before sending"
            textalign="left"
            width="500px"
            value={this.props.message.final_transcript}
          />
          <Button
            color="black"
            fontsize="2rem"
            margin="20px"
            padding="3px"
            onClick={this.onSubmit}>
            send
          </Button>
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
    roomId: state.roomReducer
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
        setInterimScript
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Speaker)
