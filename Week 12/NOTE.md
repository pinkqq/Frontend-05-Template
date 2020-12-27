## CSS 排版

#### 标签、元素、盒

- **标签 Tag**：源代码
- **元素 Element**：语义
- **盒 Box**：表现
- **关系**：
  - HTMl 代码中可以书写`开始标签`，`结束标签`，和`自封闭标签`
  - 一对起止`标签`，表示一个`元素`
  - DOM 树中存储的是`元素`和其他类型的节点（Node）（文本节点、注释节点...）
  - CSS 选择器选中的是`元素`或`伪元素`
  - CSS 选择器选中的`元素`，在排版中可能产生多个`盒`
  - **排版和渲染的基本单位是 `盒`**

#### 盒模型

![](https://www.runoob.com/images/box-model.gif)

- **box-sizing**
  - content-box
    - 属性 width: content
    - 实际 width: content + padding + border
  - border-box
    - 属性 width: content + padding + border
    - 实际 width: 属性 width

#### 正常流

- **排版**

  - 收集盒和文字进行 （flex 只有盒，文字会先放进盒中）
  - 计算盒在行内的排布
  - 计算行的排布

- **FreeType**

  - 处理各种字体文件，做抽象
  - 一个字形图 glyph image 产生工具，整个库的主要功能点集中在以下两点：
    - 解析几乎是所有的字体格式，例如常见的 ttf，otf。
    - 根据输入的单个 Unicode 返回该字的 glyph 也就是字形图。
  - 以基线的原点（origin）做坐标，定义字形图的位置。
    - bearing：字间距
    - advance：字所占的全部空间，width/height + bearingX/Y
    - 横向
      ![](https://www.freetype.org/freetype2/docs/glyphs/metrics.png)
    - 纵向
      ![](https://www.freetype.org/freetype2/docs/glyphs/metrics2.png)

#### IFC & BFC `面试`

- IFC：inline level formatting context
- BFC：block level formatting context
- **IFC**

  - **行模型**
    - line-top/line-bottom：行高
    - text-top/text-bottom
    - base-line
      > 盒的高度会影响 line-top/line-bottom（高度超出时），对 text-top/text-bottom 不产生影响
  - **vertical-align**

    - 默认值：baseline
      - ps: 如果元素内有文字，会以文字对准基线

  - **float**
    - 换行：
      - \<br> 是正常流中的换行，行不通。
      - clear：left/right；开辟一块干净的空间，可用于换行
      - 重排：不建议使用，见 float3.html
  - 绕排 见 float4.html

- **BFC**

  - **formatting context**
    > 页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用
  - **Block**
    - Block Container (里面有 BFC：能容纳正常流[^1]的盒子，里面就有 BFC)
      [^1]:不是特殊 display 的模式，就默认是正常流
      - block
      - inline-block
      - table-cell
      - flex item
      - grid cell
      - table-caption
    - Block-level Box (外面有 BFC：它是能被放进 BFC 里的盒子)
    - block box: block container + block-level-container（里外都有 BFC）
  - **触发 BFC**

    - body 根元素
    - 浮动元素：float 除 none 以外的值
    - 绝对定位元素：position (absolute、fixed)
    - block container(such as inline-block,table-cells,and table-captions) that are not block boxes,
      - flex items
      - grid cell
    - overflow 除了 visible 以外的值 (hidden、auto、scroll)

  - **特性及应用**
    - **margin-collapse**：同一个 BFC 下外边距会发生折叠
      - 只在自然流的 BFC 中存在，在排版思想中 margin 定义是周围留白空间，不是与其他元素的间距
    - BFC 可以包含浮动的元素（清除浮动）
    - BFC 可以阻止元素被浮动元素覆盖

#### CSS 动画与绘制

##### 动画

- **Amination**

  - 属性
    > - animation-name 时间曲线
    > - animation-duration 动画的时长
    > - animation-timing-duration 动画的时间曲线
    > - animation-delay 动画开始前的延迟
    > - animation-iteration-count 动画的播放次数
    > - animation-direction 动画的方向
  - @keyframes 定义

    - from: 0%
    - to: 100%
    - 使用 transition 属性，每段动画之间的 timing-function 可以不一样

    ```css
    @keyframes myky {
      0% {
        top: 0;
        transition: top ease;
      }
      50% {
        top: 100px;
        transition: top ease-in;
      }
      100% {
        top: 200px;
        transition: top linear;
      }
    }
    ```

- **Transition**
  - 属性
    > - transition-property 要变化的属性
    > - transition-duration 时长
    > - transition-timing-function 时间曲线 ( cubic-bezier[^2] )
    >   [^2]: https://cubic-bezier.com
    > - transition-delay 延迟

##### 颜色

- **CMYK 与 RGB**
  - RGB: 发光的色彩模式，你在一间黑暗的房间内仍然可以看见萤幕上的内容。
  - CMYK (青色 Cyan、品红色 Magenta、黄色 Yellow、K 是 black 最后一个字母，避免与蓝色混淆)
    - 是一种依靠反光的色彩模式，是需要有外界光源的情况下才可以看到的。
- **HSL 与 HSV**
  - H: 色调 hue
  - S: 饱和度 saturation
  - L: 亮度 lightness
  - V: 明度 value/brightness

##### 绘制

- 几何图形
  > - border
  > - box-shadow
  > - border-radius
- 文字
  > - font
  > - text-decoration
- 位图
  > - background-image
- 应用方式 data uri + svg

#### 其他

- **flex**
  - flex-grow / flex-shrink : **剩余空间**的多少，按比例分配
  - flex-basis : 当一个元素同时被设置了 `flex-basis` (除值为`auto`外) 和 `width` (或者在`flex-direction: column`情况下设置了` height`) ,`flex-basis`具有更高的优先级.
  - align-items:
    ![](https://css-tricks.com/wp-content/uploads/2019/10/flex-align.svg)
- display: run-in，Chrome 浏览器已经不支持 run-in

#### 直播第三次

- **架构师定位**
  - 客户端架构师：软件规模带来的复杂性
  - 服务端架构师：用户数量并发带来的复杂性
  - 前端架构师：跨页面间的复用问题
- **react vue**
  - 命令式 / 声明式
- **virtual dom**
  - 产生原因：因为浏览器 Dom 性能不够高
  - 将来下沉到 native 层后，前端就不需要做这个事情
