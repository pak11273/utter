import React from "react"
import {withStyles} from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Typography from "@material-ui/core/Typography"
import Modal from "@material-ui/core/Modal"
import Button from "@material-ui/core/Button"

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
})

class SimpleModal extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const {classes, username} = this.props
    return (
      <div>
        {username && <Button onClick={this.handleOpen}>{username}</Button>}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title" />
            <Typography variant="subtitle1" id="simple-modal-description">
              Follow The App Guidelines.
            </Typography>
            <Button>Add Friend</Button>
            <Button>Whisper</Button>
            <Button>Tip</Button>
            <Button>Block</Button>
            <Button>Report</Button>
            <IconButton
              onClick={this.handleOpen}
              color="secondary"
              className={classes.button}
              aria-label="Add an alarm">
              <MoreVertIcon />
            </IconButton>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    )
  }
}

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal)

export default SimpleModalWrapped
