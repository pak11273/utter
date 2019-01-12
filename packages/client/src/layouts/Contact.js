import React, {Component} from "react"
import {connect} from "react-redux"
import {Helmet} from "react-helmet"
import {ContextConsumer} from '../app/context'
import {Grid, Header} from "semantic-ui-react"
import ContactForm from "../containers/Forms/ContactForm/contact-form"

// actions
import {contactmail} from "../app/actions/contactmailActions"
import {toggleFooter} from "../app/actions/toggleFooterAction.js"


class Contact extends Component {
  componentDidMount() {
    this.props.toggleFooter(true)
  }

  render() {
    const {contactmail} = this.props
    return (
      <ContextConsumer>
			{(value) => (
				<div>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Make direct contact with our team through our contact information form.  We will do our best to respond in a timely manner.  If you are a business or educational institution this would be an ideal place to shoot a short inquiry."
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Contacts</title>
          <link rel="canonical" href="https://utter.zone/contact" />
        </Helmet>
        <Grid>
          <Grid.Row centered style={{background: "black", padding: "100px"}}>
            <Header as="h1" size="huge" color="yellow">
				Contact Us
            </Header>
				<div>
				{console.log('value: ', value)}
				</div>
            <Header as="h3" color="yellow" textAlign="left">
              Make direct contact with our team through our contact information
              form. We will do our best to respond in a timely manner. If you
              are a business or educational institution, this would be a good
              place to shoot a short inquiry.
            </Header>
          </Grid.Row>
          <Grid.Row>
            <ContactForm contactmail={contactmail} />
          </Grid.Row>
        </Grid>
				</div>
			)}
      </ContextConsumer>
    )
  }
}

const actions = {
  contactmail,
  toggleFooter
}

export default connect(
  null,
  actions
)(Contact)
