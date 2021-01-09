## 组件化

- 起源：如何扩展 HTML 标签
- **主要目标：复用**

#### 组件的基本知识

- **什么是组件？**
  - 区别于对象和模块，它既是模块又是对象，可以说是一种特殊的模块/对象。
  - 与 UI 强相关，通常是指页面上的视图单元。
  - 可以以树形结构进行组合。
  - 有模版化配置的能力。
- **对象与组件**
  |对象|组件|
  |---|---|
  |Properties|Properties|
  |Methods|Methods|
  |Inherit|Inherit|
  ||Attribute（特性）|
  ||Config & State|
  ||Event|
  ||Lifecycle|
  ||Children（树形结构的必要性）|
- 图解组件各要素
  ![](http://note.youdao.com/yws/public/resource/17bc5abb7cfff2630dca59d5d6b3a29e/xmlnote/0C81E2AD98AF4BFDB1F90E610FCC6574/2107)
- **Attribute vs Property**

  - attribute: 强调描述性
  - property: 强调从属关系
  - HTML 是典型的两者不等效的一个系统，`见 attr&prop.html`

    ```jsx
    // attribute
    <my-component attribute="xxx" />;
    myComponent.getAttribute("a");
    myComponent.setAttribute("a", "value");

    // property
    myComponent.a = "value";
    ```

- **如何设置组件状态？**
  ||markup set|js set|js change|user input change|
  |--|:--:|:--:|:--:|:--:|
  |property|❌|✅|✅|❓|
  |attribute|✅|✅|✅|❓|
  |state|❌|❌|❌|✅|
  |config|❌|✅|❌|❌|
- **Lifecycle**
  - 冬老师
    ![](http://note.youdao.com/yws/public/resource/17bc5abb7cfff2630dca59d5d6b3a29e/xmlnote/E3176B1DB93547DFA827D5E618E26812/2109)
  - 结合 vue / react
    ![](http://note.youdao.com/yws/public/resource/17bc5abb7cfff2630dca59d5d6b3a29e/xmlnote/622F8C658DFA4C3183DC55B1B0520FE1/2111)
- **Children**
  - Content 型 Children
    ```jsx
    <my-button>
      <img src="{{icon}}" />
      {{ title }}
    </my-button>
    ```
  - Template 型 Children
    ```jsx
    <my-list>
      <li v-for="">{{ title }}</li>
    </my-list>
    ```

#### 建立组件的两种风格

- react - JSX
- vue - 标签的 parser

#### JSX

- 是一个 JavaScript 的语法扩展。
- **配置 JSX 环境**

  - babel
    - 「代码转译」，即将目标代码转译为能够符合期望语法规范的代码。
    - 「解析 - 转换 - 生成」三个步骤。
    - 「解析」: `@babel/core`，把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。
    - 「转换」和「生成」: 各种插件（plugin）和 预设（preset）
    - `babel-loader`:
      - 是一个 npm 包，
      - 它使得 webpack 可以通过 babel 转译 JavaScript 代码。
    - `@babel/preset-*`
      - 是各种插件的打包组合，即各种转译规则的统一设定
      - 目的是告诉 loader 要以什么规则来转化成对应的 js 版本。
  - 安装包

    ```
    npm init
    npm install -g webpack webpack-cli // 静态模块打包工具
    npm install --save-dev webpack babel-loader
    npm i --save-dev @babel/core @babel/preset-env
    ```

    【webpack-dev-\*】

    ```
    npm i --save-dev webpack-dev-server
    // webpack-cli是4.* 版本 会和 webpack-dev-server 3.* 版本 不兼容
    // 启动 webpack-dev-server 会报错：Cannot find module 'webpack-cli/bin/config-yargs'
    // 可以换成启动 webpack serve 命令
    ```

  - webpack.config.js

    ```js
    module.exports = {
      entry: "./main.js",
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: [
                  [
                    "@babel/plugin-transform-react-jsx",
                    { pragma: "createElement" },
                  ],
                ],
              },
            },
          },
        ],
      },
    };
    ```

## 组件实战：轮播图

- `<img/>`: 默认可拖拽。用 `background-image` 替代。
