import React, {Component} from "react"
import {connect} from "react-redux"
import schema from "../../../app/schema.js"
import {
  /* Switch, */
  Route,
  NavLink
} from "react-router-dom"
/* import Select from "react-select" */
import {cloneDeep} from "lodash"
import {Helmet} from "react-helmet"
import {Can, Spacer} from "../../../components"

import {
  Grid,
  Header,
  Item
  /* Segment, */
  /* Select as SemSelect */
} from "semantic-ui-react"
import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader
/* import "./styles.css" */

/* const getCourse = gql` */
/*   query getCourse($courseId: String) { */
/*     getCourse(courseId: $courseId) { */
/*       course { */
/*         id */
/*         courseImage */
/*         courseName */
/*         courseMode */
/*         owner { */
/*           username */
/*         } */
/*       } */
/*     } */
/*   } */

/* ` */

const initialCoursesContainerState = {
  courseRef: ""
}

class CourseUpdate extends Component {
  locationName = this.props.path

  constructor(props) {
    super(props)

    this.state = cloneDeep(initialCoursesContainerState)
  }

  handleImageClick = e => {
    e.preventDefault()
    // TODO
  }

  render() {
    const SubRoutes = route => (
      <Route
        path={route.path}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    )
    const {course, routes, user} = this.props
    return (
      <div>
        <Grid stackable>
          <Helmet>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta
              name="description"
              content="Edit your course.  Add material that you are using from another learning resource and make it your own.  Create a strategy that think makes the most sense and is pedagogically sound."
            />
            <meta name="author" content="Isaac Pak" />
            <title>Utterzone | Course Edit</title>
            <link rel="canonical" href="https://utter.zone/course/:id" />
          </Helmet>
          <Grid.Column
            width={4}
            style={{background: "LightGray", minHeight: "900px"}}>
            <Grid columns={1} centered padded="vertically">
              <Grid.Column textAlign="center">
                <Spacer margin="50px 0 0 0" />
                <Item align="center">
                  <Header as="h2">
                    <NavLink
                      activeStyle={{
                        fontWeight: "bold",
                        fontSize: "1em",
                        color: "orange"
                      }}
                      to="/course/course-introduction">
                      Introduction
                    </NavLink>
                  </Header>
                  <Can
                    roles={user.roles}
                    perform="course:update-settings"
                    id={user.username}
                    matchingID={course.owner.username}
                    yes={() => (
                      <Header as="h2">
                        <NavLink
                          activeStyle={{
                            fontWeight: "bold",
                            fontSize: "1em",
                            color: "orange"
                          }}
                          to="/course/course-settings">
                          Settings
                        </NavLink>
                      </Header>
                    )}
                    no={() => null}
                  />
                  <Header as="h2">
                    <NavLink
                      activeStyle={{
                        fontWeight: "bold",
                        fontSize: "1em",
                        color: "orange"
                      }}
                      to="/course/levels">
                      Levels
                    </NavLink>
                  </Header>
                  <Header as="h2">Vocabulary</Header>
                  <Header as="h2">Grammar</Header>
                  <Header as="h2">Phrases</Header>
                  <div style={{margin: "40px 0 0 0"}}>
                    <NavLink
                      activeStyle={{
                        fontWeight: "bold",
                        fontSize: "1em",
                        color: "orange"
                      }}
                      to="/courses/created"
                      onClick={this.forceUpdate}>
                      My Created Courses
                    </NavLink>
                  </div>
                </Item>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={12}>
            {routes.map(route => (
              <SubRoutes key={route.path} {...route} />
            ))}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {User, Course} = session
  const userObj = User.all().toRefArray()
  const courseObj = Course.all().toRefArray()
  var user = userObj[0]
  var course = courseObj[0]

  return {
    user,
    course
  }
}

export default connect(
  mapStateToProps,
  null
)(CourseUpdate)
