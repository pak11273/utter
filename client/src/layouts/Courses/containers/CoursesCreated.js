import React, {Component} from 'react'
import {NavLink, Link, Route, withRouter} from 'react-router-dom'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {isEmpty} from 'lodash/isEmpty'
import styled, {ThemeProvider} from 'styled-components'
import {Pagination} from '../../../containers'
import {Box, Flex, Grid, Text} from '../../../components'
import IoPeople from 'react-icons/lib/io/android-people'

// actions
import {toggleFooter} from '../../../actions/toggleFooterAction.js'
import {fetchTeachingList} from '../actions.js'

const StyledGrid = styled(Grid)`
  grid-template-columns: 100%;
  grid-template-rows: 60px 4800px 60px;
  grid-template-areas:
    'topPagination'
    'content'
    'botPagination';

  min-height: 600px;

  @media (min-width: 640px) {
  }
`
const teachingCard = styled(Grid)`
  background: blue;
  max-width: 300px;
`
const StyledNavLink = styled(NavLink)`
  padding: 0 0 20px 0;
  &:hover {
    color: green;
  }
`

class Created extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      total: 10
    }

    this.list = props.courseReducer.teachingCourseList
    this.pushUrl = this.pushUrl.bind(this)
  }

  pushUrl(url) {
    this.props.actions.push(url)
  }

  componentDidMount() {
    const currentCourse = this.props.courseReducer
    this.props.actions.fetchTeachingList(currentCourse)
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  render() {
    if (this.props.courseReducer.teachingCourseList.result) {
      var courses = this.props.courseReducer.teachingCourseList.result.docs
    }
    if (_.isEmpty(courses)) {
      mappedCourses = null
    } else {
      var topPagination = <Pagination gridarea="topPagination" />
      var botPagination = <Pagination gridarea="botPagination" />
      var mappedCourses = courses.map((item, i) => {
        const url = `/my-courses/${item.courseId}/${item.courseName}/edit`
        const htmlReadyUrl = encodeURI(url)
        return (
          <Flex key={i} flexdirection="column" padding="40px">
            <a onClick={() => this.pushUrl(htmlReadyUrl)}>
              <img src={item.image} width="160px" height="200px" />
            </a>
            <Text textalign="center" fontsize="x-large" padding="10px">
              {item.courseName}
            </Text>
            <Text textalign="left" fontsize="1rem" padding="10px">
              {item.courseDescription}
            </Text>
            <Flex flexdirection="row">
              <IoPeople />
              <Text>3</Text>
            </Flex>
          </Flex>
        )
      })
    }
    return (
      <StyledGrid>
        {topPagination}
        <Flex gridarea="content" height="4800px">
          {mappedCourses}
        </Flex>
        {botPagination}
      </StyledGrid>
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
        fetchTeachingList,
        push,
        toggleFooter
      },
      dispatch
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Created))
