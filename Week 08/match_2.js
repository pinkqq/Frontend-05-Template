function match(str) {
  for (let i = 0; i < str.length - 1; i++) {
    if (str.slice(i, i + 2) === "ab") {
      return i;
    }
  }
  return -1;
}
console.log(match("abcdkqa"));
