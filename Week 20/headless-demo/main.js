const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:8081/main.html");
  const imgs = await page.$$(".carousel>div");
  console.log(imgs);
  // await hrefElement.click();
  // ...
})();
