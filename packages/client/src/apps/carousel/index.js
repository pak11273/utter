import React, {PureComponent} from "react"

import CardHeader from "@material-ui/core/CardHeader"
import Collapse from "@material-ui/core/Collapse"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
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

import "react-responsive-carousel/lib/styles/carousel.min.css"
import {Carousel} from "react-responsive-carousel"

import classNames from "classnames"
import {styles} from "./styles.js"
import "./overrides.css"

// images
import busyPeopleImg from "../../assets/images/busy-people.jpg"

const RandomCard = ({
  classes,
  expanded,
  handleExpandClick,
  toggleTranslate,
  translation
}) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title="Word"
        subheader="Translated"
      />
      <CardMedia
        className={classes.media}
        image={`${busyPeopleImg}`}
        title="Paella dish"
      />
      <CardContent>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            justifycontent: "center"
          }}>
          <Button onClick={toggleTranslate}>{translation}</Button>
        </div>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={classNames(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography className={classes.cardTitle} gutterBottom component="p">
            Annyoeng ha seyo. Je idamun Pak Fan Foo imnida. Howa bouta you? What
            isa youza nama??
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

class HostControls extends PureComponent {
  render() {
    return (
      <div>
        <Carousel
          infiniteLoop={true}
          showThumbs={false}
          showIndicators
          showArrows
          showStatus>
          <div>
            <RandomCard {...this.props} />
          </div>
          <div>
            <RandomCard {...this.props} />
          </div>
        </Carousel>
      </div>
    )
  }
}

class BrainStorm extends PureComponent {
  state = {
    translation: "translation",
    expanded: false
  }

  componentDidMount() {
    // get app info and load app here
  }

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}))
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
              CAROUSEL
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <HostControls {...this.props} {...this.state} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(BrainStorm)
