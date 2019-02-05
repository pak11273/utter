import React, {Component} from "react"
import {connect} from "react-redux"
import {
  Redirect
  /* Switch, */
  /* Route */
  /* Link, */
} from "react-router-dom"
/* import Select from "react-select" */

import {withStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import {cloneDeep} from "lodash"
import {Helmet} from "react-helmet"

import AppsContainer from "../../../apps/apps-container"
/* import {Section} from "../../../components" */
import {Chat} from "../../../containers"
import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader
/* import "./styles.css" */

// actions
import {toggleFooter} from "../../../core/actions/toggle-footer-action.js"

/* const getCourse = gql` */
/*   query getCourse($courseId: String) { */
/*     getCourse(courseId: $courseId) { */
/*       course { */
/*         id */
/*         courseImage */
/*         courseName */
/*         courseMode */
/*         owner { */
/*           username */
/*         } */
/*       } */
/*     } */
/*   } */

/* ` */

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
})

const Loader = () => <div>Loading...</div>

const initialState = {
  courseRef: "",
  user: null,
  isRegisterInProcess: false,
  chatrooms: null
}

class Zone extends Component {
  locationName = this.props.path

  state = cloneDeep(initialState)

  componentDidMount() {
    this.props.toggleFooter(false)
  }

  onLeaveChatroom = (chatroomName, onLeaveSuccess) => {
    this.state.client.leave(chatroomName, err => {
      if (err) return console.error(err)
      return onLeaveSuccess()
    })
  }

  getChatrooms = () => {
    this.state.client.getChatrooms((err, chatrooms) => {
      this.setState({chatrooms})
    })
  }

  register = name => {
    const onRegisterResponse = user =>
      this.setState({isRegisterInProcess: false, user})
    this.setState({isRegisterInProcess: true})
    this.state.client.register(name, (err, user) => {
      if (err) return onRegisterResponse(null)
      return onRegisterResponse(user)
    })
  }

  renderUserSelectionOrRedirect = renderUserSelection => {
    if (this.state.user) {
      return <Redirect to="/" />
    }

    return this.state.isRegisterInProcess ? <Loader /> : renderUserSelection()
  }

  /* renderChatroomOrRedirect = (chatroom, {history}) => { */
  /*   if (!this.state.user) { */
  /*     return <Redirect to="/" /> */
  /*   } */

  /*   const {chatHistory} = history.location.state */

  /*   return ( */
  /*     <Chatroom */
  /*       chatroom={chatroom} */
  /*       chatHistory={chatHistory} */
  /*       user={this.state.user} */
  /*       onLeave={() => */
  /*         this.onLeaveChatroom(chatroom.name, () => history.push("/")) */
  /*       } */
  /*       onSendMessage={(message, cb) => */
  /*         this.state.client.message(chatroom.name, message, cb) */
  /*       } */
  /*       registerHandler={this.state.client.registerHandler} */
  /*       unregisterHandler={this.state.client.unregisterHandler} */
  /*     /> */
  /*   ) */
  /* } */

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Edit your course.  Add material that you are using from another learning resource and make it your own.  Create a strategy that think makes the most sense and is pedagogically sound."
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Course Edit</title>
          <link rel="canonical" href="https://utter.zone/course/:id" />
        </Helmet>

        <Grid container spacing={24} className={classes.root}>
          <Grid item xs={8}>
            <AppsContainer />
          </Grid>
          <Grid item xs={4}>
            <div style={{background: "LightGray"}}>
              <Chat />
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  {toggleFooter}
)(withStyles(styles)(Zone))
