/* eslint no-unneeded-ternary: 0 */
import React, {Component} from "react"
import {compose, withApollo} from "react-apollo"
import {toast} from "react-toastify"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import SendIcon from "@material-ui/icons/Send"
/* import Typography from "@material-ui/core/Typography" */
/* import TextField from "@material-ui/core/TextField" */
import {withStyles} from "@material-ui/core/styles"
import styled from "styled-components"
import Select from "react-select"
import {FormikInput, Label, Section} from "../../../components"
import {PhoneNumberFormat, PhoneNumberUtil} from "google-libphonenumber"
import CallingCodes from "../../../assets/js/CallingCodes.js"
import {contactSchema} from "@utterzone/common"
import {withFormik, Field} from "formik"
import gql from "graphql-tag"
import "./select.css"

const CONTACT_MUTATION = gql`
  mutation contactMutation(
    $name: String!
    $email: String!
    $message: String!
    $phone: String!
    $subject: String!
  ) {
    contact(
      input: {
        name: $name
        email: $email
        message: $message
        phone: $phone
        subject: $subject
      }
    ) {
      success
      errors
    }
  }
`

const customStyles = {
  control: styles => ({
    // none of react-select's styles are passed to <Control />
    ...styles,
    backgroundColor: "transparent",
    height: 56,
    marginRight: 20,
    marginTop: 6,
    width: 200
  })
}

const styles = theme => ({
  root: {
    maxWidth: 900,
    margin: "0 auto"
  },
  button: {
    position: "absolute",
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 2
  },
  text: {
    color: "white"
  },
  masthead: {
    padding: theme.spacing.unit * 1,
    margin: "auto",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column"
    }
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  section: {
    padding: theme.spacing.unit * 1,
    margin: "0 auto 100px",
    maxWidth: 900,
    [`@media (max-width:770px)`]: {
      flexDirection: "column"
    }
  }
})

const Role = styled.div`
  color: ${props => props.color};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  text-shadow: ${props => props.textshadow};
`

Role.defaultProps = {
  color: "blue",
  fontsize: "2rem",
  fontweight: "600",
  padding: "0 0 20px 0",
  textalign: "left",
  textshadow: "0 0 0 0"
}

const Phone = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
const Form = styled.form`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${props => props.flexdirection};
  height: ${props => props.height};
  justify-content: center;
  overflow: hidden;
  position: ${props => props.position};
  width: ${props => props.width};

  @media (min-width: 768px) {
    display: flex;
    flex-direction: ${props => props.flexdirection768};
    justify-content: center;
  }
`
Form.defaultProps = {
  flexdirection: "column",
  position: "relative",
  width: "100%"
}

const Rightside = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => props.height};
  justify-content: space-between;
  padding: ${props => props.padding};
  position: ${props => props.position};
  width: ${props => props.width};

  @media (min-width: 768px) {
    padding: 5rem 0;
  }
`
Rightside.defaultProps = {
  padding: "0 0 5rem 0",
  position: "relative",
  width: "50%"
}

const MsgBox = styled.textarea`
  height: ${props => props.height};
  margin: 0 auto;
  width: ${props => props.width};
`
MsgBox.defaultProps = {
  height: "300px",
  width: "100%"
}

const Closing = styled.div`
  color: ${props => props.color};
  text-align: right;
  margin-right: 130px;
`
Closing.defaultProps = {
  color: props => props.theme.color
}

const Signature = styled.div`
  color: ${props => props.color};
  font-size: ${props => props.fontsize};
  margin-right: 50px;
  text-align: right;
`
Signature.defaultProps = {
  color: props => props.theme.color,
  fontsize: "1rem"
}

class ContactForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      errors: false,
      number: "",
      country: "",
      subject: "",
      letter: "",
      loading: false,
      message: "",
      validMsg: ""
    }
  }

  componentDidMount() {
    this.phoneUtil = PhoneNumberUtil.getInstance()
  }

  componentDidUpdate() {
    console.log("statu: ", this.props.status)
  }

  onChange = ({target}) => {
    this.setState(
      {
        [target.name]: target.value
      },
      console.log("number: ", this.state)
    )
    /* if (target.name === "number") { */
    /*   this.validatePhoneNumber("+" + this.state.country + " " + target.value) */
    /* } */
  }

  onSelect2 = cntrObj => {
    this.setState({
      country: cntrObj
    })
    console.log("phone: ", this.phoneUtil)
    /* this.validatePhoneNumber("+" + cntrObj.value + " " + this.state.number) */
  }

  getValidNumber = phoneNumber => {
    const phoneUtil = PhoneNumberUtil.getInstance()
    const parsedNumber = phoneUtil.parse(phoneNumber)
    return phoneUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL)
  }

  validatePhoneNumber = phoneNumber => {
    /*
     *     Phone number validation using google-libphonenumber
     *         */
    let valid = false
    try {
      const phoneUtil = PhoneNumberUtil.getInstance()
      valid = phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber))
    } catch (e) {
      valid = false
    }
    if (valid) {
      this.setState({
        validMsg: `Phone number ${this.getValidNumber(phoneNumber)} is valid`,
        color: "green"
      })
    } else {
      this.setState({
        validMsg: `Phone number ${phoneNumber} is not valid`,
        color: "red"
      })
    }
  }

  render() {
    const {classes, handleSubmit} = this.props
    console.log("this.props: ", this.props)
    return (
      <React.Fragment>
        <main className={classes.root}>
          <Form onSubmit={handleSubmit}>
            <Section
              margin="80px 0 0 0"
              padding="0 0 100px 0"
              maxwidth="1024px">
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    name="name"
                    label="Name"
                    autoComplete="name"
                    component={FormikInput}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    id="email"
                    name="email"
                    label="Email"
                    autoComplete="email"
                    component={FormikInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    id="Subject"
                    name="subject"
                    label="Subject"
                    autoComplete="subject"
                    component={FormikInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} md={6}>
                      <Phone>
                        <Label
                          textalign="left"
                          padding="0 20px 0 0"
                          fontsize="1rem"
                          width="50px">
                          Phone
                        </Label>
                        <Select
                          styles={customStyles}
                          clearable={false}
                          name="country"
                          autosize
                          placeholder="country"
                          value={this.state.country}
                          onChange={this.onSelect2}
                          options={CallingCodes}
                          labelKey="country"
                          valueKey="value"
                          valueRenderer={country => country.label}
                        />
                      </Phone>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        required
                        name="number"
                        autoComplete="number"
                        value="+ 1"
                        component={FormikInput}
                      />
                      {this.state.validMsg}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    id="outlined-multiline-static"
                    name="message"
                    required
                    label="Message"
                    multiline
                    rows="8"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    component={FormikInput}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={this.props.status && this.props.status.loading}
                    className={classes.button}
                    type="submit">
                    Send
                    <SendIcon className={classes.rightIcon}>send</SendIcon>
                  </Button>
                </Grid>
              </Grid>
            </Section>
          </Form>
        </main>
      </React.Fragment>
    )
  }
}

export default compose(
  withApollo,
  withFormik({
    validationSchema: contactSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      name: "",
      email: "",
      subject: "",
      phone: "",
      message: ""
    }),
    handleSubmit: async (values, {props, setStatus, resetForm}) => {
      console.log("values: ", values)
      console.log("props: ", props)
      setStatus({loading: true})
      const result = await props.client.mutate({
        mutation: CONTACT_MUTATION,
        variables: {
          email: values.email,
          message: values.message,
          name: values.name,
          phone: values.phone,
          subject: values.subject
        }
      })

      console.log("result: ", result)
      if (result) {
        if (result.data.contact.success.length > 0) {
          toast.success("Your message was sent!", {
            className: "toasty",
            bodyClassName: "toasty-body",
            hideProgressBar: true
          })
          resetForm()
        } else {
          toast.error(result.errors[0], {
            className: "toasty",
            bodyClassName: "toasty-body",
            hideProgressBar: true
          })
        }
        setStatus({loading: false})
      }
    }
  }),
  withStyles(styles)
)(ContactForm)
