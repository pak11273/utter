import React, {Component} from 'react'
import {NavLink, Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import styled, {ThemeProvider} from 'styled-components'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import data from './data'

import {Flex, Section, Title} from '../../components'

class Courses extends Component {
  constructor() {
    super()
    this.state = {}
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
        <Title>Courses/courses page</Title>
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
    actions: {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
