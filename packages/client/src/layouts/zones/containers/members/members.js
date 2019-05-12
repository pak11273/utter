import React, {PureComponent} from "react"

import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
/* import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction" */
import {withStyles} from "@material-ui/core/styles"

import MemberModal from "./member-modal.js"
import ceoImg from "../../../../assets/images/ceo.jpg"

const styles = theme => ({
  root: {
    backgroundColor: "orange",
    height: "100%",
    width: "100%"
  },
  paper: {
    textAlign: "left",
    color: theme.palette.text.primary
  }
})

class Members extends PureComponent {
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Grid container>
          {this.props.usersList.map((user, i) => [
            <Grid item key={i} xs={12} sm={2} lg={1}>
              <Paper className={classes.paper}>
                <a
                  href="/pak11273"
                  rel="nofollow noopener noreferrer"
                  target="_blank">
                  <Avatar alt={`Avatar n°${0 + 1}`} src={`${ceoImg}`} />
                </a>
                <MemberModal username={user} />
              </Paper>
            </Grid>
          ])}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Members)
