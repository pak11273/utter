import React, {PureComponent} from "react"
import {Route, NavLink} from "react-router-dom"
import {session} from "brownies"

import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
/* import Grid from "@material-ui/core/Grid" */
import Link from "@material-ui/core/Link"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
/* import ListItemText from "@material-ui/core/ListItemText" */
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import styled from "styled-components"
import cloneDeep from "lodash/cloneDeep"
import {Helmet} from "react-helmet"
import {Can, Spacer} from "../../../components"

/* const getCourse = gql` */
/*   query getCourse($_id: ID!) { */
/*     getCourse(_id: $_id) { */
/*       _id */
/*       courseImage */
/*       courseName */
/*       courseMode */
/*       owner { */
/*         username */
/*       } */
/*     } */
/*   } */
/* ` */

const StyledNavLink = styled(NavLink)`
  grid-area: ${props => props.gridarea};
  color: #003478;
  &:hover {
    color: red;
    text-decoration: underline;
  }
`
const drawerWidth = 240

const styles = theme => ({
  content: {
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing.unit * 3
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  list: {
    margin: "0 auto"
  },
  root: {
    display: "flex",
    flexGrow: 1,
    width: "100%"
  }
})

const initialCoursesContainerState = {
  resources: ""
}

class CourseUpdate extends PureComponent {
  locationName = this.props.path

  constructor(props) {
    super(props)

    this.state = cloneDeep(initialCoursesContainerState)
  }

  componentDidMount = async () => {}

  handleImageClick = e => {
    e.preventDefault()
    // TODO
  }

  render() {
    const {course, user} = session
    const {classes} = this.props
    const SubRoutes = route => (
      <Route
        path={route.path}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    )
    const {routes} = this.props
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}>
          <Spacer margin="200px 0 0 0" />
          <List className={classes.list}>
            {[
              "introduction",
              "settings",
              "levels",
              "vocabulary",
              "grammar",
              "examples",
              "phrases",
              "notes"
            ].map((text, index) => {
              if (text === "settings") {
                return (
                  <Can
                    key={text}
                    roles={user.roles}
                    perform="course:read-settings"
                    id={user.username}
                    matchingID={course.owner.username}
                    yes={() => (
                      <ListItem
                        button
                        component={StyledNavLink}
                        exact
                        activeStyle={{
                          color: "yellow"
                        }}
                        to="/course/course-settings"
                        key={index}>
                        <Typography>{text}</Typography>
                      </ListItem>
                    )}
                    no={() => null}
                  />
                )
              }
              return (
                <ListItem
                  button
                  component={StyledNavLink}
                  exact
                  activeStyle={{
                    color: "primary"
                  }}
                  to={`/course/course-${text}`}
                  key={index}>
                  <Typography>{text}</Typography>
                </ListItem>
              )
            })}
          </List>
          <Spacer margin="40px 0 0 0" />
          <Divider />
          <Spacer margin="40px 0 0 0" />
          <div align="center">
            <Link component={NavLink} to="/courses/created">
              My Created Courses
            </Link>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Helmet>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta
              name="description"
              content="Make direct contact with our team throught our contact information form.  We will do our best to respond in a timely manner.  If you are a business or educational institution this would be an ideal place to shoot a short inquiry."
            />
            <meta name="author" content="Isaac Pak" />
            <title>Utterzone | Courses</title>
            <link rel="canonical" href="https://utter.zone/courses" />
          </Helmet>
          {routes.map(route => (
            <SubRoutes key={route.path} {...route} />
          ))}
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(CourseUpdate)
