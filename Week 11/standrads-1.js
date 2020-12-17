// Array.prototype.slice.call()
const standrads = JSON.stringify(
  [...document.querySelector("#container").children]
    .filter((e) => {
      return e.getAttribute("data-tag").match(/css/);
    })
    .map((e) => {
      return {
        name: e.children[1].innerText,
        url: e.children[1].children[0].href,
      };
    })
);
