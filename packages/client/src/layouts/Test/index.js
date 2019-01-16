import React, {Component} from "react"
import {Query} from "react-apollo"
import gql from "graphql-tag"

const TestComponent = () => (
  <React.Fragment>
    <Query
      query={gql`
        query beef {
          beef
        }
      `}>
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>

        return (
          <div>
            <h1>THIS IS A TEST</h1>
            <p>{data.beef}</p>
          </div>
        )
      }}
    </Query>
  </React.Fragment>
)

class Test extends Component {
  render() {
    return (
      <div>
        <TestComponent />
      </div>
    )
  }
}

export default Test

// example queries
/* <Query */
/*   query={gql` */
/*     query todayDate { */
/*       today(format: "mmmm dd, yyyy") */
/*     } */
/*   `}> */
/*   {({loading, error, data}) => { */
/*     if (loading) return <p>Loading...</p> */
/*     if (error) return <p>Error :(</p> */

/*     return ( */
/*       <div> */
/*         <p>{data.today}</p> */
/*       </div> */
/*     ) */
/*   }} */
/* </Query> */
