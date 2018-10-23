import React from "react"
import {render} from "react-dom"
import {Container} from "unstated"

type CounterState = {
  count: number
}

export default class CounterContainer extends Container<CounterState> {
  state = {
    count: 0
  }

  increment() {
    this.setState({count: this.state.count + 1})
  }
  decrement() {
    this.setState({count: this.state.count - 1})
  }
}
