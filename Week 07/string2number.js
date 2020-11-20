function StringToNumber(string) {
  let number = 0;
  // NaN
  if (!Number(string)) {
    return Number(string);
  }
  // 也可以用 string.startsWith
  // 二进制
  if (string.match(/^0b/)) {
    let str = string.replace(/^0b/, "");
    for (let i = 0; i < str.length; i++) {
      number += str[str.length - 1 - i] * 2 ** i;
    }
    return number;
  }
  // 八进制
  else if (string.match(/^0o/)) {
    let str = string.replace(/^0o/, "");
    for (let i = 0; i < str.length; i++) {
      number += str[str.length - 1 - i] * 8 ** i;
    }
    return number;
  }
  // 十六进制
  else if (string.match(/^0x/)) {
    let str = string.replace(/^0x/, "");
    for (let i = 0; i < str.length; i++) {
      number += str[str.length - 1 - i] * 16 ** i;
    }
    return number;
  }
  // 十进制
  return Number(string);
}
