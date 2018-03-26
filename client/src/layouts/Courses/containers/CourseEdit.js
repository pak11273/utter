import React, {Component} from 'react'
// import ReactDOM from 'react-dom'
import {NavLink, Route} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'
import ReactTable from 'react-table'
import cuid from 'cuid'
import {validateInput} from '../../../utils/validations/courseUpdate.js'
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
import {addFlashMessage} from '../../../actions/flashMessages.js'
import {
  addCuidToLevels,
  addLevel,
  chooseCourseLanguage,
  readCourse,
  updateCourse
} from '../actions'
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
const Error = styled.div`
  color: red;
  padding-top: ${props => props.paddingtop};
  position: absolute;
  text-align: center;
`
class CourseEdit extends Component {
  constructor() {
    super()
    this.state = {
      course_id: '',
      courseName: '',
      courseDescription: '',
      errors: {},
      filtered: false,
      levels: [{level: 1, cuid: cuid()}],
      loading: false,
      page: 0,
      pages: -1,
      pageSize: 1,
      sorted: null
    }

    this.addLevel = this.addLevel.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.renderTitleEditable = this.renderTitleEditable.bind(this)
    this.renderLevelEditable = this.renderLevelEditable.bind(this)
  }

  componentDidMount() {
    const currentCourse = this.props.courseReducer
    this.props.actions.toggleFooter(false)
    this.props.actions.readCourse(currentCourse)

    // set dom attributes TODO: remove this?
    const nodeList = Array.from(document.getElementsByClassName('level'))
    for (var i = 0; i < nodeList.length; i++) {
      nodeList[i].getAttribute('required', true)
    }
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  renderLevelEditable(cellInfo) {
    const levelErrors = this.state.errors.level
    const id = cuid()
    return (
      <div>
        <div
          id={id}
          className={levelErrors ? 'levelError' : null}
          style={{
            backgroundColor: '#fafafa',
            width: '100px',
            outline: 'none'
          }}
          contentEditable
          placeholder="Number"
          suppressContentEditableWarning
          onBlur={e => {
            const data = this.props.courseReducer.currentTeachingCourse.levels
            var conv = null

            e.target.innerHTML !== null ||
            e.target.innerHTML === '' ||
            e.target.innerHTML === undefined
              ? (conv = Number(e.target.innerHTML))
              : (conv = 0)
            data[cellInfo.index][cellInfo.column.id] = conv
            this.setState({data})
          }}
          dangerouslySetInnerHTML={{
            __html: this.props.courseReducer.currentTeachingCourse.levels[
              cellInfo.index
            ][cellInfo.column.id]
          }}
        />
        <Error>
          {this.state.errors.level
            ? console.log('error: ', this.state.errors.level._id)
            : null}
          {console.log('errors: ', levelErrors)}
          {console.log('id: ', id)}
          {console.log('error_id: ', levelErrors[id])}
          {levelErrors &&
            Object.keys(levelErrors).map((key, i) => {
              return <Error key={i}>{levelErrors['message']}</Error>
            })}
        </Error>
      </div>
    )
  }

  renderTitleEditable(cellInfo) {
    return (
      <div
        style={{backgroundColor: '#fafafa', width: '100%', outline: 'none'}}
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
        placeholder="Change this title"
      />
    )
  }

  addLevel(e) {
    e.preventDefault()
    let length = this.props.courseReducer.currentTeachingCourse.levels.length
    let newLevel = length + 1
    this.props.actions.addLevel(newLevel)
  }

  isValid() {
    const {errors, isValid} = validateInput(
      this.props.courseReducer.currentTeachingCourse
    )

    if (!isValid) {
      this.setState({
        errors
      })
    } else {
      return isValid
    }
  }

  onSubmit(e) {
    e.preventDefault()

    if (this.isValid()) {
      let updatedCourse = this.props.courseReducer.currentTeachingCourse
      this.props.actions.updateCourse(updatedCourse)

      // clear errors
      this.setState({
        errors: {} // clear errors every time we submit form
      })

      // push state to redux
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
    const courses = [
      {
        Header: 'Level',
        accessor: 'level', // String-based value accessors!
        Cell: this.renderLevelEditable,
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
        Cell: this.renderTitleEditable,
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
            defaultSortDesc={true}
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
        addCuidToLevels,
        addFlashMessage,
        addLevel,
        toggleFooter,
        readCourse,
        updateCourse
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit)
