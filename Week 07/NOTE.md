`JS语言：完成计算 + 流程控制`

### JS 表达式

- Grammar
  - Tree & Priority
  - Left handside & Right handside
- Runtime

  - type convertion
  - reference

- **Expression**（按优先级**从高到低**排序）

  1. **Member**
     - a.b
     - a[b] `-- 运行时字符串`
     - foo \` string \`
     - super.b [^super]
       [^super]:用于访问和调用一个对象的父对象上的函数，常用于 class 构造函数
     - super['b']
     - new.target[^new.target]
       [^new.target]:允许你检测函数或构造方法是否是通过 new 运算符被调用的。
     - new Foo()
  2. **New**
     - new Foo

  ```js
    // eg.
      new a()()
      new new a()
  ```

  3. **Call** - foo() - super() - foo()['b'] - foo().b - foo()\`abc\`
     `eg: new a()['b']`
  4. **Update**
     - a++
     - a--
     - ++a
     - --a
  5. **Unary** （一元表达式）
     - delete a.b (reference 类型)
     - void foo()
     - typeof a
     - \+ a
     - \- a
     - ~ a
     - ! a
     - await a
  6. **Expoental**
     - \*\*
  7. Multiplicatve \* / %
  8. Additive + -
  9. shift <<>> >>>
  10. Relationship > < >= <= instanceof[^instanceof] in[^in]
      [^instanceof]:`object instanceof constructor ` 检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
      [^in]:`prop in obj`指定的属性在指定的对象或其原型链中，则 in 运算符返回 true。
  11. Equality == != === !==
  12. Bitewise & ^ |
  13. Logical && ||
  14. Conditional ?:

- **Reference** 引用类型（标准中的类型）
  - Objebct、key
  - delete、assign
  - JS 在删除或赋值这样的相关写操作时，使用引用类型

### Type covertion

|           | Number  | Object | String              |
| --------- | :-----: | :----: | ------------------- |
| Undefined |   NAN   |   X    |                     |
| Null      |    0    |   X    |                     |
| Object    | valueOf |   -    | valueOf<br>toString |

- **Unboxing** 拆箱转换
  - toString & valueOf
    [参考文章](https://juejin.cn/post/6844903967097356302)
  - Symbol.ToPrimative 忽略前两个
- **Boxing** 装箱转换
  |类型|对象|值|
  |--|--|--|
  |Number|new Number(1)|1|
  |String|new String("a")|"a"|
  |Boolean|new Boolean(false)|false|
  |Symbol|new Object(Symbol("s"))|symbol"s"|

### Statement 语句

- Grammar
  - 简单语句
  - 复杂语句
  - 声明
- Runtime

  - comletion record
  - lexical enviroment

- **completion record**
  - [\[type]]: normal,break,continue,return,throw
  - [\[value]]: 基本类型
  - [\[label]]: 和 break,contine 搭配
- **简单语句**
  - ExpressionStatement
  - EmptyStatement: 语言完备性
  - DebuggerStatement
  - BreakStatement
  - ContinueStatement
  - ReturnStatement
  - ThrowStatement
- **复合语句**
  - BlockStatement
  - IfStatement
  - SwitchStatement：js 中性能和 if 无区别
  - IterationStatement
  - WithStatement 不确定性，广受诟病
  - LabelStatement
  - TryStatement: try catch finally
- **TryStatement**
  - 特殊性：{}不能省略，是 try 自带的；try 中有 return，finally 依然会执行。
- **LabelStatement**

  - a labeled continue

  ```javascript
  var i, j;

  loop1: for (i = 0; i < 3; i++) {
    //The first for statement is labeled "loop1"
    loop2: for (j = 0; j < 3; j++) {
      //The second for statement is labeled "loop2"
      if (i === 1 && j === 1) {
        continue loop1;
      }
      console.log("i = " + i + ", j = " + j);
    }
  }

  // Output is:
  // "i = 0, j = 0"
  // "i = 0, j = 1"
  // "i = 0, j = 2"
  // "i = 1, j = 0"
  // "i = 2, j = 0"
  // "i = 2, j = 1"
  // "i = 2, j = 2"
  // Notice how it skips both "i = 1, j = 1" and "i = 1, j = 2"
  ```

  - a labeled break

  ```javascript
  var i, j;
  loop1: for (i = 0; i < 3; i++) {
    //The first for statement is labeled "loop1"
    loop2: for (j = 0; j < 3; j++) {
      //The second for statement is labeled "loop2"
      if (i === 1 && j === 1) {
        break loop1;
      }
      console.log("i = " + i + ", j = " + j);
    }
  }

  // Output is:
  // "i = 0, j = 0"
  // "i = 0, j = 1"
  // "i = 0, j = 2"
  // "i = 1, j = 0"
  // Notice the difference with the previous continue example
  ```

### 声明

- 预处理 pre-process
  if return try..catch 等，都会被捕获到。

  ```javascript
  var a = 2;
  void (function () {
    a = 1;
    return;
    var a;
  })();
  console.log(a); // 2
  ```

  ```javascript
  var a = 2;
  void (function () {
    try {
      a = 1;
    } catch (error) {
      console.log(error);
    }
    return;
    let a;
  })();
  // const 需要设置初始值，let var 不需要
  // let const 的预处理：在声明前赋值，报错。
  // 输出：
  // ReferenceError: Cannot access 'a' before initialization
  ```

- 作用域

  - function body
    - function
    - function \*
    - async function
    - async function \*
    - var
  - block
    - const
    - let
    - class

  ```javascript
  var a = 2;
  void (function () {
    a = 1;
    {
      var a;
    }
  })();
  console.log(a); //2
  ```

  ```javascript
  var a = 2;
  void (function () {
    a = 1;
    {
      let a;
    }
  })();
  console.log(a); //1
  ```

### 宏任务和微任务

- 首先，JavaScript 是一个**单线程**的脚本语言。
- **宏任务**：交给引擎的任务
- **微任务（promise）**：在引擎中执行的任务
- 微任务实际上是宏任务的其中一个步骤（**包含**）
- 运行时包含了一个待处理消息的**消息队列**
- 在 **事件循环** 期间的某个时刻，运行时会从最先进入队列的消息开始处理队列中的消息。
- **Event-loop**：等待一个锁、获取代码、执行代码
  - 检查还有没有微任务需要处理
  - 结束本次宏任务、检查还有没有宏任务需要处理

### 函数调用

- 函数调用形成了一个由若干帧组成的栈（Execution context stack）。
- **执行上下文（Execution Context）**
  - code evaluation state: async/generator,代码执行到哪儿了
  - Function: Function 初始化
  - Script or Moduel
  - Generator: only Generator 函数
  - Realm：放置所有内置对象的领域
  - LexicalEnvironment：执行环境（保存变量）
  - variableEnvironment：var 声明环境（历史包袱）
- LexicalEnvironment
  - this
  - super
  - new.target
  - 变量
- VariableEnvironment（历史包袱）
  - eval 将传入的字符串当做 JavaScript 代码进行执行。
    :warning: `MDN: 永远不要使用 eval！`
  - with
    :warning:`不建议使用 with 语句，因为它可能是混淆错误和兼容性问题的根源。`
    :warning:`在 ECMAScript 5 严格模式中该标签已被禁止。推荐的替代方案是声明一个临时变量来承载你所需要的属性。`
- **Function - closure**
  - 一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。
  - 也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。
  - 在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

### 其他

- **startsWith**：判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。
  `str.startsWith(searchString[, position])`
- **with**
  - 数据泄漏，局部泄漏到全局
  - 性能下降
- **for 循环重的 var 和 let**

  1. 在 for 循环中使用 let 的情况下，由于块级作用域的影响，导致每次迭代过程中的 i 都是独立的存在。
  2. 既然说每次迭代的 i 都是独立的存在，那 i 自增又是怎么知道上次迭代的 i 是多少？这里通过 ES6 提到的，我们知道是 js 引擎底层进行了记忆。[^for-variable]
     [^for-variable]:JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量 i 时，就在上一轮循环的基础上进行计算。[参考文章](https://www.cnblogs.com/echolun/p/10584703.html)

  ```javascript
  //使用var声明，得到3个3
  var a = [];
  for (var i = 0; i < 3; i++) {
    a[i] = function () {
      console.log(i);
    };
  }
  a[0](); //3
  a[1](); //3
  a[2](); //3
  //使用let声明，得到0,1,2
  var a = [];
  for (let i = 0; i < 3; i++) {
    a[i] = function () {
      console.log(i);
    };
  }
  a[0](); //0
  a[1](); //1
  a[2](); //2
  ```

- vue3.0 conversation API ？？
