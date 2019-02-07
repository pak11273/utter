import React, {Component} from "react"
/* import {connect} from "react-redux" */
import {history} from "@utterzone/connector"
import update from "immutability-helper"
import {store} from "../../../store.js"
import {
  Card,
  Grid,
  Icon,
  Image,
  Loader
  /* Segment, */
} from "semantic-ui-react"
import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader
import "../../styles.css"

// actions
import {loadData} from "../../../api/actions.js"


const initialCoursesState = {
  cursor: "initial"
}

class Courses extends Component {
  constructor(props) {
    super(props)

    this.state = cloneDeep(initialCoursesState)
  }

  componentWillReceiveProps() {
    const newState = update(this.state, {
      cursor: {$set: ""}
    })
    this.setState(newState)
  }

  handleImageClick = data => {
    const payload = {}
    payload.course = data
    store.dispatch(loadData(payload))
    /* this.props.loadData(payload) */

    history.push({
      pathname: "/course/course-introduction",
      state: {data}
    })
  }

  render() {
    const {title, courseRef, author, usingLang, teachingLang} = this.props
    return (
      <Grid.Row style={{padding: "40px"}}>
        <Query
          query={getCourses}
          variables={{
            cursor: "",
            title,
            ref: courseRef,
            author,
            usingLang,
            teachingLang
          }}>
          {({loading, error, data, fetchMore}) => {
            if (loading) {
              return (
                <Grid.Column>
                  <Loader active>Loading</Loader>
                </Grid.Column>
              )
            }
            if (error)
              return (
                <Grid.Column>
                  {error.graphQLErrors.map(({message}, i) => (
                    <p
                      style={{
                        fontSize: "1.3em",
                        color: "red",
                        margin: "30px",
                        padding: "30px",
                        textAlign: "center"
                      }}
                      key={i}>
                      {message}
                    </p>
                  ))}
                </Grid.Column>
              )
            if (this.state.cursor !== "done") {
              var waypoint = (
                <Waypoint
                  key={data.getCourses.cursor}
                  onEnter={() => {
                    // set cursor state to first response
                    const newState = update(this.state, {
                      cursor: {$set: data.getCourses.cursor}
                    })

                    this.setState(newState)

                    fetchMore({
                      // note this is a different query than the one used in the
                      variables: {
                        cursor: this.state.cursor
                      },
                      updateQuery: (previousResult, {fetchMoreResult}) => {
                        if (!fetchMoreResult) {
                          // TODO: pending
                        }
                        const previousEntry = previousResult.getCourses.courses
                        const newCourses = fetchMoreResult.getCourses.courses

                        // display waypoint if a cursor exists
                        const newState = update(this.state, {
                          cursor: {$set: fetchMoreResult.getCourses.cursor}
                        })

                        this.setState(newState)

                        if (isEmpty(newCourses)) {
                          // hide waypoint
                          const newState = update(this.state, {
                            cursor: {$set: fetchMoreResult.getCourses.cursor}
                          })

                          this.setState(newState)

                          return previousResult
                        }

                        var newCursor = newCourses[newCourses.length - 1].id

                        if (!fetchMoreResult) return previousEntry

                        return {
                          // By returning `cursor` here, we update the `fetchMore` function
                          // to the new cursor.
                          getCourses: {
                            cursor: newCursor,
                            courses: [...previousEntry, ...newCourses],
                            __typename: "PaginatedCourses"
                          }
                        }
                      }
                    })
                  }}
                />
              )
            }
            return (
              <Grid.Column>
                <Card.Group doubling centered stackable itemsPerRow={4}>
                  {data.getCourses.courses.map(course => (
                    <Card key={course.id} style={{width: "300px"}}>
                      <Image
                        src={`${course.courseImage}`}
                        style={{cursor: "pointer"}}
                        onClick={() => this.handleImageClick(course)}
                      />
                      <Card.Content>
                        <Card.Header style={{wordBreak: "break-word"}}>
                          {course.courseName}
                        </Card.Header>
                        <div
                          className="description"
                          style={{wordBreak: "break-word"}}>
                          {course.courseDescription}
                        </div>
                      </Card.Content>
                      <Card.Content extra>
                        <div>
                          <Icon name="user" />
                          <span style={{padding: "0 20px 0 0"}}>
                            1M subscribers
                          </span>
                        </div>
                        <div>
                          <Icon name="book" />
                          <span style={{padding: "0 20px 0 0"}}>
                            course ref
                          </span>
                        </div>
                        <div>
                          <Icon name="pencil" />
                          <a style={{padding: "0 20px 0 0"}}>
                            {course.owner.username}
                          </a>
                        </div>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
                {waypoint}
              </Grid.Column>
            )
          }}
        </Query>
      </Grid.Row>
    )
  }
}

export default Courses
