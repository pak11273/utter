import React, {Component} from "react"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import {Img} from "../../../components"

/* function getTaxPercent(abv) { */
/*   switch ( */
/*     abv */
/*     // TODO: */
/*   ) { */
/*   } */
/* } */

export default class ShoppingCart extends Component {
  render() {
    /* const {items, selectedState, taxPercent, subtotal, total} = this.props */

    return (
      <Grid>
        <Grid style={{marginTop: "40px"}} centered stackable>
          <Grid.Column largeScreen={4}>
            <h1>Pay by Credit Card</h1>
            <h4>Payment processing secured by Stripe</h4>
            <form>
              <div>Name on Card</div>
              <input placeholder="ie. John Doe" />
              <div>Card Number</div>
              <input placeholder="ie. 898BJ897XT823464" />
              <div>Expiration </div>
              <input placeholder="ie. MM/YY" />
              <div>CVV</div>
              <input placeholder="ie. 3424" />
              <checkbox label="I agree to the Terms and Conditions" />
              <p>SubTotal</p>
              <p>Tax (CA residents only)</p>
              <h1>Total</h1>
              <Button type="submit">Submit</Button>
            </form>
          </Grid.Column>
          <Grid.Column largeScreen={1} verticalAlign="middle">
            <p>- OR -</p>
          </Grid.Column>
          <Grid.Column largeScreen={4} verticalAlign="middle">
            <h1>Pay by</h1>
            <Img src="http://1000logos.net/wp-content/uploads/2017/05/Paypal-Logo.png" />
          </Grid.Column>
        </Grid>
        <Grid centered>
          <Grid.Column largeScreen={6}>
            By clicking Submit, I agree to purchase an ongoing subscription to
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

/* function mapStateToProps(state) { */
/*   const selectedState = state.cart.get("state") */

/*   /1* const items = state.cart.get("items", List()).map(i => { *1/ */
/*   /1*   return i.set("total", i.get("price", 0) * i.get("quantity")) *1/ */
/*   /1* }) *1/ */

/*   const subtotal = items.reduce((acc, i) => { */
/*     return acc + i.get("price", 0) * i.get("quantity") */
/*   }, 0) */

/*   const taxPercent = getTaxPercent(selectedState) */

/*   return { */
/*     /1* items, *1/ */
/*     selectedState, */
/*     taxPercent, */
/*     subtotal */
/*   } */
/* } */
