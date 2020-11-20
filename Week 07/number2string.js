function NumberToString(number, radis) {
  let str = "",
    hex = "0123456789abcdef",
    sign = number > 0 ? "" : "-",
    num = Math.abs(number);
  if (number === 0) {
    return 0;
  }
  if (radis === 2) {
    while (num > 0) {
      str = (num % 2) + str;
      num >>= 1;
    }
  } else if (radis === 8) {
    while (num > 0) {
      str = (num % 8) + str;
      num >>= 3;
    }
  } else if (radis === 16) {
    while (num > 0) {
      str = hex[num % 16] + str;
      // 位运算：/2**4
      num >>= 4;
    }
  } else {
  }
  return sign + str;
}
console.log(NumberToString(-123, 16));
