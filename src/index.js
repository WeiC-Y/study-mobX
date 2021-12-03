import React from 'react';
import ReactDOM from 'react-dom';
import { observable, action, autorun, computed, configure, runInAction, when, reaction } from 'mobx'
import { observer } from "mobx-react";
// import './es6/decorator'

// 用于开启mobx严格模式 改变数据时只允许通过 action 装饰过的函数修改
configure({
  enforceActions: 'observed'
})

// 1. 初始化 mobx 容器仓库
class Store{
// 将普通数据转换为可被观测的数据
// 只有 observable 装饰过的数据才能被mobx提供的 api 观测到改变
  @observable count = 0
  foo = 'bar'

  // @action.bound 就是给 方法绑定 this
  @action.bound increment = () => {
    this.count ++
  }
  @observable price = 10

  /**
   * computed 计算属性
   * 基于已有的容器状态衍生出需要的业务数据状态
   * 将业务逻辑封装到计算属性中 本质为方法 当作属性使用
   * 跟 vue 中的 computed 一致 有缓存 多次调用时会使用缓存中的数据
   */
  @computed get totalPrice() {
    return this.count * this.price
  }

  @action change() {
    // this.count = 10
    // this.price = 20
    console.log(this);
  }

  // 启用 Mobx 严格模式后 在异步操作中修改 容器状态的值会报错
  @action.bound asyncChange() {
    setTimeout(() => {
      // this.count = 100
      
      // 1. 定义action函数
      // this.changeCount()

      // 2. 直接调用 action 函数 定义一个名称为changeCount的函数并立即调用
      // action('changeCount',() => {
      //   this.count = 50
      // })()

      // 3. 使用runInAction
      runInAction(() => {
        this.count = 100
      })
    },100)
  }

  @action.bound changeCount(value = 20) {
    this.count = value
  }
}

const store = new Store()

// 对改变的数据进行响应的方式
/**
 * 1. autorun
 * 会默认执行一次 然后当内部所依赖的被观测的数据发生改变的时候重新触发执行
 * 以下 autorun 的依赖为 store.count
 * 如下例中 foo 改变无法触发 autorun，count改变可以
 */
autorun(() => {
  console.log('autorun：', store.count, store.price);
})

/**
 * 2. when
 * 当 count > 100 的时候，只执行一次自定义的逻辑
 * 第一个参数是返回设定的条件
 * 第二个参数是满足第一个条件后 执行的函数
 */
when(
  ()=>{
    return store.count > 100
  },
  ()=> {
    console.log("when：", store.count);
  }
)

/**
 * 3. reaction
 * 同样接受两个参数
 * 不同于autorun 和 when
 * reaction 只有当被观测到的数据发生改变时才会执行
 */
reaction(
  () => {
    // 执行一些业务逻辑，返回数据给下一个函数使用
    return store.count
  },
  (data, reaction) => {
    // data 就是上一个函数的返回值
    console.log('reaction：', data);

    // reaction 就是 reaction本身
    // dispose() 方法手动停止当前 reaction 的监听
    reaction.dispose()
  }
)

store.changeCount(200)

// 如果不想使用 action 函数 可以直接使用runInAction方法改变值
runInAction(()=>{
  store.count = 15
  store.price = 30
})


/**
 * 以下改变方式可以改变对象中的数据 并且 observable 过的数据改变后
 * 可以触发 autorun 但是这样每一个 observable 过的数据改变 都会触发
 * autorun 执行 可以封装到 action 后的函数中 多个改变只触发一次 
 * store.count = 20
 * store.foo = 'hello'
 * store.price = 20
 */
// store.change()  输出 store

// const change = store.change
// change()  不添加 .bound，输出 undefined
// store.count = 11 报错

store.asyncChange()

// 2. 在组件中使用 mobx 容器状态
// @obserber 将mobx和 react 组件连接在一起的桥梁
@observer
class App extends React.Component{
  render() {
    const { store } = this.props
    return (
      <div>
        <div>{ store.count }</div>
        <button onClick={ store.increment }>Increment</button>
        {/* 使用 computed API 替换以下语句 */}
        <div>Total: { store.totalPrice }</div>
      </div>
    )
  }
}

// 3. 在组件中发起 action 修改容器状态
// 使用props 将store对象传递进组件
ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);

