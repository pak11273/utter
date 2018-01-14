import React, {Component} from 'react'
import {Container} from '../../../containers'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {
  Box,
  Button,
  Column,
  Grid,
  Input,
  Label,
  Line,
  Section,
  Select,
  Text,
  Title
} from '../../../components'

import actionCreators from './actions.js'

const DictGrid = styled(Grid)`
  grid-template-columns: ${props => props.gridtemplatecolumns};
`

DictGrid.defaultProps = {
  gridtemplatecolumns: '.05fr .05fr .05fr .05fr'
}

const DictInput = styled(Input)`
  width: 100%;
`

const DictBox = styled(Box)`
  display:flex;
  flex-direction:row;
  padding: ${props => props.padding};
`
DictBox.defaultProps = {
  padding: '0 5px 0 0 '
}

class Vocab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      change: '',
      deleteWord: false,
      counter: 0,
      newWord: {
        language: 'english',
        level: '1',
        category: 'alphabet',
        word: '',
        roman: '',
        name: '',
        partsOfSpeech: '',
        audioUrl: ''
      }
    }

    this.fetchWords = this.fetchWords.bind(this)
    this.createWord = this.createWord.bind(this)
    this.onAudioLangChg = this.onAudioLangChg.bind(this)
    this.onAudioCategoryChg = this.onAudioCategoryChg.bind(this)
    this.selectChange = this.selectChange.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      newWord: {
        ...this.state.newWord,
        audioUrl: `/audio/${this.state.newWord.language}/${this.state.newWord
          .category}/`
      }
    })
  }

  onChange(e) {
    this.setState({
      change: e.target.value
    })
  }

  onAudioLangChg(e) {
    this.setState({
      newWord: {
        ...this.state.newWord,
        audioUrl: `/audio/${e.target.value}/${this.state.newWord.category}/`
      }
    })
  }

  onAudioCategoryChg(e) {
    this.setState({
      newWord: {
        ...this.state.newWord,
        audioUrl: `/audio/${this.state.newWord.language}/${e.target.value}/`
      }
    })
  }

  selectChange(e) {
    this.setState({
      newWord: {
        ...this.state.newWord,
        [e.target.name]: e.target.value
      }
    })
  }

  fetchWords(e) {
    e.preventDefault()
    this.props.actions.fetchWords()
  }

  createWord(e) {
    e.preventDefault()
    let newWord = this.state.newWord
    // confirm('Confirm Creation')
    this.props.actions.createWord(newWord)
    // TODO: clear the props after creating a word
  }

  deleteWord(word, e) {
    e.preventDefault()
    let deleteWord = 'TODO: where to find this?'
    // confirm('Confirm Creation')
    this.props.actions.deleteWord(word)
  }

  thing(e) {
    e.preventDefault()
    console.log('state: ', this.state.newWord)
    console.log('actionCreators: ', this.props.actions.createWord)
    //TODO remove this after development
  }

  render() {
    let dict = this.props.vocabReducer[Object.keys(this.props.vocabReducer)[0]]
    if (dict) {
      var words = dict.words
    }
    let counter = 0
    return (
      <Container gridtemplatecolumns="1fr" overflowx="scroll">
        <button onClick={this.thing.bind(this)}>console.log state</button>
        <Section>
          <Title>Vocabulary</Title>
          <Line color="black" width="100%" />
          <Title>Builder</Title>
          <Line color="black" width="100%" />
          <DictGrid gridtemplatecolumns="200px 70px 200px 200px 200px 200px 200px 400px 200px ">
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">language</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">level</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">category</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">word</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">roman</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">name</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">Parts of Speech</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">audio url</Text>
            </Column>
            <Column alignitems="center">
              <Text fontsize="1.4rem">Edit</Text>
            </Column>
            <DictBox>
              <Select
                name="language"
                onChange={this.selectChange}
                onClick={this.onAudioLangChg}
                width="100%"
                height="40px">
                <option name="language" value="english">english</option>
                <option name="language" value="korean">korean</option>
                <option name="language" value="spanish">spanish</option>
                <option name="language" value="french">french</option>
              </Select>
            </DictBox>
            <DictBox>
              <Select
                name="level"
                onChange={this.selectChange}
                width="100%"
                height="40px">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </Select>
            </DictBox>
            <DictBox>
              <Select
                name="category"
                onChange={this.selectChange}
                onClick={this.onAudioCategoryChg}
                width="100%"
                height="40px">
                <option value="alphabet">alphabet</option>
                <option value="word">word</option>
                <option value="body parts">body parts</option>
              </Select>
            </DictBox>
            <DictBox>
              <DictInput name="word" onChange={this.selectChange} />
            </DictBox>
            <DictBox>
              <DictInput name="roman" onChange={this.selectChange} />
            </DictBox>
            <DictBox>
              <DictInput name="name" onChange={this.selectChange} />
            </DictBox>
            <DictBox>
              <Select
                name="partsOfSpeech"
                onChange={this.selectChange}
                width="100%"
                height="40px">
                <option value="" />
                <option value="noun">noun</option>
                <option value="pronoun">pronoun</option>
                <option value="verb">verb</option>
                <option value="adverb">adverb</option>
                <option value="adjective">adjective</option>
                <option value="conjunction">conjunction</option>
                <option value="preposition">preposition</option>
                <option value="interjection">interjection</option>
                <option value="determiner">interjection</option>
              </Select>
            </DictBox>
            <DictBox>
              <DictInput
                name="audioUrl"
                value={this.state.newWord.audioUrl}
                onChange={this.selectChange}
              />
            </DictBox>
            <DictBox>
              <Button width="100px" height="24px" onClick={this.createWord}>
                Create Word
              </Button>
            </DictBox>
          </DictGrid>
          <Title>Search</Title>
          <Line color="black" width="100%" />
          <DictGrid>
            <Box display="flex" flexdirection="row">
              <Label margin="0">Language</Label>
              <Input />
            </Box>
            <Box display="flex" flexdirection="row">
              <Label margin="0">Level</Label>
              <Input />
            </Box>
            <Box display="flex" flexdirection="row">
              <Label margin="0">Word</Label>
              <Input />
            </Box>
            <Box display="flex" flexdirection="row">
              <Button width="65px" height="24px" onClick={this.fetchWords}>
                Search
              </Button>
            </Box>
          </DictGrid>
        </Section>
        <Section width="3000px">
          <Title>Results <span>(Total: ?)</span></Title>
          <Line color="black" width="100%" />
          <DictGrid gridtemplatecolumns="100px 270px 270px 200px 70px 200px 200px 200px 200px 200px 200px 200px 200px 400px 200px">
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">count</Text>
            </Column>
            <Column alignitems="center">
              <Text fontsize="1.4rem">_id</Text>
            </Column>
            <Column alignitems="center">
              <Text fontsize="1.4rem">id</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">language</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">level</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">category</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">word</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">roman</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">name</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">Parts of Speech</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">audio url</Text>
            </Column>
            <Column alignitems="center">
              <Text fontsize="1.4rem">Edit</Text>
            </Column>
          </DictGrid>
          {words
            ? words.map((item, i) => {
                counter++
                return (
                  <DictGrid gridtemplatecolumns="100px 270px 270px 200px 70px 200px 200px 200px 200px 200px 400px 200px">
                    <DictBox>
                      <span>{counter}</span>
                    </DictBox>
                    <DictBox>
                      <span>{item._id}</span>
                    </DictBox>
                    <DictBox>
                      <span>{item.id}</span>
                    </DictBox>
                    <DictBox>
                      <DictInput placeholder={item.language} />
                    </DictBox>
                    <DictBox>
                      <DictInput placeholder={item.level} />
                    </DictBox>
                    <DictBox>
                      <DictInput placeholder={item.category} />
                    </DictBox>
                    <DictBox>
                      <DictInput placeholder={item.word} />
                    </DictBox>
                    <DictBox>
                      <DictInput placeholder={item.roman} />
                    </DictBox>
                    <DictBox>
                      <DictInput placeholder={item.name} />
                    </DictBox>
                    <DictBox>
                      <DictInput placeholder={item.partsOfSpeech} />
                    </DictBox>
                    <DictBox>
                      <DictInput value={item.audioUrl} />
                    </DictBox>
                    <DictBox>
                      <div>
                        update |{' '}
                        <a
                          style={{cursor: 'pointer'}}
                          onClick={e => this.deleteWord(item, e)}>
                          delete
                        </a>
                      </div>
                    </DictBox>
                  </DictGrid>
                )
              })
            : null}
        </Section>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    vocabReducer: state.vocabReducer
  }
}

const mapDispatchToProps = dispatch => {
  let fetchWords = actionCreators.fetch
  let createWord = actionCreators.create
  let deleteWord = actionCreators.delete
  return {
    actions: bindActionCreators(
      {
        fetchWords,
        createWord,
        deleteWord
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vocab)
//TODO: convert everything to react virtualization table
