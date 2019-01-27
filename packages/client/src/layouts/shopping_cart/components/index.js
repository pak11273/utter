import React, {Component, PropTypes} from 'react'
import {connetct} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button, Checkbox, Form, Grid, Image} from 'semantic-ui-react'

function getTaxPercent(abv) {
  switch (abv) {
  // TODO:
  }
}

export default class ShoppingCart extends Component {
  render() {
    const {items, selectedState, taxPercent, subtotal, total} = this.props

    return (
      <Grid>
        <Grid style={{marginTop: '40px'}} centered stackable>
          <Grid.Column largeScreen={4}>
            <h1>Pay by Credit Card</h1>
            <h4>Payment processing secured by Stripe</h4>
            <Form>
              <Form.Field>
                <label>Name on Card</label>
                <input placeholder="ie. John Doe" />
              </Form.Field>
              <Form.Field>
                <label>Card Number</label>
                <input placeholder="ie. 898BJ897XT823464" />
              </Form.Field>
              <Form.Field>
                <label>Expiration </label>
                <input placeholder="ie. MM/YY" />
              </Form.Field>
              <Form.Field>
                <label>CVV</label>
                <input placeholder="ie. 3424" />
              </Form.Field>
              <Form.Field>
                <Checkbox label="I agree to the Terms and Conditions" />
              </Form.Field>
              <p>SubTotal</p>
              <p>Tax (CA residents only)</p>
              <h1>Total</h1>
              <Button type="submit">Submit</Button>
            </Form>
          </Grid.Column>
          <Grid.Column largeScreen={1} verticalAlign="middle">
            <p>- OR -</p>
          </Grid.Column>
          <Grid.Column largeScreen={4} verticalAlign="middle">
            <h1>Pay by</h1>
            <Image src="http://1000logos.net/wp-content/uploads/2017/05/Paypal-Logo.png" />
          </Grid.Column>
        </Grid>
        <Grid centered>
          <Grid.Column largeScreen={6}>
            By clicking 'Submit', I agree to purchase an ongoing subscription to
            the Memrise service, subject to the Memrise Terms of Use and the
            following terms: USD 59 per billing cycle, charged in advance. I can
            cancel any time, effective the following billing cycle. Pricing
            includes VAT.
          </Grid.Column>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  const selectedState = state.cart.get('state')

  const items = state.cart.get('items', List()).map(i => {
    return i.set('total', i.get('price', 0) * i.get('quantity'))
  })

  const subtotal = items.reduce((acc, i) => {
    return acc + i.get('price', 0) * i.get('quantity')
  }, 0)

  const taxPercent = getTaxPercent(selectedState)

  return {
    items,
    selectedState,
    taxPercent,
    subtotal,
    total
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}
