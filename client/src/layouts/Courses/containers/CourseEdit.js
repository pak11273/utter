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
  Img,
  Section,
  State,
  Input,
  LanguageCard,
  Subtitle,
  Title,
  Text
} from '../../../components'
import {Masthead, Navbar, Staticbar} from '../../../containers'

// actions
import {addFlashMessage} from '../../../actions/flashMessages.js'
import {
  addCuidToLevels,
  addLevel,
  addWord,
  deleteLevel,
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
    ;['deleteLevel', 'addWord'].forEach(prop => {
      this[prop] = this[prop].bind(this)
    })

    // this.deleteLevel = this.deleteLevel.bind(this)
    // this.addWord = this.addWord.bind(this)
  }

  componentDidMount() {
    const currentCourse = this.props.courseReducer.currentTeachingCourse
    this.setState(currentCourse)
    this.props.actions.toggleFooter(false)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  deleteLevel(id) {
    let course = this.props.courseReducer.currentTeachingCourse
    confirm('Are you sure you want to DELETE this level?')
      ? this.props.actions.deleteLevel(course, id)
      : null
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

  addLevel = e => {
    e.preventDefault()
    let length = this.props.courseReducer.currentTeachingCourse.levels.length
    let newLevel = length + 1
    this.props.actions.addLevel(newLevel)
  }

  addWord = e => {
    e.preventDefault()
    this.props.actions.addWord()
  }

  getData() {
    const data = testData.map(item => {
      const _id = cuid()
      return {
        _id,
        ...item
      }
    })
    return data
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

  renderLevelEditable = cellInfo => {
    var levelErrors = this.state.errors.level
    return (
      <div>
        <div
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
          {levelErrors &&
            (this.props.courseReducer.currentTeachingCourse.levels[
              cellInfo.index
            ]._id === levelErrors.cuid ? (
              <Error>{levelErrors['message']}</Error>
            ) : null)}
        </Error>
      </div>
    )
  }

  renderWordEditable = cellInfo => {
    return (
      <div
        style={{backgroundColor: '#fafafa', width: '100%', outline: 'none'}}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [{word: 'hi'}]
        }}
        // const data = this.props.courseReducer.currentTeachingCourse.levels
        // data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML
        // this.setState({data})
        // }}
        // dangerouslySetInnerHTML={{
        // __html: this.props.courseReducer.currentTeachingCourse.levels[
        //   cellInfo.index
        // ][cellInfo.column.id]
        // }}
        placeholder="Change Me"
      />
    )
  }

  renderTitleEditable = cellInfo => {
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
      },
      {
        // id: 'Actions',
        Header: 'Actions',
        accessor: '_id', // String-based value accessors!
        Cell: props => (
          <Delete onClick={() => this.deleteLevel(props.original._id)}>
            Delete
          </Delete>
        ), // Custom cell components!
        maxWidth: 80,
        headerStyle: {fontSize: '1.5rem'}
      }
    ]

    const terms = [
      {
        Header: 'Word',
        accessor: 'word',
        // Cell: this.renderWordEditable,
        headerStyle: {fontSize: '1.5rem'},
        Footer: (
          <Box flexdirection="row" margin="0 auto">
            <button
              onClick={this.addWord}
              style={{
                display: 'div',
                height: '25px'
              }}>
              +
            </button>
            <Text padding="0 0 0 20px">Add Word</Text>
          </Box>
        )
      },
      {
        id: 'levelTranslation',
        Header: 'Translation',
        accessor: 'translation',
        Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
        headerStyle: {fontSize: '1.5rem'}
      },
      {
        id: 'someNumber', // Required because our accessor is not a string
        Header: 'Audio',
        accessor: 'tbd', // Custom value accessors!
        headerStyle: {fontSize: '1.5rem'}
      },
      {
        // id: 'Actions',
        Header: 'Actions',
        accessor: '_id', // String-based value accessors!
        Cell: props => (
          <Delete onClick={() => this.deleteLevel(props.original._id)}>
            Delete
          </Delete>
        ), // Custom cell components!
        maxWidth: 80,
        headerStyle: {fontSize: '1.5rem'}
      }
    ]
    var termsArr = null
    return (
      <Flex>
        {/* TODO: implement after chat is finsished 
        <Box flexdirection640="row">
          <h1>Course Name</h1>
          <h1>Course Description</h1>
          <Img width="30px" height="40px" />
          <Button onClick={this.deleteCourse}>Delete Course</Button>
          <p>
            <span style={{color: 'red'}}>
              Note: This action cannot be reversed.
            </span>
          </p>
        </Box>
        */}
        <Form onSubmit={this.onSubmit}>
          <State state={this.state} />
          <Title padding="20px">Edit Your Course</Title>
          <ReactTable
            getTrGroupProps={(state, rowInfo, column, instance) => {
              rowInfo && (termsArr = rowInfo.original.terms)
            }}
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
                  <div style={{fontSize: '2rem', padding: '20px'}}>Terms</div>
                  <ReactTable
                    style={{padding: '20px'}}
                    data={this.props.courseReducer.editTeachingCourse.terms} // should default to []
                    resolveData={data => {
                      // return an array of ob
                      const newArr = Object.keys(data).map(key => {
                        // return data[key]
                        return data
                      })
                    }}
                    className="-striped -highlight"
                    columns={terms}
                    defaultPageSize={10}
                    showPagination={false}
                  />
                  <div style={{fontSize: '2rem', padding: '20px'}}>Grammar</div>
                  <ReactTable
                    style={{padding: '20px'}}
                    data={data.terms}
                    className="-striped -highlight"
                    columns={terms}
                    defaultPageSize={10}
                    showPagination={false}
                  />
                  <div style={{fontSize: '2rem', padding: '20px'}}>Phrases</div>
                  <ReactTable
                    style={{padding: '20px'}}
                    data={data.terms}
                    className="-striped -highlight"
                    columns={terms}
                    defaultPageSize={10}
                    showPagination={false}
                  />
                  <div style={{fontSize: '2rem', padding: '20px'}}>Notes</div>
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
        addWord,
        deleteLevel,
        toggleFooter,
        readCourse,
        updateCourse
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit)
