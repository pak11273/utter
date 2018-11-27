import React, {PureComponent} from "react"
import {ThemeProvider} from "styled-components"
import {withFormik, Field} from "formik"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
/* import isEmpty from "lodash/isEmpty" */
import {Grid, Button, Form, Header, Image, Container} from "semantic-ui-react"
/* import * as yup from "yup" */
import {loginSchema} from "@utterzone/common"
import {main} from "../../themes/config"
import {FormikField, Spacer} from "../../components"

// actions
import {toggleFooter} from "../../app/actions/toggleFooterAction.js"
import login from "../../api/user/actions/login-actions.js"
import "./forms.css"

class LoginForm extends PureComponent {
  componentDidMount() {
    // this.props.actions.toggleFooter(false)
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <Grid columns={4} centered padded stackable>
        <Grid.Column textAlign="center" width={8}>
          <Spacer margin="65px" />
          <Image
            centered
            alt=""
            src="http://www.route-charlemagne.eu/images/content/Karl/karl_ideal_header.jpg"
          />
          <Header as="h2">Explore a new world</Header>
          <Header as="h3">
            {" "}
            &quot;To have another language is to possess a second soul.&quot;
            &mdash;Charlemagne
          </Header>
          <Spacer margin="100px" />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={6}>
          <Container>
            <Form error onSubmit={handleSubmit} style={{position: "relative"}}>
              <Spacer margin="70px" />
              <Header as="h1">Login</Header>
              <Field
                name="identity"
                placeholder="username or email"
                component={FormikField}
              />
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
              <Form.Group style={{position: "absolute", right: "10px"}}>
                <a href="#"> Forgot Password? </a>
              </Form.Group>
              <ThemeProvider theme={main}>
                <Button
                  color="yellow"
                  floated="right"
                  fontSize="1.5rem"
                  style={{margin: "30px 0 0 0"}}
                  type="submit">
                  Submit
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
  loginReducer: state.userReducer.login
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      toggleFooter,
      login: login.request
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      identity: "",
      password: "",
      passwordConfirmation: ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      const errors = await props.submit(values)
      if (errors) {
        setErrors(errors)
      }
    }
  })(LoginForm)
)
