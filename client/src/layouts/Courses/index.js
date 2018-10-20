import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import Select from "react-select"
import isEmpty from "lodash/isEmpty"
import cloneDeep from "lodash/cloneDeep"
import Waypoint from "react-waypoint"
import {Helmet} from "react-helmet"
import update from "immutability-helper"
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Item,
  Segment,
  Select as SemSelect
} from "semantic-ui-react"
import {Spacer} from "../../components"
import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader
import styled from "styled-components"
import "./styles.css"

import {Query} from "react-apollo"
import gql from "graphql-tag"

const getCourses = gql`
  query Courses(
    $title: String!
    $ref: String!
    $author: String!
    $usingLang: String!
    $teachingLang: String!
  ) {
    getCourses(
      title: $title
      ref: $ref
      author: $author
      usingLang: $usingLang
      teachingLang: $teachingLang
    ) {
      cursor
      courses {
        id
        courseImage
        courseName
        courseDescription
        courseAuthor {
          username
        }
      }
    }
  }
`

const MoreCoursesQuery = gql`
  query MoreCourses($cursor: String) {
    getMoreCourses(cursor: $cursor) {
      cursor
      courses {
        id
        courseImage
        courseName
        courseDescription
        courseAuthor {
          username
        }
      }
    }
  }
`

const Courses = props => {
  const {title, courseRef, author, usingLang, teachingLang} = props
  return (
    <Grid
      columns={3}
      centered
      padded="vertically"
      mobile={8}
      tablet={8}
      computer={4}>
      <Grid.Row style={{padding: "40px"}}>
        <Card.Group doubling stackable itemsPerRow={3}>
          <Query
            query={getCourses}
            variables={{
              title,
              ref: courseRef,
              author,
              usingLang,
              teachingLang
            }}>
            {({loading, error, data}) => {
              if (loading) return <Grid.Column>loading...</Grid.Column>
              if (error)
                return (
                  <Grid.Column>
                    The server is restarting due to maintenance. Please refresh
                    your browser in a few minutes.
                  </Grid.Column>
                )
              console.log("data: ", data)
              return data.getCourses.courses.map(course => {
                return (
                  <Card key={course.id} fluid={false}>
                    <Image
                      src={`${course.courseImage}`}
                      style={{cursor: "pointer"}}
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
                      {/* TODO
            <div
              style={{
                color: 'white',
                background: 'red',
                padding: '4px',
                textAlign: 'center'
              }}>
              Subscribed
            </div>
            */}
                    </Card.Content>
                    <Card.Content extra>
                      <div>
                        <Icon name="pencil" />
                        <a style={{padding: "0 20px 0 0"}}>
                          {course.courseAuthor.username}
                        </a>
                      </div>
                      <div>
                        <Icon name="user" />
                        <span style={{padding: "0 20px 0 0"}}>subs</span>
                      </div>
                      <div>
                        <Icon name="book" />
                        <span style={{padding: "0 20px 0 0"}}>course ref</span>
                      </div>
                    </Card.Content>
                  </Card>
                )
              })
            }}
          </Query>
        </Card.Group>
      </Grid.Row>
    </Grid>
  )
}

const options = [
  {key: "title", text: "Title", value: "title"},
  {key: "reference", text: "Reference", value: "reference"},
  {key: "author", text: "Author", value: "author"}
]

const initialState = {
  search: "",
  courseAuthor: "",
  courseInput: "",
  courseName: "",
  selectionBox: "title",
  courseRef: "",
  teachingLang: "",
  usingLang: "",
  items: "",
  limit: 3,
  next: ""
}

class CoursesContainer extends Component {
  constructor(props) {
    super(props)

    this.state = cloneDeep(initialState)
  }

  handleSpeakingChange = usingLang => {
    if (usingLang === null) {
      const newState = update(this.state, {
        usingLang: {$set: ""}
      })

      this.setState(newState)
    } else {
      const newState = update(this.state, {
        usingLang: {$set: usingLang.value}
      })

      this.setState(newState)
    }
  }

  handleTeachingChange = teachingLang => {
    if (teachingLang === null) {
      const newState = update(this.state, {
        teachingLang: {$set: ""}
      })

      this.setState(newState)
    } else {
      const newState = update(this.state, {
        teachingLang: {$set: teachingLang.value}
      })
      this.setState(newState)
    }
  }

  handleSearch = e => {
    this.setState({
      search: e.target.value
    })
  }

  handleImageClick = e => {
    e.preventDefault()
    // TODO
  }

  handleCourseFilterChg = (e, data) => {
    const newState = update(this.state, {
      selectionBox: {$set: data.value}
    })
    this.setState(newState)
  }

  handleInputChg = (e, data) => {
    e.preventDefault()
    const newState = update(this.state, {
      courseInput: {$set: data.value}
    })

    this.setState(newState)
  }

  submitQuery = e => {
    e.preventDefault()

    // change state props based on selectionBox
    const selectionBox = this.state.selectionBox
    const courseInput = this.state.courseInput
    switch (selectionBox) {
      case "title":
        // set courseName
        let newName = update(this.state, {
          courseAuthor: {
            $set: ""
          },
          courseName: {
            $set: courseInput
          },
          courseRef: {
            $set: ""
          },
          next: {
            $set: ""
          }
        })

        this.setState(newName)

        break

      case "reference":
        // set courseRef
        let newRef = update(this.state, {
          courseAuthor: {
            $set: ""
          },
          courseName: {
            $set: ""
          },
          courseRef: {
            $set: courseInput
          },
          next: {
            $set: ""
          }
        })

        this.setState(newRef)

        break

      case "author":
        // set courseAuthor

        let newAuthor = update(this.state, {
          courseAuthor: {
            $set: courseInput
          },
          courseName: {
            $set: ""
          },
          courseRef: {
            $set: ""
          },
          next: {
            $set: ""
          }
        })

        this.setState(newAuthor)

        break
    }
  }

  nextCourses = ({previousPos, currentPosition, event}) => {
    const newNext = this.props.next
    // add next to local state
    const newState = update(this.state, {
      next: {$set: newNext}
    })
    this.setState(newState, () => {
      // api more courses
    })
  }

  handleWaypoint = () => {
    if (!this.props.loading && this.props.next !== "done") {
      return <Waypoint onEnter={this.nextCourses} />
    }
  }

  render() {
    if (this.props.next !== "done") {
      var scrollMsg = (
        <Grid centered style={{margin: "0 0 40px 0"}}>
          <Segment compact loading={this.props.loading}>
            Scroll down for more
          </Segment>
        </Grid>
      )
    } else {
      var scrollMsg = <div />
    }

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
                <Header as="h2">I speak:</Header>
                <Select
                  name="form-field-name"
                  value={this.state.usingLang}
                  onChange={this.handleSpeakingChange}
                  options={[
                    {value: "english", label: "English"},
                    {value: "spanish", label: "Spanish"},
                    {value: "french", label: "French"}
                  ]}
                />
                <Header as="h2">I want to learn:</Header>
                <Select
                  name="form-field-name"
                  value={this.state.teachingLang}
                  onChange={this.handleTeachingChange}
                  options={[
                    {value: "korean", label: "Korean"},
                    {value: "english", label: "English"},
                    {value: "spanish", label: "Spanish"},
                    {value: "french", label: "French"}
                  ]}
                />
                <div margin="40px 0 0 0">
                  <Link to="/courses/created">Courses I Teach</Link>
                </div>
                <div>
                  <Link to="/courses/subscriptions">My Subscriptions</Link>
                </div>
              </Item>
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid columns={1} centered padded="vertically">
            <Grid.Column textAlign="center">
              <Header as="h1">Subscribe to a Course</Header>
            </Grid.Column>
            <Grid.Column>
              <Item align="center">
                <Input
                  type="text"
                  placeholder="Search..."
                  onChange={this.handleInputChg}
                  action>
                  <input />
                  <SemSelect
                    onChange={this.handleCourseFilterChg}
                    options={options}
                    defaultValue="title"
                  />
                  <Button onClick={this.submitQuery}>Search</Button>
                </Input>
              </Item>
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

export default withRouter(CoursesContainer)
