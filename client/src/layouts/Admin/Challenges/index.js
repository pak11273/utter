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
  grid-auto-rows: ${props => props.gridautorows};
  grid-template-columns: ${props => props.gridtemplatecolumns};
  grid-template-rows: ${props => props.gridtemplaterows};
  max-height: ${props => props.maxheight};
  max-width: ${props => props.maxwidth};
  overflow-x: ${props => props.overflowx};
  overflow-y: ${props => props.overflowy};
  width: ${props => props.width};
`

const Delete = styled(Button)`
  &:hover {
    background: red;
  }
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
  height: ${props => props.height};
  padding: ${props => props.padding};
`
DictBox.defaultProps = {
  padding: '0 5px 0 0 '
}

class Challenges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: {
        language: 'english',
        level: '1'
      },
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
      },
      updatedWord: {}
    }

    this.fetchWords = this.fetchWords.bind(this)
    this.createWord = this.createWord.bind(this)
    this.onAudioLangChg = this.onAudioLangChg.bind(this)
    this.onAudioCategoryChg = this.onAudioCategoryChg.bind(this)
    this.selectSearchChange = this.selectSearchChange.bind(this)
    this.selectnewWordChange = this.selectnewWordChange.bind(this)
    this.selectUpdatedWordChange = this.selectUpdatedWordChange.bind(this)
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

  selectSearchChange(e) {
    this.setState({
      search: {
        ...this.state.search,
        [e.target.name]: e.target.value
      }
    })
  }

  selectnewWordChange(e) {
    this.setState({
      newWord: {
        ...this.state.newWord,
        [e.target.name]: e.target.value
      }
    })
  }

  selectUpdatedWordChange(e) {
    this.setState({
      updatedWord: {
        ...this.state.updatedWord,
        [e.target.name]: e.target.value
      }
    })
  }

  fetchWords() {
    const level = this.state.search.level
    const lang = this.state.search.language
    this.props.actions.fetchWords(level, lang)
  }

  createWord(e) {
    e.preventDefault()
    let newWord = this.state.newWord
    // confirm('Confirm Creation')
    this.props.actions.createWord(newWord)
    // TODO: clear the props after creating a word
  }

  updateWord(gotWord, e) {
    const {
      id,
      _id,
      language,
      level,
      category,
      word,
      roman,
      name,
      partsOfSpeech,
      audioUrl
    } = gotWord
    this.setState(
      {
        updatedWord: {
          id,
          _id,
          language,
          level,
          category,
          word,
          roman,
          name,
          partsOfSpeech,
          audioUrl,
          ...this.state.updatedWord
        }
      },
      () => {
        this.props.actions.updateWord(this.state.updatedWord)
      }
    )
    e.preventDefault()
    // confirm('Confirm Creation')
  }

  deleteWord(word, e) {
    e.preventDefault()
    // confirm('Confirm Creation')
    this.props.actions.deleteWord(word)
  }

  render() {
    let dict = this.props.vocabReducer[Object.keys(this.props.vocabReducer)[0]]
    // let dict = this.props.vocabReducer
    if (dict) {
      var words = dict.words
    }
    let counter = 0
    return (
      <Container gridtemplatecolumns="1fr">
        <Section>
          <Title>Challenges (under construction)</Title>
          <Line color="black" width="100%" />
          <Title>Builder</Title>
          <Line color="black" width="100%" />
          <DictGrid
            gridtemplatecolumns="200px 70px 200px 200px 200px 200px 200px 400px 200px "
            maxwidth="1240px"
            overflowx="scroll">
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
              <Text fontsize="1.4rem">edit</Text>
            </Column>
            <DictBox>
              <Select
                name="language"
                onChange={this.selectnewWordChange}
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
                onChange={this.selectnewWordChange}
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
                onChange={this.selectnewWordChange}
                onClick={this.onAudioCategoryChg}
                width="100%"
                height="40px">
                <option value="alphabet">alphabet</option>
                <option value="dipthongs">alphabet</option>
                <option value="word">word</option>
                <option value="body parts">body parts</option>
              </Select>
            </DictBox>
            <DictBox>
              <DictInput name="word" onChange={this.selectnewWordChange} />
            </DictBox>
            <DictBox>
              <DictInput name="roman" onChange={this.selectnewWordChange} />
            </DictBox>
            <DictBox>
              <DictInput name="name" onChange={this.selectnewWordChange} />
            </DictBox>
            <DictBox>
              <Select
                name="partsOfSpeech"
                onChange={this.selectnewWordChange}
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
                onChange={this.selectnewWordChange}
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
          <DictGrid
            gridtemplatecolumns="200px 70px 200px 200px"
            maxwidth="1240px"
            overflowx="scroll">
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">language</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">level</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">word</Text>
            </Column>
            <Column alignitems="center">
              <Text fontsize="1.4rem">edit</Text>
            </Column>
            <DictBox>
              <Select
                name="language"
                onChange={this.selectSearchChange}
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
                onChange={this.selectSearchChange}
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
              <DictInput name="word" onChange={this.selectSearchChange} />
            </DictBox>
            <DictBox display="flex" flexdirection="row">
              <Button width="65px" height="24px" onClick={this.fetchWords}>
                Search
              </Button>
            </DictBox>
          </DictGrid>
        </Section>
        <Section width="100%">
          <Title>Results <span>(Total: ?)</span></Title>
          <Line color="black" width="100%" />
          <Box
            display="block"
            height="600px"
            maxwidth="1240px"
            overflow="scroll">
            <DictGrid
              gridtemplatecolumns="100px 400px 400px 200px 70px 200px 200px 200px 200px 200px 500px 200px 200px 400px 200px"
              width="4000px">
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
                    <DictGrid
                      gridtemplatecolumns="100px 400px 400px 200px 70px 200px 200px 200px 200px 200px 500px 200px 200px 400px 200px"
                      width="4000px">
                      <DictBox>
                        <span>{counter}</span>
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="id"
                          onChange={this.selectUpdatedWordChange}
                          placeholder={item.id}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="_id"
                          onChange={this.selectUpdatedWordChange}
                          placeholder={item._id}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="language"
                          onChange={this.selectUpdatedWordChange}
                          placeholder={item.language}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="level"
                          onChange={this.selectUpdatedWordChange}
                          placeholder={item.level}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="category"
                          onChange={this.selectUpdatedWordChange}
                          placeholder={item.category}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="word"
                          onChange={this.selectUpdatedWordChange}
                          placeholder={item.word}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="roman"
                          onChange={this.selectUpdatedWordChange}
                          placeholder={item.roman}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="name"
                          onChange={this.selectUpdatedWordChange}
                          placeholder={item.name}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="partsOfSpeech"
                          onChange={this.selectUpdatedWordChange}
                          placeholder={item.partsOfSpeech}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="audioUrl"
                          onChange={this.selectUpdatedWordChange}
                          placeholder={item.audioUrl}
                        />
                      </DictBox>
                      <DictBox>
                        <div>
                          <Button
                            hovercolor="white"
                            hoverbackground="blue"
                            onClick={e => this.updateWord(item, e)}>
                            update
                          </Button>
                          |{' '}
                          <Button
                            hovercolor="white"
                            hoverbackground="blue"
                            onClick={e => this.deleteWord(item, e)}>
                            delete
                          </Button>
                        </div>
                      </DictBox>
                    </DictGrid>
                  )
                })
              : null}
          </Box>
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
  let updateWord = actionCreators.update
  return {
    actions: bindActionCreators(
      {
        fetchWords,
        createWord,
        deleteWord,
        updateWord
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenges)
