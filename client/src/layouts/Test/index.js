import React, {Component} from "react"
import {Query} from "react-apollo"
import gql from "graphql-tag"
import Blah from "./Blah.js"

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        hello
      }
    `}>
    {({loading, error, data}) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>

      return (
        <div>
          <p>{data.hello}</p>
        </div>
      )
    }}
  </Query>
)

class Test extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <ExchangeRates />
        <h1>test</h1>
        <h1>Create</h1>
        <div>routes</div>
      </div>
    )
  }
}

export default Test
