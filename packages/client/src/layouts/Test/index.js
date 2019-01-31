import React, {Component} from "react"
import {Query} from "react-apollo"
import gql from "graphql-tag"

const TestComponent = () => <React.Fragment />

class Test extends Component {
  render() {
    return (
      <div>
        <Query
          query={gql`
            query getTest($resourceID: String) {
              getTest(resourceID: $resourceID) {
                testName
              }
            }
          `}
          variables={{resourceID: "5c48d596384cfb1bea427c9b"}}>
          {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>
            if (error)
              return (
                <pre>
                  {error.graphQLErrors.map(({message}, i) => (
                    <p
                      style={{
                        fontSize: "2em",
                        color: "red",
                        margin: "30px",
                        padding: "30px",
                        textAlign: "center"
                      }}
                      key={i}>
                      {message}
                    </p>
                  ))}
                </pre>
              )

            return (
              <div>
                <h1>THIS IS A TEST</h1>
                <p>{data.getTest.testName}</p>
              </div>
            )
          }}
        </Query>
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
/*     if (error) return 
/* <pre> */
/*   {error.graphQLErrors.map(({message}, i) => ( */
/*     <p */
/*       style={{ */
/*         fontSize: "2em", */
/*         color: "red", */
/*         margin: "30px", */
/*         padding: "30px", */
/*         textAlign: "center" */
/*       }} */
/*       key={i}> */
/*       {message} */
/*     </p> */
/*   ))} */
/* </pre> */

/*     return ( */
/*       <div> */
/*         <p>{data.today}</p> */
/*       </div> */
/*     ) */
/*   }} */
/* </Query> */

/* <Query */
/*   query={gql` */
/*     query beef { */
/*       beef */
/*     } */
/*   `}> */
/*   {({loading, error, data}) => { */
/*     if (loading) return <p>Loading...</p> */
/*     if (error) return <p>{error.message}</p> */

/*     return ( */
/*       <div> */
/*         <h1>THIS IS A TEST</h1> */
/*         <p>{data.beef}</p> */
/*       </div> */
/*     ) */
/*   }} */
/* </Query> */
/* <Query */
/*   query={gql` */
/* query={gql` */
/*   query getTest { */
/*     getTest { */
/*       testName */
/*     } */
/*   } */
/*   `}> */
/*   {({loading, error, data}) => { */
/*     if (loading) return <p>Loading...</p> */
/*     if (error) return 
/* <pre> */
/*   {error.graphQLErrors.map(({message}, i) => ( */
/*     <p */
/*       style={{ */
/*         fontSize: "2em", */
/*         color: "red", */
/*         margin: "30px", */
/*         padding: "30px", */
/*         textAlign: "center" */
/*       }} */
/*       key={i}> */
/*       {message} */
/*     </p> */
/*   ))} */
/* </pre> */

/*     return ( */
/*       <div> */
/*         <h1>THIS IS A TEST</h1> */
/*         <p>{data.getTest.testName}</p> */
/*       </div> */
/*     ) */
/*   }} */
/* </Query> */

// error handling
/* <pre>{error.graphQLErrors.map(({ message }, i) => ( */
/* <p  style={{fontSize: "2em", color: "red", margin: "30px", padding: "30px", textAlign: "center"}} key={i}>{message}</p> *1/ */
/* 	          ))} */
/* </pre> */
