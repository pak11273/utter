import React, {Component} from "react"
import {connect} from "react-redux"
import styled, {ThemeProvider} from "styled-components"
import {Helmet} from "react-helmet"
import {Navbar} from "../containers"
import {Box, MastheadTitle, MastheadSubtitle, Wrapper} from "../components"

import {Container, Grid, Header, Image} from "semantic-ui-react"

// actions
import {toggleFooter} from "../app/actions/toggleFooterAction.js"

class About extends Component {
  componentDidMount() {
    this.props.toggleFooter(true)
  }
  render() {
    return (
      <Grid centered columns={2} style={{background: "black"}}>
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

        <Grid.Column>
          <Image
            fluid
            style={{minWidth: "600px"}}
            src="https://s.hswstatic.com/gif/brain-1.jpg"
          />
          <div
            style={{
              left: "50px",
              position: "absolute",
              top: "35px",
              maxWidth: "300px",
              zIndex: "1"
            }}>
            <Header size="huge" color="yellow">
              About Us
            </Header>
            <Header color="yellow">
              We foster the greatest learning tool you have available
              already-Your brain. Our techniques allow you to naturally learn
              something at the highest level possible. No tricks, no gimmicks.
            </Header>
            <Header color="yellow">
              Our goal is to bring peace to the world by language. As the world
              has become more global, one of the major problems we have is
              misunderstandings due to cultural differences. Language happens to
              be the biggest cultural gap between nations and it's our desire to
              see that change. But learning a new language is a very difficult
              and hard to become fluent in. We make every endeavor to not make
              it any simpler, but to make it more available and more efficient
              to learn.
            </Header>
          </div>
        </Grid.Column>

        <Grid.Row centered columns={4}>
          <Image.Group size="small">
            <Image src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            <Image src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            <Image src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
          </Image.Group>
        </Grid.Row>

        <Grid stackable relaxed>
          <Image.Group size="medium">
            <Image
              circular
              src="https://images.pexels.com/photos/542282/pexels-photo-542282.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            />
            <Image
              circular
              src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            />
            <Image
              circular
              src="https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            />
            <Image
              circular
              src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            />
          </Image.Group>
        </Grid>
      </Grid>
    )
  }
}

const actions = {
  toggleFooter
}

export default connect(
  null,
  actions
)(About)
