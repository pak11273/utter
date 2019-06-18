import React, {PureComponent} from "react"
import {Route, NavLink} from "react-router-dom"
import {session} from "brownies"

import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Link from "@material-ui/core/Link"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import styled from "styled-components"
import cloneDeep from "lodash/cloneDeep"
import {Spacer} from "../../components"

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

class AdminUpdate extends PureComponent {
  locationName = this.props.path

  constructor(props) {
    super(props)

    this.state = cloneDeep(initialCoursesContainerState)
  }

  render() {
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
            {["settings", "users", "beta-testers", "carousel", "socketio"].map(
              (text, index) => {
                return (
                  <ListItem
                    button
                    component={StyledNavLink}
                    exact
                    activeStyle={{
                      color: "primary"
                    }}
                    to={`/admin/admin-${text}`}
                    key={index}>
                    <Typography>{text}</Typography>
                  </ListItem>
                )
              }
            )}
          </List>
          <Spacer margin="40px 0 0 0" />
          <Divider />
          <Spacer margin="40px 0 0 0" />
          <div align="center">
            <Link component={NavLink} to="#">
              <Typography>Unused Link</Typography>
            </Link>
          </div>
        </Drawer>
        <main className={classes.content}>
          {routes.map((route, i) => (
            <React.Fragment key={i}>
              {session.layoutError ? (
                <div
                  style={{
                    color: "red",
                    fontFamily: "sans-serif",
                    fontSize: "1.2em",
                    lineHeight: "3em",
                    maxWidth: "650px",
                    position: "absolute",
                    textAlign: "center",
                    top: 300
                  }}>
                  {session.layoutError}
                </div>
              ) : (
                <SubRoutes key={route.path} {...route} />
              )}
            </React.Fragment>
          ))}
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(AdminUpdate)
