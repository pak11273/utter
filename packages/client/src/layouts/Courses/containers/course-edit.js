import React, {Component} from "react"
import {
  /* Switch, */
  Route,
  Link,
  withRouter
} from "react-router-dom"
/* import Select from "react-select" */
import cloneDeep from "lodash/cloneDeep"
import {Helmet} from "react-helmet"

import {
  Grid,
  Header,
  Item
  /* Segment, */
  /* Select as SemSelect */
} from "semantic-ui-react"
import {Spacer} from "../../../components"
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
/*         courseAuthor { */
/*           username */
/*         } */
/*       } */
/*     } */
/*   } */

/* ` */

const initialCoursesContainerState = {
  courseRef: ""
}

class CourseEdit extends Component {
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
    const {routes} = this.props
    return (
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
        <Grid.Column width={4} style={{background: "LightGray"}}>
          <Grid columns={1} centered padded="vertically">
            <Grid.Column textAlign="center">
              <Spacer margin="50px 0 0 0" />
              <Item align="center">
                <Header as="h2">
                  <Link to="/course/course-settings">Settings</Link>
                </Header>
                <Header as="h2">
                  <Link to="/course/levels">Levels</Link>
                </Header>
                <Header as="h2">Vocabulary</Header>
                <Header as="h2">Grammar</Header>
                <Header as="h2">Phrases</Header>
                <div style={{margin: "40px 0 0 0"}}>
                  <Link to="/courses/created" onClick={this.forceUpdate}>
                    My Created Courses
                  </Link>
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
    )
  }
}

export default withRouter(CourseEdit)
