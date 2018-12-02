import React, {PureComponent} from "react"
import {ThemeProvider} from "styled-components"
import {withFormik, Field} from "formik"
import {connect} from "react-redux"
import {Grid, Button, Form, Header, Image, Container} from "semantic-ui-react"
import {changePasswordSchema} from "@utterzone/common"
import {main} from "../../themes/config"
import {FormikField, Spacer} from "../../components"
import {history} from "@utterzone/connector"

// actions
import "./forms.css"

class ChangePasswordForm extends PureComponent {
  render() {
    const {handleSubmit} = this.props
    return (
      <Grid columns={4} centered padded stackable>
        <Grid.Column textAlign="center" width={8}>
          <Spacer margin="65px" />
          <Image
            centered
            alt=""
            src="https://media.swncdn.com/cms/CW/faith/31429-speaking-in-front-of-crowd-1200.jpg"
          />
          <Header as="h2">Education increases life opportunities.</Header>
          <Header as="h3">
            &quot;The great aim of education is not knowledge but action.&quot;
            &mdash;Herbert Spencer
          </Header>
          <Spacer margin="100px" />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={6}>
          <Container>
            <Form error onSubmit={handleSubmit} style={{position: "relative"}}>
              <Spacer margin="70px" />
              <Header as="h1">Change Password</Header>
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
                type="password"
                component={FormikField}
              />
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

export default connect(
  null,
  null
)(
  withFormik({
    validationSchema: changePasswordSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      password: "",
      "password confirmation": ""
    }),
    handleSubmit: async (values, {props, setErrors}) => {
      values.token = props.token
      const onComplete = () => {
        history.push("/a/reset-password", {
          announcement: "Please login with your new password."
        })
      }
      const errors = await props.submit(values)
      if (errors) {
        setErrors(errors)
      }
      if (!errors) {
        onComplete()
      }
    }
  })(ChangePasswordForm)
)
