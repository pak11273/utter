/* eslint-disable no-labels, no-unused-labels, no-restricted-syntax */

import React, {PureComponent} from "react"
import {NavLink} from "react-router-dom"

import Button from "@material-ui/core/Button"
/* import IconButton from "@material-ui/core/IconButton" */
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
/* import Play from "@material-ui/icons/PlayArrow" */
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

/* import LoadingButton from "../buttons/loading-button.js" */
import Flex from "../Flex"

const styles = () => {
  customWidth: {
    maxWidth: 1000
  }
}

class ZoneMembersTooltip extends PureComponent {
  state = {
    open: false
  }

  toggleState = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    const {classes} = this.props
    console.log("zone members: ", this.props)

    return (
      <Tooltip
        classes={{tooltip: classes.customWidth}}
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
          <Flex>
            <List>
              <ListItem style={{justifyContent: "center"}}>
                <Typography variant="h6" color="inherit">
                  {this.props.username}
                </Typography>
              </ListItem>
              {/* <ListItem>
                <IconButton onClick={() => this.playAudio()}>
                  <Play />
                </IconButton>
              </ListItem> */}
              <ListItem>
                <Flex flexdirection="row">
                  <NavLink
                    target="_blank"
                    to={`/profile/${this.props.username}`}>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={NavLink}
                      size="small"
                      style={{marginRight: "10px"}}>
                      View Profile
                    </Button>
                  </NavLink>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => this.addContact(this.props.username)}
                    size="small">
                    Add Contact
                  </Button>
                </Flex>
              </ListItem>
            </List>
          </Flex>
        }>
        {this.props.children}
      </Tooltip>
    )
  }
}

export default withStyles(styles)(ZoneMembersTooltip)
