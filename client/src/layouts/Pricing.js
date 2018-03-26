import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead, Navbar} from '../containers'
import {Box, Column, Grid, Subtitle, Title, Wrapper} from '../components'

function About(props) {
  return (
    <Wrapper fontsize="2rem" width="1240px">
      <Masthead height="200px">
        <Column maxwidth="1240px">
          <Title>Pricing</Title>
        </Column>
      </Masthead>
      <Grid gridtemplatecolumns="1fr 1fr 1fr 1fr">
        <Box>Feature</Box>
        <Box>Babbel.com</Box>
        <Box>Fluencia</Box>
        <Box>Utter</Box>
        <Box>College Level Curriculum</Box>
        <Box>yes</Box>
        <Box>yes</Box>
        <Box>yes</Box>
        <Box>2 year</Box>
        <Box>no</Box>
        <Box>6.95</Box>
        <Box>yes</Box>
        <Box>1 year</Box>
        <Box>6.95</Box>
        <Box>7.95</Box>
        <Box>yes</Box>
        <Box>6 months</Box>
        <Box>7.45</Box>
        <Box>no</Box>
        <Box>yes</Box>
        <Box>3 months</Box>
        <Box>8.95 best seller</Box>
        <Box>no</Box>
        <Box>yes</Box>
        <Box>Monthly</Box>
        <Box>12.95</Box>
        <Box>14.95</Box>
        <Box>yes</Box>
        <Box>Cancel Anytime</Box>
        <Box>yes</Box>
        <Box>yes</Box>
        <Box>yes</Box>
        <Box>Guarantee</Box>
        <Box>20 Days</Box>
        <Box>30 Days</Box>
        <Box>yes</Box>
      </Grid>
      <Grid gridtemplatecolumns="1fr" gridautorows="300px">
        <Box>Sign up now or get sponsored</Box>
      </Grid>
    </Wrapper>
  )
}

export default About
