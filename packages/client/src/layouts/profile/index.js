import React, {Component} from "react"
import {Route, NavLink} from "react-router-dom"

import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import styled from "styled-components"
import cloneDeep from "lodash/cloneDeep"
import {Helmet} from "react-helmet-async"
import {Query} from "react-apollo"
import gql from "graphql-tag"

import {Spacer} from "../../components"

const drawerWidth = 240

const StyledNavLink = styled(NavLink)`
  grid-area: ${props => props.gridarea};
  color: #003478;
  &:hover {
    color: red;
    text-decoration: underline;
  }
`

const styles = theme => ({
  content: {
    flexGrow: 1,
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
    display: "flex"
  }
})

const initialState = {
  resources: ""
}

const getUserByUsername = gql`
  query getUserByUsername($input: String!) {
    getUserByUsername(input: $input) {
      id
      email
      password
      roles
      rights
      contacts
      username
      createdAt
      updatedAt
    }
  }
`

class Profile extends Component {
  locationName = this.props.path

  constructor(props) {
    super(props)

    this.state = cloneDeep(initialState)
  }

  handleImageClick = e => {
    e.preventDefault()
    // TODO
  }

  render() {
    const {classes, routes} = this.props
    const SubRoutes = route => (
      <Route
        path={route.path}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    )
    return (
      <form className={classes.root} autoComplete="off">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}>
          <Spacer margin="200px 0 0 0" />
          <List className={classes.list}>
            {["profile"].map((text, index) => {
              /*    if (text === "settings") {
                return 
                    <Can
                    key={text}
                    roles={user.roles}
                    perform="course:update"
                    id={user.username}
                    matchingID={user.username}
                    yes={() => (
                      <ListItem button key={index}>
                        <Link component={NavLink} to="/course/course-settings">
                          <ListItemText primary={text} />
                        </Link>
                      </ListItem>
                    )}
                    no={() => null}
                  /> 
                
              } */
              return (
                <ListItem
                  button
                  component={StyledNavLink}
                  exact
                  activeStyle={{
                    color: "primary"
                  }}
                  to={`/profile/profile-${text}`}
                  key={index}>
                  <Typography>{text}</Typography>
                </ListItem>
              )
            })}
          </List>
          <Spacer margin="40px 0 0 0" />
          <Divider />
          <Spacer margin="40px 0 0 0" />
        </Drawer>
        <main className={classes.content}>
          <Helmet>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="description" content="Profile page" />
            <meta name="author" content="Isaac Pak" />
            <title>Utterzone | Profile</title>
            <link rel="canonical" href="https://utter.zone/courses" />
          </Helmet>
        </main>
        <Query
          query={getUserByUsername}
          variables={{
            input: "pak11273"
          }}>
          {({loading, error, data}) => {
            if (loading) return <Grid>loading...</Grid>
            if (error) {
              console.log("err: ", error)
              return (
                <Grid>
                  <p>
                    {error.graphQLErrors.map(({message}, i) => (
                      <p
                        style={{
                          fontSize: "1.3em",
                          color: "red",
                          margin: "30px",
                          padding: "30px",
                          textAlign: "center"
                        }}
                        key={i}>
                        {message}
                      </p>
                    ))}
                  </p>
                </Grid>
              )
            }
            if (data) {
              return (
                <Grid container justify="center" direction="column">
                  {routes.map(route => (
                    <SubRoutes key={route.path} {...route} />
                  ))}
                </Grid>
              )
            }
          }}
        </Query>
      </form>
    )
  }
}

export default withStyles(styles)(Profile)
