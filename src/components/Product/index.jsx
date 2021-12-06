import React, { Component } from "react";
import { observer, inject } from "mobx-react";

// inject 就是将根容器中的 子容器映射到组件中
@inject("productsStore")
@inject("cartStore")
@observer
class Product extends Component {
  componentDidMount() {
    const { productsStore: pds } = this.props;
    pds.getAllProducts();
  }

  render() {
    const { productsStore: pds, cartStore: cart } = this.props;
    return (
      <div>
        <h2>Products</h2>
        <ul>
          {pds.all.map((item) => (
            <li key={item.id}>
              {item.title} - {item.price} * {item.inventory}
              <br />
              {/* 当商品数小于等于0时禁用按钮 */}
              <button
                disabled={!item.inventory}
                onClick={() => {
                  cart.addToCart(item);
                }}
              >
                {item.inventory ? 'Add to cart' : 'sold out'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Product;
