import React, {Component} from "react"
import {connect} from "react-redux"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import SendIcon from '@material-ui/icons/Send'
/* import Typography from "@material-ui/core/Typography" */
import TextField from "@material-ui/core/TextField"
import {withStyles} from "@material-ui/core/styles"
import styled from "styled-components"
import Select from "react-select"
import {Label, Section} from "../../../components"
import {PhoneNumberFormat, PhoneNumberUtil} from "google-libphonenumber"
import CallingCodes from "../../../assets/js/CallingCodes.js"
import {bindActionCreators} from "redux"
import "./select.css"

// actions
import {contactMailSend} from "../../../layouts/contact/actions.js"

const styles = theme => ({
  root: {
    maxWidth: 900,
		margin: "0 auto",
  },
	button: {
			    position: 'absolute',
			    bottom: theme.spacing.unit * 4,
			    right: theme.spacing.unit * 2,
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
		     marginLeft: theme.spacing.unit,
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
      number: "",
      country: "",
      subject: "",
      letter: "",
      message: "",
    }
  }

  onChange = ({target}) => {
    this.setState({
      [target.name]: target.value
    })
    if (target.name === "number") {
      this.validatePhoneNumber("+" + this.state.country + " " + target.value)
    }
  }

  onSelect2 = cntrObj => {
    this.setState({
      country: cntrObj.value
    })
    this.validatePhoneNumber("+" + cntrObj.value + " " + this.state.number)
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.contactmail(this.state)
    this.props.contactMailSend()
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
        message: `Phone number ${this.getValidNumber(phoneNumber)} is valid`,
        color: "green"
      })
    } else {
      this.setState({
        message: `Phone number ${phoneNumber} is not valid`,
        color: "red"
      })
    }
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
			<main className={classes.root}>
        <Form onSubmit={this.onSubmit}>
          <Section margin="80px 0 0 0" padding="0 0 100px 0" maxwidth="1024px">
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="Name"
                  name="name"
                  label="Name"
                  fullWidth
                  onChange={this.onChange}
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  onChange={this.onChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="Subject"
                  name="subject"
                  label="Subject"
                  fullWidth
                  onChange={this.onChange}
                  autoComplete="subject"
                />
              </Grid>
              <Grid item xs={12}>
                <Phone>
                  <Label
                    textalign="left"
                    padding="0 20px 0 0"
                    fontsize="1rem"
                    width="50px">
                    Phone
                  </Label>
                  <Select
                    clearable={false}
                    name="country"
                    autosize
                    placeholder="country"
                    value={this.state.country}
                    onChange={this.onSelect2}
                    options={CallingCodes}
                    labelKey="country"
                    valueKey="value"
                    valueRenderer={country => country.value}
                  />
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="number"
                      name="number"
                      fullWidth
                      onChange={this.onChange}
                      autoComplete="number"
                    />
                  </Grid>
                </Phone>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  name="letter"
                  required
                  label="Message"
                  multiline
                  rows="8"
									onChange={this.onChange}
                  className={classes.textField}
                      fullWidth
                  margin="normal"
                  variant="outlined"
                />
					<Button variant="contained" color="primary" className={classes.button} type="submit">
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

const mapStateToProps = state => {
  return {
    contactReducer: state.contactReducer
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      contactMailSend
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ContactForm))
