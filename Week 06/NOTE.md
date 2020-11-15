### 语言通识

- **语言按语法分**
  - 非形式语言
  - 形式语言（乔姆斯基谱系）
    - 0 型 无限制文法
    - 1 型 上下文相关文法
    - 2 型 上下文无关文法
    - 3 型 正则文法
- **产生式**：
  > 在计算机中指 Tiger 编译器将源程序经过**词法分析**（Lexical Analysis）和**语法分析**（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句
- BNF 巴科斯范式：

  > 是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。

- **语言的分类**

  - 用途：
    - 数据描述语言
    - 编程语言
  - 表达方式：
    - 声明式语言：需求，不管实现
    - 命令型语言：需要自己实现过程
      <br>

- **编程语言的性质**

  - 图灵完备性：所有可计算的问题都是可描述的
    - 命令式 --- 图灵机
      - goto / if 和 while
    - 声明式 --- lambda
      - 递归
  - 动态与静态
    - 动态：
      - 在用户的设备/在线服务器上
      - 产品实际运行时
      - Runtime
      - eg 一般为脚本语言，弱类型语言，在运行时可以改变其结构类型
    - 静态：
      - 开发人员的设备上
      - 产品开发时
      - CompileTime
      - eg 强类型语言，数据类型是在编译其间检查的，即在写程序时要声明所有变量的数据类型

- **类型系统**
  - 动态类型系统与静态类型系统，是在用户还是程序员的机器上获取到类型
    > Java：半动态半静态，反射作用，类型虽然是在编译的时候进行了检查，在运行时还是可以获取到
  - 强类型与弱类型（类型转换发生的形式）
    - 强类型：类型默认不会发生改变
    - 弱类型：有隐式转换
    ```
      Javascript诟病:
      Boolean == String // Boolean 先转换成数字 再进行比较
      true == 1 // true
    ```
  - 复合类型
    - 结构体
    - 函数签名
  - 子类型
  - 泛型（协变/逆变）
- **一般命令式编程语言的设计方式**
  - Atom: 变量
  - Expression 表达式
  - Statement 语句
  - Structure 结构：function class
  - Program：模块和安装（js-npm）

### 重学 JavaScript

- 字面值和运行时的类型
- **7+1 基本类型**：Symbol(专门用于对象属性名)、Object、String、Number、Boolean、Null、Undefined + BigInt
- **Number**
  - 64 位双精度浮点数：符号（1）、指数（11）、精度（52）
- **数字与点运算**：语法冲突
  ```
    0.toString() // error 不知道是小数点 还是点运算
    0 .toString() // 解决：加空格
  ```
- **String**
  - 字符集：
    1. ACSII
    2. Unicode
    3. UCS 0000-ffff
    4. GB 2312/13000/18030
    5. ISO-8859 东欧
    6. BIG5 台湾
  - 模版语法： \`abc\${abc}abc\${abc}abc\`
    1. 首字符串：`abc\${
    2. 中间字符串：}abc\${
    3. 尾字符串：}abc`
  - 标签函数
    ```
    console.log`that ${template} is a ${params}`
    // ['that', 'is a'] template params
    // 此处 console.log 作为函数名
    // ❌ console.log()
    // ✅ 没有括号 console.log
    ```
- **undefined**
  - 不是关键字，可以但变量被赋值为 true 等等
  - 用 void 0 来替代
- **Object**
  - 对象三要素：identity(身份唯一标识符)、state(状态)、behavior(行为)
  - 唯一标识性：大多数语言都用内存地址的唯一性来标识
  - class (类) ，分类 -- 单继承，归类 -- 多继承。
  - Prototype (原型) ：‘找相似’，‘照猫画虎’
  - 内聚性：对象**行为**的发生伴随着**状态的改变**。
  - 在 js 中，对象是属性的集合（函数也可以作为属性）
  - **原型链**，
    1. 每个实例对象（ object ）都有一个私有属性（称之为 \_\_proto\_\_ ）指向它的构造函数的原型对象（prototype ）。
    2. 该原型对象也有一个自己的原型对象( \_\_proto\_\_ ) ，层层向上直到一个对象的原型对象为 null。
    3. 根据定义，null 没有原型，并作为这个原型链中的最后一个环节。
  - **数据属性和访问器属性**
    - 数据属性 描述状态，访问器属性 描述行为。
    - 数据属性中如果存储函数，也可以描述行为。
    - 与自身无关的函数也是一种数据，会修改本身状态的函数。

### 其他

- **\*\* 次方**：右结合

  ```
  2**1**2 // 2
  ```

- **图灵机**：数学模型，只要图灵机可以被实现，就可以用来解决任何可计算的问题。
- js 诟病
  ```
  typeof null // object
  ```
- **十进制与二进制转换**

  ```
  const num = 10;

  // number.toString(radis)  十进制->radis
  num.toString(2); // 1010

  // parseInt(number,radis)  radis->十进制
  // 整数部分
  paserInt(num.toString(2),2); // 10
  // 小数部分
  function decimalPart(arr) {
    return arr.map((value, index) => {
      return value * 2 ** -(index + 1);
    });
  }
  decimalPart([1,0,1]) // [0.5, 0, 0.125]
  ```

  - **关于 parseInt**

    - <div style="background-color:yellow">注意，radix 默认值不是10！</div>
    - 如果 radix 是 undefined、0 或未指定，js 会假定以下情况：

      1.  以 "0x"或 "0x"（一个 0，后面是小写或大写的 X）开头，那么 radix 被假定为 16
      2.  以 "0"（0）开头， radix 被假定为 8（八进制）或 10（十进制）。具体选择哪一个 radix 取决于实现。ECMAScript 5 澄清了应该使用 10 (十进制)，但不是所有的浏览器都支持。**因此，在使用 parseInt 时，一定要指定一个 radix。**
      3.  以任何其他值开头， radix 是 10 (十进制)。

    - <div style="background-color:yellow">注意 第一个参数会先转为字符串</div>

    ```
        parseInt(015, 10); // 13
        parseInt('015', 10); // 15
    ```

### 第一次直播答疑

- 函数表达式、函数声明

  ```
    // 函数声明
    function abc(){}
    // 函数表达式
    var abc = function(){}
    // iife  需要是函数表达式
    void function(){}()
    (function(){})()
    +function(){}()
    -function(){}()
    ...
  ```

- 词法（基本单元）、grammar 语法（能怎么写）、运行时（要表达什么）
- performance metrics 性能指标 - 响应时间
  - 页面加载时间：追踪网络
  - 页面卡顿：帧率、渲染时间
  - charles fiddler
  - 瀑布流图，首出（第一次渲染）三段，开发者工具/network/waterfall
  - performance 对象埋点，performance.timing
  - 淘宝图片优化，根据网络环境判断提供图片质量，转 webp 格式节省空间
