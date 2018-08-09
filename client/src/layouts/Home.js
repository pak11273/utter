import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React, {Component} from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Item,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'
import styled from 'styled-components'
import {
  ButtonCta,
  Column,
  Line,
  MastheadTitle,
  MastheadSubtitle
} from '../components'
import {Masthead} from '../containers'

// images
import busyPeopleImg from '../assets/images/busy-people.jpg'
import homeMastheadImg from '../assets/images/two-guys.jpg'
import embarrassedImg from '../assets/images/embarrassed.jpg'
import ceoImg from '../assets/images/ceo.jpg'
import visitingImg from '../assets/images/walking-around.jpg'

// actions
import {toggleFooter} from '../app/actions/toggleFooterAction.js'

/* eslint-disable react/no-multi-comp */

const HomepageHeading = ({mobile}) => (
  <Masthead
    gridarea="masthead"
    background={`url(${homeMastheadImg}) center/contain`}
    height="600px"
    padding="200px 20px 100px 20px">
    <Column maxwidth="960px">
      <MastheadTitle color="white">Speak another language</MastheadTitle>
      <MastheadSubtitle color="white" fontsize="1.5rem">
        Not speaking your new language yet? We can help.
      </MastheadSubtitle>
      <ButtonCta color="black">
        <NavLink style={{fontSize: '1.8rem'}} to="/about">
          Learn More
        </NavLink>
      </ButtonCta>
    </Column>
  </Masthead>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  render() {
    const {children} = this.props
    const {fixed} = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Segment style={{padding: 0}} inverted textAlign="center" vertical>
          <HomepageHeading />
        </Segment>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
}

class MobileContainer extends Component {
  state = {}

  render() {
    const {children} = this.props

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Segment
          inverted
          textAlign="center"
          style={{minHeight: 350, padding: 0}}
          vertical>
          <HomepageHeading mobile />
        </Segment>

        {children}
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
}

const ResponsiveContainer = ({children}) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

class Home extends Component {
  componentDidMount() {
    this.props.toggleFooter(true)
  }
  render() {
    return (
      <ResponsiveContainer>
        <Segment style={{padding: '8em 0em'}} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{fontSize: '2em', textAlign: 'center'}}>
                  Studied a second language in school but can't hold a basic
                  conversation.
                </Header>
                <Line />
                <p style={{fontSize: '1.33em', textAlign: 'center'}}>
                  Those many hours you spent in class don't have to go to waste.
                  Our platform helps you reclaim that lost knowledge.
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  rounded
                  size="large"
                  src={`${busyPeopleImg}`}
                  centered
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  rounded
                  size="large"
                  style={{height: '300px'}}
                  src={`${embarrassedImg}`}
                  centered
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h3" style={{fontSize: '2em', textAlign: 'center'}}>
                  The fear of embarrassment and looking stupid.
                </Header>
                <Line />
                <p style={{fontSize: '1.33em', textAlign: 'center'}}>
                  You will be learning with peers. Meaning you will be speaking
                  with people who are at your level.
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{fontSize: '2em', textAlign: 'center'}}>
                  So you can't go to another country and fully immerse yourself.
                </Header>
                <Line />
                <p style={{fontSize: '1.33em', textAlign: 'center'}}>
                  Our platform could possibly be better! You get focused
                  practice anytime you want it.
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  rounded
                  size="large"
                  src={`${visitingImg}`}
                  centered
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment vertical>
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
              <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
                <Header as="h3" style={{fontSize: '2em'}}>
                  Bilingual Benefits
                </Header>
                <p style={{fontSize: '1.33em'}}>
                  People who are bilingual have more opportunities to make
                  income
                </p>
                <p style={{fontSize: '1.33em'}}>
                  Language is the most important piece to learning another
                  country's culture
                </p>
                <p style={{fontSize: '1.33em'}}>
                  This is the gateway to adapting to the global economy.
                </p>
              </Grid.Column>
              <Grid.Column
                style={{paddingBottom: '5em', paddingTop: '5em'}}
                verticalAlign="middle">
                <Header as="h3" style={{fontSize: '1.5em'}}>
                  "I built this platform and used it exclusively to learn my
                  native tongue. After 6 months of use I can have successful,
                  everyday conversations with native speakers."
                </Header>
                <p style={{fontSize: '1.33em'}}>
                  <Image avatar src={`${ceoImg}`} />
                  <b>Isaac Pak</b> CEO of Utter.com
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{padding: '8em 0em'}} vertical>
          <Container text>
            <Header as="h3" style={{fontSize: '2em'}}>
              Latest News
            </Header>
            <p style={{fontSize: '1.33em'}}>
              We will be adding Spanish, French and other popular languages in
              the very near future. Subscribe to our newsletter and find out
              when we add a course for your language!
            </p>
            <Button size="large">
              <NavLink style={{fontSize: '1.8rem'}} to="#">
                Subscribe
              </NavLink>
            </Button>
            <Divider
              as="h4"
              className="header"
              horizontal
              style={{margin: '3em 0em', textTransform: 'uppercase'}}>
              <a href="#">Sponsorship</a>
            </Divider>
            <Header as="h3" style={{fontSize: '2em'}}>
              Can't afford the program?
            </Header>
            <p style={{fontSize: '1.33em'}}>
              Get sponsored. There are many people who are willing to support
              you in this learning endeavor, but they don't know about your
              interest in language learning. We can help facilitate this process
              by informing and petitioning these sponsors.
            </p>
            <Button size="large">
              <NavLink style={{fontSize: '1.8rem'}} to="/sponsorship">
                Find out more
              </NavLink>
            </Button>
          </Container>
        </Segment>
      </ResponsiveContainer>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     actions: bindActionCreators(
//       {
//         toggleFooter,
//       },
//       dispatch
//     )
//   }
// }

const actions = {
  toggleFooter
}

export default connect(null, actions)(Home)
