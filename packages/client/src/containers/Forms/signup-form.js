import "./forms.css"
import {
  Grid,
  Button,
  Form,
  Header,
  Image,
  Container,
  Message
} from "semantic-ui-react"

import Typography from "@material-ui/core/Typography"

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {signupSchema} from "@utterzone/common"
import {withFormik, Field} from "formik"
import React, {PureComponent} from "react"
import {cloneDeep} from "lodash"
import {FormikInput, Spacer} from "../../components"
import {toggleFooter} from "../../core/actions/toggle-footer-action.js"
import Terms from "../../documents/terms-and-conditions.js"
import Timezones from "../../components/Selects/Timezones/Timezones.js"
/* import signup from "../../api/user/actions/signup-actions.js" */
import {history} from "@utterzone/connector"

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
          <Typography variant="h2" color="inherit" noWrap>
            Join our Community
          </Typography>
          <Typography variant="h4" color="inherit" noWrap>
            Become part of a growing community of avid learners like yourself
          </Typography>
          <Header as="h3" />
          <Spacer margin="100px" />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={6}>
          <Container>
            <Form error onSubmit={handleSubmit} style={{position: "relative"}}>
              <Spacer margin="70px" />
              <Typography variant="h2" color="inherit" noWrap>
                Registration
              </Typography>
              <Header>username</Header>
              <Field
                name="username"
                placeholder="username"
                component={FormikInput}
              />
              <Header>email</Header>
              <Field name="email" placeholder="email" component={FormikInput} />
              <Header>password</Header>
              <Field
                name="password"
                placeholder="password"
                autoComplete="new-password"
                type="password"
                component={FormikInput}
              />
              <Header>password confirmation</Header>
              <Field
                name="password confirmation"
                placeholder="password confirmation"
                autoComplete="new-password"
                type="password"
                component={FormikInput}
              />
              <Form.Field>
                <Header>timezone</Header>
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
              <Button
                disabled={agreementChecked}
                color="yellow"
                floated="right"
                fontSize="1.5rem"
                style={{margin: "30px 0 0 0"}}
                type="submit">
                Join
              </Button>
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
      toggleFooter
      /* signup: signup.request */
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
      const onComplete = () => {
        history.push("/a/confirm-email", {
          announcement: "Please check your email to confirm your address."
        })
      }

      // if signup info is legit
      if (typeof result === "string") {
        localStorage.setItem("AUTH_TOKEN", result)
        onComplete()
        props.addFlashMessage({
          type: "success",
          text: "Welcome to Utterzone"
        })
      } else {
        // if singup info is not legit
        setErrors(result)
      }
    }
  })(SignupForm)
)
