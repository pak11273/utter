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

class Phrase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: {
        level: '1'
      },
      change: '',
      deletePhrase: false,
      counter: 0,
      newPhrase: {
        level: '1',
        category: 'phrase',
        englishInformalTranslation: {
          phrases: [],
          audioUrl: '/audio/english/'
        },
        englishFormalTranslation: {
          phrases: [],
          audioUrl: '/audio/english/'
        },
        spanishInformalTranslation: {
          phrases: [],
          audioUrl: '/audio/spanish/'
        },
        spanishFormalTranslation: {
          phrases: [],
          audioUrl: '/audio/spanish/'
        },
        frenchInformalTranslation: {
          phrases: [],
          audioUrl: '/audio/french/'
        },
        frenchFormalTranslation: {
          phrases: [],
          audioUrl: '/audio/french/'
        }
      },
      updatedPhrase: {
        level: '1',
        category: 'phrase',
        englishInformalTranslation: {
          phrases: [],
          audioUrl: '/audio/english/'
        },
        englishFormalTranslation: {
          phrases: [],
          audioUrl: '/audio/english/'
        },
        spanishInformalTranslation: {
          phrases: [],
          audioUrl: '/audio/spanish/'
        },
        spanishFormalTranslation: {
          phrases: [],
          audioUrl: '/audio/spanish/'
        },
        frenchInformalTranslation: {
          phrases: [],
          audioUrl: '/audio/french/'
        },
        frenchFormalTranslation: {
          phrases: [],
          audioUrl: '/audio/french/'
        }
      }
    }
  }

  componentDidMount() {}

  onAudioCategoryChg = e => {
    this.setState({
      newPhrase: {
        ...this.state.newPhrase,
        audioUrl: `/audio/${this.state.newPhrase.language}/${e.target.value}/`
      }
    })
  };

  onAudioLangChg = e => {
    this.setState({
      newPhrase: {
        ...this.state.newPhrase,
        audioUel: `/audio/${e.target.value}/${this.state.newPhrase.category}/`
      }
    })
  };

  onChange = e => {
    this.setState({
      change: e.target.value
    })
  };

  createPhrase = e => {
    e.preventDefault()
    let newPhrase = this.state.newPhrase
    // confirm('Confirm Creation')
    this.props.actions.createPhrase(newPhrase)
    // TODO: clear the props after creating a word
  };

  deletePhrase(word, e) {
    e.preventDefault()
    // confirm('Confirm Creation')
    this.props.actions.deletePhrase(word)
  }

  fetchPhrases = () => {
    const level = this.state.search.level
    this.props.actions.fetchPhrases(level)
    //TODO: populate updatePhrase from redux
  };

  selectSearchChange = e => {
    this.setState({
      search: {
        ...this.state.search,
        [e.target.name]: e.target.value
      }
    })
  };

  selectUpdatedPhraseChange = e => {
    this.setState({
      updatedPhrase: {
        ...this.state.updatedPhrase,
        [e.target.name]: e.target.value
      }
    })
  };

  selectnewAudioChange = e => {
    this.setState({
      newPhrase: {
        ...this.state.newPhrase,
        [e.target.name]: {
          audioUrl: e.target.value
        }
      }
    })
  };

  selectnewPhraseChange = e => {
    this.setState({
      newPhrase: {
        ...this.state.newPhrase,
        [e.target.name]: e.target.value
      }
    })
  };

  selectnewTranslationChange = e => {
    let lang = e.target.name
    lang = lang.replace(/InformalTranslation|FormalTranslation/g, '')
    let filename = e.target.value.replace(/\s/g, '').replace(/\,/g, '_')
    let arr = e.target.value.replace(/\s/g, '').split()
    this.setState({
      newPhrase: {
        ...this.state.newPhrase,
        [e.target.name]: {
          phrases: arr,
          audioUrl: '/audio/' + lang + '/' + filename + '.mp3'
        }
      }
    })
  };

  thing = () => {
    console.log('state: ', this.state)
  };

  updatePhrase(gotPhrase, e) {
    console.log('got: ', gotPhrase)
    const {
      id,
      _id,
      level,
      category,
      englishInformalTranslation,
      englishFormalTranslation,
      spanishInformalTranslation,
      spanishFormalTranslation,
      frenchInformalTranslation,
      frenchFormalTranslation
    } = gotPhrase
    this.setState(
      {
        updatedPhrase: {
          id,
          _id,
          level,
          category,
          englishInformalTranslation,
          englishFormalTranslation,
          spanishInformalTranslation,
          spanishFormalTranslation,
          frenchInformalTranslation,
          frenchFormalTranslation,
          ...this.state.updatedPhrase
        }
      },
      () => {
        console.log('updated state: ', this.state.updatedPhrase)
        this.props.actions.updatePhrase(this.state.updatedPhrase)
      }
    )
    e.preventDefault()
    // confirm('Confirm Creation')
  }

  updatePhraseChange = e => {
    let lang = e.target.name
    lang = lang.replace(/InformalTranslation|FormalTranslation/g, '')
    let filename = e.target.value.replace(/\s/g, '').replace(/\,/g, '_')
    let arr = e.target.value.replace(/\s/g, '').split()
    this.setState({
      updatedPhrase: {
        ...this.state.updatedPhrase,
        [e.target.name]: {
          phrases: arr,
          audioUrl: '/audio/' + lang + '/' + filename + '.mp3'
        }
      }
    })
  };

  render() {
    let dict = this.props.phraseReducer[
      Object.keys(this.props.phraseReducer)[0]
    ]
    if (dict) {
      var phrases = dict.phrases
    }
    let counter = 0
    return (
      <Container gridtemplatecolumns="1fr">
        <Section>
          <button onClick={this.thing}>state</button>
          <Title>Phrases</Title>
          <Line color="black" width="100%" />
          <Title>Builder</Title>
          <p>
            For Inputs that require arrays(eg. englishInformalTranslation,
            spanishInformalTranslation) use a string of words(eg. hello, hi,
            hey)
          </p>
          <Line color="black" width="100%" />
          <DictGrid
            gridtemplatecolumns="70px 200px repeat(12, 400px) 200px"
            maxwidth="1240px"
            overflowx="scroll">
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">level</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">category</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">englishInformalTranslation</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">englishInFormal audio url</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">englishFormalTranslation</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">englishFormal audio url</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">spanishInformalTranslation</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">spanishInhFormal audio url</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">spanishFormalTranslation</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">spanishFormal audio url</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">frenchInformalTranslation</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">frenchInFormal audio url</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">frenchFormalTranslation</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">frenchFormal audio url</Text>
            </Column>
            <Column alignitems="center">
              <Text fontsize="1.4rem">edit</Text>
            </Column>
            <DictBox>
              <Select
                name="level"
                onChange={this.selectnewPhraseChange}
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
                onChange={this.selectnewPhraseChange}
                onClick={this.onAudioCategoryChg}
                width="100%"
                height="40px">
                <option value="phrase">phrase</option>
              </Select>
            </DictBox>
            <DictBox>
              <DictInput
                name="englishInformalTranslation"
                onChange={this.selectnewTranslationChange}
              />
            </DictBox>
            <DictBox>
              <DictInput
                name="englishInformalTranslation"
                value={this.state.newPhrase.englishInformalTranslation.audioUrl}
                onChange={this.selectnewAudioChange}
              />
            </DictBox>
            <DictBox>
              <DictInput
                name="englishFormalTranslation"
                onChange={this.selectnewTranslationChange}
              />
            </DictBox>
            <DictBox>
              <DictInput
                name="englishFormalTranslation"
                value={this.state.newPhrase.englishFormalTranslation.audioUrl}
                onChange={this.selectnewAudioChange}
              />
            </DictBox>
            <DictBox>
              <DictInput
                name="spanishInformalTranslation"
                onChange={this.selectnewTranslationChange}
              />
            </DictBox>
            <DictBox>
              <DictInput
                name="spanishInformalTranslation"
                value={this.state.newPhrase.spanishInformalTranslation.audioUrl}
                onChange={this.selectnewAudioChange}
              />
            </DictBox>
            <DictBox>
              <DictInput
                name="spanishFormalTranslation"
                onChange={this.selectnewTranslationChange}
              />
            </DictBox>
            <DictBox>
              <DictInput
                name="spanishFormalTranslation"
                value={this.state.newPhrase.spanishFormalTranslation.audioUrl}
                onChange={this.selectnewAudioChange}
              />
            </DictBox>
            <DictBox>
              <DictInput
                name="frenchInformalTranslation"
                onChange={this.selectnewTranslationChange}
              />
            </DictBox>
            <DictBox>
              <DictInput
                name="frenchInformalTranslation"
                value={this.state.newPhrase.frenchInformalTranslation.audioUrl}
                onChange={this.selectnewAudioChange}
              />
            </DictBox>
            <DictBox>
              <DictInput
                name="frenchFormalTranslation"
                onChange={this.selectnewTranslationChange}
              />
            </DictBox>
            <DictBox>
              <DictInput
                name="frenchFormalTranslation"
                value={this.state.newPhrase.frenchFormalTranslation.audioUrl}
                onChange={this.selectnewAudioChange}
              />
            </DictBox>
            <DictBox>
              <Button width="120px" height="24px" onClick={this.createPhrase}>
                Create Phrase{' '}
              </Button>
            </DictBox>
          </DictGrid>
          <Title>Search</Title>
          <Line color="black" width="100%" />
          <DictGrid
            gridtemplatecolumns="70px 200px 200px"
            maxwidth="1240px"
            overflowx="scroll">
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">level</Text>
            </Column>
            <Column alignitems="flex-start">
              <Text fontsize="1.4rem">phrase</Text>
            </Column>
            <Column alignitems="center">
              <Text fontsize="1.4rem">edit</Text>
            </Column>
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
              <DictInput name="phrase" onChange={this.selectSearchChange} />
            </DictBox>
            <DictBox display="flex" flexdirection="row">
              <Button width="65px" height="24px" onClick={this.fetchPhrases}>
                Search
              </Button>
            </DictBox>
          </DictGrid>
        </Section>
        <Section width="100%">
          <Title>Results <span>(Total: ?)</span></Title>
          <p>
            NEVER change audio fields directly. Use the Tranlation fields to the
            left to change them.
          </p>
          <p>
            NEVER hit update without changes. This will empty all fields on the
            record
          </p>
          <p>
            Refresh page to see updated list after updating or deleting a
            record.
          </p>
          <Line color="black" width="100%" />
          <Box
            display="block"
            height="600px"
            maxwidth="1240px"
            overflow="scroll">
            <DictGrid
              gridtemplatecolumns="70px 400px 400px 70px 100px repeat(12, 400px) 200px 200px"
              width="7000px">
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
                <Text fontsize="1.4rem">level</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">category</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">englishInformalTranslation</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">englishInformal audio</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">englishFormalTranslation</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">englishFormal audio</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">spanishInformalTranslation</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">spanishInformal audio</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">spanishFormalTranslation</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">spanishFormal audio</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">frenchInformalTranslation</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">frenchInformal audio</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">frenchFormalTranslation</Text>
              </Column>
              <Column alignitems="flex-start">
                <Text fontsize="1.4rem">frenchFormal audio</Text>
              </Column>
              <Column alignitems="center">
                <Text fontsize="1.4rem">Edit</Text>
              </Column>
            </DictGrid>
            {phrases
              ? phrases.map((item, i) => {
                  counter++
                  return (
                    <DictGrid
                      gridtemplatecolumns="70px 400px 400px 70px 100px repeat(12, 400px) 200px 200px"
                      width="7000px">
                      <DictBox>
                        <span>{counter}</span>
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="id"
                          onChange={this.selectUpdatedPhraseChange}
                          placeholder={item.id}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="_id"
                          onChange={this.selectUpdatedPhraseChange}
                          placeholder={item._id}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="level"
                          onChange={this.selectUpdatedPhraseChange}
                          placeholder={item.level}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="category"
                          onChange={this.selectUpdatedPhraseChange}
                          placeholder={item.category}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="englishInformalTranslation"
                          onChange={this.updatePhraseChange}
                          placeholder={
                            item.englishInformalTranslation.phrases[0]
                          }
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="englishInformalTranslation"
                          value={
                            this.state.updatedPhrase.englishInformalTranslation
                              .audioUrl
                          }
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="englishFormalTranslation"
                          onChange={this.updatePhraseChange}
                          placeholder={item.englishFormalTranslation.phrases[0]}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="englishFormalTranslation"
                          value={
                            this.state.updatedPhrase.englishFormalTranslation
                              .audioUrl
                          }
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="spanishInformalTranslation"
                          onChange={this.updatePhraseChange}
                          placeholder={
                            item.spanishInformalTranslation.phrases[0]
                          }
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="spanishInformalTranslation"
                          value={
                            this.state.updatedPhrase.spanishInformalTranslation
                              .audioUrl
                          }
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="spanishFormalTranslation"
                          onChange={this.updatePhraseChange}
                          placeholder={item.spanishFormalTranslation.phrases[0]}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="spanishFormalTranslation"
                          value={
                            this.state.updatedPhrase.spanishFormalTranslation
                              .audioUrl
                          }
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="frenchInformalTranslation"
                          onChange={this.updatePhraseChange}
                          placeholder={
                            item.frenchInformalTranslation.phrases[0]
                          }
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="frenchInformalTranslation"
                          value={
                            this.state.updatedPhrase.frenchInformalTranslation
                              .audioUrl
                          }
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="frenchFormalTranslation"
                          onChange={this.updatePhraseChange}
                          placeholder={item.frenchFormalTranslation.phrases[0]}
                        />
                      </DictBox>
                      <DictBox>
                        <DictInput
                          name="frenchFormalTranslation"
                          value={
                            this.state.updatedPhrase.frenchFormalTranslation
                              .audioUrl
                          }
                        />
                      </DictBox>
                      <DictBox>
                        <div>
                          <Button
                            hovercolor="white"
                            hoverbackground="blue"
                            onClick={e => this.updatePhrase(item, e)}>
                            update
                          </Button>
                          |{' '}
                          <Button
                            hovercolor="white"
                            hoverbackground="blue"
                            onClick={e => this.deletePhrase(item, e)}>
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
    phraseReducer: state.phraseReducer
  }
}

const mapDispatchToProps = dispatch => {
  let fetchPhrases = actionCreators.fetch
  let createPhrase = actionCreators.create
  let deletePhrase = actionCreators.delete
  let updatePhrase = actionCreators.update
  return {
    actions: bindActionCreators(
      {
        fetchPhrases,
        createPhrase,
        deletePhrase,
        updatePhrase
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Phrase)
