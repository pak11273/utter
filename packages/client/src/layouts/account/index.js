import React, {Component} from "react"
import {Route, NavLink} from "react-router-dom"
/* import {session} from "brownies" */

import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Grid from "@material-ui/core/Grid"
/* import Link from "@material-ui/core/Link" */
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
/* import ListItemText from "@material-ui/core/ListItemText" */
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import styled from "styled-components"
import {styles} from "./styles.js"
import cloneDeep from "lodash/cloneDeep"
/* import {Query} from "react-apollo" */
/* import gql from "graphql-tag" */

import {Spacer} from "../../components"

const StyledNavLink = styled(NavLink)`
  grid-area: ${props => props.gridarea};
  color: #003478;
  &:hover {
    color: red;
    text-decoration: underline;
  }
`

const initialState = {
  resources: ""
}

class Account extends Component {
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
      <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}>
          <Spacer margin="200px 0 0 0" />
          <List className={classes.list}>
            {["settings" /* "billing" */].map((text, index) => {
              return (
                <ListItem
                  button
                  component={StyledNavLink}
                  exact
                  activeStyle={{
                    color: "primary"
                  }}
                  to={`/account/account-${text}`}
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
        <Grid container justify="center" direction="column">
          {routes.map(route => (
            <SubRoutes key={route.path} {...route} />
          ))}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Account)
