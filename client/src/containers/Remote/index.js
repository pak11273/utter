import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Channels, Uttered} from '../../containers'
import {Box, Column, Section, Text} from '../../components'

class Friends extends Component {
  render() {
    return (
      <div style={{textAlign: 'left'}}>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Friends
        </Text>
        <div>Joe <span style={{color: 'red'}}>offline</span></div>
        <div>Martha <span style={{color: 'red'}}>online</span></div>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Sponsor
        </Text>
        <div>Joe <span style={{color: 'green'}}>online</span></div>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Sponsorees
        </Text>
        <div>Joe <span style={{color: 'red'}}>offline</span></div>
        <div>Martha <span style={{color: 'orange'}}>afk</span></div>
        <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
          Blocked
        </Text>
        <div>Martha <span style={{color: 'orange'}}>afk</span></div>
      </div>
    )
  }
}

class RemoteContainer extends Component {
  onClick() {
    //TODO:this console.log refreshes the whole page...
    // not the intende behavior but does refresh the channels list.  What we want to do is just refresh the container.  but how?
    console.log(this.props.channelReducer.channelId)
  }
  render() {
    return (
      <Router>
        <Column>
          <Box
            flexdirection="row"
            height="100%"
            maxwidth="500px"
            background="lightblue"
            justifycontent="space-around"
            margin="20px"
            width="100%">
            <Link
              to="/connections/channels"
              fontsize="1rem"
              onClick={this.onClick}>
              Channels
            </Link>
            <Link to="/connections/uttered" fontsize="1rem">Uttered</Link>
            <Link to="/connections/friends" fontsize="1rem">Friends</Link>
          </Box>
          <Box alignitems="flex-start">
            <Route path="/connections/channels" component={Channels} />
            <Route path="/connections/uttered" component={Uttered} />
            <Route path="/connections/friends" component={Friends} />
          </Box>
        </Column>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {channelReducer: state.channelReducer}
}

export default connect(mapStateToProps)(RemoteContainer)
