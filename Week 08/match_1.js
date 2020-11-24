function match(str) {
  return [...str.matchAll(/a/g)];
}
console.log(match("abcdkqa"));
