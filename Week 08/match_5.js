function match(str, pattern) {
  // 计算 table(next数组)
  let table = new Array(pattern.length).fill(0);
  {
    let i = 1,
      j = 0;
    while (i < pattern.length) {
      if (pattern[i] === pattern[j]) {
        i++;
        j++;
        table[i] = j;
      } else {
        if (j > 0) j = table[j];
        else i++;
      }
    }
  }
  // 生成 状态函数数组
  let states = [];
  // start
  states[0] = function (c) {
    if (c === pattern[0]) {
      return states[1];
    } else {
      return states[0];
    }
  };
  // end
  states[pattern.length] = function () {
    return states[pattern.length];
  };

  for (let i = 1; i < pattern.length; i++) {
    states[i] = function (c) {
      if (c === pattern[i]) {
        return states[i + 1];
      } else {
        return states[table[i]](c);
      }
    };
  }

  let state = states[0];
  for (let c of str) {
    state = state(c);
  }
  if (state === states[states.length - 1]) return true;
  else return false;
}

console.log(match("abcabcsabcx", "abcabc"));
