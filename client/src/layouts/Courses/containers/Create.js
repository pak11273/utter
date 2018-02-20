import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {validateInput} from '../../../utils/validations/courseCreate.js'
import validator from 'validator'
import data from '../data'
import Teaching from './Teaching.js'
import '../styles.css'

import {
  Box,
  Button,
  Flex,
  Form,
  Grid,
  Input,
  Label,
  Searching,
  Text,
  TextArea,
  Title
} from '../../../components'

// images
import transLoader from '../../../assets/images/trans_loader.gif'

// actions
import {toggleFooter} from '../../../actions/toggleFooterAction.js'
import {fetchCourseName, fetchDog} from '../actions.js'

const StyledForm = styled(Form)`
  margin: 40px;
`
const Error = styled.div`
  color: red;
  padding-top: ${props => props.paddingtop};
  text-align: center;
`

class CreateCourse extends Component {
  constructor() {
    super()
    this.state = {
      courseName: '',
      courseDescription: '',
      isLoading: false,
      errors: {}
    }
    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onBlur(e) {
    this.props.actions.fetchCourseName(this.state.courseName)
  }

  isValid() {
    const {errors, isValid} = validateInput(this.state)

    if (!isValid) {
      this.setState({
        errors
      })
    }
    return isValid
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.isValid()) {
      this.setState({
        errors: {}, // clear errors every time we submit form
        isLoading: true
      })
      //TODO: this.props.history.push('/dashboard')
    }
  }

  render() {
    const courseNameFetchError = this.props.courseReducer.errorMsg
    const courseNameErrors = this.state.errors.courseName
    const courseDescriptionErrors = this.state.errors.courseDescription
    return (
      <Grid>
        <StyledForm onSubmit={this.onSubmit}>
          <Box overflow="initialj">
            <Teaching />
          </Box>
          <Title>Create a Course</Title>
          <Box>
            <div>
              <button onClick={() => this.props.actions.fetchDog()}>
                Show Dog
              </button>
              {this.props.courseReducer.loading ? (
                <img src={transLoader} />
              ) : this.props.courseReducer.error ? (
                <p>Error, try again</p>
              ) : (
                <p>
                  <img src={this.props.courseReducer.url} />
                </p>
              )}
            </div>
          </Box>
          <Box margin="40px 0 0 0">
            <Label>
              Course Name<span
                style={{fontSize: '.6rem', padding: '0 0 0 10px'}}>
                (10-100 chars.)
              </span>
            </Label>
            <Input
              className={
                courseNameErrors || courseNameFetchError ? 'courseError' : null
              }
              name="courseName"
              onChange={this.onChange}
              onBlur={this.onBlur}
              label="Course Name"
              minwidth="200px"
              placeholder="Give a unique name to your course."
              type="text"
              value={this.state.courseName}
              width="80%"
            />
            {this.state.errors.courseName &&
              Object.keys(courseNameErrors).map((key, i) => {
                return <Error key={i}>{courseNameErrors['message']}</Error>
              })}
            {this.props.courseReducer.loading ? (
              <Searching />
            ) : this.props.courseReducer.error ? (
              <p style={{color: 'red'}}>{this.props.courseReducer.errorMsg}</p>
            ) : (
              <p style={{color: 'green'}}>
                {this.props.courseReducer.courseNameMsg}
              </p>
            )}
          </Box>
          <Box margin="20px 0 0 0">
            <Label>
              Course Description<span
                style={{fontSize: '.6rem', padding: '0 0 0 10px'}}>
                (10-100 chars.)
              </span>
            </Label>
            <TextArea
              className={courseDescriptionErrors ? 'courseError' : null}
              name="courseDescription"
              onChange={this.onChange}
              label="Course Description"
              placeholder="Give a brief description about your course."
              height="200px"
              minwidth="200px"
              value={this.state.courseDescription}
              width="80%"
            />
            {this.state.errors.courseDescription &&
              Object.keys(courseDescriptionErrors).map((key, i) => {
                return (
                  <Error key={i}>{courseDescriptionErrors['message']}</Error>
                )
              })}
          </Box>
          <Label>Teaching</Label>
          <Teaching />
          <Box flexdirection="row">
            <Button margin="40px 0 0 0" padding="5px 15px" type="submit">
              Publish
            </Button>
          </Box>
        </StyledForm>
      </Grid>
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
        fetchDog,
        fetchCourseName,
        toggleFooter
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse)
