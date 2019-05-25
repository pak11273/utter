/* eslint-disable react/no-multi-comp */
import React, {Component} from "react"
import {withApollo} from "react-apollo"

import {withStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

import {Container, Img, Line, Section} from "../components"
import {Footer, Masthead} from "../containers"

// images
import busyPeopleImg from "../assets/images/busy-people2.png"
import homeMastheadImg from "../assets/images/two-guys.jpg"
import embarrassedImg from "../assets/images/embarrassed2.png"
import visitingImg from "../assets/images/walk-around2.png"
import {styles} from "./styles.js"

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
            Online Social Learning
          </Typography>
          <Typography
            variant="h4"
            align="center"
            className={classes.text}
            gutterBottom>
            The world&apos;s first online social language learning platform. We
            use creative and effective methods to get you speaking your new
            language.
          </Typography>
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
                    What is Online Social Learning?
                  </Typography>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h6"
                    paragraph>
                    Online social learning is where you learn with other people.
                    A hub where people interact with other peoople who are
                    interested in learning in REAL TIME. Your mind is more
                    engaged in a setting where it is interacting with another
                    mind than just learning by yourself. It&apost;s the
                    equivalent to a language learning meetup. Not everyone has
                    the same schedule so we bring you the most opportunity to
                    practice speaking with people all over the world.
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
                    Apps
                  </Typography>
                  <Line />
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h6"
                    paragraph
                  />
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
                    UtterZone Apps
                  </Typography>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h6"
                    paragraph>
                    Apps are used to build structure to your learning. We plan
                    on creating the most effective apps so you will stay focused
                    and interested during your time learning with others.
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
