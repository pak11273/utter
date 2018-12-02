import React, {PureComponent} from "react"
import {ThemeProvider} from "styled-components"
import {withFormik, Field} from "formik"
import {connect} from "react-redux"
import {Grid, Button, Form, Header, Image, Container} from "semantic-ui-react"
import {main} from "../../themes/config"
import {FormikField, Spacer} from "../../components"
import {history} from "@utterzone/connector"

// actions
import "./forms.css"

class ForgotPasswordForm extends PureComponent {
  render() {
    const {handleSubmit} = this.props
    return (
      <Grid columns={4} centered padded stackable>
        <Grid.Column textAlign="center" width={8}>
          <Spacer margin="65px" />
          <Image
            centered
            alt=""
            src="http://www.livescience.com/images/i/000/077/758/original/smart-woman-150812.jpg"
          />
          <Header as="h2">
            Studies show bilingual people are smarter than the average.
          </Header>
          <Header as="h3">
            {" "}
            &quot;Knowledge of language is the doorway to wisdom.&quot;
            &mdash;Roger Bacon
          </Header>
          <Spacer margin="100px" />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={6}>
          <Container>
            <Form error onSubmit={handleSubmit} style={{position: "relative"}}>
              <Spacer margin="70px" />
              <Header as="h1">ForgotPassword</Header>
              <Field name="email" placeholder="email" component={FormikField} />
              <ThemeProvider theme={main}>
                <Button color="yellow" fontSize="1.5rem" type="submit">
                  Reset Password
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
    mapPropsToValues: () => ({
      email: ""
    }),
    handleSubmit: async (values, {props}) => {
      const onComplete = () => {
        history.push("/a/reset-password", {
          announcement: "Please check your email to reset your password."
        })
      }
      const errors = await props.submit(values)
      if (!errors) {
        onComplete()
      }
    }
  })(ForgotPasswordForm)
)
