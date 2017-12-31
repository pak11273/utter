import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Channels, Uttered} from '../../containers'
import {Box, Column, Section, Text} from '../../components'

// actions
import {loadSocketNsps} from '../../services/socketio/actions.js'

class RemoteSideBarContainer extends Component {
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
            background="lightblue"
            justifycontent="space-around"
            margin="0 0 20px 0">
            <Link
              to="/connections/channels"
              fontsize="1rem"
              onClick={this.onClick}>
              Channels
            </Link>
          </Box>
          <Box alignitems="flex-start">
            <Route path="/connections/channels" component={Channels} />
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

export default connect(mapStateToProps, mapDispatchToProps)(
  RemoteSideBarContainer
)
