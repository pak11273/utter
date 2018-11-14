import React, {PureComponent} from "react"
import {ThemeProvider} from "styled-components"
import {withFormik} from "formik"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
/* import isEmpty from "lodash/isEmpty" */
import {
  Grid,
  Button,
  Form,
  Header,
  Image,
  Container,
  Message
} from "semantic-ui-react"
import * as yup from "yup"
import cloneDeep from "lodash/cloneDeep"
import {main} from "../../themes/config"
import Timezones from "../../components/Selects/Timezones/Timezones.js"
import {Spacer} from "../../components"
import Terms from "../../documents/terms-and-conditions.js"

// actions
import {toggleFooter} from "../../app/actions/toggleFooterAction.js"
import signup from "../../api/user/actions/signupActions.js"
import "./forms.css"
/* import {validateInput} from "../../utils/validations/user.js" */

const invalidEmail = "email must be a valid email"
const emailNotLongEnough = "email must be at least 3 characters"
const passwordNotLongEnough = "password must be at least 8 characters"

const PasswordValidation = yup
  .string()
  .min(8, passwordNotLongEnough)
  .max(255)
  .required("Password is required")

const signupSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(255)
    .required("Username is required"),
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required("Email is required"),
  password: PasswordValidation,
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required")
})

const initialState = {
  agreementChecked: true
}

class SignupForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = cloneDeep(initialState)
  }

  componentDidMount() {
    // this.props.actions.toggleFooter(false)
  }

  handleChange = e => {
    e.preventDefault()
    const {agreementChecked} = this.state
    if (this.setState) {
      this.setState({
        agreementChecked: !agreementChecked
      })
    }
  }

  render() {
    const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      touched,
      errors
    } = this.props
    const {agreementChecked} = this.state
    return (
      <Grid columns={4} centered padded stackable>
        <Grid.Column textAlign="center" width={8}>
          <Spacer margin="65px" />
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
            <Form error onSubmit={handleSubmit} style={{position: "relative"}}>
              <Spacer margin="70px" />
              <Header as="h1">Registration</Header>
              <Form.Field>
                <Form.Input
                  error={errors.username}
                  fluid
                  label="Username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  type="text"
                  name="username"
                />
                {errors.username &&
                  touched.username && (
                    <Message
                      className="error-msg"
                      error
                      content={errors.username}
                    />
                  )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  error={errors.email}
                  fluid
                  label="Email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="text"
                  name="email"
                />
                {errors.email &&
                  touched.email && (
                    <Message
                      className="error-msg"
                      error
                      content={errors.email}
                    />
                  )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  error={errors.password}
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
                {errors.password &&
                  touched.password && (
                    <Message
                      className="error-msg"
                      error
                      content={errors.password}
                    />
                  )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  error={errors.passwordConfirmation}
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
                {errors.passwordConfirmation &&
                  touched.passwordConfirmation && (
                    <Message
                      className="error-msg"
                      error
                      content={errors.passwordConfirmation}
                    />
                  )}
                <Header as="h4" style={{margin: "0 0 5px 0"}}>
                  Timezone
                </Header>
                <Timezones
                  label="Timezone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.timezone}
                  type="text"
                  name="timezone"
                />
                {errors.timezone &&
                  touched.timezone && (
                    <Message
                      className="error-msg"
                      error
                      content={errors.timezone}
                    />
                  )}
              </Form.Field>
              <Form.Group style={{position: "absolute", right: "10px"}}>
                <Form.Checkbox
                  label="I agree to the"
                  onChange={this.handleChange}
                />
                <span>
                  <Terms />
                </span>
              </Form.Group>
              <ThemeProvider theme={main}>
                <Button
                  disabled={agreementChecked}
                  color="yellow"
                  floated="right"
                  fontSize="1.5rem"
                  style={{margin: "30px 0 0 0"}}
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
    validationSchema: signupSchema,
    validateOnChange: false,
    validateOnBlur: true,
    mapPropsToValues: () => ({
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      timezone: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const errors = await props.submit(values)
      if (errors) {
        setErrors(errors)
      }
    }
  })(SignupForm)
)
