import React, {Component} from 'react'
import {NavLink, Link, Route, withRouter} from 'react-router-dom'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {isEmpty} from 'lodash/isEmpty'
import styled, {ThemeProvider} from 'styled-components'
import {Pagination} from '../../../containers'
import {Box, Flex, Grid, Img, Text} from '../../../components'
import IoPeople from 'react-icons/lib/io/android-people'
import '../../../assets/css/pagination.css'

// actions
import {toggleFooter} from '../../../app/actions/toggleFooterAction.js'
import {getTeachingList, readCourse} from '../actions.js'

const StyledGrid = styled(Grid)`
  grid-template-columns: 100%;
  grid-template-rows: auto 60px;
  grid-template-areas:
    'content'
    'Pagination';

  min-height: 600px;

  @media (min-width: 640px) {
    grid-template-rows: auto 60px;
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
    super(props) // an example array of 150 items to be paged
    // var exampleItems = [...Array(20).keys()].map(i => ({
    //   id: i + 1,
    //   name: 'Item ' + (i + 1)
    // }))
    this.state = {
      page: 1,
      total: 10,
      exampleItems: [],
      pageOfItems: []
    }
    this.onChangePage = this.onChangePage.bind(this)
    this.list = props.courseReducer.teachingCourseList
    this.pushUrl = this.pushUrl.bind(this)
  }

  pushUrl(item) {
    let url = `/my-courses/${item.courseId}/${item.courseName}/edit`
    this.props.actions.readCourse(item)
    this.props.actions.push(url)
  }

  componentWillMount() {
    this.props.actions.getTeachingList()
  }
  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({pageOfItems: pageOfItems})
  }

  render() {
    if (this.props.courseReducer.teachingCourseList.result.docs) {
      var courses = this.props.courseReducer.teachingCourseList.result.docs
    }
    return (
      <StyledGrid>
        <Grid
          gridtemplaterows="auto"
          gridtemplatecolumns="1fr"
          gridtemplatecolumns640="1fr 1fr"
          gridtemplatecolumns768="1fr 1fr 1fr"
          gridtemplatecolumns1024="1fr 1fr 1fr 1fr"
          gridtemplatecolumns1440="1fr 1fr 1fr 1fr 1fr"
          gridarea="content">
          {this.state.pageOfItems.map(item => {
            return (
              <Flex key={item._id} flexdirection="column" padding="40px">
                <a
                  style={{cursor: 'pointer'}}
                  onClick={() => this.pushUrl(item)}>
                  <Img src={item.image} width="160px" height="200px" />
                </a>
                <a
                  style={{cursor: 'pointer'}}
                  onClick={() => this.pushUrl(item)}>
                  <Text
                    alignitems="center"
                    display="flex"
                    textalign="center"
                    fontsize="x-large"
                    height="120px"
                    padding="10px">
                    {item.courseName}
                  </Text>
                </a>
                <Text textalign="left" fontsize="1rem" padding="10px">
                  {item.courseDescription}
                </Text>
                <Flex
                  flexdirection="row"
                  justifycontent="flex-end"
                  padding="0 30px 0 0">
                  <IoPeople />
                  <Text>3</Text>
                </Flex>
              </Flex>
            )
          })}
        </Grid>
        <div gridarea="Pagination">
          <Pagination
            items={this.props.courseReducer.teachingCourseList.result.docs}
            onChangePage={this.onChangePage}
          />
        </div>
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
        getTeachingList,
        push,
        readCourse,
        toggleFooter
      },
      dispatch
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Created))
