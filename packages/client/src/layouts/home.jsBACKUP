/* eslint-disable react/no-multi-comp */
/* import {NavLink} from "react-router-dom" */
import {Helmet} from "react-helmet-async"
import React, {Component} from "react"
import {withApollo} from "react-apollo"
import socketio from "../services/socketio/socketio-mgr.js"
/* import classNames from "classnames" */

import Button from "@material-ui/core/Button"
import {withStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import {
  Container,
  Flex,
  Img,
  Line,
  Section,
  /* Spacer, */
  Subscribe
} from "../components"
import {Footer, Masthead} from "../containers"
import {styles} from "./styles.js"

/* import Loading from "../components/loaders/layout-loader.js" */
/* import Loadable from "react-loadable" */

// images
import busyPeopleImg from "../assets/images/busy-people2.png"
import embarrassedImg from "../assets/images/embarrassed2.png"
import visitingImg from "../assets/images/walk-around2.png"

class Home extends Component {
  state = {
    showSubscribe: false
  }

  componentDidMount() {
    socketio.reconnect()
    this.forceUpdate()
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = () => {
    if (window.pageYOffset > 900) {
      this.setState({
        showSubscribe: true
      })
    } else {
      this.setState({
        showSubscribe: false
      })
    }
  }

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
            content="Language learning is one of the most difficult skills to aquire, but also one of the most rewarding.  Our goal is to help you have a meaningful conversation in your new language in the most effective and beneficial way through online social learning platform."
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Home</title>
          <link rel="canonical" href="https://UtterZone/home" />
        </Helmet>
        <Masthead
          className={classes.masthead}
          justifycontent="flex-end"
          position="relative"
          height="590px">
          <Line
            backgroundcolor="rgb(206, 0, 0)"
            position="absolute"
            height="15px"
            top="-7px"
            right="0"
            width="100%"
          />
          <Flex alignitems="center" className={classes.mastText}>
            <Typography variant="h2" align="center" className={classes.text}>
              <span className={classes.speak}>Speak</span>{" "}
              <span className={classes.another}>another language</span>
            </Typography>
            <Typography
              variant="h6"
              align="right"
              className={classes.mastSubText}
              gutterBottom>
              Get empowered. Make friends.
            </Typography>
            {/* <Button color="primary" size="medium" variant="outlined">
																	<NavLink style={{color: "white", fontSize: "1.4rem"}} to="/about">
																							Learn More
																												</NavLink>
																																</Button> */}
          </Flex>
          <Line
            backgroundcolor="black"
            position="absolute"
            height="15px"
            bottom="0"
            margin="0"
            right="0"
            width="100%"
          />
        </Masthead>
        <Container className={classes.root}>
          <Section
            className={classes.section_home}
            height="600px"
            style={{marginTop: "100px"}}>
            <Grid item xs={12}>
              <Img
                height="100%"
                width="100%"
                maxheight="540px"
                maxwidth="1024px"
                src={`${busyPeopleImg}`}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="column" spacing={16}>
                <Grid item>
                  <Typography align="center" gutterBottom variant="h4">
                    Studied a second language in school but can&apos;t hold a
                    basic conversation.
                  </Typography>
                  <Line color="ce0000" margin="35px auto" width="130px" />
                  <Typography
                    className={classes.section_text}
                    align="center"
                    gutterBottom
                    paragraph>
                    Those many hours you spent in class don&apos;t have to go to
                    waste. Our platform helps you reclaim that lost knowledge.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Section>
          <Section className={classes.section_odd_home} height="600px">
            <Grid item xs={12} container>
              <Grid container direction="column" spacing={16}>
                <Grid item xs>
                  <Typography align="center" gutterBottom variant="h4">
                    The fear of embarrassment.
                  </Typography>
                  <Line color="ce0000" margin="35px auto" width="130px" />
                  <Typography
                    className={classes.section_text}
                    align="center"
                    gutterBottom
                    paragraph>
                    This is the no.1 problem when it comes to trying to speak
                    foreign tongue. We circumvent this barrier by recreating
                    what you did as a toddler by talking with your peers. You
                    will be speaking with people who are at your level.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Img
                height="100%"
                width="100%"
                maxheight="540px"
                maxwidth="1024px"
                src={`${embarrassedImg}`}
              />
            </Grid>
          </Section>
          <Section className={classes.section_home} height="600px">
            <Grid item xs={12}>
              <Img
                height="100%"
                width="100%"
                maxheight="540px"
                maxwidth="1024px"
                src={`${visitingImg}`}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="column" spacing={16}>
                <Grid item>
                  <Typography align="center" gutterBottom variant="h4">
                    So you can&apos;t go to another country and fully immerse
                    yourself.
                  </Typography>
                  <Line color="ce0000" margin="35px auto" width="130px" />
                  <Typography
                    className={classes.section_text}
                    align="center"
                    gutterBottom
                    paragraph>
                    By immersing yourself on our platform, you can get focused
                    sessions and lots more practice! Get actual speaking time
                    with real people.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Section>
          <Section
            className={classes.social_section}
            height="600px"
            background="#78909c">
            <Flex alignitems640="flex-end" width640="600px" alignitems="center">
              <Typography variant="h3" align="right" className={classes.text}>
                Online
              </Typography>
              <Typography variant="h3" align="right" className={classes.text}>
                Social
              </Typography>
              <Typography variant="h3" align="right" className={classes.text}>
                Language
              </Typography>
              <Typography variant="h3" align="right" className={classes.text}>
                Learning
              </Typography>
            </Flex>
            <Flex alignitems="flex-end" justifycontent="flex-end">
              <Typography
                className={classes.text}
                style={{
                  fontSize: "2em",
                  padding: "40px"
                }}>
                We are the first to engineer social language learning for
                language learners. Online social language learning is where you
                interact with real people and practice real conversations in a
                social environment.
              </Typography>
            </Flex>
          </Section>
          <Section>
            <Grid className={classes.stay_informed}>
              <Typography align="center" variant="h4" component="h2">
                Stay Informed
              </Typography>
              <Line color="ce0000" margin="35px auto" width="130px" />
              <Typography
                className={classes.section_text}
                align="center"
                gutterBottom
                paragraph>
                We do not esteem most online data as reliable sources when it
                comes to information gathering. Our findings come from years of
                personal learning and experience. You can find out more about
                how we think about language and what influences Utterzone&apos;s
                architecture by reading our articles.
              </Typography>
              <Button size="medium" variant="outlined">
                <a
                  rel="nofollow noopener noreferrer"
                  href="https://medium.com/speak-a-language"
                  target="_blank">
                  Read Articles
                </a>
              </Button>
            </Grid>
          </Section>
          {/*
									          <Section>
														            <Grid
																				              alignItems="center"
																											              container
																																		              className={classes.section}
																																									              spacing={24}>
																																																               TODO: sponsorship feature
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
																																																																																																																																													 							*/}
          {this.state && this.state.showSubscribe && <Subscribe />}

          <Footer />
        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(withApollo(Home))
