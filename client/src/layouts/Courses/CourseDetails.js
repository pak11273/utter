import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {Button, Select, Title, Subtitle, Wrapper} from '../../components'
import {Masthead} from '../../containers'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

// actions
import {addCourse, loadUserProfile} from '../Connections/actions.js'

class CourseDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'English'
    }
  }
  componentDidMount() {
    // load the user profile
    const userId = this.props.authReducer.user._id
    this.props.actions.loadUserProfile(userId)
  }

  addCourse = () => {
    // TODO:add course to user db
    //if course is already in user db then
    // check in redux
    const language = this.props.courseReducer.courseLanguage
    console.log('lang: ', language)
    var course = this.state.value
    course = language + ' for ' + course + ' Speakers'
    console.log('course: ', course)
    const exists = this.props.userReducer.userProfile.courses.filter(
      obj => obj.name === course
    )[0]
    console.log('exists: ', exists)
    if (exists) {
      alert('you are already enrolled in this course')
    } else {
      const id = this.props.userReducer.userProfile._id
      this.props.actions.addCourse(id, course)
    }
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  };

  handleSubmit = e => {
    e.preventDefault()
    let button = document.getElementById('submit')
    this.props.history.push('/getting-started')
    button.disabled = true
  };

  render() {
    const {name, description, levels} = this.props.language
    var items = []

    switch (name) {
      case 'French':
        items = ['English']
        break
      case 'English':
        items = ['English']
        break
      case 'Korean':
        items = ['English']
        break
      default:
        items = ['English']
    }

    return (
      <Wrapper>
        <Masthead bg="green">
          <Title>{name}</Title>
          <Subtitle>{description}</Subtitle>
          <Subtitle>Levels: {levels}</Subtitle>
          <Subtitle>Choose the language you will be learning with?</Subtitle>
          <form onSubmit={this.handleSubmit}>

            <Select
              fontsize="2rem"
              color="black"
              margin="20px"
              onChange={this.handleChange}
              value={this.state.value}>
              {items.map(item => {
                if (item != name) {
                  return (
                    <option value={item}>
                      {item}
                    </option>
                  )
                }
              })}
            </Select>
            <Button
              id="submit"
              color="black"
              fontsize="2rem"
              margin="20px"
              width="140px"
              height="50px"
              onClick={this.addCourse}
              type="submit">
              Enroll
            </Button>
          </form>
        </Masthead>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    courseReducer: state.courseReducer,
    userReducer: state.userReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        loadUserProfile,
        addCourse
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails)
