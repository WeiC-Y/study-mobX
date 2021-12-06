import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("cartStore")
@observer
class Cart extends Component {
  render() {
    const { cartStore: cart } = this.props;
    return (
      <div>
        <h2>Your Cart</h2>
        <ul>
          {cart.cartProducts.map((item) => {
            return (
              <li key={item.id}>
                {item.name} - {item.price} * {item.quantity}
              </li>
            );
          })}
        </ul>
        <div>total price：{cart.totalPrice ? cart.totalPrice : 0}</div>
        <div>
          {/* checkout button，click to clear cart */}
          <button
            disabled={!cart.items.length}
            onClick={() => cart.checkout(cart.cartProducts)}
          >
            Checkout
          </button>
        </div>
        {cart.checkoutStatus && <p>Checkout {cart.checkoutStatus}</p>}
      </div>
    );
  }
}

export default Cart;
