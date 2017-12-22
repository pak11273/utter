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
import {speechStart} from '../../services/speech'

import {
  loadQuery,
  // loadOriginalWordList,
  // loadWordList,
  updatePicture,
  updateWordList,
  updateReviewList,
  sendRomanized,
  sendTranslated
} from './actions.js'

import {setInterimScript, setFinalTranscript} from '../ChatPanel/actions.js'
import {sendRoomMeta} from '../../services/socketio/actions.js'

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
    this.changePicture = this.changePicture.bind(this)
    this.onPlay = this.onPlay.bind(this)
  }

  componentDidMount() {
    // MOVED LOGIC TO ROOMCREATOR
    // const roomLevel = this.props.roomReducer.roomLevel
    // const roomLanguage = this.props.roomReducer.language
    // const listObj = require(`../../data/${roomLanguage}/level${roomLevel}/query.js`)
    // this.originalWordList = listObj.default
    // this.props.actions.loadOriginalWordList(this.originalWordList)
    // Put list in redux
    // this.props.actions.loadWordList(listObj.default)
  }

  onPlay(e) {
    e.preventDefault()
    document.getElementById(e.target.name).play()
  }

  changePicture() {
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

    // get room language
    const language = this.props.roomReducer.language
    console.log('lang: ', language)
    console.log('rand: ', randObj)
    console.log(randObj[firstKey][language]['roman'])
    let translated = randObj[firstKey][language]['spelling']
    this.props.actions.sendTranslated(translated)

    let query = randObj[firstKey]['english']['spelling']
    let romanizedQuery = randObj[firstKey][language]['roman']
    this.props.actions.sendRomanized(romanizedQuery)

    this.props.actions.loadQuery(query)

    if (this.props.roomReducer.listType === 'words') {
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
          this.props.actions.loadQuery(query)

          // update local picture
          this.props.actions.updatePicture(results)

          // Send socket room info
          this.props.actions.sendRoomMeta({
            room: this.props.socketReducer.created_room,
            listType: this.props.roomReducer.listType,
            translation: translated,
            query: this.props.pictureReducer.query,
            src: results
          })

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

      this.props.actions.sendRoomMeta({
        room: this.props.socketReducer.created_room,
        listType: this.props.roomReducer.listType,
        translation: translated
        // query: this.props.pictureReducer.query
      })
    }

    // speechStart()
  }

  render() {
    const picture = this.props.roomReducer.listType === 'words'
      ? <Img src={this.props.pictureReducer.pictureSrc} />
      : <Text fontsize="7rem">{this.props.pictureReducer.translation}</Text>

    const wordSound = this.props.query
    const language = this.props.roomReducer.language
    if (typeof wordSound !== 'undefined') {
      var wordAudio = this.props.pictureReducer.originalList[wordSound][
        language
      ].audioUrl
    } else {
      var wordAudio = ''
    }
    if (this.props.roomReducer.creator) {
      //show controls
      var controls = (
        <Box>
          <Button color="black" margin="20px" onClick={this.changePicture}>
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
              translation: {this.props.pictureReducer.translation}
            </Text>
          </Box>
        </Box>
      )
    } else {
      // no controls
      var controls = <div />
    }

    return (
      <Wrap>
        <Box minwidth="640px" minheight="340px" margin="20px">
          {picture}
        </Box>
        {controls}
      </Wrap>
    )
  }
}

const mapStateToProps = state => {
  return {
    pictureReducer: state.pictureReducer,
    message: state.speakerReducer,
    review: state.pictureReducer.reviewList,
    query: state.pictureReducer.query,
    romanized: state.pictureReducer.romanized,
    wordList: state.pictureReducer.wordList,
    roomReducer: state.roomReducer,
    socketReducer: state.socketReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        loadQuery,
        // loadOriginalWordList,
        // loadWordList,
        sendRomanized,
        sendRoomMeta,
        sendTranslated,
        setFinalTranscript,
        setInterimScript,
        updatePicture,
        updateWordList,
        updateReviewList
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictures)
