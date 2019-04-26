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
          <link rel="canonical" href="https://utter.zone/account" />
        </Helmet>
        <Container className={classes.root}>
          <Masthead
            className={classes.masthead}
            background={`url("https://s.hswstatic.com/gif/brain-1.jpg") #000 no-repeat center/contain`}
            height="400px"
            width="300px"
          />
          <Section className={classes.section}>
            <Typography
              variant="h4"
              align="center"
              className={classes.text}
              component="p"
              gutterBottom>
              Account Page
            </Typography>
          </Section>
          <Footer />
        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(About)
