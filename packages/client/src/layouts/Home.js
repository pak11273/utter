/* eslint-disable react/no-multi-comp */
import {NavLink} from "react-router-dom"
import React, {Component} from "react"
import {withApollo} from "react-apollo"

import {withStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

import {Container, Img, Line, Section} from "../components"
import {Footer, Masthead} from "../containers"

// images
import busyPeopleImg from "../assets/images/busy-people.jpg"
import homeMastheadImg from "../assets/images/two-guys.jpg"
import embarrassedImg from "../assets/images/embarrassed.jpg"
import visitingImg from "../assets/images/walking-around.jpg"

const styles = theme => ({
  root: {
    height: "100%"
  },
  section_odd: {
    flexDirection: "row",
    justifyContent: "center",
    padding: theme.spacing.unit * 2,
    margin: "10px auto 50px",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column-reverse",
      height: "480px"
    }
  },
  section: {
    flexDirection: "row",
    justifyContent: "center",
    padding: theme.spacing.unit * 2,
    margin: "10px auto 50px",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column",
      height: "480px"
    }
  },
  image: {
    width: 128,
    height: 128
  },
  text: {
    color: "white"
  }
})

class Home extends Component {
  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Masthead
          background={`url(${homeMastheadImg}) center/cover`}
          height="760px"
          padding="300px 20px 100px 20px">
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
            Not speaking your new language yet?
          </Typography>
          <Button color="primary" size="medium" variant="outlined">
            <NavLink style={{color: "white", fontSize: "1.4rem"}} to="/about">
              Learn More
            </NavLink>
          </Button>
        </Masthead>
        <Container className={classes.root}>
          <Section className={classes.section} style={{marginTop: "100px"}}>
            <Grid item xs={12}>
              <Img src={`${busyPeopleImg}`} />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="column" spacing={16}>
                <Grid item>
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
                    Those many hours you spent in class don&apos;t have to go to
                    waste. Our platform helps you reclaim that lost knowledge.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Section>
          <Section className={classes.section_odd}>
            <Grid item xs={12} container>
              <Grid container direction="column" spacing={16}>
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
          </Section>
          <Section className={classes.section}>
            <Grid item xs={12}>
              <Img src={`${visitingImg}`} />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="column" spacing={16}>
                <Grid item>
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
                    By immersing yourself on our platform, you can get focused
                    sessions and lots more practice!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Section>
          <Section>
            <Grid container className={classes.section}>
              <Grid item xs={12} sm container>
                <Grid item container spacing={16}>
                  <Grid item xs>
                    <Typography
                      align="left"
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
            </Grid>
          </Section>
          <Section>
            <Grid
              alignItems="flex-start"
              container
              className={classes.section}
              spacing={24}>
              <Typography align="left" gutterBottom variant="h4" component="h2">
                Get Informed
              </Typography>
              <p style={{fontSize: "1.33em", marginBottom: "20px"}}>
                We will be adding Spanish, French and other popular languages in
                the very near future. Learn more about how we think about
                language and what influences Utterzone&apos;s architecture.
              </p>
              <Button size="medium" variant="outlined">
                <a
                  rel="nofollow noopener noreferrer"
                  href="https://medium.com/speak-a-language"
                  target="_blank">
                  Articles
                </a>
              </Button>
            </Grid>
          </Section>
          <Section>
            <Grid
              alignItems="center"
              container
              className={classes.section}
              spacing={24}>
              {/* TODO: sponsorship feature
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
							*/}
            </Grid>
          </Section>
          <Footer />
        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(withApollo(Home))
