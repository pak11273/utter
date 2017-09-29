import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import secrets from '../../config/secrets.js'
import superagent from 'superagent'
import Rand from '../../utils/randomGenerator.js'
import PicturesMgr from '../../utils/PicturesMgr.js'
import {Box, Button, Img, Text} from '../../components'
import PlayImg from '../../assets/images/play.svg'
import _ from 'lodash'

import {
  loadPicture,
  loadQuery,
  loadOriginalWordList,
  loadWordList,
  updateWordList,
  updateReviewList,
  sendRomanized,
  sendTranslated
} from './actions.js'

import {setInterimScript, setFinalTranscript} from '../Speaker/actions.js'

// audio
import cdnUrl from '../../../src/config/secrets.js'
const cdn = cdnUrl.cdn

const Wrap = styled.section`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  box-sizing: border-box;
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  height: ${props => props.height};
  li {
    font-size: 3rem;
  }
  justify-content: ${props => props.justyifycontent};
  margin: ${props => props.margin};
  max-width: ${props => props.maxwidth};
  opacity: ${props => props.opacity};
  padding: ${props => props.padding};
  position: ${props => props.position};
  width: ${props => props.width};

  @media(min-width: 768px) {
    width: 50%; 
  }

  @media(min-width: 960px) {
    flex-direction: ${props => props.flexdirection960};
    max-width: 960px;
    width: 50%;
  }
`
Wrap.defaultProps = {
  alignitems: 'center',
  background: 'transparent',
  color: 'black',
  display: 'flex',
  flexdirection: 'column',
  justifycontent: 'center',
  margin: '0 auto',
  position: 'relative',
  width: '100%'
}

class Pictures extends Component {
  constructor(props) {
    super(props)

    this.roomLevel = this.props.roomReducer.roomLevel

    this.getAPICalls = this.getAPICalls.bind(this)
    this.onPlay = this.onPlay.bind(this)
  }

  componentDidMount() {
    const roomLevel = this.props.roomReducer.roomLevel
    const listObj = require(`../../data/level${roomLevel}/query.js`)
    this.originalWordList = listObj.default
    this.props.actions.loadOriginalWordList(this.originalWordList)

    // Put list in redux
    this.props.actions.loadWordList(listObj.default)
  }

  onPlay(e) {
    e.preventDefault()
    document.getElementById(e.target.name).play()
  }

  getAPICalls() {
    let list = this.props.wordList
    const review = this.props.review
    let randList = new Rand(list)
    let randObj = randList.obj

    console.log('FROM THE container/picture/index.js')
    if (_.isEmpty(list) && _.isEmpty(review)) {
      alert(
        'YOU JUST FINISHED ALL OF YOUR WORDS.  ALL WORD LISTS WILL NOW BE RESET.'
      )
      this.props.actions.updateWordList(this.props.pictureReducer.originalList)
    } else if (_.isEmpty(list)) {
      alert(
        "YOU HAVE JUST FINISHED YOUR WORD LIST.  YOU WILL NOW REVIEW WORDS YOU DON'T KNOW."
      )
      this.props.actions.updateWordList(this.props.review)
    }

    // get key of randoObj
    const firstKey = Object.keys(randObj)[0]

    console.log('firstkey :', firstKey)
    console.log(randObj[firstKey]['korean']['roman'])
    let translated = randObj[firstKey]['korean']['spelling']
    this.props.actions.sendTranslated(translated)

    let query = randObj[firstKey]['english']['spelling']
    let romanizedQuery = randObj[firstKey]['korean']['roman']
    this.props.actions.sendRomanized(romanizedQuery)

    this.props.actions.loadQuery(query)

    if (this.props.roomReducer.roomLevel > 6) {
      superagent
        .get('http://pixabay.com/api')
        .query({
          key: secrets.pixabay,
          q: query,
          safesearch: true,
          image_type: 'photo'
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            console.log('error : ' + err)
            return
          }

          const max = res.body.hits.length - 1
          const min = 0

          const getRandIntInclusive = (min, max) => {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min // The maximum is inclusive and the minimum is inclusive
          }

          let num = getRandIntInclusive(min, max)

          const results = res.body.hits[num].previewURL

          this.props.actions.loadPicture(results)
          this.props.actions.loadQuery(query)

          // Remove query from wordList and review
          let updatedList = _.omit(list, query)
          this.props.actions.updateWordList(updatedList)

          if (review) {
            let updatedReviewList = _.omit(review, query)
            this.props.actions.updateReviewList(updatedReviewList)
          }

          console.log('updatedList: ', _.size(updatedList))
          console.log(
            'originalWodList: ',
            _.size(this.props.pictureReducer.originalList)
          )
        })

      // speech synth for yandex api
      // superagent
      //   .get('https://translate.yandex.net/api/v1.5/tr.json/translate')
      //   .query({
      //     key: secrets.yandex,
      //     text: query,
      //     lang: 'en-ko'
      //   })
      //   .set('Accept', 'application/json')
      //   .then(res => {
      //     const translated = res.body.text[0]
      //     this.props.actions.sendTranslated(translated)

      //     var msg = new SpeechSynthesisUtterance()
      //     var voices = window.speechSynthesis.getVoices()

      //     msg.voice = voices[1] // Note: some voices don't support altering params
      //     // msg.voiceURI = 'native'
      //     msg.volume = 1 // 0 to 1
      //     msg.rate = 0.5 // 0.1 to 10
      //     msg.pitch = 1 //0 to 2
      //     msg.text = translated
      //     msg.lang = 'ko-KR'
      //     // msg.lang = 'en-US'

      //     // msg.onend = function(e) {
      //     //   console.log('Finished in ' + event.elapsedTime + ' seconds.')
      //     // }

      //     speechSynthesis.speak(msg)
      //   })
    } else {
      // Remove query from wordList and review
      let updatedList = _.omit(list, query)
      this.props.actions.updateWordList(updatedList)

      if (review) {
        let updatedReviewList = _.omit(review, query)
        this.props.actions.updateReviewList(updatedReviewList)
      }

      console.log(_.size(updatedList))
      console.log(_.size(this.originalWordList))
    }
    this.speechStart()
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

      this.props.actions.setInterimScript(interim_transcript)
      this.props.actions.setFinalTranscript(final_transcript)

      // final_span.innerHTML = linebreak(final_transcript)
      // interim_span.innerHTML = linebreak(interim_transcript)
    }
  }

  render() {
    const picture = this.props.roomReducer.roomLevel > 6
      ? <Img src={this.props.pictureSRC} />
      : <h1>{this.props.translated}</h1>

    const wordSound = this.props.query
    if (wordSound !== undefined) {
      var wordAudio = this.props.pictureReducer.wordList[wordSound].korean
        .audioUrl
    } else {
      var wordAudio = ''
    }
    return (
      <Wrap>
        {this.props.children}
        <Box margin="20px">
          {picture}
        </Box>
        <Box>
          <Button color="black" margin="20px" onClick={this.getAPICalls}>
            Change Picture
          </Button>
          <audio id={this.props.query} src={`${cdn + wordAudio}`} />
          <Img
            display="inline"
            name={this.props.query}
            onClick={this.onPlay}
            padding="0 0 0 20px"
            cursor="pointer"
            src={`${PlayImg}`}
            verticalalign="middle"
            width="30px"
            height="40px"
          />
          <Box
            margin="20px"
            width="400px"
            flexdirection="column"
            justifycontent="space-around">
            <Text fontsize="1.2rem" color="#aaa" padding="0 0 40px 0">
              query: {this.props.query}
            </Text>
            <Text fontsize="1.2rem" color="#aaa">
              romanized: {this.props.romanized}
            </Text>
            <Text fontsize="1.2rem" color="#aaa">
              translation: {this.props.translated}
            </Text>
          </Box>
        </Box>
      </Wrap>
    )
  }
}

const mapStateToProps = state => {
  return {
    pictureReducer: state.pictureReducer,
    message: state.speakerReducer,
    pictureSRC: state.pictureReducer.pictureSRC,
    review: state.pictureReducer.reviewList,
    query: state.pictureReducer.query,
    romanized: state.pictureReducer.romanized,
    translated: state.pictureReducer.translation,
    wordList: state.pictureReducer.wordList,
    roomReducer: state.roomReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        loadPicture,
        loadQuery,
        loadOriginalWordList,
        loadWordList,
        updateWordList,
        updateReviewList,
        sendRomanized,
        sendTranslated,
        setFinalTranscript,
        setInterimScript
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictures)
