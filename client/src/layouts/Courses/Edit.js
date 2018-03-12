import React, {Component} from 'react'
import {NavLink, Route} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import data from './data/data.js'

import {
  Box,
  Button,
  ButtonBrowse,
  Column,
  Flex,
  Grid,
  Section,
  Input,
  LanguageCard,
  Subtitle,
  Title
} from '../../components'
import {Masthead, Navbar, Staticbar} from '../../containers'

// actions
import {chooseCourseLanguage} from './actions'
import {toggleFooter} from '../../actions/toggleFooterAction.js'

const Pending = () => <h1>pending</h1>

class EditCourse extends Component {
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
  render() {
    const courses = [
      {
        Header: 'Level',
        accessor: 'level', // String-based value accessors!
        maxWidth: 80,
        headerStyle: {fontSize: '1.5rem'}
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
        headerStyle: {fontSize: '1.5rem'}
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
        <Title>Edit Your Course</Title>
        <ReactTable
          data={data.courses}
          className="-highlight"
          columns={courses}
          defaultPageSize={10}
          style={{width: '93%'}}
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
      </Flex>
    )
  }
}

const mapStateToProps = state => {
  return {}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCourse)
