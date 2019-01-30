import React, {Component} from "react"
import {connect} from "react-redux"
import Helmet from "react-helmet"
import {withFormik} from "formik"
import {courseSchema} from "@utterzone/common"
import update from "immutability-helper"
import schema from "../../../app/schema.js"
import {history} from "@utterzone/connector"
import {
  Button,
  Container,
  Form,
  Header,
  Image,
  Input,
  Segment
} from "semantic-ui-react"
import {Masthead} from "../../../containers"
import {Can} from "../../../components"
/* import {getEntitiesSession} from "../../../api/entities/selectors.js" */
import "../styles.css"

// actions
import {toggleFooter} from "../../../app/actions/toggle-footer-action.js"
/* import {openModal} from "../../../containers/modals/actions.js" */

class CourseIntroduction extends Component {
  state = {
    name: "",
    email: "",
    submittedName: "",
    submittedEmail: "",
    courseName: "",
    courseDescription: "",
    disabled: true
  }

  componentDidMount() {
    this.props.toggleFooter(false)
    const newData = update(this.state, {
      courseName: {$set: this.props.course.courseName},
      courseDescription: {$set: this.props.course.courseDescription}
    })

    this.setState(newData)

    if (this.props.user.username === this.props.course.courseAuthor.username) {
      this.setState({
        disabled: false
      })
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = () => {
    const {name, email} = this.state

    this.setState({submittedName: name, submittedEmail: email})
  }

  openModalClicked = e => {
    e.preventDefault()
    /*   this.props.openModal("courseModal", null) */
  }

  render() {
    const {course, user} = this.props
    return (
      <Container>
        <Container>
          <Masthead padding="60px 20px 40px  20px">
            <Header as="h1">Course Introduction</Header>
          </Masthead>
          <Helmet>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="description" content="Affordable language learning" />
            <meta name="author" content="Isaac Pak" />
            <title>Utterzone | Settings</title>
            <link rel="canonical" href="https://utter.zone/settings" />
          </Helmet>
        </Container>
        <Form onSubmit={this.handleSubmit} style={{position: "relative"}}>
          <Container style={{paddingBottom: "5em"}} text>
            <Header as="h2">General Information</Header>
            <Segment attached style={{border: "none !important"}}>
              <Input
                name="courseName"
                value={this.state.courseName}
                onChange={this.handleChange}
                type="text"
                className="input-editable input-header"
                disabled={this.state.disabled}
                style={{border: "none !important"}}
                fluid
              />
            </Segment>
            <Segment attached>
              <textarea
                name="courseDescription"
                value={this.state.courseDescription}
                onChange={this.handleChange}
                type="text"
                className="input-editable"
                disabled={this.state.disabled}
              />
            </Segment>
            <Segment textAlign="right" attached>
              <Button color="orange">Subscribe</Button>
            </Segment>
            <Header as="h4" attached="bottom" block />
          </Container>
          <Can
            roles={user.roles}
            perform="course:update"
            id={user.username}
            matchingID={course.courseAuthor.username}
            yes={() => (
              <Container style={{paddingBottom: "5em"}} text>
                <Header as="h2">Course Thumbnail</Header>

                <Header as="h4" attached="top" block />
                <Segment
                  style={{display: "flex", justifyContent: "center"}}
                  attached>
                  <Image src={course.courseImage} />
                </Segment>
                <Header as="h4" attached="bottom" block />
              </Container>
            )}
            no={() => null}
          />

          <Container style={{paddingBottom: "5em"}} text>
            <Header as="h2">Meta</Header>
            <Header as="h4" attached="top" block />
            <Segment attached>
              Course Author:{" "}
              <em style={{fontWeight: 900}}>{course.courseAuthor.username}</em>
            </Segment>
            <Header as="h4" attached="bottom" block />
          </Container>
          <Can
            roles={user.roles}
            perform="course:update-introduction"
            id={user.username}
            matchingID={course.courseAuthor.username}
            yes={() => (
              <Container
                style={{position: "relative", paddingBottom: "5em"}}
                text>
                <Form.Button
                  floated="right"
                  type="submit"
                  content="Save Changes"
                  color="yellow"
                  fontSize="1.5rem"
                  style={{position: "absolute", right: "0"}}
                />
              </Container>
            )}
            no={() => null}
          />
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {User, Course} = session
  const userObj = User.all().toRefArray()
  const courseObj = Course.all().toRefArray()
  var user = userObj[0]
  var course = courseObj[0]

  return {
    user,
    course
  }
}

const actions = {
  toggleFooter
}

export default connect(
  mapStateToProps,
  actions
)(
  withFormik({
    validationSchema: courseSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      "username or email": "",
      password: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const errors = await props.submit(values)
      if (errors) {
        if (errors.identifier) {
          errors["username or email"] = errors.identifier
        }
        setErrors(errors)
      }
      if (!errors) {
        history.push("/")
      }
    }
  })(CourseIntroduction)
)
