import React, {PureComponent} from "react"
import {ThemeProvider} from "styled-components"
import {withFormik, Field} from "formik"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Grid, Button, Form, Header, Image, Container} from "semantic-ui-react"
import {loginSchema} from "@utterzone/common"
import {main} from "../../themes/config"
import {FormikInput, Spacer} from "../../components"
import {history} from "@utterzone/connector"

// actions
import login from "../../api/user/actions/login-actions.js"
import "./forms.css"

class LoginForm extends PureComponent {
  render() {
    const {handleSubmit} = this.props
    return (
      <Grid columns={4} centered padded stackable>
        <Grid.Column textAlign="center" width={8}>
          <Spacer margin="65px" />
          <Image
            centered
            alt=""
            src="https://www.thestyledivision.com/wp-content/uploads/2015/05/jasper-james-double-exposure.jpg"
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
              <Header>username</Header>
              <Field
                name="username or email"
                placeholder="username or email"
                component={FormikInput}
              />
              <Header>password</Header>
              <Field
                name="password"
                placeholder="password"
                autoComplete="new-password"
                type="password"
                component={FormikInput}
              />
              <Form.Group style={{position: "absolute", right: "10px"}}>
                <a href="/forgot-password"> Forgot Password? </a>
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
  })(LoginForm)
)
