let http = require("http");
let https = require("https");
let unzipper = require("unzipper");
let querystring = require("querystring");
/*
**  单文件传输
let outFile = fs.createWriteStream("../server/public/index.html");
*/
// let outFile = fs.createWriteStream("../server/public/tmp.zip");

/*
** 多文件解压

http
  .createServer(function (request, response) {
    // request.pipe(outFile);
    request.pipe(unzipper.Extract({ path: "../server/public" }));
    // request.on("data", (chunk) => {
    //   outFile.write(chunk);
    // });
    // request.on("end", (chunk) => {
    //   outFile.end(chunk);
    //   response.end("Success");
    // });
  })
  .listen(8082);
*/

/*
 ** 鉴权
 */
// 2. auth路由：接收code，用code + client_id + client_secret换token
function auth(request, response) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  getToken(query.code, (info) => {
    response.write(
      `<a href="http://localhost:8083/?token=${info.access_token}">publish</a>`
    );
    response.end();
  });
}

function getToken(code, callback) {
  let request = https.request(
    {
      hostname: "github.com",
      path: `/login/oauth/access_token?code=${code}&client_id=Iv1.be962c263b16aba5&client_secret=abb146fc14c8dc7870dd9ac2ffeed70470284bb7`,
      port: 443,
      method: "POST",
    },
    function (response) {
      let body = "";
      response.on("data", (chunk) => {
        body += chunk.toString();
      });
      response.on("end", () => {
        callback(querystring.parse(body));
      });
    }
  );

  request.end();
}
// 4. publish路由：用token 获取用户信息，检查权限，接受发布
function publish(request, response) {
  let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
  getUser(query.token, (info) => {
    if (info.login === "pinkqq") {
      request.pipe(unzipper.Extract({ path: "../server/public" }));
      request.on("end", () => {
        response.end("success");
      });
    }
  });
}
function getUser(token, callback) {
  // api.github.com/user
  let request = https.request(
    {
      hostname: "api.github.com",
      path: "/user",
      port: 443,
      headers: {
        Authorization: `token ${token}`,
        "User-Agent": "QQPublish",
      },
    },
    function (response) {
      let body = "";
      response.on("data", (chunk) => {
        body += chunk.toString();
      });
      response.on("end", () => {
        callback(JSON.stringify(body));
      });
    }
  );

  request.end();
}

http
  .createServer(function (request, response) {
    if (request.url.match(/^\/auth\?/)) {
      return auth(request, response);
    }
    if (request.url.match(/^\/publish\?/)) {
      return publish(request, response);
    }
  })
  .listen(8082);
