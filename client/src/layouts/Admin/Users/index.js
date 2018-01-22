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

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: {
        language: 'english',
        level: '1'
      },
      change: '',
      deleteUser: false,
      counter: 0,
      newUser: {
        language: 'english',
        level: '1',
        category: 'alphabet',
        username: '',
        password: '',
        roman: '',
        confirmPassword: '',
        partsOfSpeech: ''
      },
      updatedWord: {}
    }

    this.fetchWords = this.fetchWords.bind(this)
    this.createUser = this.createUser.bind(this)
    this.onAudioLangChg = this.onAudioLangChg.bind(this)
    this.onAudioCategoryChg = this.onAudioCategoryChg.bind(this)
    this.selectSearchChange = this.selectSearchChange.bind(this)
    this.selectnewWordChange = this.selectnewWordChange.bind(this)
    this.selectUpdatedWordChange = this.selectUpdatedWordChange.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      newUser: {
        ...this.state.newUser,
        audioUrl: `/audio/${this.state.newUser.language}/${this.state.newUser
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
      newUser: {
        ...this.state.newUser,
        audioUrl: `/audio/${e.target.value}/${this.state.newUser.category}/`
      }
    })
  }

  onAudioCategoryChg(e) {
    this.setState({
      newUser: {
        ...this.state.newUser,
        audioUrl: `/audio/${this.state.newUser.language}/${e.target.value}/`
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
      newUser: {
        ...this.state.newUser,
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

  createUser(e) {
    e.preventDefault()
    let newUser = this.state.newUser
    // confirm('Confirm Creation')
    this.props.actions.createUser(newUser)
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

  deleteUser(word, e) {
    e.preventDefault()
    // confirm('Confirm Creation')
    this.props.actions.deleteUser(word)
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
          <Title>Users (under construction)</Title>
          <Line color="black" width="100%" />
          <Title>Builder (under construction)</Title>
          <Line color="black" width="100%" />
          <DictGrid
            gridtemplatecolumns="200px 70px 200px 200px 200px 200px 200px 200px "
            maxwidth="1240px"
            overflowx="scroll">
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">role</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">level</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">pending</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">name</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">email</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">password</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">confirm password</Text>
            </Column>
            <Column alignitems="center">
              <Text fontsize="1.4rem">edit</Text>
            </Column>
            <DictBox>
              <Select
                name="role"
                onChange={this.selectnewWordChange}
                width="100%"
                height="40px">
                <option name="role" value="superAdmin">superAdmin</option>
                <option name="role" value="admin">admin</option>
                <option name="role" value="user">user</option>
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
                name="pending"
                onChange={this.selectnewWordChange}
                width="100%"
                height="40px">
                <option value="alphabet">alphabet</option>
                <option value="dipthongs">alphabet</option>
                <option value="word">word</option>
                <option value="body parts">body parts</option>
              </Select>
            </DictBox>
            <DictBox>
              <DictInput name="name" onChange={this.selectnewWordChange} />
            </DictBox>
            <DictBox>
              <DictInput name="email" onChange={this.selectnewWordChange} />
            </DictBox>
            <DictBox>
              <DictInput name="password" onChange={this.selectnewWordChange} />
            </DictBox>
            <DictBox>
              <DictInput
                name="confirm password"
                onChange={this.selectnewWordChange}
              />
            </DictBox>
            <DictBox>
              <Button width="100px" height="24px" onClick={this.createUser}>
                Create User{' '}
              </Button>
            </DictBox>
          </DictGrid>
          <Title>Search (under construction)</Title>
          <Line color="black" width="100%" />
          <DictGrid
            gridtemplatecolumns="200px 70px 200px 200px"
            maxwidth="1240px"
            overflowx="scroll">
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">user</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">level</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">username</Text>
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
          <Title>Results (under construction)<span>(Total: ?)</span></Title>
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
                            onClick={e => this.deleteUser(item, e)}>
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
  let createUser = actionCreators.create
  let deleteUser = actionCreators.delete
  let updateWord = actionCreators.update
  return {
    actions: bindActionCreators(
      {
        fetchWords,
        createUser,
        deleteUser,
        updateWord
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
