import {
  observable,
  action,
  computed
} from 'mobx'

// 引入发请网络请求的方法
import {
  buyProduces
} from '../api/shop'

class CartStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable checkoutStatus = null
  @observable items = []
  @observable name = 'cart'

  @action.bound addToCart(product) {
    // 判断购物车数据是否已经有该物品
    // 若有，则让购物车商品数量+1
    // 若没有， 则添加新的商品到购物车中
    const prod = this.items.find(carItem => carItem.id === product.id)
    if (prod) {
      prod.quantity++
    } else {
      this.items.push({
        id: product.id,
        quantity: 1
      })
    }
    const {
      productsStore: {
        decrementInventory
      }
    } = this.rootStore
    decrementInventory(product)
  }

  // checkout function
  @action.bound checkout(prods) {
    // 1. backup cart data
    const saveProduces = [...prods]

    // 2. clear checkoutStatus
    this.setCheckoutStatus(null)

    // 3. clear cart data
    this.setItems([])

    // 4. start a checkout reuqest
    //    return true：set checkoutStatus true
    //    return false: set checkoutStatus fild，and recover cart data
    buyProduces(
      prods,
      () => {
        this.setCheckoutStatus("successsful")
      }, 
      () => {
        // 恢复购物车数据
        this.setCheckoutStatus("failed")
        this.setItems(saveProduces)
      })
  }

  // 设置结算状态
  @action.bound setCheckoutStatus(status) {
    this.checkoutStatus = status
  }

  // 设置购物车
  @action.bound setItems(items) {
    this.items = items
  }

  // computed 计算属性 任何影响计算值的值发生变化都会重新运行
  // 使用时在类属性的 getter 方法上使用
  @computed get cartProducts() {
    const {
      productsStore
    } = this.rootStore
    return this.items.map(cartItem => {
      // 通过遍历添加到购物车里的商品id 使用find方法将productsStore里的商品数据获取过来
      const prod = productsStore.all.find(prodItem => prodItem.id === cartItem.id)
      return {
        id: prod.id,
        name: prod.title,
        price: prod.price,
        quantity: cartItem.quantity
      }
    })
  }

  @computed get totalPrice() {
    return this.cartProducts.reduce((total, prod) => {
      total = total * 1 + prod.price * prod.quantity
      return total.toFixed(2)
    }, 0)
  }
}

export default CartStore