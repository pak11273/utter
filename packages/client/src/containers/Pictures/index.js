import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import styled from "styled-components"
import secrets from "../../config/secrets.js"
import superagent from "superagent"
import Rand from "../../utils/randomGenerator.js"
/* import PicturesMgr from "../../utils/PicturesMgr.js" */
import {Ad, Box, Button, Img, Text} from "../../components"
import PlayImg from "../../assets/images/play.svg"
import isEmpty from "lodash/isEmpty"
/* import speechStart from "../../services/speech" */

import {
  loadAudioUrl,
  loadQuery,
  loadQuestion,
  // loadOriginalWordList,
  // loadWordList,
  updatePicture,
  updateWordList,
  updateReviewList,
  sendRomanized,
  sendTranslated
} from "./actions.js"

import {sendRoomMeta} from "../../services/socketio/actions.js"

// import {loadQuestion} from '../../containers/Challenge/actions.js'

// audio
const {cdn} = secrets

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

  @media (min-width: 768px) {
  }

  @media (min-width: 960px) {
    flex-direction: ${props => props.flexdirection960};
    max-width: 960px;
  }
`
Wrap.defaultProps = {
  alignitems: "center",
  background: "transparent",
  color: "black",
  display: "flex",
  flexdirection: "column",
  justifycontent: "center",
  position: "relative",
  width: "100%"
}

class Pictures extends Component {
  constructor(props) {
    super(props)

    this.roomLevel = this.props.roomReducer.roomLevel
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

  onPlay = e => {
    e.preventDefault()
    document.getElementById(e.target.name).play()
  }

  changePicture = () => {
    // load challenge
    const lang = this.props.roomReducer.language
    const {roomLevel} = this.props.roomReducer
    var questions = import(`../../data/${lang}/level${roomLevel}/questions`)
    /* var questions = new Rand(questions) */
    const question = questions.word
    this.props.actions.loadQuestion(question)

    const list = this.props.pictureReducer.wordList
    const review = this.props.pictureReducer.reviewList
    const randList = new Rand(list)
    const randObj = randList.word
    this.props.actions.loadAudioUrl(randObj.audioUrl)
    /* const {updatedList} = this.props.pictureReducer */

    // get room language
    /* const { language } = this.props.roomReducer */
    const translated = randObj.word
    this.props.actions.sendTranslated(translated)

    const query = randObj.word
    const romanizedQuery = randObj.roman
    this.props.actions.sendRomanized(romanizedQuery)

    this.props.actions.loadQuery(query)

    if (this.props.roomReducer.listType === "words") {
      superagent
        .get("http://pixabay.com/api")
        .query({
          key: secrets.pixabay,
          q: query,
          safesearch: true,
          image_type: "photo"
        })
        .set("Accept", "application/json")
        .end((err, res) => {
          if (err) {
            console.log("error : " + err)
            return
          }

          const max = res.body.hits.length - 1
          const min = 0

          const getRandIntInclusive = (min, max) => {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min // The maximum is inclusive and the minimum is inclusive
          }

          const num = getRandIntInclusive(min, max)

          const results = res.body.hits[num].previewURL
          this.props.actions.loadQuery(query)

          // update local picture
          this.props.actions.updatePicture(results)

          // Send socket room info
          this.props.actions.sendRoomMeta({
            question,
            room: this.props.socketReducer.created_room,
            listType: this.props.roomReducer.listType,
            translation: translated,
            query: this.props.pictureReducer.query,
            src: results
          })

          // Remove query from wordList and review
          // let updatedList = _.omit(list, query)
          const updatedList = list.filter(o => o.word !== query)
          this.props.actions.updateWordList(updatedList)

          // TODO: review feature
          // if (review) {
          //   let updatedReviewList = _.omit(review, query)
          //   this.props.actions.updateReviewList(updatedReviewList)
          // }
        })
    } else {
      // Remove query from wordList and review
      const updatedList = list.filter(o => o.word !== query)
      this.props.actions.updateWordList(updatedList)

      if (list.length === 1 && (isEmpty(review) || !review)) {
        alert(
          "YOU JUST FINISHED ALL OF YOUR WORDS.  ALL WORD LISTS WILL NOW BE RESET."
        )
        this.props.actions.updateWordList(
          this.props.pictureReducer.originalList
        )
      } else if (list.length === 1) {
        alert(
          "YOU HAVE JUST FINISHED YOUR WORD LIST.  YOU WILL NOW REVIEW WORDS YOU DON'T KNOW."
        )
        // TODO: review cont.
        // this.props.actions.updateWordList(this.props.pictureReducer.reviewList)
      }

      // TODO: review cont.
      // if (review) {
      //   console.log('review: ', review)
      //   let updatedReviewList = review.filter(o => o.word !== query)
      //   this.props.actions.updateReviewList(updatedReviewList)
      // }

      this.props.actions.sendRoomMeta({
        question,
        room: this.props.socketReducer.created_room,
        listType: this.props.roomReducer.listType,
        translation: translated
        // query: this.props.pictureReducer.query
      })
    }

    // speechStart()
  }

  render() {
    var picture = <Ad />
    if (this.props.roomReducer.listType === "words") {
      picture = <Img src={this.props.pictureReducer.pictureSrc} />
    } else if (this.props.roomReducer.listType === "letters") {
      picture = (
        <Text fontsize="7rem">{this.props.pictureReducer.translation}</Text>
      )
    }

    const wordSound = this.props.query
    /* const {language} = this.props.roomReducer */
    if (typeof wordSound !== "undefined") {
      const {audioUrl} = this.props.pictureReducer
      var wordAudio = audioUrl
    } else {
      wordAudio = ""
    }
    if (this.props.roomReducer.creator) {
      // show controls
      var controls = (
        <Box>
          <Button color="black" margin="20px" onClick={this.changePicture}>
            Change Picture
          </Button>
          <audio id={this.props.query} src={`${cdn + wordAudio}`}>
            <track kind="captions" />
          </audio>
          <Img
            display="inline"
            name={this.props.query}
            onClick={this.onPlay}
            cursor="pointer"
            src={`${PlayImg}`}
            verticalalign="middle"
            width="30px"
            height="40px"
          />
          <Box
            margin="20px"
            width="400px"
            flexdirection="row"
            justifycontent="space-around">
            <Text fontsize="1.2rem" color="#aaa">
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
      controls = <div />
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
    query: state.pictureReducer.query,
    romanized: state.pictureReducer.romanized,
    roomReducer: state.roomReducer,
    socketReducer: state.socketReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        loadAudioUrl,
        loadQuery,
        loadQuestion,
        // loadOriginalWordList,
        // loadWordList,
        sendRomanized,
        sendRoomMeta,
        sendTranslated,
        updatePicture,
        updateWordList,
        updateReviewList
      },
      dispatch
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pictures)
