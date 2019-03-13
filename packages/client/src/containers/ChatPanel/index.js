import React, {Component} from "react"
import styled from "styled-components"
import {BrowserRouter as Router, Link, Route} from "react-router-dom"
import {Chat} from "../../containers"
import {Box, Button, Column, Section, Text, TextArea} from "../../components"

const StyledLink = styled(Link)`
  font-size: 1.2rem;
`

function Friends(props) {
  return (
    <div style={{textAlign: "left"}}>
      <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
        Friends
      </Text>
      <div>
        Joe <span style={{color: "red"}}>offline</span>
      </div>
      <div>
        Martha <span style={{color: "red"}}>online</span>
      </div>
      <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
        Sponsor
      </Text>
      <div>
        Joe <span style={{color: "green"}}>online</span>
      </div>
      <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
        Sponsorees
      </Text>
      <div>
        Joe <span style={{color: "red"}}>offline</span>
      </div>
      <div>
        Martha <span style={{color: "orange"}}>afk</span>
      </div>
      <Text color="blue" fontsize="2rem" padding="20px 0 10px 0">
        Blocked
      </Text>
      <div>
        Martha <span style={{color: "orange"}}>afk</span>
      </div>
    </div>
  )
}

function ChatPanelContainer(props) {
  return (
    <Router>
      <Column alignitems="flex-start">
        <Box
          flexdirection="row"
          background="lightblue"
          justifycontent="space-around"
          padding="10px"
          margin="0 0 20px 0">
          <StyledLink to="/connections/friends">Friends</StyledLink>
        </Box>
        <Box alignitems="flex-start">
          <Route path="/connections/friends" component={Friends} />
        </Box>
      </Column>
    </Router>
  )
}

export default ChatPanelContainer
