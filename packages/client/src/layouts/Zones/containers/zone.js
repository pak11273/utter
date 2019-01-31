import React, {Component} from "react"
import {connect} from "react-redux"
import /* Switch, */
/* Route */
/* Link, */
"react-router-dom"
/* import Select from "react-select" */
import {cloneDeep} from "lodash"
import {Helmet} from "react-helmet"

import {
  Grid
  /* Header, */
  /* Item */
  /* Segment, */
  /* Select as SemSelect */
} from "semantic-ui-react"
/* import {Spacer} from "../../../components" */
import {Chat} from "../../../containers"
import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader
/* import "./styles.css" */

// actions
import {toggleFooter} from "../../../app/actions/toggle-footer-action.js"

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

class Zone extends Component {
  locationName = this.props.path

  constructor(props) {
    super(props)

    this.state = cloneDeep(initialCoursesContainerState)
  }

  componentDidMount() {
    this.props.toggleFooter(false)
  }

  componentWillUnmount() {
    this.props.toggleFooter(true)
  }

  handleImageClick = e => {
    e.preventDefault()
    // TODO
  }

  render() {
    /* const SubRoutes = route => ( */
    /* <Route */
    /*  path={route.path} */
    /*  render={props => <route.component {...props} routes={route.routes} />} */
    /* /> */
    /* const {routes} = this.props */
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
        {/*  <Grid.Column computer={10}>
          {routes.map(route => (
            <SubRoutes key={route.path} {...route} />
          ))}
        </Grid.Column>
				*/}
        <Grid.Column computer={6} style={{background: "LightGray"}}>
          <Grid columns={1} padded="vertically">
            <Grid.Column>
              <Chat />
              {/*
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
				*/}
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(
  null,
  {toggleFooter}
)(Zone)
