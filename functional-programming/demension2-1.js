//TODO: 구현하세요

function myMap(arr, fn) {
  // Array.prototype.map 구현
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    // map은 "구멍(비어있는 인덱스)"은 건너뜀
    if (!(i in arr)) continue;
    result.push(fn(arr[i], i, arr));
  }
  return result;
}

function myFilter(arr, predicate) {
  // Array.prototype.filter 구현
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr)) continue;
    if (predicate(arr[i], i, arr)) result.push(arr[i]);
  }
  return result;
}

function myReduce(arr, reducer, initialValue) {
  // Array.prototype.reduce 구현
  const hasInitial = arguments.length >= 3;
  let acc;
  let startIdx = 0;

  if (hasInitial) {
    acc = initialValue;
  } else {
    // initialValue 없으면: 첫 "존재하는" 원소를 acc로 사용
    while (startIdx < arr.length && !(startIdx in arr)) startIdx++;
    if (startIdx >= arr.length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    acc = arr[startIdx];
    startIdx++;
  }

  for (let i = startIdx; i < arr.length; i++) {
    if (!(i in arr)) continue;
    acc = reducer(acc, arr[i], i, arr);
  }
  return acc;
}

function myFind(arr, predicate) {
  // Array.prototype.find 구현
  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr)) continue;
    if (predicate(arr[i], i, arr)) return arr[i];
  }
  return undefined;
}

function myEvery(arr, predicate) {
  // Array.prototype.every 구현
  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr)) continue;
    if (!predicate(arr[i], i, arr)) return false;
  }
  return true;
}

function mySome(arr, predicate) {
  // Array.prototype.some 구현
  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr)) continue;
    if (predicate(arr[i], i, arr)) return true;
  }
  return false;
}

// 테스트
const nums = [1, 2, 3, 4, 5];

console.log(myMap(nums, x => x * 2)); // [2, 4, 6, 8, 10]
console.log(myFilter(nums, x => x % 2 === 0)); // [2, 4]
console.log(myReduce(nums, (a, b) => a + b, 0)); // 15
console.log(myFind(nums, x => x > 3)); // 4
console.log(myEvery(nums, x => x > 0)); // true
console.log(mySome(nums, x => x > 4)); // true
