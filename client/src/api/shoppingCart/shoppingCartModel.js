// items in cart
// qty of items
// applicable tax based on state or province
//
import {fk, many, attr, Model} from 'redux-orm'

class ShoppingCart extends Model {
  static get fields() {
    return {
      shoppingCart: fk('ShoppingCart')
    }
  }

  static parse(shoppingCartData) {
    return this.upsert(shoppingCartData)
  }

  static reducer(action, ShoppingCart, session) {}

  toString() {
    return `ShoppingCart: ${this.name}`
  }
}

ShoppingCart.modelName = 'ShoppingCart'

export default ShoppingCart
