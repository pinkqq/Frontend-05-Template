## 重学 CSS

### CSS 总论 - 大纲

- **CSS 语法研究**
  - CSS 总体结构
  ```mermaid
  graph LR
    A[CSS]-->B1[at-rules ]
    A-->B2[ rule ]
  ```
- **CSS 规则**

  - **选择器**：[https://www.w3.org/TR/selector-3]

    - selector-group: ,
    - selector
      - 后代选择器(以空格 ` ` 分隔)
      - 子元素选择器(以大于 `>` 号分隔）
      - 相邻兄弟选择器（以加号 `+` 分隔）
      - 普通兄弟选择器（以波浪号 `～` 分隔）
    - simple-selector:

      - 标签选择器 `type`
      - Class 选择器 `.`
      - Id 选择器 `#`
      - 属性选择器 `[]`
      - 伪类选择器 `:`
      - 伪元素选择器

        ```css
        element:after  { style properties }  /* CSS2 语法 */
        element::after { style properties } /_ CSS3 语法 _/
        ```

      - 反选伪类 `:not()`

- **声明**
  - key：properties / variables
  - value : clac / number / length / ...
  ```css
  /* 
     自定义属性 
     两个减号（--）开始
  */
  --main-color: black;
  color: var(--main-color);
  ```

### CSS 选择器

- **选择器语法**
  - 简单选择器
    - \* 通用选择器
    - div svg|a 类型选择器
    - .
    - \#
    - [attr=value]
    - :hover
    - ::before
  - 复合选择器
    - <简单><简单><简单>
    - \*或者 div 必须写在前面
  - 复杂选择器
    - <复合>`<sp>`<复合>
    - <复合>`>`<复合>
    - <复合>`~`<复合>
    - <复合>`+`<复合>
    - <复合>`||`<复合> ：table 选中列
- **优先级**
  - **CSS 优先规则 1**： 最近的祖先样式比其他祖先样式优先级高。
    ```html
    <!-- 类名为 son 的 div 的 color 为 blue -->
    <div style="color: red">
      <div style="color: blue">
        <div class="son"></div>
      </div>
    </div>
    ```
  - **CSS 优先规则 2**："直接样式"比"祖先样式"优先级高。
    ```html
    <!-- 类名为 son 的 div 的 color 为 blue -->
    <div style="color: red">
      <div class="son" style="color: blue"></div>
    </div>
    ```
  - **CSS 优先规则 3**：优先级关系：内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器
  - **CSS 优先规则 4**：计算选择符中 ID 选择器的个数（a），计算选择符中类选择器、属性选择器以及伪类选择器的个数之和（b），计算选择符中标签选择器和伪元素选择器的个数之和（c）。
    ![](https://pic2.zhimg.com/80/v2-02cbe93cc05be85d62f52c606ec052f5_1440w.jpg)
- **伪类**

  - 链接 / 行为

    - :any-link (所有链接)
    - :link (未访问链接) :visited (已访问链接)

      > - :visited 内不能修改除字体颜色外的其他属性，是因为浏览器安全问题。限制脚本从用户访问的页面中查找用户的浏览历史。
      > - getComputedStyle 获取不到 :visited color
      > - 只有在:link 状态时设置了一个背景颜色，在:visited 状态时才能够使用 background-color 属性。
      > - 早期支持透明度的修改，黑客利用透明度渲染时间偏长，筛选访问过的链接

    - :hover
    - :active
    - :focus
    - :target (锚点)

  - 树结构
    - :empty (是否有子元素)
    - :nth-child() （even/odd/3n+1/4n-1）`语法复杂，选择简单方式使用`
    - :nth-last-child()
    - :first-child :last-child :only-child
      `:nth-lastc-child() 破坏 CSS 回溯原则，影响性能`
  - 逻辑型
    - :not 反向伪类
    - :where :has

- **伪元素**
  - ::before
  - ::after
  - ::first-line
  - ::first-letter

### 展开

- **at-rules**

  - @charset：css-syntax-3 ( 声明 CSS 字符集 )
  - @import：css-cascade ( 级联规则 )
  - **@media**: css3-conditional ( 有条件的发生 )
  - @page: css-pagep-3 ( 分页媒体-打印机 )
  - @counter-style: css-counter-style-3 ( 列表 )
  - **@keyframes**: css-animations-1 ( 定义动画 )
  - **@fontface**: css-fonts-3 ( 定义一切字体：icon font )
  - @support: css3-conditional ( 检查兼容性，当属性本身有兼容性问题，目前不推荐)
  - @namespace：css-namespaces-3

- **document.querySelector**
  - 返回文档中与指定选择器或选择器组匹配的**第一个 HTMLElement 对象**。 如果找不到匹配项，则返回 **null**。
  - 匹配是使用**深度优先先序遍历**，从文档标记中的第一个元素开始，并按子节点的顺序依次遍历。
- **Array.prototype.slice.call**
  - 将**类数组对象**转换成**数组**
  - 其他方案：es6-解构复制 `[...类数组对象]`
- **innerText**
  - 一个节点及其后代的“渲染”文本内容
  - vs textContent
    - innerText 依赖与浏览器的显示；textContent 依赖于代码显示
    - 如果一个元素之间包含了 script 标签或者 style 标签，innerText 是获取不到这两个元素之间的文本的，而 textContent 可以
- **contentDocument**
  - 当 iframe 里的内容与 iframe 所处 document 是**同域（same origin）**，返回 document
  - else return null
- **HTML 命名空间**
  - html/svg/mathml

### 思考题

- 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
  > ::first-line 伪元素只能在块容器中, 所以,::first-line 伪元素只能在一个 display 值为 block, inline-block, table-cell 或者 table-caption 中有用。 在其他的类型中，::first-line 是不起作用的.`

### 第二次直播

- 领域专家方向
  - 持续集成
  - 工具链
  - 组件化
- 前端安全攻击
  - XSS：禁止使用 innerHTML
  - CSRF：不用 post 访问页面 ？
  - iframe
- 性能：以监控为核心
  - 前端提供监控，服务端和客户端进行优化
