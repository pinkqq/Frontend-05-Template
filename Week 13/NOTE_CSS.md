## CSSOM（批量操作样式）

#### styleSheets 对象

- document.styleSheets
- **Rules**

  - ```js
    document.styleSheets[0].cssRules;
    document.styleSheets[0].insertRule("p{color:pink;}", 0);
    document.styleSheets[0].removeRule(0);
    ```
  - Rule

    - **CSSStyleRule**
    - CSSCharetRule
    - CSSImportRule
    - CSSMediaRule
    - CSSFontFaceRule
    - CSSKeyframesRule
    - ...

  - **CSSStyleRule**
    - selectorText String
    - style K-V 结构

- 如何修改伪元素的样式？
  - 通过 Dom API 无法直接访问伪元素
  - ```
    document.styleSheets[0].cssRule[0].style
    ```

#### getComputedStyle （最终真实渲染的 css 属性）

- `window.getComputedStyle(elt,pseudoElt)`
  - elt 想要获取的元素
  - pseudoElt 可选，指定一个要匹配的伪元素的字符串。必须对普通元素省略（或 null）。
- transform / 元素拖拽 / 动画中间态（暂停）

## CSSOM View

- **与 render 后的浏览器视图相关**

#### window API

- **window.innerHeight, widnow.innerwidth** `!importent`
- window.outerHeight, window.outerWidth
- **widnow.devicePixelRatio（DPR）** `!importent`
  - 屏幕物流像素 与 代码逻辑像素 比值关系
  - 正常情况 1:1
  - retina 1:2
  - 有些安卓机 1:3
- window.screen
  - window.screen.width
  - window.screen.height
  - window.screen.availWidth
  - window.screen.availHeight
- window.open('about:blank','\_blank','width=100,height=100,left=100,right=100')
- moveTo(x,y)
- moveBy(x,y)
- resizeTo(x,y)
- resizeBy(x,y)

#### scroll

- **overflow:scroll 元素**
  - scrollTop: 获取/设置一个元素的内容垂直滚动的像素数。
  - scrollLeft
  - scrollWidth
  - scrollHeight
  - scrollTo(x,y) / scroll(x,y)
  - scrollBy(x,y)
  - scrollIntoView()
- **window**
  - scrollX
  - scrollY
  - scroll(x,y) / scrollTo(x,y)
  - scrollBy(x,y)

#### layout

- getClientRects( )
  - 返回一个指向客户端中每一个盒子的边界矩形的矩形集合。
- getBoundingClientRect( )
  - 返回的结果是包含完整元素的最小矩形
