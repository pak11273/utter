import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {Button, Container, Grid, Header, Menu, Segment} from 'semantic-ui-react'
import {Masthead, Navbar} from '../containers'
import {Helmet} from 'react-helmet'
import {Box, Column, Subtitle, Title, Wrapper} from '../components'

function Pricing(props) {
  return (
    <Container style={{padding: '80px'}}>
      <Helmet>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="Affordable language learning" />
        <meta name="author" content="Isaac Pak" />
        <title>Utterzone | Pricing</title>
        <link rel="canonical" href="https://utter.zone/courses" />
      </Helmet>
      <Header as="h2" align="center" color="red">
        Obtain a priceless skill for the price of a Starbucks coffee.
      </Header>
      <p style={{textAlign: 'center', padding: '5px 0 20px 0'}}>
        Your payments are processed over the highest security connections.
      </p>
      <Grid stackable textAlign="center" columns={4}>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Menu fluid vertical>
                <Menu.Item className="header">1 month</Menu.Item>
              </Menu>
              <div>$12.95/mo.</div>
              <Button>Select</Button>
              <p>$12.95 charged every month</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised>
              <Menu fluid vertical>
                <Menu.Item className="header">3 months</Menu.Item>
              </Menu>
              <div>$8.95/mo.</div>
              <Button>Select</Button>
              <p>$26.85 charged every 3 months</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Menu fluid vertical>
                <Menu.Item className="header">6 months</Menu.Item>
              </Menu>
              <div>$7.45/mo.</div>
              <Button>Select</Button>
              <p>$44.70 charged every 6 months</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Menu fluid vertical>
                <Menu.Item className="header">12 months</Menu.Item>
              </Menu>
              <div>$6.95/mo.</div>
              <Button>Select</Button>
              <p>$83.40 charged every 12 months</p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Pricing
