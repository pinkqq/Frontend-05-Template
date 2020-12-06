function sp(selector) {
  let p = [0, 0, 0, 0];
  const selectorParts = selector.split(" ");

  for (let part of selectorParts) {
    let selectorId = [],
      selectorClass = [];
    part = part.replace(/#((?!\.|#)\S)*/g, ($) => {
      selectorId.push($);
      return "";
    });
    part = part.replace(/\.((?!\.|#)\S)*/g, ($) => {
      selectorClass.push($);
      return "";
    });
    p[1] += selectorId.length;
    p[2] += selectorClass.length;
    p[3] += part.length > 0 && 1;
  }
  return p;
}
sp("div#id.class1.class2");
