import React, {PureComponent} from "react"

import AlternateEmail from "@material-ui/icons/AlternateEmail"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import {withStyles} from "@material-ui/core/styles"

import {styles} from "./styles.js"

class Subscribe extends PureComponent {
  state = {
    name: "",
    open: false
  }

  componentDidMount() {
    this.forceUpdate()
  }

  handleChange = event => {
    this.setState({name: event.target.value})
  }

  handleClickOpen = () => {
    // TODO: this opens up the modal to a custom subscription box.  currently using campayn's hosted option.
    /* this.setState({open: true}) */

    // campayn's hosted subscriber page
    window.location.href = "http://cm.pn/4csy"
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = new FormData(e.target)
    console.log("this.state: ", this.state)
    data.append("name", this.state.name)
    data.append("formId", 84377)

    fetch(
      "https://pak11273.campayn.com/contacts/signup_form_add_contact/89623",
      {
        method: "POST",
        body: data,
        headers: {
          Origin: "https://192.168.68.8:8080",
          "Content-Type": "application/json"
        }
      }
    )
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form_dialog_title">
          <DialogTitle>
            <span className={classes.form_dialog_title}>
              We email occasionally...
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Subscribe if you would like to hear about our latest news,
              promotions, updates, research and development.
            </DialogContentText>
            <form onSubmit={this.handleSubmit} id="signupSubscriberForm">
              <input type="hidden" name="formId" value="84355" readOnly />
              <FormControl style={{marginTop: "20px", width: "100%"}}>
                <InputLabel htmlFor="component-simple">
                  Email Address
                </InputLabel>
                <Input
                  required
                  autoFocus
                  id="component-simple"
                  name="email"
                  onChange={this.handleChange}
                  type="email"
                  value={this.state.name}
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions
            style={{
              padding: "0 14px 22px 10px",
              justifyContent: "space-between"
            }}>
            <Button onClick={this.handleSubmit} color="primary" type="submit">
              Subscribe
            </Button>
            <p>
              powered by{" "}
              <a
                href="https://campayn.com"
                className="cmpLnk"
                target="_blank"
                rel="noopener noreferrer nofollow">
                {" "}
                campayn{" "}
              </a>
            </p>
          </DialogActions>
        </Dialog>
        <Button
          variant="contained"
          onClick={this.handleClickOpen}
          color="primary"
          style={{
            zIndex: 9999,
            position: "fixed",
            bottom: "10px",
            right: "10px",
            minWidth: "300px",
            minHeight: "80px"
          }}
          type="button">
          <AlternateEmail
            style={{
              color: "red",
              height: "45px",
              padding: "5px",
              width: "60px"
            }}
          />
          <span style={{fontSize: "1.5em"}}>Utterzone Newsletter</span>
        </Button>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Subscribe)
