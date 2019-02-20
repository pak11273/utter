import React, {PureComponent} from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"

class Test extends PureComponent {
  handleOpen = () => {}

  render() {
    return (
      <React.Fragment>
        <h6>Test CRUD</h6>
        <div>
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="simple-dialog-title"
            >
            <DialogTitle id="simple-dialog-title">
              Set backup account
            </DialogTitle>
          </Dialog>
        </div>
        <li>
          hello
          <Button click={this.handleOpen}>Edit</Button>
          <Button>Delete</Button>
        </li>
      </React.Fragment>
    )
  }
}

export default Test
