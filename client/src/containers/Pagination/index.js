import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import {Flex, Box, Text} from '../../components'

// actions
import {changeCoursePg} from '../../layouts/Courses/actions.js'

class Pagination extends Component {
  constructor(props) {
    super(props)

    this.changePage = this.changePage.bind(this)
  }

  componentDidMount() {}

  changePage(e) {
    this.props.actions.changeCoursePg(e.target.innerHTML)
  }

  render() {
    var courseKeys = []
    if (this.props.courseReducer.teachingCourseList.result.total) {
      let limit = 10
      var courseArray = []
      const coursePages =
        this.props.courseReducer.teachingCourseList.result.total / limit + 1
      for (var i = 1; i <= coursePages; i++) {
        courseArray.push(i)
      }
      var courseKeys = Object.keys(courseArray)
    }
    return (
      <Flex
        flexdirection="row"
        margin="0 auto"
        width="200px"
        justifycontent="space-between">
        <p>Prev</p>
        {courseKeys.map((item, i) => {
          const num = Number(item) + 1
          return (
            <a href="#" key={i} onClick={this.changePage}>
              {num}
            </a>
          )
        })}
        <a>Next</a>
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
        changeCoursePg
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
