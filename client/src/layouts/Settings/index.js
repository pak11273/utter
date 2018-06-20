import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'
import cuid from 'cuid'
import {validateInput} from '../../utils/validations/courseUpdate.js'
import '../Courses/styles.css'

import {
  Box,
  Button,
  ButtonBrowse,
  Column,
  Flex,
  Form,
  Grid,
  Img,
  Section,
  Input,
  LanguageCard,
  Subtitle,
  Title,
  Text
} from '../../components'
import {Masthead, Navbar, Staticbar, TabBarContainer} from '../../containers'

import {Header, Container, Menu} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'

// actions
import {addFlashMessage} from '../../app/actions/flashMessages.js'
import {toggleFooter} from '../../app/actions/toggleFooterAction.js'

const StyledButton = styled(Button)`
  border-radius: 50px;
  color: #02598b;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 80px 0 0 0;
  outline: none;
  padding: 7px 36px;
  &:hover {
    background: #4fa0d1;
    color: #ecf12a;
  }
`
const Delete = styled.a`
  cursor: pointer;
  margin: 0 auto;
  &:hover {
    text-decoration: none;
  }
`
const Error = styled.div`
  color: red;
  padding-top: ${props => props.paddingtop};
  position: absolute;
  text-align: center;
`

import AccountInfo from '../Settings/features/Account/AccountInfo.js'
import Notifications from '../Settings/features/Notifications'

class Settings extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  onSubmit = e => {
    e.preventDefault()
    if (this.isValid()) {
      let updatedCourse = this.props.courseReducer.currentTeachingCourse
      this.props.actions.updateCourse(updatedCourse)

      // clear errors
      this.setState({
        errors: {} // clear errors every time we submit form
      })

      this.props.actions.addFlashMessage({
        type: 'success',
        text: 'Changes were saved.'
      })
    }
  }

  render() {
    const url = `/api/courses/${
      this.props.courseReducer.currentTeachingCourse.courseId
    }/${this.props.courseReducer.currentTeachingCourse.courseName}`

    const tabs = [
      {name: 'accountInfo', label: 'Account Info', component: AccountInfo},
      {name: 'notifications', label: 'Notifications', component: Notifications}
    ]

    return (
      <Flex>
        <div>
          <Title padding="20px">Edit Your Settings</Title>
          <div className="App">
            <div className="App-header">
              <Header inverted as="h1">
                Project Mini-Mek
              </Header>
            </div>
            <Container>
              <TabBarContainer tabs={tabs} size="massive" />
            </Container>
          </div>
          <Box flexdirection="row">
            <StyledButton type="submit">Save Changes</StyledButton>
          </Box>
        </div>
      </Flex>
    )
  }
}

const mapStateToProps = state => {
  return {
    courseReducer: state.courseReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        toggleFooter
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
