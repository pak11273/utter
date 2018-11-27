import "./forms.css"
import history from "../../history.js"
import {
  Grid,
  Button,
  Form,
  Header,
  Image,
  Container,
  Message
} from "semantic-ui-react"
import {ThemeProvider} from "styled-components"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {signupSchema} from "@utterzone/common"
import {withFormik, Field} from "formik"
import React, {PureComponent} from "react"
import cloneDeep from "lodash/cloneDeep"
import isEmpty from "lodash/isEmpty"
import {FormikField, Spacer} from "../../components"
import {main} from "../../themes/config"
import {toggleFooter} from "../../app/actions/toggleFooterAction.js"
import Terms from "../../documents/terms-and-conditions.js"
import Timezones from "../../components/Selects/Timezones/Timezones.js"
import signup from "../../api/user/actions/signupActions.js"

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
            src="https://images.unsplash.com/photo-1535448996690-4277028bb0e5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8d40de7a271cae51700d439968382ffd&auto=format&fit=crop&w=1050&q=80"
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
              <Field
                name="username"
                placeholder="username"
                component={FormikField}
              />
              <Field name="email" placeholder="email" component={FormikField} />
              <Field
                name="password"
                placeholder="password"
                autoComplete="new-password"
                type="password"
                component={FormikField}
              />
              <Field
                name="password confirmation"
                placeholder="password confirmation"
                autoComplete="new-password"
                type="password"
                component={FormikField}
              />
              <Form.Field>
                <Header as="h4" style={{margin: "0 0 5px 0"}}>
                  timezone
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
    validateOnBlur: false,
    mapPropsToValues: () => ({
      username: "",
      email: "",
      password: "",
      "password confirmation": "",
      timezone: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const result = await props.submit(values)
      let hasErrors
      if (typeof result !== "string") {
        hasErrors = result.filter(obj => obj.path)
      }

      // if signup info is legit
      if (isEmpty(hasErrors)) {
        localStorage.setItem("AUTH_TOKEN", result)
        history.push("/")
        props.addFlashMessage({
          type: "success",
          text: "Welcome to Utterzone.  Have Fun!"
        })
      } else {
        // if singup info is not legit
        console.log("hasERRor: ", hasErrors[0])
        setErrors(hasErrors[0])
        props.addFlashMessage({
          type: "error",
          text: "You fucked up dude"
        })
      }
    }
  })(SignupForm)
)
