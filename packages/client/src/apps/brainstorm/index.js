import React, {PureComponent} from "react"

import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
/* import ExpansionPanel from "@material-ui/core/ExpansionPanel" */
/* import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions" */
/* import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails" */
import Grid from "@material-ui/core/Grid"
/* import IconButton from "@material-ui/core/IconButton" */
/* import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled" */
import {withStyles} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

import classNames from "classnames"

// images
import busyPeopleImg from "../../assets/images/busy-people.jpg"

const styles = () => ({
  root: {
    backgroundColor: "#3e3e3e"
  },
  appTitle: {
    color: "white",
    padding: "15px"
  },
  card: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    flexDirection: "column"
  },
  cardActions: {
    display: "flex",
    justifyContent: "center"
  },
  cardMedia: {
    /* paddingTop: "56.25%", // 16:9 */
    paddingTop: "46.25%",
    "&:hover": {
      cursor: "pointer"
    }
  },
  cardContent: {
    flexGrow: 1
  },
  cardTitle: {
    height: "100%"
  }
  /* img: { */
  /*   height: "70%", */
  /*   margin: "auto", */
  /*   display: "block" */
  /* } */
})

class BrainStorm extends PureComponent {
  state = {
    translation: "translation"
  }

  componentDidMount() {
    // get app info from redux and load app here
  }

  toggleTranslate = () => {
    if (this.state.translation === "translation") {
      this.setState({
        translation: "Here's Johnny!!"
      })
    } else {
      this.setState({
        translation: "translation"
      })
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} align="right">
            <Typography className={classes.appTitle} gutterBottom component="p">
              BRAINSTORM
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardMedia
                onClick={() => this.handleImageClick}
                className={classNames(classes.cardMedia, classes.img)}
                image={`${busyPeopleImg}`}
                title="Busy People"
              />
              <CardMedia />
              <CardContent className={classes.cardContent}>
                <Typography
                  className={classes.cardTitle}
                  gutterBottom
                  component="p">
                  Annyoeng ha seyo. Je idamun Pak Fan Foo imnida. Howa bouta
                  you? What isa youza nama??
                </Typography>
                <CardActions className={classes.cardActions}>
                  <div
                    style={{
                      display: "flex",
                      flexGrow: 1,
                      flexDirection: "column",
                      justifycontent: "center"
                    }}>
                    <Button onClick={this.toggleTranslate}>
                      {this.state.translation}
                    </Button>
                  </div>
                </CardActions>
              </CardContent>
            </Card>
            <Grid item xs={12} />
          </Grid>
        </Grid>
        <Grid item xs={12} align="center">
          {/*         <ExpansionPanel>
            <ExpansionPanelActions>
              <ExpansionPanelDetails>
                <p>Host Controls</p>
              </ExpansionPanelDetails>
            </ExpansionPanelActions>
          </ExpansionPanel>  */}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(BrainStorm)
