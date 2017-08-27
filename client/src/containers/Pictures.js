import React, {Component} from 'react'
import styled from 'styled-components'
import secrets from '../config/secrets.js'
import axios from 'axios'
import superagent from 'superagent'
import Img from '../components/Medias/Img'
import Rando from '../utils/randomGenerator.js'
import level1 from '../data/level1/level-1-words.js'
import Box from '../components/Boxes/Box.js'
import PicturesMgr from '../utils/PicturesMgr.js'
import {Button} from '../components'

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

const Attribution = styled.div`
 font-size: .5rem;
 a {
   font-size: .5rem;
 }
`
class Pictures extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pictures: {},
      word: ''
    }

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
    let blah = animals.concat(
      bodyParts,
      buildings,
      clothes,
      family,
      furniture,
      meats
    )
    let blah2 = new Rando(blah)
    let query = blah2.word

    // axios({
    //   method: 'get',
    //   url: 'https://pixabay.com/api',
    //   params: {
    //     key: secrets.pixabay,
    //     q: blah3,
    //     safesearch: true,
    //     image_type: 'photo'
    //   },
    //   responseType: 'json'
    // })
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log('error: ' + err)
    //   })

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
        this.setState({
          pictures: results,
          word: query
        })
      })

    // PicturesMgr.get('https://pixabay.com/api', {
    //   key: secrets.pixabay,
    //   q: blah3,
    //   safesearch: true,
    //   image_type: 'photo'
    // })
    // (err, res) => {
    //   if (err) {
    //     console.log('error yo: ' + err)
    //     return
    //   }

    //   const max = res.body.hits.length - 1
    //   const min = 0

    //   const getRandomIntInclusive = (min, max) => {
    //     min = Math.ceil(min)
    //     max = Math.floor(max)
    //     return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
    //   }

    // let num = getRandomIntInclusive(min, max)

    // const results = res.body.hits[num].previewURL
    // console.log('#')
    // console.log(blah.length)
    // console.log(blah3)
    // this.setState({
    //   pictures: results,
    //   word: blah3
    // })
    // }
    // )
  }

  render() {
    return (
      <Wrap>
        {this.props.children}
        <Img src={this.state.pictures} />
        <Attribution>
          Photo courtesy of <a href="">Pixabay.com</a>
        </Attribution>
        <Box>
          {this.state.word}
          <Button
            color="black"
            fontsize="1.5rem"
            margin="20px"
            onClick={this.getPhoto}>
            Change Picture
          </Button>
        </Box>
      </Wrap>
    )
  }
}

export default Pictures
