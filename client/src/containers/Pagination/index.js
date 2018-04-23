import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import {Flex, Box, Text} from '../../components'

// actions
import {changeCoursePg} from '../../layouts/Courses/actions.js'

const propTypes = {
  items: PropTypes.array,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
}
const defaultProps = {
  initialPage: 1
}

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {pager: {}}
    this.changePage = this.changePage.bind(this)
    this.getPager = this.getPager.bind(this)
    this.setPage = this.setPage.bind(this)
  }
  componentDidMount() {
    // console.log('items: ', this.props.items)
    // TODO: this needs to be able to scale for big data
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage)
    }
  }

  changePage(e) {
    this.props.actions.changeCoursePg(e.target.innerHTML)
  }

  setPage(page) {
    var items = this.props.items
    var pager = this.state.pager
    if (page < 1 || page > pager.totalPages) {
      return
    } // get new pager object for specified page
    pager = this.getPager(items.length, page) // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1) // update state
    this.setState({pager: pager}) // call change page function in parent component
    this.props.onChangePage(pageOfItems)
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1 // default page size is 10
    pageSize = pageSize || 10 // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize)
    var startPage, endPage
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1
      endPage = totalPages
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1
        endPage = 10
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9
        endPage = totalPages
      } else {
        startPage = currentPage - 5
        endPage = currentPage + 4
      }
    } // calculate start and end item indexes

    var startIndex = (currentPage - 1) * pageSize
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1) // create an array of pages to repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    ) // return object with all pager properties required by the view

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }

  render() {
    var pager = this.state.pager
    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null
    }
    let startPage = this.props.courseReducer.coursePg
    var courseKeys = []

    return (
      <Flex
        className="pagination"
        flexdirection="row"
        margin="0 auto"
        width="280px"
        justifycontent="space-between">
        {/*<div className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(1)}>&lt;&lt;</a>
        </div>*/}
        <div className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}>Prev</a>{' '}
        </div>
        {pager.pages.map((page, index) => (
          <div
            key={index}
            className={pager.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.setPage(page)}>{page}</a>
          </div>
        ))}
        <div
          className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
        </div>
        {/*<div
          className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.totalPages)}>&gt;&gt;</a>
        </div>*/}
      </Flex>
    )
  }
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps

const mapStateToProps = state => {
  return {
    courseReducer: state.courseReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        changeCoursePg
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
