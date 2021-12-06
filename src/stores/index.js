import ProductsStore from "./products"
import CartStore from "./cart"

class RootStore {
  constructor() {
    // 将rootStore传递到子 store 中，使得子容器可以互相访问
    this.productsStore = new ProductsStore(this)
    this.cartStore = new CartStore(this)
  }
}

export default RootStore