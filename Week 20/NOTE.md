## 持续集成

- **持续集成前的开发模式**：前面各自开发，最终集成联调。
- **持续集成**
  - `Daily Build`
  - `BVT: build verification test`：（冒烟测试）一种用于验证系统基本功能的实现并达到一定程度的稳定性的测试。
- **前端应用**

  1. 利用 `git hooks` 完成检查的时机，[文档](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
     - `pre-commit`: lint
     - `pre-push`: check
     - `pre-receive`
  2. `ESlint`
  3. `phantomJS`

#### git hooks 用法实例

- 查看 `.git`
  - `ls -a`
  - `open ./.git`
- 在 vscode 打开 `.git/hooks`
- 添加 `pre-commit` 文件
- 为 `pre-commit` 文件，添加执行权限

  ```linux
  git-demo xqq$ cd .git/hooks/
  git-demo xqq$ ls -l ./pre-commit
  hooks xqq$ chmod +x ./pre-commit
  -rw-r--r--  1 xqq  staff  3 Feb 23 14:57 ./pre-commit
  hooks xqq$ ls -l ./pre-commit
  -rwxr-xr-x  1 xqq  staff  3 Feb 23 14:57 ./pre-commit
  ```

- **修改 pre-commit 文件**
  - `#!`：[标注执行文件的脚本引擎](https://juejin.cn/post/6844903826344902670)
    - 配置`#!/usr/bin/env node`
      > 是告诉系统可以在 PATH 目录中查找。
      > 解决了不同的用户 node 路径不同的问题，可以让系统动态的去查找 node 来执行你的脚本文件。
  - 阻止 `commit`
    ```js
    let precess = require("precess");
    ```

#### ESlint 简单介绍

- 在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的**一致性和避免错误**
- **init**

  - `mkdir ealint-demo`
  - `cd eslint-demo`
  - `npm init`
  - `npm install --save-dev eslint`
  - ```

    hebaodandeMBP:eslint-demo xqq$ npx eslint --init
    ✔ How would you like to use ESLint? · problems
    ✔ What type of modules does your project use? · esm
    ✔ Which framework does your project use? · react
    ✔ Does your project use TypeScript? · No / Yes
    ✔ Where does your code run? · browser
    ✔ What format do you want your config file to be in? · JavaScript
    The config that you've selected requires the following dependencies:

    eslint-plugin-react@latest
    ✔ Would you like to install them now with npm? · No / Yes
    ```

  - `npx eslint ./index.js`

- **[ESlin API](https://eslint.org/docs/developer-guide/nodejs-api) 及其高级用法**

  - **eslint 结合 git hooks**

    - pre-commit

      ```js
      #!/usr/bin/env node
      let process = require("process");
      const { ESLint } = require("eslint");

      (async function main() {
        // 1. Create an instance with the `fix` option.
        const eslint = new ESLint({ fix: false });

        // 2. Lint files. This doesn't modify target files.
        const results = await eslint.lintFiles(["index.js"]);

        // 4. Format the results.
        const formatter = await eslint.loadFormatter("stylish");
        const resultText = formatter.format(results);

        // 5. Output it.
        console.log(resultText);

        for (let result of results) {
          if (result.errorCount) {
            process.exitCode = 1;
          }
        }
      })().catch((error) => {
        process.exitCode = 1;
        console.error(error);
      });
      ```

  - **问题：eslint 检查需要提交的版本，而不是当前版本。**

    - 原因：git 的机制问题

      ```
      On branch master
      Changes to be committed:
        (use "git reset HEAD <file>..." to unstage)

              modified:   index.js

      Changes not staged for commit:
        (use "git add <file>..." to update what will be committed)
        (use "git checkout -- <file>..." to discard changes in working directory)

              modified:   index.js
      ```

    - **解决：`git stash`**

      - `git stash -k`：直接执行 `git stash` 等同于 `git stash push`
      - `git commit -m 'msg'`
      - `git stash pop [stash]`
      - **pre-commit 中添加 git stash ( [child_process](http://nodejs.cn/api/child_process.html#child_process_child_process_exec_command_options_callback) )**

        ```js
        const { ESLint } = require("eslint");
        const { exec } = require("child_process");
        (async function main() {
          // 1. Create an instance with the `fix` option.
          const eslint = new ESLint({ fix: false });

          // 2. Lint files. This doesn't modify target files.
          exec("git stash -k");
          let results = await eslint.lintFiles["index.js"];
          exec("git stash pop");

          // ...
        })().catch((error) => {});
        ```

#### 使用无头浏览器检查 DOM

- `PhantomJS` development is suspended until further notice⚠️
- **最佳实践：Chrome Headless**

  - **什么是 headless chrome**: 没有可识别的图形界面的浏览器或浏览器模拟

    - 无头浏览器通常用于以下场景:

      > 1. 网站及应用测试
      > 2. JavaScript 库测试
      > 3. JavaScript 模拟与交互
      > 4. 在后台运行一个或多个自动化 UI 测试

    - 这些操作可以帮助开发人员确认常见的网站活动是否顺利进行，并能够识别用户界面和用户体验方面的潜在问题。

  - **Printing the DOM:** `chrome --headless --dump-dom about:blank`
  - **Puppeteer**
    Puppeteer 是 Chrome team 开发的 Node 库。它提供了高级 API 来控制无头（或完整）Chrome。它与其他自动测试库（如 Phantom 和 NightmareJS）相似，但仅适用于最新版本的 Chrome。
  - ```js
    const puppeteer = require("puppeteer");

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://example.com");
      const hrefElement = await page.$("a");
      // ...
    })();
    ```

#### 其他

- **Linux touch 命令**
  - 用于修改文件或者目录的时间属性，包括存取时间和更改时间。若文件不存在，系统会建立一个新的文件。
- **git stash**

  - **git stash save**

    > save [-p|—patch] [-k|--[no-]keep-index] [-u|--include-untracked] [-a|—all] [-q|—quiet] [message]

  - **git stash list**

    > list [options]
    >
    > 不加 options，会列出所有的 stash，你也可以指定某个 stash(stash@{0}代表最近的 stash)

  - **git stash pop**

    > pop [—index] [-q|—quiet] [stash]
    >
    > 与 git stash save 执行相反的操作，从 stash list 中移除这个 stash，恢复工作区
    >
    > —index 如果指定了这个参数，那么不仅恢复工作区，也会恢复暂存区

  - **git stash apply**

    > apply [—index] [-q|—quiet] [stash]
    >
    > 和 pop 类似，区别在于 apply 不会吧 stash 从 stash list 中移除

  - **git stash show [stash]**
    显示和他 parent 的差异

  - **branch [branchname] [stash]**

    > 以这个 stash 被创建的那个 commit 为起点，创建一个叫 branchname 的分支，然后再在这个分支执行 git stash pop —index stash

  - **git stash clear**
    清空当前所有的 stash

  - **git stash create**
    创建一个 stash，并返回他的 commit 对象，但并不在 refs 中存储这个对象

  - **git stash store**
    存储通过 create 创建的 stash。(可以在 refs 的 stash 和 log/refs 下看到这个 stash)

- **Web Hooks**
  - Webhooks 允许您构建或设置集成，例如 GitHub Apps 或 OAuth Apps，它们可以订阅 GitHub.com 上的某些事件
  - 当这些事件之一被触发时，我们将向 Webhook 的配置 URL 发送 HTTP POST 有效负载。
  - Webhooks 可用于更新外部问题跟踪器，触发 CI 构建，更新备份镜像，甚至部署到您的生产服务器。
