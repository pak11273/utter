import React, {Component} from "react"
import {
  BrowserRouter as Router,
  withRouter,
  NavLink,
  Route
} from "react-router-dom"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import styled from "styled-components"
import "react-table/react-table.css"
/* import CourseEdit from "./containers/course-edit.js" */
/* import requireAuth from "../../utils/requireAuth.js" */

import {Column, Grid, Section, Subtitle} from "../../components"

import {Staticbar} from "../../containers"

// actions
/* import {chooseCourseLanguage} from "./actions" */
import {toggleFooter} from "../../app/actions/toggleFooterAction.js"
// import {getTeachingList} from './actions.js'

const StyledSubtitle = styled(Subtitle)`
  text-align: left;
  font-color: #2196f3;
  font-size: 1.2rem;
  padding: ${props => props.padding};
`
StyledSubtitle.defaultProps = {
  padding: "20px 0 0 20px"
}

const StyledGrid = styled(Grid)`
  display: grid;
  grid-template-rows: auto;
  grid-template-areas:
    "sidebar sidebar"
    "content content";

  min-height: 2000px;

  @media (min-width: 640px) {
    grid-template-columns: 200px 1fr;
    grid-template-areas: "sidebar content";
  }
`
const StyledNavLink = styled(NavLink)`
  padding: 0 0 20px 0;
  &:hover {
    color: #ff9800;
  }
`
/* const Index = styled.section` */
/*   <h1>My Courses</h1> */
/* ` */

class MyCourses extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.actions.toggleFooter(false)
    // this.props.actions.getTeachingList()
  }

  componentWillUnmount() {
    this.props.actions.toggleFooter(true)
  }

  render() {
    return (
      <Router>
        <StyledGrid>
          <Staticbar>
            <Section>
              <Column>
                <StyledSubtitle padding="40px 0 0 20px">
                  <StyledNavLink to="/my-courses/created">
                    My Courses
                  </StyledNavLink>
                </StyledSubtitle>
                <StyledSubtitle padding="20px 0 20px 20px">
                  <StyledNavLink to="/my-courses/create">
                    Create a Course
                  </StyledNavLink>
                </StyledSubtitle>
              </Column>
            </Section>
          </Staticbar>
          <Section gridarea="content">
            {this.props.routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Section>
        </StyledGrid>
      </Router>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        // getTeachingList,
        toggleFooter
      },
      dispatch
    )
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyCourses)
)
