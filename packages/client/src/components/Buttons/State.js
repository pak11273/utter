import React, {Component} from "react"
import styled from "styled-components"

const Button = styled.button`
  align-self: center;
  background: red;
  color: white;
  font-size: 1.5rem;
  justify-content: center;
  margin: 40px auto;
  padding: 5px;
  cursor: pointer;
  width: 200px;
  &:hover {
    background: green;
  }
`
export default class State extends Component {
  seeState = state => {
    console.log("STATE: ", JSON.stringify(state, true, 2))
  }

  render() {
    // signature of Component on parent:
    // <State state={this.state} />
    const {state} = this.props
    return <Button onClick={() => this.seeState(state)}>See State</Button>
  }
}
