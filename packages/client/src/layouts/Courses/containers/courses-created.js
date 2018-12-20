import "react-select/dist/react-select.css"
import {history} from "@utterzone/connector"
import "../styles.css"
import {
  Button as SemButton,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Item
} from "semantic-ui-react"
import {Helmet} from "react-helmet"
import isEmpty from "lodash/isEmpty"
import Waypoint from "react-waypoint"
import {Link, withRouter} from "react-router-dom"
import {Query} from "react-apollo"
import {connect} from "react-redux"
import React, {Component} from "react"
import cloneDeep from "lodash/cloneDeep"
import gql from "graphql-tag"
import update from "immutability-helper"
import {Spacer} from "../../../components"
import {toggleFooter} from "../../../app/actions/toggleFooterAction.js"

const getCreatedCourses = gql`
  query getCreatedCourses($cursor: String, $author: String!) {
    getCreatedCourses(cursor: $cursor, author: $author) {
      courses {
        id
        courseName
        courseMode
      }
      cursor
    }
  }
`

const initialCoursesState = {
  cursor: "initial",
  author: localStorage.getItem("AUTH_TOKEN")
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
    // store courseId in redux
    console.log("data: ", data)
    history.push({
      pathname: "/course/course-settings",
      state: {courseId: data.id}
    })
  }

  render() {
    const {author} = this.props
    return (
      <Grid
        columns={3}
        centered
        padded="vertically"
        mobile={8}
        tablet={8}
        computer={4}>
        <Grid.Row style={{padding: "40px"}}>
          <Query
            query={getCreatedCourses}
            variables={{
              cursor: "",
              author
            }}>
            {({loading, error, data, fetchMore}) => {
              if (loading) return <Grid.Column>loading...</Grid.Column>
              if (error) {
                console.log("err: ", error)
                return (
                  <Grid.Column>
                    The server is restarting due to maintenance. Please refresh
                    your browser in a few minutes.
                  </Grid.Column>
                )
              }
              if (this.state.cursor !== "done") {
                console.log("not done")
                var waypoint = (
                  <Waypoint
                    key={data.getCreatedCourses.cursor}
                    onEnter={() => {
                      // set cursor state to first response
                      const newState = update(this.state, {
                        cursor: {$set: data.getCreatedCourses.cursor}
                      })

                      this.setState(newState, () =>
                        console.log("new state: ", newState)
                      )

                      fetchMore({
                        // note this is a different query than the one used in the
                        variables: {
                          cursor: this.state.cursor
                        },
                        updateQuery: (previousResult, {fetchMoreResult}) => {
                          if (!fetchMoreResult) {
                            // do something here
                          }
                          const previousEntry =
                            previousResult.getCreatedCourses.courses
                          const newCourses =
                            fetchMoreResult.getCreatedCourses.courses

                          // display waypoint if a cursor exists
                          const newState = update(this.state, {
                            cursor: {
                              $set: fetchMoreResult.getCreatedCourses.cursor
                            }
                          })

                          this.setState(newState)

                          if (isEmpty(newCourses)) {
                            // hide waypoint
                            const newState = update(this.state, {
                              cursor: {
                                $set: fetchMoreResult.getCreatedCourses.cursor
                              }
                            })

                            this.setState(newState)

                            return previousResult
                          }
                          var newCursor = newCourses[newCourses.length - 1].id

                          if (!fetchMoreResult) return previousEntry

                          return {
                            // By returning `cursor` here, we update the `fetchMore` function
                            // to the new cursor.
                            getCreatedCourses: {
                              cursor: newCursor,
                              courses: [...previousEntry, ...newCourses],
                              __typename: "PaginatedCourses"
                            }
                          }
                        }
                      })
                    }}>
                    <div>
                      <SemButton
                        loading={loading}
                        style={{
                          margin: "50px",
                          border: "none",
                          background: "none"
                        }}>
                        Scroll down for more
                      </SemButton>
                    </div>
                  </Waypoint>
                )
              }
              return (
                // TODO use push here to go to details page?
                // const LangCard = this.props.courses.map(item => {
                //   var author = ""
                //   item.courseAuthor.username ? (author = item.courseAuthor.username) : null
                //   let keys = []
                //   item.courseRef.map(item => {
                //     keys.push(item.value)
                //   })
                //   const courseRef = keys.toString()
                //   return (
                //     <Card key={item.id}>
                <div>
                  <Card.Group doubling stackable itemsPerRow={3}>
                    {data.getCreatedCourses.courses.map(course => (
                      <Card key={course.id} fluid={false}>
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
                            <Icon name="pencil" />
                            <a style={{padding: "0 20px 0 0"}}>
                              {course.courseAuthor}
                            </a>
                          </div>
                          <div>
                            <Icon name="user" />
                            <span style={{padding: "0 20px 0 0"}}>subs</span>
                          </div>
                          <div>
                            <Icon name="book" />
                            <span style={{padding: "0 20px 0 0"}}>
                              course ref
                            </span>
                          </div>
                        </Card.Content>
                      </Card>
                    ))}
                  </Card.Group>
                  {waypoint}
                </div>
              )
            }}
          </Query>
        </Grid.Row>
      </Grid>
    )
  }
}

const initialCoursesContainerState = {
  search: "",
  courseAuthor: "",
  courseInput: "",
  courseName: "",
  selectionBox: "title",
  courseRef: "",
  teachingLang: "",
  usingLang: "",
  items: "",
  next: "",
  resetCursor: ""
}

class CoursesCreatedContainer extends Component {
  constructor(props) {
    super(props)

    this.state = cloneDeep(initialCoursesContainerState)
  }

  componentDidMount() {
    this.props.toggleFooter(false)
  }

  render() {
    /* if (this.props.next !== "done") { */
    /*   var scrollMsg = ( */
    /*     <Grid centered style={{margin: "0 0 40px 0"}}> */
    /*       <Segment compact loading={this.props.loading}> */
    /*         Scroll down for more */
    /*       </Segment> */
    /*     </Grid> */
    /*   ) */
    /* } else { */
    /*   scrollMsg = <div /> */
    /* } */

    return (
      <Grid stackable>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Make direct contact with our team throught our contact information form.  We will do our best to respond in a timely manner.  If you are a business or educational institution this would be an ideal place to shoot a short inquiry."
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Courses</title>
          <link rel="canonical" href="https://utter.zone/courses" />
        </Helmet>
        <Grid.Column width={4} style={{background: "LightGray"}}>
          <Grid columns={1} centered padded="vertically">
            <Grid.Column textAlign="center">
              <Spacer margin="50px 0 0 0" />
              <Item align="center">
                <Link to="/courses/create" style={{fontSize: "20px"}}>
                  Create a Course
                </Link>
              </Item>
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid columns={1} centered padded="vertically">
            <Grid.Column textAlign="center">
              <Header as="h1">Edit a Course</Header>
            </Grid.Column>
          </Grid>
          <Courses
            title={this.state.courseName}
            author={this.state.courseAuthor}
            courseRef={this.state.courseRef}
            usingLang={this.state.usingLang}
            teachingLang={this.state.teachingLang}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer
  }
}

const mapDispatchToProps = () => {
  return {
    toggleFooter
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CoursesCreatedContainer)
)
