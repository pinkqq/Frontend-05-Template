# 浏览器 API

- **DOM API**: 对 html 描述的文档的一个抽象
  - 节点操作
  - 事件 API
  - Range API
  - iterator
- **CSSOM**：对 css 文档的抽象
- other API

### DOM API - 节点操作

- **Node 节点**: 见 `./NODE.km`
- **导航类操作**: 允许我们在 DOM 树上，自由的移动
  - 节点
    - parentNode
    - childNodes
    - firstNode
    - lastNode
    - nextSibling（⚠️ 空白文本节点）
    - previousSibling
  - 元素
    - parentElement
    - children
    - firstElementChild
    - lastElementChild
    - nextElementSibling
    - previousElementSibling
  - 重复设计：**parentNode === parentElement**
- **修改操作**
  - appendChild
  - insertBefore
    `根据最小化原则，可以搭配 appendChild + insertBefore 实现 insertAfter`
  - removeChild
  - replaceChild
    `先找到 parent，在进行操作。replaceChild 违背最小化原则。`
  - **append / insert DOM 树伤的节点时，会自动 remove**
- **高级操作**
  - **compareDocumentPosition**: 用于比较两个节点中关系的函数
    |常量名 |十进制值| 含义|
    |---|---|--|
    |DOCUMENT_POSITION_DISCONNECTED |1 |不在同一文档中|
    |DOCUMENT_POSITION_PRECEDING| 2 |otherNode 在 node 之前|
    |DOCUMENT_POSITION_FOLLOWING| 4 |otherNode 在 node 之后|
    |DOCUMENT_POSITION_CONTAINS| 8| otherNode 包含 node|
    |DOCUMENT_POSITION_CONTAINED_BY| 16 |otherNode 被 node 包含|
    |DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC| 32| 待定|
  - **contains**: 检查一个节点是否包含另一个节点
    > 如果 otherNode 是 node 的后代节点或是 node 节点本身.则返回 true , 否则返回 false.
  - **isEqualNode**: 检查两个节点是否相同
    > 当两个节点的 **类型** 相同，**定义特征** (defining characteristics)相同（对元素来说，即 id，孩子节点的数量等等），**属性**一致等，这两个节点就是相等的。`
  - **isSameNode**: 检查两个节点是否为同一个，实际上在 javascript 中可以用“===”。
    > 已废弃
  - **cloneNode**: 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。
    ```js
    /*
     ** node: 将要被克隆的节点
     ** dupNode: 克隆生成的副本节点
     ** deep(optional): 是否采用深度克隆
     */
    var dupNode = node.cloneNode(deep);
    ```

### DOM API - 事件 API

- **EventTarget.addEventListener()**
  ```
  target.addEventListener(type, listener, options);
  target.addEventListener(type, listener, useCapture);
  target.addEventListener(type, listener, useCapture, wantsUntrusted  );  // Gecko/Mozilla only
  ```
  - **参数**
    - type
      > 监听事件的类型`
    - listener
      > 当所监听的事件类型触发时，会接收到一个事件通知（实现了 Event 接口的对象）对象。listener 必须是一个实现了 EventListener 接口的对象，或者是一个**函数**。
    - options | optional
      - capture:
        - `Boolean`，冒泡模式 / 捕获模式
      - once:
        - `Boolean`，事件只响应一次
      - passive:
        - `Boolean`，设置为 `true` 时，表示 `listener` 永远不会调用 `preventDefault()`。
- **Event 冒泡与捕获**
  - 捕获：浏览器先检查元素的最外层祖先 `<html>` ，然后下一个祖先元素，依此类推，直到到达实际点击的元素。
  - 冒泡：浏览器先检查实际触发的元素，然后下一个直接的祖先元素，最后 `html`
    ![](https://mdn.mozillademos.org/files/14075/bubbling-capturing.png)
  - 用 **stopPropagation()** 修复冒泡问题

### DOM API - Range API

- HTML 文档流里有起始点和终止点的一段连续的范围
- 在 DOM 树中，起点只要先于终点就可以，不需要管层级关系
- ```js
  var Range = new Range();
  // range.setStart(startNode, startOffset);
  // startOffset：element.children / 文字的个数
  range.setStart(element, 9);
  range.setEnd(element, 4);
  var range = document.getSelection().getRangeAt(0);
  ```
- 便捷选择方式

  ```js
  range.setStartBefore;
  range.setEndBefore;
  range.setStartAfter;
  range.setEndAfter;
  range.selectNode; // 选中子孙元素和元素本身；
  range.selectNodeContents; // 只选中子孙元素；
  ```

- 创建 range 后

  ```js
  // range 的删+增
  // fragment对象：node的子类，append时 将自己的所有子类append
  var fragment = range.extractContents();
  range.insertNode(document.createTextNode("aaa"));
  ```

### <s>DOM API - iterator 迭代器</s>

- 无实际用途

- 设计风格过于老旧，没有和现代 js 结合
