import React from "react"
import {NavLink} from "react-router-dom"

import AddIcon from "@material-ui/icons/Add"
import Avatar from "@material-ui/core/Avatar"
/* import Button from "@material-ui/core/Button" */
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
/* import DialogContent from "@material-ui/core/DialogContent" */
/* import DialogContentText from "@material-ui/core/DialogContentText" */
import DialogTitle from "@material-ui/core/DialogTitle"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import PersonIcon from "@material-ui/icons/Person"
/* import Typography from "@material-ui/core/Typography" */
/* import blue from "@material-ui/core/colors/blue" */

import {LoadingButton} from "../../../components"

export default props => {
  const {classes, onClose, selectedValue, ...other} = props

  /* <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          By terminating this zone it will no longer exist and will not be
          listed anymore. You will be able to host another zone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          disabled={props.loading}
          loading={props.loading}
          color="secondary"
          variant="contained"
          onClick={props.onLeave}
          autoFocus>
          Translate
        </LoadingButton>
        <Button onClick={props.handleClose} color="secondary">
          Rate
        </Button>
        <Button onClick={props.handleClose} color="secondary">
          Add Friend
        </Button>
      </DialogActions>
    </Dialog> */

  return (
    <Dialog
      open={props.open}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      {...other}>
      <DialogActions>
        <NavLink target="_blank" to={`/profile/${props.username}`}>
          <LoadingButton
            disabled={props.loading}
            loading={props.loading}
            color="secondary"
            variant="contained"
            onClick={NavLink}
            autoFocus>
            View Profile
          </LoadingButton>
        </NavLink>
        <LoadingButton
          disabled={props.loading}
          loading={props.loading}
          color="primary"
          variant="contained"
          onClick={props.onLeave}
          autoFocus>
          Add Friend
        </LoadingButton>
      </DialogActions>
      <DialogTitle id="simple-dialog-title">
        {" "}
        (avatar) {props.username}
      </DialogTitle>
      <div>
        <List>
          <ListItem button onClick={() => console.log("bye")}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="listen" />
          </ListItem>
          <ListItem button onClick={() => console.log("hi")}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="translate" />
          </ListItem>
          <ListItem button onClick={() => console.log("addAccount")}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="rate" />
          </ListItem>
        </List>
      </div>
    </Dialog>
  )
}
