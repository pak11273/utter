import React, {PureComponent} from "react"
import {withFormik, Field} from "formik"
import {connect} from "react-redux"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import {changePasswordSchema} from "@utterzone/common"
import {FormikInput, Img, Spacer} from "../../components"
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
          <Img
            centered
            alt=""
            src="https://media.swncdn.com/cms/CW/faith/31429-speaking-in-front-of-crowd-1200.jpg"
          />
          <h6>Education increases life opportunities.</h6>
          <h6>
            &quot;The great aim of education is not knowledge but action.&quot;
            &mdash;Herbert Spencer
          </h6>
          <Spacer margin="100px" />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={6}>
          <div>
            <form error onSubmit={handleSubmit} style={{position: "relative"}}>
              <Spacer margin="70px" />
              <h6>Change Password</h6>
              <Field
                name="password"
                placeholder="password"
                autoComplete="new-password"
                type="password"
                component={FormikInput}
              />
              <Field
                name="password confirmation"
                placeholder="password confirmation"
                type="password"
                component={FormikInput}
              />
              <Button
                color="yellow"
                floated="right"
                fontSize="1.5rem"
                style={{margin: "30px 0 0 0"}}
                type="submit">
                Submit
              </Button>
            </form>
          </div>
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
        history.push("/")
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
