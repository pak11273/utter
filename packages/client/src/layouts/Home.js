/* eslint-disable react/no-multi-comp */
import {connect} from "react-redux"
import {NavLink} from "react-router-dom"
import React, {Component} from "react"

import {withStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Avatar from "@material-ui/core/Avatar"
/* import Paper from "@material-ui/core/Paper" */
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
/* import Divider from "@material-ui/core/Divider" */

import {
  /* Box, */
  ButtonCta,
  Container,
  Img,
  Line,
  Section
} from "../components"
import {Masthead} from "../containers"

// images
import busyPeopleImg from "../assets/images/busy-people.jpg"
import homeMastheadImg from "../assets/images/two-guys.jpg"
import embarrassedImg from "../assets/images/embarrassed.jpg"
import ceoImg from "../assets/images/ceo.jpg"
import visitingImg from "../assets/images/walking-around.jpg"

// actions
import {toggleFooter} from "../core/actions/toggle-footer-action.js"

const styles = theme => ({
  root: {
    height: "100%"
    /* minHeight: "1300px" */
  },
  section_odd: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column-reverse"
    }
  },
  section: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column"
    }
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  text: {
    color: "white"
  }
})

class Home extends Component {
  componentDidMount() {
    this.props.toggleFooter(true)
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Masthead
          background={`url(${homeMastheadImg}) center/cover`}
          height="760px"
          padding="200px 20px 100px 20px">
          <Typography
            variant="h2"
            align="center"
            className={classes.text}
            gutterBottom>
            Speak another language
          </Typography>
          <Typography
            variant="h4"
            align="center"
            className={classes.text}
            gutterBottom>
            Not speaking your new language yet? We can help.
          </Typography>
          <ButtonCta color="black">
            <NavLink style={{fontSize: "1.8rem"}} to="/about">
              Learn More
            </NavLink>
          </ButtonCta>
        </Masthead>
        <Container className={classes.root}>
          <Section>
            <Grid
              alignItems="center"
              container
              className={classes.section}
              spacing={24}>
              <Grid item>
                <Img src={`${busyPeopleImg}`} />
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h4"
                      component="h2">
                      Studied a second language in school but can&apos;t hold a
                      basic conversation.
                    </Typography>
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h6"
                      paragraph>
                      Those many hours you spent in class don&apos;t have to go
                      to waste. Our platform helps you reclaim that lost
                      knowledge.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Section>
          <Section>
            <Grid alignItems="center" container className={classes.section_odd}>
              <Grid item xs={12} sm container>
                <Grid item container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h4"
                      component="h2">
                      The fear of embarrassment.
                    </Typography>
                    <Line />
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h6"
                      paragraph>
                      You will be learning with peers. Meaning you will be
                      speaking with people who are at your level.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Img src={`${embarrassedImg}`} />
              </Grid>
            </Grid>
          </Section>
          <Section>
            <Grid
              alignItems="center"
              container
              className={classes.section}
              spacing={24}>
              <Grid item>
                <Img src={`${visitingImg}`} />
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h4"
                      component="h2">
                      So you can&apos;t go to another country and fully immerse
                      yourself.
                    </Typography>
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h6"
                      paragraph>
                      Those many hours you spent in class don&apos;t have to go
                      to waste. Our platform helps you reclaim that lost
                      knowledge.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Section>
          <Section>
            <Grid
              alignItems="center"
              container
              className={classes.section}
              spacing={24}>
              <Grid item xs={12} sm container>
                <Grid item container spacing={16}>
                  <Grid item xs>
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h4"
                      component="h2">
                      Bilingual Benefits
                    </Typography>
                    <p style={{fontSize: "1.33em"}}>
                      People who are bilingual have more opportunities to make
                      income
                    </p>
                    <p style={{fontSize: "1.33em"}}>
                      Language is the most important piece to learning another
                      country&apos;s culture
                    </p>
                    <p style={{fontSize: "1.33em"}}>
                      This is the gateway to adapting to the global economy.
                    </p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container spacing={16}>
                <Avatar alt="ceo" src={`${ceoImg}`} />
                <b>Isaac Pak</b> CEO of Utterzone.com
                <Typography align="center" gutterBottom variant="h6" paragraph>
                  &quot;I built this platform and used it exclusively to learn
                  my native tongue. After 6 months of use I can have meaningful,
                  everyday conversations with native speakers.&quot;
                </Typography>
              </Grid>
            </Grid>
          </Section>
          <Section>
            <Grid
              alignItems="center"
              container
              className={classes.section}
              spacing={24}>
              <h3 style={{fontSize: "2em"}}>Latest News</h3>
              <p style={{fontSize: "1.33em"}}>
                We will be adding Spanish, French and other popular languages in
                the very near future. Subscribe to our newsletter and find out
                when we add a course for your language!
              </p>
              <Button size="medium" variant="outlined">
                <NavLink to="#">Subscribe</NavLink>
              </Button>
            </Grid>
          </Section>
          <Section>
            <Grid
              alignItems="center"
              container
              className={classes.section}
              spacing={24}>
              <h3 style={{fontSize: "2em"}}>Can&apos;t afford the program?</h3>
              <p style={{fontSize: "1.33em"}}>
                Get sponsored. There are many people who are willing to support
                you in this learning endeavor, but they don&apos;t know about
                your interest in language learning. We can help facilitate this
                process by informing and petitioning these sponsors.
              </p>
              <Button size="medium" variant="outlined">
                <NavLink to="/sponsorship">Find out more</NavLink>
              </Button>
            </Grid>
          </Section>
        </Container>
      </React.Fragment>
    )
  }
}

const actions = {
  toggleFooter
}

export default connect(
  null,
  actions
)(withStyles(styles)(Home))
