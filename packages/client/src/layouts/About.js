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
          <link rel="canonical" href="https://utter.zone/about" />
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
              We help you harness the greatest learning tool in the world! Our
              platform allows you to naturally learn a language.
            </Typography>
            <Typography
              variant="h2"
              align="center"
              className={classes.text}
              component="p"
              gutterBottom>
              No tricks, no gimmicks.
            </Typography>
            <Typography
              align="center"
              variant="h6"
              className={classes.text}
              component="p"
              gutterBottom>
              Our goal is to bring peace to the world by language. As the world
              has become more global, one of the major problems we have is
              misunderstandings due to cultural differences. Language happens to
              be the biggest cultural gap between nations and it&apos;s our
              desire to see that change. But learning a new language is a very
              difficult and hard to become fluent in. We make every endeavor to
              not make it any simpler, but to make it more available and more
              efficient to learn.
            </Typography>
          </Section>
          <Footer />
        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(About)
