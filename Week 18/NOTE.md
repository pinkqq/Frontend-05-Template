## 单元测试工具

- 复用越多，测试收益越高

### [Mocha](https://mochajs.org/)

- **GETTING STARTED**

  - In your editor:
    - `describe` 分组机制
    - `it` 断言
  - Back in the terminal:

  ```
    add function testing // describe
      ✓ 1+2 should be 3 // it
      ✓ 3+4 should be 7
  ```

- **结合 Babel: @babel/register**
  - **目标**：解决添加时使用 node 模块的问题（module.exports/require）
  - install
    `npm install @babel/core @babel/register --save-dev`
  - 需要用项目中的 mocha 跑
    `./node_modules/.bin/mocha --require @babel/register`
    package.json 中，默认寻找本项目中的 package
    `mocha --require @babel/register`

### code coverage: [nyc](https://github.com/istanbuljs/nyc)

- **Installation & Usage**

  ```json
  {
    "scripts": {
      "test": "mocha --require @babel/register",
      "coverage": "nyc npm run test"
    }
  }
  ```

  ```json
  {
    "scripts": {
      "test": "npx nyc@latest mocha"
    }
  }
  ```

  - **babel-plugin-istanbul & @istanbuljs/nyc-config-babel**

    ```json
    {
      "scripts": {
        "test": "mocha --require @babel/register",
        "coverage": "nyc mocha"
      }
    }
    ```

    .nycrc

    ```json
    {
      "extends": "@istanbuljs/nyc-config-babel"
    }
    ```

    .babelrc

    ```json
    {
      "plugins": ["istanbul"]
    }
    ```

- **Note**
  > If you use **jest** or **tap**, you **do not** need to install nyc. Those runners already have the IstanbulJS libraries to provide coverage for you. Follow their documentation to enable and configure coverage reporting.
- **目标：funcs 100% + lines 90%**
