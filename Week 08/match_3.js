function match(str) {
  let matched = 0;
  for (let c of str) {
    if (c === "a") {
      matched = 1;
    } else if (matched === 1 && c === "b") {
      matched++;
    } else if (matched === 2 && c === "c") {
      matched++;
    } else if (matched === 3 && c === "d") {
      matched++;
    } else if (matched === 4 && c === "e") {
      matched++;
    } else if (matched === 5 && c === "f") {
      return true;
    } else {
      matched = 0;
    }
  }
  return false;
}
console.log(match("ababcdef"));
