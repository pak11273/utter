import React, {PureComponent} from "react"
import {withFormik} from "formik"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import isEmpty from "lodash/isEmpty"
import {Grid, Button, Form, Header, Image, Container} from "semantic-ui-react"
import {ThemeProvider} from "styled-components"
import {main} from "../../themes/config"
import Timezones from "../../components/Selects/Timezones/Timezones.js"
import {Spacer} from "../../components"

// actions
import {toggleFooter} from "../../app/actions/toggleFooterAction.js"
import signup from "../../api/user/actions/signupActions.js"
import {validateInput} from "../../utils/validations/user.js"

class SignupForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      facebook: "",
      google: "",
      username: "",
      email: "",
      isLoading: null,
      password: "",
      passwordConfirmation: "",
      timezone: "Puerto Rico (Atlantic) America/Puerto_Rico",
      errors: {}
    }
  }

  componentDidMount() {
    // this.props.actions.toggleFooter(false)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.signupReducer.errors.message
    })
  }

  isValid() {
    const {errors, isValid} = validateInput(this.state)

    if (!isValid) {
      this.setState({
        errors
      })
    }
    return isValid
  }

  render() {
    var {errors} = this.state
    if (isEmpty(errors)) {
      errors = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      }
    }
    const {values, handleChange, handleBlur, handleSubmit} = this.props
    return (
      <Grid columns={4} centered padded stackable>
        <Grid.Column textAlign="center" width={8}>
          <Spacer margin="70px" />
          <Image
            centered
            alt=""
            src="http://www.exposureguide.com/images/concert/concert-photography-4e.jpg"
          />
          <Header as="h2">Join our Community</Header>
          <Header as="h3">
            Become part of a growing community of avid learners like yourself
          </Header>
          <Spacer margin="100px" />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={6}>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Spacer margin="50px" />
              <Header as="h1">Registration</Header>
              <Form.Field>
                <Form.Input
                  fluid
                  label="Username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  type="text"
                  name="username"
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  label="Email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="text"
                  name="email"
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  label="Password"
                  placeholder="Password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                  name="password"
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  label="Password Confirmation"
                  placeholder="Password Confirmation"
                  autoComplete="new-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordConfirmation}
                  type="password"
                  name="passwordConfirmation"
                />
                <Header as="h4">Timezone</Header>
                <Timezones
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.timezone}
                  name="timezone"
                />
              </Form.Field>
              <Form.Field style={{textAlign: "right"}}>
                <Form.Checkbox label="I agree to the Terms and Conditions" />
              </Form.Field>
              <ThemeProvider theme={main}>
                <Button
                  color="yellow"
                  floated="right"
                  fontSize="1.5rem"
                  padding=".2rem 1rem"
                  type="submit">
                  Join
                </Button>
              </ThemeProvider>
            </Form>
          </Container>
        </Grid.Column>
        <Grid.Column width={1} />
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  signupReducer: state.userReducer.signup
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      toggleFooter,
      signup: signup.request
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues: () => ({
      username: "",
      email: "",
      password: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const errors = await props.submit(values)
      if (errors) {
        setErrors(errors)
      }
    }
  })(SignupForm)
)
