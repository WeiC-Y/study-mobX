import React, { Component } from "react";

import Cart from "./components/Cart";
import Product from "./components/Product";

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Shopping Cart Example</h1>
        <hr />
        <Product />
        <hr />
        <Cart />
      </div>
    );
  }
}
