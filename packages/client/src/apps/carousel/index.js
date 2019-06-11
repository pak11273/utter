import React, {PureComponent} from "react"
import {session} from "brownies"
import {PhotoAdapter} from "../../services/photos/adapter.js"

import CardHeader from "@material-ui/core/CardHeader"
/* import Collapse from "@material-ui/core/Collapse" */
import Avatar from "@material-ui/core/Avatar"
/* import IconButton from "@material-ui/core/IconButton" */
/* import FavoriteIcon from "@material-ui/icons/Favorite" */
/* import ShareIcon from "@material-ui/icons/Share" */
/* import ExpandMoreIcon from "@material-ui/icons/ExpandMore" */
/* import MoreVertIcon from "@material-ui/icons/MoreVert" */
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
/* import CardActions from "@material-ui/core/CardActions" */
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
/* import ExpansionPanel from "@material-ui/core/ExpansionPanel" */
/* import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions" */
/* import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails" */
/* import Grid from "@material-ui/core/Grid" */
/* import IconButton from "@material-ui/core/IconButton" */
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline"
import {withStyles} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

import "react-responsive-carousel-v2/dist/carousel.scss"
import {Carousel} from "react-responsive-carousel-v2"
import {isOwner, shuffleArray} from "../../utils"
/* import {shuffleArray} from "../../utils" */
import {Flex, LoaderCircle} from "../../components"
import {voiceLanguages} from "../../data/voice-languages.js"

/* import classNames from "classnames" */
import {styles} from "./styles.js"
import "./overrides.css"

class RandomCard extends PureComponent {
  state = {
    translation: false,
    expanded: false,
    Utter: {}
  }

  /* const handleExpandClick = () => { */
  /*   console.log("web: ", webformatURL) */
  /*   console.log("typeof: ", typeof webformatURL) */
  /*   changeState({ */
  /*     ...state, */
  /*     expanded: !state.expanded */
  /*   }) */
  /* } */

  toggleTranslate = () => {
    console.log("audio: ", this.props.audioUrl)
    if (!this.props.audioUrl) {
      /* this.props.speak(this.props.word) */
      const a = new Audio(this.props.audioUrl)
      a.play()
    } else {
      /* this.props.speak(this.props.word) */
      const a = new Audio(this.props.audioUrl)
      a.play()
    }
    this.setState({
      translation: true
    })
    setTimeout(() => {
      this.setState({
        translation: false
      })
    }, 10000)
  }

  render() {
    const {
      /* audioUrl, */
      classes,
      partsOfSpeech,
      /* translation, */
      word,
      phrase,
      question,
      /* speak, */
      webformatURL
    } = this.props

    if (
      partsOfSpeech === "alphabet" ||
      partsOfSpeech === "vowel" ||
      partsOfSpeech === "consonant"
    ) {
      var media = <h1>{word}</h1>
    } else {
      media = (
        <CardMedia
          className={classes.media}
          image={webformatURL}
          title="Paella dish"
        />
      )
    }

    return (
      <Card className={classes.randomCard}>
        <CardHeader
          avatar={
            <Avatar aria-label="level" className={classes.avatar}>
              {session.level}
            </Avatar>
          }
          /*  action={
          <IconButton onClick={() => alert("You don't belong here!")}>
            <MoreVertIcon />
          </IconButton>
        }
				*/
          title={word || phrase || question}
          subheader={partsOfSpeech}
        />
        {media}
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifycontent: "center"
            }}>
            <Button onClick={this.toggleTranslate}>
              {this.state.translation ? (
                this.props.translation
              ) : (
                <PlayCircleOutlineIcon />
              )}
            </Button>
          </div>
        </CardContent>
        {/*
      <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
							          <FavoriteIcon />
												        </IconButton>
																		 <IconButton aria-label="Share">
																		           <ShareIcon />
																							         </IconButton> 
        <IconButton
          className={classNames(classes.expand, {
            [classes.expandOpen]: state.expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={state.expanded}
          aria-label="Show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Word Study:</Typography>
          <Typography paragraph>
            Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Ut
            varius tincidunt libero. Phasellus blandit leo ut odio. Nullam quis
            ante. Vivamus elementum semper nisi.
          </Typography>
          <Typography paragraph>
            Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Ut
            varius tincidunt libero. Phasellus blandit leo ut odio. Nullam quis
            ante. Vivamus elementum semper nisi.
          </Typography>
        </CardContent>
      </Collapse> */}
      </Card>
    )
  }
}

class HostControls extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      count: 0,
      loading: true,
      isOwner: isOwner(session.user, session.zone),
      randomVocabulary: session.carousel
    }
  }

  componentDidMount() {
    // get app info and load app here
    if (this.state.isOwner) {
      // TODO: fetch from server

      /* this.client.query({ */
      /*   query: GET_CAROUSEL_PICS */
      /* }) */

      const PAdapter = new PhotoAdapter({
        vocabulary: session.vocabulary,
        modifier: session.modifier
      })

      PAdapter.functions("fetchPixabay").then(res => {
        session.carousel = res
        // TODO: send list to all members in room
        // if new member enters, they must get list too
        console.log("res: ", res)

        this.setState({
          randomVocabulary: res,
          loading: false, // set to false when all members are ready
          isOwner: true
        })
      })
    }
  }

  resetOwner = () => {
    setTimeout(
      () =>
        this.setState({
          isOwner: true,
          loading: false
        }),
      3000
    )
  }

  shufflePics = async count => {
    if (count === 0) {
      // mix cards
      this.setState(
        {
          isOwner: false,
          loading: true
        },
        () => {
          // shuffle cards
          const newCarousel = session.carousel
          shuffleArray(newCarousel)
          const shuffledCarousel = newCarousel.map(item => {
            return shuffleArray(item)
          })
          this.setState({
            randomVocabulary: shuffledCarousel
          })
          this.resetOwner()
        }
      )
    }
  }

  render() {
    return (
      <Carousel
        width="600px"
        infiniteLoop={true}
        onChange={count => this.shufflePics(count)}
        showThumbs={false}
        showIndicators={false}
        showArrows={this.state.isOwner && !this.state.loading}
        showStatus
        speak={this.props.speak}
        swipeable={this.state.isOwner}>
        {this.state.loading && (
          <Card className={this.props.classes.loadingCard}>
            <CardContent>
              <Flex flexdirection="column" justifycontent="center">
                <Typography gutterBottom variant="h6">
                  Loading Pictures
                </Typography>
                <LoaderCircle />
              </Flex>
            </CardContent>
          </Card>
        )}
        {!this.state.loading &&
          this.state.randomVocabulary.map((item, i) => {
            const arr = shuffleArray(item)
            return (
              <div key={i}>
                <RandomCard {...arr[0]} {...this.props} />
              </div>
            )
          })}
      </Carousel>
    )
  }
}

class CarouselContainer extends PureComponent {
  state = {
    voices: []
  }

  componentDidMount = () => {
    console.log("carousel props: ", this.props)
    // TODO: match usingLang to voiceLanguages, get the index and return the voiceCode
    window.speechSynthesis.onvoiceschanged = async () => {
      const voices = await window.speechSynthesis.getVoices()
      this.setState(
        {
          voices
        },
        console.log("state: ", this.state)
      )
    }
  }

  speak = word => {
    console.log("hello")
    const teachingLang = session.zone.teachingLang.toLowerCase()
    // wait on voices to be loaded before fetching list
    const result = voiceLanguages.filter(item => {
      return item.label === teachingLang
    })
    console.log("result: ", result[0].voiceCode)
    const voice = this.state.voices.filter(item => {
      item.lang === result[0].voiceCode
    })

    console.log("voice: ", voice)

    /* var msg = new SpeechSynthesisUtterance("foo foo") */
    var msg = new SpeechSynthesisUtterance(word)
    /* msg.rate = 1 */
    /* msg.pitch = 1 */
    /* msg.voice = voice */

    /* msg.voice = voices[8] */
    /* msg.voiceURI = "native" */
    msg.lang = result[0].voiceCode

    window.speechSynthesis.speak(msg)
  }

  render() {
    const {classes} = this.props
    return (
      <Flex className={classes.root}>
        <Flex>
          <Typography className={classes.appTitle} gutterBottom component="p">
            Carousel
          </Typography>
        </Flex>
        <Flex>
          <HostControls speak={this.speak} {...this.props} {...this.state} />
        </Flex>
      </Flex>
    )
  }
}

export default withStyles(styles)(CarouselContainer)
