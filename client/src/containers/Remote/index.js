import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Channels, Uttered} from '../../containers'
import {Box, Column, Section, Text} from '../../components'

// actions
import {loadSocketNsps} from '../../services/socketio/actions.js'

class Vocabulary extends Component {
  render() {
    return (
      <div style={{textAlign: 'left'}}>
        <label>Search</label>
        <input />
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Body Parts{' '}
        </Text>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Rooms{' '}
        </Text>
      </div>
    )
  }
}

class Grammar extends Component {
  render() {
    return (
      <div style={{textAlign: 'left'}}>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Level 1{' '}
        </Text>
      </div>
    )
  }
}

class Phrases extends Component {
  render() {
    return (
      <div style={{textAlign: 'left'}}>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Phrases{' '}
        </Text>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Greetings{' '}
        </Text>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Introductions{' '}
        </Text>
      </div>
    )
  }
}

class RemoteContainer extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.actions.loadSocketNsps()
  }
  onClick() {
    //TODO:this console.log refreshes the whole page...
    // not the intende behavior but does refresh the channels list.  What we want to do is just refresh the container.  but how?
    console.log(this.props.channelReducer.channelId)
  }
  render() {
    return (
      <Router>
        <Column alignitems="flex-start">
          <Box
            flexdirection="row"
            height="100%"
            background="lightblue"
            justifycontent="space-around"
            margin="0 0 20px 0">
            <Link
              to="/connections/channels"
              fontsize="1rem"
              onClick={this.onClick}>
              Channels
            </Link>
            <Link to="/connections/vocabulary" fontsize="1rem">Vocabulary</Link>
            <Link to="/connections/grammar" fontsize="1rem">Grammar</Link>
            <Link to="/connections/phrases" fontsize="1rem">Phrases</Link>
          </Box>
          <Box alignitems="flex-start">
            <Route path="/connections/channels" component={Channels} />
            <Route path="/connections/vocabulary" component={Vocabulary} />
            <Route path="/connections/grammar" component={Grammar} />
            <Route path="/connections/phrases" component={Phrases} />
          </Box>
        </Column>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {channelReducer: state.channelReducer}
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        loadSocketNsps
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteContainer)
