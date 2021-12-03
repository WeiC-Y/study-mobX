@fn
@fn2(10)
@fn3
class MyClass {
  @readonly message = 'hello'
  @noenumerable bar = 'foo'

  @noenumerable say() {
    console.log('hello world');
  }
}

// 修饰符简单使用
function fn(target) {
  target.foo = 'bar'
}

// 传参修饰符
function fn2(value) {
  return function (target) {
    target.count = value
  }
}

// 为类的原型对象添加成员
function fn3(target) {
  target.prototype.foo = 'baz'
}

// 修饰类成员
function readonly(target, name, descriptor) {
  // 当修饰类成员时 参数就为三个
  console.log(target); // 目标类的原型对象 prototype
  console.log(name); // 被修饰的类成员的名称
  console.log(descriptor); // 被修饰的类成员的描述对象
  /**
   * configurable: true  是否支持配置
     enumerable: true  是否支持遍历
     initializer: ƒ ()  初始函数
     writable: true  是否可修改
   */

  descriptor.writable = false
}

function noenumerable(target, name, descriptor) {
  descriptor.enumerable = false
}

console.log(MyClass.foo);
console.log(MyClass.count);

const mc = new MyClass()
console.log(mc.foo);
console.log(mc.message);
for (var key in mc) {
  console.log(`${key},${mc[key]}`);
}

mc.say()
// mc.message = 'world' 只读会报错