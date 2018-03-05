import React, {Component} from 'react'
import {NavLink, Route} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import data from '../data/data.js'
import '../styles.css'

import {
  Box,
  Button,
  ButtonBrowse,
  Column,
  Flex,
  Form,
  Grid,
  Section,
  Input,
  LanguageCard,
  Subtitle,
  Title
} from '../../../components'
import {Masthead, Navbar, Staticbar} from '../../../containers'

// actions
import {addLevel, chooseCourseLanguage, updateCourse} from '../actions'
import {toggleFooter} from '../../../actions/toggleFooterAction.js'

const Pending = () => <h1>pending</h1>

const StyledButton = styled(Button)`
  border-radius: 50px;
  color: #02598b;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 80px 0 0 0;
  outline: none;
  padding: 7px 36px;
  &:hover: {
    background: black;
    color: red;
  }
`

class CourseEdit extends Component {
  constructor() {
    super()
    this.state = {
      course_id: '',
      course_name: '',
      // data: data.courses,
      filtered: false,
      loading: false,
      page: 0,
      pages: -1,
      pageSize: 1,
      sorted: null
    }

    this.addLevel = this.addLevel.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.renderEditable = this.renderEditable.bind(this)
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{backgroundColor: '#fafafa'}}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = this.props.courseReducer.currentTeachingCourse.levels
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML
          this.setState({data})
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.courseReducer.currentTeachingCourse.levels[
            cellInfo.index
          ][cellInfo.column.id]
        }}
      />
    )
  }

  addLevel(e) {
    e.preventDefault()
    // get last level add 1
    let length = this.props.courseReducer.currentTeachingCourse.levels.length
    let newLevel = length + 1
    this.props.actions.addLevel(newLevel)
  }

  onSubmit(e) {
    e.preventDefault()
    let updatedCourse = this.props.courseReducer.currentTeachingCourse
    this.props.actions.updateCourse(updatedCourse)
  }

  render() {
    const url = `/api/courses/${
      this.props.courseReducer.currentTeachingCourse.courseId
    }/${this.props.courseReducer.currentTeachingCourse.courseName}`
    const courses = [
      {
        Header: 'Level',
        accessor: 'level', // String-based value accessors!
        Cell: this.renderEditable,
        maxWidth: 80,
        headerStyle: {fontSize: '1.5rem'},
        Footer: (
          <button
            onClick={this.addLevel}
            style={{
              display: 'flex',
              height: '25px',
              alignSelf: 'center',
              margin: '0 auto'
            }}>
            +
          </button>
        )
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
        headerStyle: {fontSize: '1.5rem'},
        Cell: this.renderEditable,
        Footer: (
          <span style={{display: 'flex', height: '40px', alignItems: 'center'}}>
            Add a Level
          </span>
        )
      }
    ]
    const terms = [
      {
        Header: 'word',
        accessor: 'word' // String-based value accessors!
      },
      {
        Header: 'translation',
        accessor: 'translation',
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        id: 'someNumber', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name // Custom value accessors!
      },
      {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age'
      }
    ]
    return (
      <Flex>
        <Form onSubmit={this.onSubmit}>
          <Title padding="20px">Edit Your Course</Title>
          <ReactTable
            data={this.props.courseReducer.currentTeachingCourse.levels} // should default to []
            contenteditable
            loading={this.state.loading}
            // manual // informs React Table that you'll be handling sorting and pagination server-side
            className="-highlight"
            columns={courses}
            defaultPageSize={10}
            style={{width: '93%', margin: '0 auto'}}
            SubComponent={row => {
              return (
                <div>
                  <div style={{padding: '20px'}}>Terms</div>
                  <ReactTable
                    style={{padding: '20px'}}
                    data={data.terms}
                    className="-striped -highlight"
                    columns={terms}
                    defaultPageSize={10}
                    showPagination={false}
                  />
                  <div style={{padding: '20px'}}>Phrases</div>
                  <ReactTable
                    style={{padding: '20px'}}
                    data={data.terms}
                    className="-striped -highlight"
                    columns={terms}
                    defaultPageSize={10}
                    showPagination={false}
                  />
                </div>
              )
            }}
          />
          <Box flexdirection="row">
            <StyledButton type="submit">Save Changes</StyledButton>
          </Box>
        </Form>
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
        addLevel,
        toggleFooter,
        updateCourse
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit)
