let http = require("http");
let fs = require("fs");
let archiver = require("archiver");
let child_process = require("child_process");
let querystring = require("querystring");
const { request } = require("https");
/*
 ** 单文件传输

fs.stat("./sample.html", (err, stats) => {
  let request = http.request(
    {
      hostname: "127.0.0.1",
      port: 8882,
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": stats.size,
      },
    },
    (response) => {
      console.log(response);
    }
  );
  let file = fs.createReadStream("./sample.html");
  file.pipe(request);

  // file.on("data", (chunk) => {
  //   request.write(chunk.toString());
  //   console.log(chunk);
  // });
  file.on("end", () => {
    request.end();
  });
});*/

/*
 ** 多文件传输

let request = http.request(
  {
    hostname: "127.0.0.1",
    port: 8082,
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
    },
  },
  (response) => {
    console.log(response);
  }
);
// 打包压缩文件夹
const archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});
archive.directory("./sample", false);
archive.finalize();
// 将可读流传给可写流
archive.pipe(request);
 */

/*
 ** 鉴权
 */
// 1. 打开 https://github.com/login/oauth/authorize
child_process.exec(
  `open https://github.com/login/oauth/authorize?client_id=Iv1.be962c263b16aba5`
);
// 3. 创建server，接受token，点击发布
http
  .createServer(function (request, response) {
    let query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
    publish(query.token);
  })
  .listen(8083);

function publish(token) {
  console.log(token);
  let request = http.request(
    {
      hostname: "127.0.0.1",
      port: 8082,
      method: "POST",
      path: "/publish?token" + token,
      headers: { "Content-Type": "application/octet-stream" },
    },
    (response) => {
      console.log(response);
    }
  );
  request.end();
}
