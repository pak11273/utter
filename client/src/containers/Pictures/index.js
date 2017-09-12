import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import secrets from '../../config/secrets.js'
import axios from 'axios'
import superagent from 'superagent'
import Rando from '../../utils/randomGenerator.js'
import level1 from '../../data/level1/level-1-words.js'
import Box from '../../components/Boxes/Box.js'
import PicturesMgr from '../../utils/PicturesMgr.js'
import {Img} from '../../components'
import {loadPicture, loadQuery} from './actions.js'

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

    this.getPhoto = this.getPhoto.bind(this)
  }

  getPhoto() {
    // combine objects to form one object to pass to random generator
    let animals = Object.keys(level1.category.nouns.animals)
    let bodyParts = Object.keys(level1.category.nouns.bodyParts)
    let buildings = Object.keys(level1.category.nouns.buildings)
    let clothes = Object.keys(level1.category.nouns.clothes)
    let family = Object.keys(level1.category.nouns.family)
    let furniture = Object.keys(level1.category.nouns.furniture)
    let meats = Object.keys(level1.category.nouns.foods.meats)
    let list = animals.concat(
      bodyParts,
      buildings,
      clothes,
      family,
      furniture,
      meats
    )

    // TODO:if word is used 5 times then remove it from blah
    //const refinedList

    let randomList = new Rando(list)
    let query = randomList.word

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
          console.log('error yo: ' + err)
          return
        }

        const max = res.body.hits.length - 1
        const min = 0

        const getRandomIntInclusive = (min, max) => {
          min = Math.ceil(min)
          max = Math.floor(max)
          return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
        }

        let num = getRandomIntInclusive(min, max)

        const results = res.body.hits[num].previewURL

        this.props.picture.loadPicture(results)
        this.props.picture.loadQuery(query)
      })
  }

  render() {
    return (
      <Wrap>
        {this.props.children}
        <Img src={this.props.pictureSRC} />
        <Box>
          {this.props.query}<button onClick={this.getPhoto}>Change</button>
        </Box>
      </Wrap>
    )
  }
}

const mapStateToProps = state => {
  return {
    pictureSRC: state.pictureReducer.pictureSRC,
    query: state.pictureReducer.query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    picture: bindActionCreators({loadPicture, loadQuery}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictures)
