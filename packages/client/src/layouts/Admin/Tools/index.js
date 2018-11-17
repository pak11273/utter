import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Segment, Button} from 'semantic-ui-react'

// actions
import actions from './actions.js'

class Tools extends Component {
  render() {
    const {loadUsers} = this.props.actions
    return (
      <Segment attached="bottom">
        <Button onClick={() => loadUsers()}>Reload User Data</Button>
      </Segment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        loadUsers: actions.request
      },
      dispatch
    )
  }
}
export default connect(null, mapDispatchToProps)(Tools)
