import React, {PureComponent} from "react"
import {NavLink} from "react-router-dom"

import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"

/* import LoadingButton from "../buttons/loading-button.js" */

class ZoneMembersTooltip extends PureComponent {
  state = {
    open: false
  }

  toggleState = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    /* const {classes} = this.props */
    console.log("zone members: ", this.props)
    return (
      <Tooltip
        placement="left"
        interactive
        open={this.props.open}
        /* onClose={this.toggleState}
        onOpen={this.toggleState}
        classes={{
          popper: classes.htmlPopper,
          tooltip: classes.htmlTooltip
        }}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(this.state.arrowRef),
                element: this.state.arrowRef
              }
            }
          }
        }}
				*/
        title={
          <div>
            <Typography color="inherit">Tooltip with HTML</Typography>
            <NavLink target="_blank" to={`/profile/${this.props.username}`}>
              <Button color="secondary" variant="contained" onClick={NavLink}>
                View Profile
              </Button>
            </NavLink>

            {/* <LoadingButton
              disabled={this.props.loading}
              loading={this.props.loading}
              color="primary"
              variant="contained"
              onClick={this.addContact(this.props.username)}
              autoFocus>
              Add Contact
            </LoadingButton> */}
          </div>
        }>
        {this.props.children}
      </Tooltip>
    )
  }
}

export default ZoneMembersTooltip
