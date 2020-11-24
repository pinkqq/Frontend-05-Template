#### LL 语法分析

1. 从左到右扫描，从左到右归并

#### 正则表达式

- exec()
  1. 如果匹配成功，返回一个数组，包括额外属性 input（原始字符串）和 index（匹配到的字符基于原始字符串的索引值），并更新正则表达式对象的 lastIndex（下一次开始匹配的位置）
  2. result[0]：匹配成功的全部字符串
  3. result[1,..n]：后续每一项都对应正则表达式捕获括号内匹配成功的文本。
  4. 匹配失败，返回 null, lastIndex 为 0。

#### 闭包（closure）

- 根据 js 的链式作用域（scope chain）,子对象会一级一级向上寻找父对象中的变量，因此函数内部可以直接读取全局变量。
- 闭包的定义：绑定了执行环境的函数
- 闭包难道只是为了返回一个函数，然后延迟执行吗？
- **当然不是咯**

  1. 封装一个私有变量

     ```javascript
      function create_counter(initial){
        let x = initial || 0;
        return function(){
          x++;
          return x;
        }
      }
      const c1 = create_counter();
      c1();
      c1(); // 1 2
      const c2 = create_counter(10);
      c2();
      c2(); // 11 12
     ```

  2. 多参数函数->单参数函数

     ```javascript
       function make_pow(n){
          return function(x){
            return Math.pow(n,x)
          }
       }
      const pow2 = make_pow(2)
      pow2(3) //8
     ```

#### Generator

- generator 在执行过程中多次返回，所以它看上去像一个可以记住执行状态的函数。

  ```javascript
  // 斐波那契数列
  // (0,1,1,2,3,5,8,13,21,34,55,...)

  function* fib(max){
    let a = 0, b = 1;
    for(let i = 0; i < max; i++){
      yield a;
      [a,b] = [b,a+b];
    }
  }

  // 直接调用，仅仅生成一个 generator 对象

  for(let iterator of fib(5)){
    console.log( iterator )
  }
  ```
