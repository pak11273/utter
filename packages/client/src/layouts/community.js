import React, {Component} from "react"
import {Helmet} from "react-helmet-async"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {Container, Section} from "../components"
import {Footer, Masthead} from "../containers"

const styles = theme => ({
  root: {
    backgroundColor: "black",
    height: "100%"
  },
  link: {
    color: "red",
    visited: "yellow",
    fontSize: theme.spacing.unit * 4
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
            content="We aim to make the world a better place with communication."
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | About</title>
          <link rel="canonical" href="https://utter.zone/about" />
        </Helmet>
        <Container className={classes.root}>
          <Masthead
            className={classes.masthead}
            background={`url("https://ico.ku.edu.tr/wp-content/uploads/2014/08/ICO_Studying-400x400.jpg") #000 no-repeat center/contain`}
            height="400px"
            width="300px"
          />
          <Section className={classes.section}>
            <Typography
              variant="h6"
              align="center"
              className={classes.text}
              component="p"
              gutterBottom>
              Have any questions, ideas or need technical support? Go check out
              our support forum. You can also use the forum to chat with others
              and just talk about language learning in general.
            </Typography>
            <a
              className={classes.link}
              href="http://utterzone.boards.net"
              rel="noopener noreferrer"
              target="_blank">
              Go the Forums!
            </a>
          </Section>
          <Footer />
        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(About)
