import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {Helmet} from "react-helmet"
/* import {UserContext} from "../app/auth/user-context.js" */
import {Grid, Header} from "semantic-ui-react"
import ContactForm from "../containers/forms/contact_form/contact-form"
import {Can} from "../components"
import schema from "../app/schema"

// actions
import {contactmail} from "../app/actions/contact-mail-actions"
import {toggleFooter} from "../app/actions/toggleFooterAction.js"

class Contact extends Component {
  componentDidMount() {
    this.props.toggleFooter(true)
  }

  render() {
    const {contactmail, user} = this.props
    console.log("roles: ", user.roles)
    return (
      <Can
        roles={user.roles}
        perform="contact:read"
        yes={() => (
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
              <Grid.Row
                centered
                style={{background: "black", padding: "100px"}}>
                <Header as="h1" size="huge" color="yellow">
                  Contact Us
                </Header>
                <Header as="h3" color="yellow" textAlign="left">
                  Make direct contact with our team through our contact
                  information form. We will do our best to respond in a timely
                  manner. If you are a business or educational institution, this
                  would be a good place to shoot a short inquiry.
                </Header>
              </Grid.Row>
              <Grid.Row>
                <ContactForm contactmail={contactmail} />
              </Grid.Row>
            </Grid>
          </div>
        )}
        no={() => <Redirect to="/" />}
      />
    )
  }
}

const actions = {
  contactmail,
  toggleFooter
}

const mapStateToProps = state => {
  // Create a Redux-ORM Session from our "entities" slice, which
  // contains the "tables" for each model type
  const session = schema.session(state.apiReducer)

  // Retrieve the model class that we need.  Each Session
  // specifically "binds" model classes to itself, so that
  // updates to model instances are applied to that session.
  // These "bound classes" are available as fields in the sesssion.
  const {User} = session

  // Query the session for all User instances.
  // The QuerySet that is returned from all() can be used to
  // retrieve instances of the User class, or retrieve the
  // plain JS objects that are actually in the store.
  // The toRefArray() method will give us an array of the
  // plain JS objects for each item in the QuerySet.
  const userObj = User.all().toRefArray()
  const user = {user: userObj[0]}

  // Now that we have an array of all user objects, return the first one as a prop
  return user
}

export default connect(
  mapStateToProps,
  actions
)(Contact)
