import React, {Component} from "react"
import {connect} from "react-redux"
import {Helmet} from "react-helmet"
import {Container, Grid, Header} from "semantic-ui-react"
import ContactForm from "../../containers/forms/contact_form/contact-form"

// actions
import {contactmail} from "../../app/actions/contact-mail-actions"
import {toggleFooter} from "../../app/actions/toggle-footer-action.js"

class Contact extends Component {
  componentDidMount() {
    this.props.toggleFooter(true)
  }

  render() {
    const {contactmail} = this.props
    return (
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
          <Grid.Row centered columns={1} style={{background: "black"}}>
            <Grid.Column>
              <Container
                textAlign="center"
                style={{margin: "100px 200px", padding: "100px"}}>
                <Header as="h1" size="huge" color="yellow">
                  Contact Us
                </Header>
                <Header as="h3" color="yellow" textAlign="left">
                  Make direct contact with our team through our contact
                  information form. We will do our best to respond in a timely
                  manner. If you are a business or educational institution, this
                  would be a good place to shoot a short inquiry.
                </Header>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <ContactForm contactmail={contactmail} />
          </Grid.Row>
        </Grid>
      </div>
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
