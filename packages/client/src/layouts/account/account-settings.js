import React, {Component} from "react"
/* import {Route, NavLink} from "react-router-dom" */
import {NavLink} from "react-router-dom"

import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
/* import Grid from "@material-ui/core/Grid" */
import Link from "@material-ui/core/Link"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import {withStyles} from "@material-ui/core/styles"

/* import cloneDeep from "lodash/cloneDeep" */
/* import {Query} from "react-apollo" */
/* import gql from "graphql-tag" */

import {Spacer} from "../../components"

const drawerWidth = 240

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

class AccountSettings extends Component {
  locationName = this.props.path

  constructor(props) {
    super(props)

    this.state = {}
  }

  /*   handleImageClick = e => { */
  /*     e.preventDefault() */
  /*     // TODO */
  /*   } */

  render() {
    const {classes} = this.props
    /* const SubRoutes = route => ( */
    /*   <Route */
    /*     path={route.path} */
    /*     render={props => <route.component {...props} routes={route.routes} />} */
    /*   /> */
    /* ) */
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
            {["settings"].map((text, index) => {
              /* if (text === "settings") {
                return (
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
                )
              } */
              return (
                <ListItem button key={index}>
                  <Link component={NavLink} to={`/profile/profile-${text}`}>
                    <ListItemText primary={text} />
                  </Link>
                </ListItem>
              )
            })}
          </List>
          <Spacer margin="40px 0 0 0" />
          <Divider />
          <Spacer margin="40px 0 0 0" />
        </Drawer>
      </form>
    )
  }
}

export default withStyles(styles)(AccountSettings)
/*         <Query */
/*           query={getUserByUsername} */
/*           variables={{ */
/*             input: "pak11273" */
/*           }}> */
/*           {({loading, error, data}) => { */
/*             if (loading) return <Grid>loading...</Grid> */
/*             if (error) { */
/*               console.log("err: ", error) */
/*               return ( */
/*                 <Grid> */
/*                   <p> */
/*                     {error.graphQLErrors.map(({message}, i) => ( */
/*                       <p */
/*                         style={{ */
/*                           fontSize: "1.3em", */
/*                           color: "red", */
/*                           margin: "30px", */
/*                           padding: "30px", */
/*                           textAlign: "center" */
/*                         }} */
/*                         key={i}> */
/*                         {message} */
/*                       </p> */
/*                     ))} */
/*                   </p> */
/*                 </Grid> */
/*               ) */
/*             } */
/* if (true) { */
/*   ;<Grid container justify="center" direction="column"> */
/*     {routes.map(route => ( */
/*       <SubRoutes key={route.path} {...route} /> */
/*     ))} */
/*   </Grid> */
/* } */
/*           }} */
/*         </Query> */
