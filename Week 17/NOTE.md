## 工具链 - 初始化与构建

### 初始化工具：Yeoman

- **Getting Started**

  - `npm install --save yeoman-generator`
    `npm install -g yo`

  - ```
    ├───package.json
    └───generators/
        ├───app/
        │   └───index.js
        └───router/
            └───index.js
    ```
  - package.json
    ```json
    // The name property must be prefixed by generator-.
    // The keywords property must contain "yeoman-generator"
    // and the repo must have a description to be indexed by our generators page.
    {
      "name": "generator-name",
      "version": "0.1.0",
      "description": "",
      "files": ["generators"],
      "keywords": ["yeoman-generator"],
      "dependencies": {
        "yeoman-generator": "^1.0.0"
      }
    }
    ```
  - generators/app/index.js

    ```js
    var Generator = require("yeoman-generator");

    module.exports = class extends (
      Generator
    ) {
      // The name `constructor` is important here
      constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        method1() {
          this.log('method 1 just ran');
        }

        method2() {
          this.log('method 2 just ran');
        }
      }
    };
    ```

  - `npm link`
    `/Users/xqq/.nvm/versions/node/v12.10.0/lib/node_modules/generator-toolchain -> /Users/xqq/workspace/qq/code/geekUniversity/Frontend-05-Template/Week 17/toolchain`
  - `yo name`

- **User Interactions**: 通过命令行与用户交互

  - generators/app/index.js

  ```js
  module.exports = class extends (
    Generator
  ) {
    async prompting() {
      const answers = await this.prompt([
        {
          type: "input",
          name: "name",
          message: "Your project name",
          default: this.appname, // Default to current folder name
        },
        {
          type: "confirm",
          name: "cool",
          message: "Would you like to enable the Cool feature?",
        },
      ]);

      this.log("app name", answers.name);
      this.log("cool feature", answers.cool);
    }
  };
  /*
    :toolchain xqq$ yo toolchain
    ? Your project name demo
    ? Would you like to enable the Cool feature? No
    app name demo
    cool feature false
  */
  ```

- **Interacting with the file system**

  - generators/app/templates/index.html

    ```
    <html>
    <head>
      <title><%= title %></title>
    </head>
    </html>
    ```

  - generators/app/index.js

    ```js
      async fileSystem() {
        const answer = await this.prompt([
          {
            type: "input",
            name: "title",
            message: "your title",
            default: this.title,
          },
        ]);

        this.fs.copyTpl(
          this.templatePath("index.html"),
          this.destinationPath("public/index.html"),
          { title: answer.title }
        );
      }
    ```

    ```
    :toolchain xqq$ cd ../demo
    :demo xqq$yo toolchain
    ```

- **Managing Dependencies**：管理依赖系统

  - ```js
    class extends Generator {
      installingLodash() {
        this.npmInstall(['lodash','vue@x.x.x'], { 'save-dev': true });
      }
    }
    ```
    This is equivalent to call:
    `npm install lodash --save-dev`
  - You can programatically create or extend your `package.json` file

    ```js
      class extends Generator {
      writing() {
        const pkgJson = {
          devDependencies: {
            eslint: '^3.15.0'
          },
          dependencies: {
            react: '^16.2.0'
          }
        };

        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
      }

      install() {
        this.npmInstall();
      }
    };
    ```

### build 工具：Webpack - “打包一切资源”

- build 能力是同时为开发和发布服务的基础设施
- **webpack 初心**
  - 最初设计是为 node 服务，打包成浏览器可用 js 文件
  - 所以，它是基于 js 的，配置难度比较高
  - 现在也有很多后起之秀，是基于 html 的，配置难度低。
- **webapck 可以做什么？**
  - 多文件合并。通过 loader 和 plugin ，来控制合并规则和文本转换。
- **基础安装包**
  - `webpack-cli`: 提供 webpack 命令（不包括在 webpack 依赖中）
  - `webpack`
- **一个全新的 webpack 项目**

  - **安装 webpack**
    - 全局安装
      ```
      npm install -g webpack-cli webpack
      ```
    - 项目中安装
      ```
      npm install webpack-cli --save-dev
      npx webpack
      ```
  - **webpack.config.js**

    - entry: 入口文件
    - output：输出文件名和路径
    - **loader**：文本转换（source => 目标代码）

      ```js
      module.exports = {
        module: {
          rules: [
            { test: /\.css$/, use: "css-loader" },
            { test: /\.ts$/, use: "ts-loader" },
          ],
        },
      };
      ```

      loader.js

      ```js
      import { getOptions } from "loader-utils";
      import { validate } from "schema-utils";

      const schema = {
        type: "object",
        properties: {
          test: {
            type: "string",
          },
        },
      };

      export default function (source) {
        const options = getOptions(this);

        validate(schema, options, {
          name: "Example Loader",
          baseDataPath: "options",
        });

        // Apply some transformations to the source...

        return `export default ${JSON.stringify(source)}`;
      }
      ```

### a JavaScript compiler: Babel

- 安装
  ```
  npm install -g @babel/core @babel/cli
  ```
- 配置文件：.babelrc
  ```json
  {
    "presets": ["@babel/preset-env"]
  }
  ```

#### 其他

- **`npm link`**

  - 本地开发 npm 模块时，可以使用 `npm link` 命令，将 npm 模块链接到对应的运行项目中去，方便对模块进行调试和测试。

  - ```
    npm link (in package dir)
    npm link [<@scope>/]<pkg>[@<version>]
    alias: npm ln
    ```
  - [使用](https://www.jianshu.com/p/aaa7db89a5b2)

    - `npm-link-module`: 要开发的 npm 模块,
    - `npm-link-example`: 要运行 npm 模块的项目
    - ```
      cd npm-link-module
      npm link

      cd npm-link-example
      npm link npm-link-module
      ```

    - 在 npm-link-example 引用然后运行
      ```js
      require("npm-link-module");
      ```

- **npx**

  - 主要特点

    1. 临时安装可执行依赖包，不用全局安装，不用担心长期的污染。
    2. 可以执行依赖包中的命令，安装完成自动运行。
    3. 自动加载 node_modules 中依赖包，不用指定$PATH。
    4. 可以指定 node 版本、命令的版本，解决了不同项目使用不同版本的命令的问题。

    ```
    npx用来解决全局命令行工具只能有一个的问题。

    比如装个webpack,使用的是4.x，可是已经装了全局的1.x版本并且还要继续使用，这个时候可以不装在全局，用npx webpack代替webpack命令，互不干扰。
    ```
