import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Dropdown, Segment} from 'semantic-ui-react'

const NATIVE_LANG = [
  {value: 'en', text: 'English'},
  {value: 'ko', text: 'Korean'}
]

// import {selectUserInfo} from '../../../../api/user/selectors.js'

class AccountInfo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // const {unitInfo} = this.props
    // const {name, affiliation} = unitInfo

    return (
      <Segment attached="bottom">
        <Form size="large">
          <Form.Field name="name" width={6}>
            <label>Username</label>
            <input placeholder="Name" defaultValue="my name" />
          </Form.Field>
          <Form.Field name="email" width={6}>
            <label>Email</label>
            <input placeholder="Email" defaultValue="my email" />
          </Form.Field>
          <Form.Field name="native-language" width={6}>
            <label>Native Language</label>
            <Dropdown selection options={NATIVE_LANG} defaultValue="en" />
          </Form.Field>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  return {
    // selectUserInfo: selectUserInfo(state)
  }
}

export default connect(mapStateToProps)(AccountInfo)
