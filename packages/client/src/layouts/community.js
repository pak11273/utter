import React, {Component} from "react"
/* import {NavLink} from "react-router-dom" */
import Button from "@material-ui/core/Button"
import {Helmet} from "react-helmet-async"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {Container} from "../components"
import {Footer, Masthead} from "../containers"
import CommunityImg from "../assets/images/community_header.png"

const styles = theme => ({
  root: {
    backgroundColor: "black",
    height: "100%"
  },
  link: {
    fontSize: theme.spacing.unit * 3
  },
  text: {
    color: "white"
  },
  masthead: {
    padding: theme.spacing.unit * 1,
    margin: "auto",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column"
    }
  },
  section: {
    padding: theme.spacing.unit * 1,
    margin: "0 auto 100px",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column"
    }
  }
})

class About extends Component {
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
            content="Join a community of language learners and discuss everything about learning languages on our forum.  We welcome conversations about our platform and welcome any constructive feedback."
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | About</title>
          <link rel="canonical" href="https://UtterZone/community" />
        </Helmet>
        <Container className={classes.root}>
          <Masthead
            background={`url(${CommunityImg}) center/cover`}
            height="760px"
            padding="300px 20px 100px 20px">
            <Typography
              variant="h4"
              align="left"
              style={{
                maxWidth: "900px"
              }}
              className={classes.text}>
              Have any questions, ideas or need technical support?
            </Typography>
            <Typography
              variant="h4"
              align="left"
              style={{
                maxWidth: "900px"
              }}
              className={classes.text}
              gutterBottom>
              Come check out our support forum.
            </Typography>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="http://utterzone.boards.net">
              <Button className={classes.link} color="primary">
                UtterZone Forum
              </Button>
            </a>
          </Masthead>
          <Footer />
        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(About)
