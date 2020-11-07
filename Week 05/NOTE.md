### Proxy

- Proxy 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）

```
 const p = new Proxy(target, handler)

 // target: 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
 // handler: 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

```

### Map

- map 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或原始值）都可以作为一个键或一个值。
- Map 与 Object 的区别比较
  | | Map | Object |
  |:--:|-----------------------|-----------------------|
  | 意外的键 | 默认情况不包含任何键。只包含显式插入的键 | 一个 Object 有一个原型，原型链上的键名可能和你自己在对象上设置的键名相同发生冲突<br><div style="color:darkred">（ES5 开始，使用 Object.create(null) 来创建没有一个原型的对象）</div>|
  | 键的类型 | 任意值，包括函数、对象或任意基本类型 | String 或 Symbol |
  | 键的顺序 | 是有序的，迭代时，以插入顺序返回键值 | 复杂多变，可能还依赖浏览器 |
  | size | 通过 size 获得 | 手动计算 |
  | 迭代 | iterable 可迭代 | 获得键以后，才可迭代 |
  | 性能 | 频繁增删键值对的场景下表现更好 | 未做优化 |

- ```
    let myMap = new Map();
    myMap.set("one","我是一个值")

    /* --------- length vs size ---------- */
    myMap.length // undefined
    myMap.size // 1

    /* --------- 将 NAN 作为键 ----------  */
    myMap.set(NAN,"not a number")
    myMap.get(NAN) // "not a number"
    myMap.get(Number('foo')) // "not a number"

    /* --------- 使用 for..of 方法迭代 Map ---------- */
    for (let [key, value] of myMap) {
      console.log(key + " = " + value);
    }
    for (let key of myMap.keys()) {
      console.log(key);
    }
    for (let value of myMap.values()) {
      console.log(value);
    }

    /* --------- 使用 forEach() 方法迭代 Map ----------*/
    myMap.forEach(function(value, key) {
      console.log(key + " = " + value);
    })

    /* --------- Map 与数组的关系 ---------- */
    // 使用常规的Map构造函数可以将一个二维键值对数组转换成一个Map对象
    let myMap = new Map(kvArray);
    // 更简洁的方法来做如上同样的事情，使用展开运算符
    console.log([...myMap]);
    // 或者在键或者值的迭代器上使用Array.from，进而得到只含有键或者值的数组
    console.log(Array.from(myMap.keys())); // 输出 ["key1", "key2"]

  ```

### @VUE 3.0/reactivity

1. Vue 响应式系统的核心依然是**对数据进行劫持**
2. **Vue 2.0 采用 Object.defineProperty()**

   - 语法：

     > - **_Object.defineProperty ( obj, prop, descriptor )_**
     >   // descriptor: 将被定义或修改的属性的描述符。

   - 缺点：
     > - 层层递归，影响性能；
     > - 对新增、删除属性或对象上的方法无法劫持。
     > - 使用 defineProperty 只能重定义属性的读取（get）和设置（set）行为

3. **Vue 3.0 采用 Proxy**

   - 语法：

     > - **_const p = new Proxy ( target, handler )_**
     >   // target：所要拦截的目标对象
     >   // handler：定制拦截行为

   - 优点：
     > - 用到属性时才对下一层对象进行劫持，可以提升性能，
     > - 对整个对象进行劫持。
     > - 到了 ES6，提供了 Proxy，可以重定义更多的行为，比如 in、delete、函数调用等更多行为。

4. 使用 **reactive( )** 将 object 转化为 Proxy 对象，使用 effect() 将 callback 作为响应式回调。当 object [ prop ] 发生变化时，调用 callback。

5. **demo 中的性能优化**：添加对 proxy 的缓存。

### drag-drop 拖拽

1. 利用 flag ( eg: isMousedown ) 判断是否触发 mousemove，每次都会跑一次 mousemove；在 mousedown 内部监听 mousemove，性能更好。
2. - 在元素上监听 mousemove 事件，当鼠标移出 dragable 范围（拖动过快）时，出现拖断。
   - 所以需要 document 层面监听，产生捕捉鼠标的效果，即使拖出浏览器窗口外，事件仍然被监听。
3. **正常流拖动**，利用 CSSOM 和 Range 在正常流中插入拖动元素

#### 其他

- **循环(loop)/迭代(iterate)/遍历(traversal)/递归(recursion)**

  - 循环（loop），指的是在满足条件的情况下，重复执行同一段代码。比如，while 语句。
  - 迭代（iterate），指的是按照某种顺序逐个访问列表中的每一项。比如，for 语句。
  - 遍历（traversal），指的是按照一定的规则访问树形结构中的每个节点，而且每个节点都只访问一次。
  - 递归（recursion），指的是一个函数不断调用自身的行为。比如，以编程方式输出著名的斐波纳契数列。
    <br>

- **ES6 标准引入了新的 iterable 类型**，Array、Map、Set 都属于 iterable 类型，可以通过 for...of 循环遍历。更好的方式是直接使用 iterable 内置的 forEach 方法
  <br>

- **一等公民**

  > In general, a value in a programming language is said to have ﬁrst-class status if it can be passed as a parameter, returned from a subroutine, or assigned into a variable.
  > 在编程语言中，一等公民可以作为函数参数、可以当函数返回值、也可以赋值给变量。

<br>

- 区分 event 中的 **screen、page、offset、client**

  - **screen**，顾名思义“屏幕”，鼠标位置 -> 显示器屏幕
  - **page**（IE：x, y），指页面，鼠标位置 -> 原始页面原点的距离（eg.滚动情况）
  - **client**，直译客户端（不包含工具条的区域）
  - **offset**，位移量，-> 目标的距离

<br>

- **Range 对象**

  - 在 HTML5 中，一个 Range 对象代表页面上的一段连续区域。
  - 通过 Range 对象，可以获取或修改页面上任何区域的内容
  - 还可以复制或移动任何区域的元素

<br>

- **CSSOM: CSS Object Model**

  > The CSS Object Model is a set of APIs allowing the manipulation of CSS from JavaScript. It is much like the DOM, but for the CSS rather than the HTML. It allows users to read and modify CSS style dynamically.

  - 一组允许用 js 操作 DOM 的 API
  - 它类似于 DOM，但是用于 CSS，而不是 HTML
  - 用户可以动态读取或者修改 CSS

<br>

- Element.**getBoundingClientRect()** ：返回元素的大小及其相对于视口的位置。
- webpack build compiler // todo
