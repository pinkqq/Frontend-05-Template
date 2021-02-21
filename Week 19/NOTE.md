## 发布系统

- **分成三个子系统**

  - **线上服务系统**：为真实用户提供线上服务
  - **发布系统**：程序员向线上系统发布服务
  - **发布工具**：命令行工具，与发布系统对接

## 线上服务系统

### 一、初始化 server（搭环境）

#### 1. 安装 VirtualBox

- Oracle VM VirtualBox 下载地址： https://www.virtualbox.org/

#### 2. 新建虚拟机

- 虚拟机系统类型（Linux）和版本（Ubuntu 64-bit）
  ![](https://upload-images.jianshu.io/upload_images/15285416-1afeff8d5a78456b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 启动虚拟机，安装下载好的系统镜像
  - Ubuntu 20.04.1 LTS (Focal Fossa) 下载地址：
    - 官网： https://releases.ubuntu.com/20.04/
    - 网盘： https://pan.baidu.com/s/1s8lga6YxuVcOdcAdhGQqoQ 提取码：b8yw
      ![](https://upload-images.jianshu.io/upload_images/15285416-b544f0b5d44db952.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- tip: 缩放虚拟机窗口
  ![](https://upload-images.jianshu.io/upload_images/15285416-82b2a6e502dbb26d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 3. 系统初始化

- 修改 Mirror Address: http://mirrors.aliyun.com/ubuntu
- 填写 name、server-name、password
- 勾选 Install Openssh server
- 其他默认
- reboot
  ![](https://upload-images.jianshu.io/upload_images/15285416-cc67c89efcba8829.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 磁盘自动弹出后，Machine -> reset 虚拟机
  ![](https://upload-images.jianshu.io/upload_images/15285416-9a80922af89f5f58.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  ![](https://upload-images.jianshu.io/upload_images/15285416-4bae411d1bd3f945.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 出现登录提示 `xqq-server login:`后，输入 用户名/密码 登录。

#### 4. 搭建 node 环境

- `sudo apt install nodejs`
- `sudo apt install npm`
- 更新到最新版本 node
  - `sudo npm install -g n`: node 写的 Node 版本管理
  - `sudo n latest`
  - `PATH="$PATH"`

### 二、实现一个线上的 WEB 服务（利用 Express，编写服务器）

- 前后端分离：前端发 HTML；服务端根据 HTML 和 JS，发送 ajax 请求获取数据。

#### 1. 新建 Express application（server）

- express-generator

  - http://expressjs.com/en/starter/installing.html
    > mkdir myapp
    > cd myapp
  - http://expressjs.com/en/starter/generator.html#express-application-generator

    > npx express-generator
    > npm install

    - directory structure

      ```
        .
        ├── app.js
        ├── bin
        │   └── www
        ├── package.json
        ├── public
        │   ├── images
        │   ├── javascripts
        │   └── stylesheets
        │       └── style.css
        ├── routes
        │   ├── index.js
        │   └── users.js
        └── views
            ├── error.pug
            ├── index.pug
            └── layout.pug

        7 directories, 9 files
      ```

  - `npm start` 默认端口 3000

#### 2. 将 server 内容部署到虚拟机服务器

- **虚拟机启动服务**：默认 `22` 端口
  - `service ssh start`
    ![](https://upload-images.jianshu.io/upload_images/15285416-a594277da75d5992.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  - ssh：远程登录 / 传文件
- **虚拟机设置端口转发**
  ![](https://upload-images.jianshu.io/upload_images/15285416-d9dad48f5e5cf974.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  ![](https://upload-images.jianshu.io/upload_images/15285416-5785cd8eaca5cecd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- **Linux scp（ secure copy）命令**：linux 系统下基于 ssh 登陆进行安全的远程文件拷贝命令。
  - `scp -P 8022 -r ./* xqq@127.0.0.1:/home/xqq/server`

### 三、实现一个发布系统（发布服务器端 + 发布工具）

- `mkdir publish-server` 服务端
- `mkdir publish-tool` 客户端

#### [Node.js Stream（流）](http://nodejs.cn/api/stream.html)

- 流式传输：传输文件
- **流的四种基本类型**
  - [Writable](http://nodejs.cn/api/stream.html#stream_class_stream_writable) - 可写入数据的流（例如 [fs.createWriteStream()](http://nodejs.cn/api/fs.html#fs_fs_createwritestream_path_options)）。
  - [Readable](http://nodejs.cn/api/stream.html#stream_class_stream_readable) - 可读取数据的流（例如 [fs.createReadStream()](http://nodejs.cn/api/fs.html#fs_fs_createreadstream_path_options)）。
  - [Duplex](http://nodejs.cn/api/stream.html#stream_class_stream_duplex) - 可读又可写的流（例如 [net.Socket](http://nodejs.cn/api/net.html#net_class_net_socket)）。
  - [Transform](http://nodejs.cn/api/stream.html#stream_class_stream_transform) - 在读写过程中可以修改或转换数据的 Duplex 流（例如 [zlib.createDeflate()](http://nodejs.cn/api/zlib.html#zlib_zlib_createdeflate_options)）。
- **Class tream.Readable**
  - `Event 'data'`
  - `Event 'end'`
  - ```
    const readable = getReadableStreamSomehow();
    readable.on('data', (chunk) => {
      console.log(`接收到 ${chunk.length} 个字节的数据`);
    });
    readable.on('end', () => {
      console.log('已没有数据');
    });
    ```
  - `readable.pipe(destination[, options])`
    - > 方法绑定可写流到可读流，将可读流自动切换到流动模式，并将可读流的所有数据推送到绑定的可写流。
    - > 数据流会被自动管理，所以即使可读流更快，目标可写流也不会超负荷。
- **class stream.Writable**
  - `writable.write(chunk[, encoding][, callback])`
  - `writable.end([chunk[, encoding]][, callback])`: 通知不再写东西
  - `Event 'finish'`
    - 调用 stream.end() 且缓冲数据都已传给底层系统之后触发。
  - `Event 'drain'`
    - 如果调用 stream.write(chunk) 返回 false，则当可以继续写入数据到流时会触发 'drain' 事件。

#### 实现多文件发布

- [Archiver](https://www.npmjs.com/package/archiver)：在 nodejs 中能跨平台实现打包功能的模块
  - ```js
    let archiver = require("archiver");
    let archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });
    archive.directory("./sample", false);
    archive.finalize();
    archive.pipe(fs.createWriteStream("./tmp.zip"));
    ```
- [unzipper](https://www.npmjs.com/package/unzipper)
  - ```js
    let unzipper = require("unzipper");
    request.pipe(unzipper.Extract({ path: "output/path" }));
    ```
- 获取文件的大小：`fs.stat(path[, options], callback)`

#### 鉴权（oAuth）-- 用 Github oAuth 做一个登录实例

- 开放授权 (OAuth)：允许用户让第三方应用获取该用户在某一网站上储存的私密的资源，而无需将用户名称和密码提供给第三方应用。

- **new github app**
  - `Setting` / `Developer settings` / `New Github App`
  - 关键：`Client ID` 、`Client secrets`
  - [github oAuth API](https://docs.github.com/en/developers/apps/authorizing-oauth-apps)
    1. **请求用户的 GitHub 身份**
       `GET https://github.com/login/oauth/authorize`
    2. **用户被 GitHub 重定向回您的站点**
       用此 code 换访问令牌：
       `POST https://github.com/login/oauth/access_token`
    3. **使用访问令牌访问 API**
       访问令牌可用于代表用户向 API 提出请求。
       ```
       Authorization: token OAUTH-TOKEN
       GET https://api.github.com/user
       ```
