import React, {Component} from "react"
import styled from "styled-components"

import {Img, Text} from "../../components"

// ad rotator
import {ad} from "../../services/index.js"

const StyledAd = styled.div`
  align-items: ${props => props.alignitems};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  font-size: ${props => props.fontsize};
  text-align: ${props => props.textalign};
  padding: ${props => props.padding};
`
StyledAd.defaultProps = {
  alignitems: "center",
  display: "flex",
  flexdirection: "column",
  fontsize: "100px",
  padding: "40px"
}

function Ad(props) {
  const today = ad.today()
  return (
    <StyledAd>
      <Text fontsize="1.4rem" textalign="center" padding="10px 10px 30px 10px">
        {" "}
      </Text>
      <a rel="external" target="_blank">
        <Img width="400" height="300" />
      </a>
      <br />
    </StyledAd>
  )
}
export default Ad
