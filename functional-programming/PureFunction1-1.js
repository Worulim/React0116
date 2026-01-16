// 비순수 함수 1
let total = 0;
function addToTotal(amount) {
  total += amount;
  return total;
}

//순수함수 1
function addTotal2(total, amount){
  const t = total
  t += amount;
  return t;
}

// 비순수 함수 2
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

//순수함수2
function shuffle2(arr){
  const _arr = [...arr];
  for (let i = _arr.length-1; i>0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [_arr[i], _arr[j] = [_arr[j], _arr[i]]];
  }
  return _arr;
}

// 비순수 함수 3
const config = { debug: false };
function log(message) {
  if (config.debug) {
    console.log(message);
  }
}

// 순수 함수 3
const config2 = { debug: false };
function log(message, config) {
  const config = {...config}
  if (config.debug) {
    config.debug={};
    console.log(message);
  }
}

//TODO: 순수 함수 버전 구현
