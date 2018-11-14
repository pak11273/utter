import React, {PureComponent} from "react"
import {ThemeProvider} from "styled-components"
import {withFormik, Field} from "formik"
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
import cloneDeep from "lodash/cloneDeep"
/* import * as yup from "yup" */
import {signupSchema} from "utterzone-common"
import {main} from "../../themes/config"
import Timezones from "../../components/Selects/Timezones/Timezones.js"
import {FormikField, Spacer} from "../../components"
import Terms from "../../documents/terms-and-conditions.js"

// actions
import {toggleFooter} from "../../app/actions/toggleFooterAction.js"
import signup from "../../api/user/actions/signupActions.js"
import "./forms.css"

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
                name="passwordConfirmation"
                placeholder="password confirmation"
                autoComplete="new-password"
                type="password"
                component={FormikField}
              />
              <Form.Field>
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
    validateOnBlur: false,
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
