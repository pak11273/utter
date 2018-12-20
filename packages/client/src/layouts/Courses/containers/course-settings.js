import React, {Component} from "react"
import {history} from "@utterzone/connector"
import {Container, Grid, Header, Form} from "semantic-ui-react"
import {Masthead} from "../../../containers"

class CourseSettings extends Component {
  state = {name: "", email: "", submittedName: "", submittedEmail: ""}

  componentDidMount() {
    // TODO if no courseId redirect back to courses-created
    // TODO put courseId into redux :
    console.log("this: ", this.props)
    if (!this.props.location.state || !this.props.location.state.courseId) {
      history.push("/courses/created")
    } else {
      console.log("we need this in redux")
    }
  }

  handleChange = (e, {name, value}) =>
    this.setState({[name]: value}, console.log("state: ", this.state))

  handleSubmit = () => {
    const {name, email} = this.state

    this.setState({submittedName: name, submittedEmail: email})
  }

  render() {
    /* const {name, email, submittedName, submittedEmail} = this.state */
    const {name, email} = this.state
    /* console.log(this.props.location.state.courseId) */

    return (
      <Container>
        <Masthead>
          <Header as="h1">Course Settings</Header>
        </Masthead>
        <Grid centered padded="vertically">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                placeholder="Name"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
              <Form.Input
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              <Form.Button content="Submit" />
            </Form.Group>
          </Form>
        </Grid>
      </Container>
    )
  }
}

export default CourseSettings
