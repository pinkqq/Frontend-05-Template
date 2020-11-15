function UTF8_Encoding(str) {
  const bytes = [];

  for (const character of str) {
    // for...of循环，能正确识别 32 位的 UTF-16 字符。
    let code = character.codePointAt(0);
    if (code >= 65536 && code <= 1114111) {
      // 位运算， 补齐8位
      bytes.push((code >> 18) | 0xf0);
      bytes.push(((code >> 12) & 0x3f) | 0x80);
      bytes.push(((code >> 6) & 0x3f) | 0x80);
      bytes.push((code & 0x3f) | 0x80);
    } else if (code >= 2048 && code <= 65535) {
      bytes.push((code >> 12) | 0xe0);
      bytes.push(((code >> 6) & 0x3f) | 0x80);
      bytes.push((code & 0x3f) | 0x80);
    } else if (code >= 128 && code <= 2047) {
      bytes.push((code >> 6) | 0xc0);
      bytes.push((code & 0x3f) | 0x80);
    } else {
      bytes.push(code);
    }
  }
  // 十进制转二进制
  let binaryArr = [];
  bytes.forEach((ch) => {
    binaryArr.push(ch.toString(16));
  });
  return binaryArr;
}
console.log(UTF8_Encoding("前端训练营"));
