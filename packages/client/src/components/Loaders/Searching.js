import React from "react"
import styled from "styled-components"

const Style = styled.div`
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  width: ${props => props.width};

  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4, end) 900ms infinite;
    animation: ellipsis steps(4, end) 900ms infinite;
    content: "\\2026";
    width: 0px;

    @keyframes ellipsis {
      to {
        width: 1.25em;
      }
    }

    @-webkit-keyframes ellipsis {
      to {
        width: 1.25em;
      }
    }
  }
`

Style.defaultProps = {
  display: "block"
}

export const Searching = () => <Style>searching</Style>
