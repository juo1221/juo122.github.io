---
date: '2022-02-01'
title: 'Tail Recursion 4'
categories: ['Tech']
summary: 'JSON.stringify 구현하기'
thumbnail: '../images/postBg/tech.png'
---

### JSON.stringify 구현하기 

---

```jsx
 과제
 1. [1,[2,[3,[4,[5]]]]] 를 stringify 해보자.
 2. [1, 2, ['a', [1, 2], false], 3, ['b', 'c', [1, 2]]] 를 stringify 해보자.
```


## 고려할 점

### 과제 1 | 패턴파악하기
---
1. 중첩 구조 
- 대괄호가 닫히기전에 새로운 대괄호가 오면 기존의 대괄호는 부모로, 새로운 대괄호는 자식으로 만들어준다.
- 관계를 표현하기 위해서는 저장소가 필요하다. 
- 저장소는 stack과 같은 **배열구조 혹은 linked list**로 구현할 수 있다. 
- stack의 경우 최상위 부모가 모든 자식을 관리해야 한다.
- linked-list의 경우 바로 이전 부모가 누구인지만 기억하면 된다. 
- stack으로도 구현해보고 linked-list로도 구현해보자. 

<br/>

### stack으로 구현 (tails recursion)

```jsx
"use strict";

 if (1) {
  const arr = [1,[2,[3,[4,[5]]]]];
  const accToString = (acc) => {
    const [START, END] = "[]";
    let res = "";
    do {
      /* acc가 빈 배열일 경우 undefined가 아닌 빈 문자열 반환한다. */
      res = "," + (acc.pop() ?? "") + res;

      /* acc는 배열이기 때문에 length를 while의 조건으로 잡아준다. */
    } while (acc.length);
    return START + res.substr(1) + END;
  };
  const recursive = (arr, idx, acc, stack) => {
    if (idx < arr.length) {
      const el = arr[idx];
      if (Array.isArray(el)) {
      /* el이 배열일 경우 다음 타겟 arr가 되고 stack에는 부모의 정보를 넣어준다. */
        return recursive(el, 0, [], [arr, idx + 1, acc, stack]);
      } else {
        acc.push(el);
        return recursive(arr, idx + 1, acc, stack);
      }
    } else {
      const accStr = accToString(acc);
      if (stack.length) {
      /* stack에 부모가 남아 있으면 부모의 정보를 빼낸 후 다음으로 진행한다. */
        const [prevArr, prevIdx, prevAcc, prevStack] = stack;
        prevAcc.push(accStr);
        return recursive(prevArr, prevArr, prevAcc, prevStack);
      } else {
        return accStr;
      }
    }
  };
  const stringify = (arr) => {
    return recursive(arr, 0, [], []);
  };

  const res = stringify(arr);
  console.log(res);
  console.log(JSON.stringify(arr));
  console.log(JSON.stringify(arr) == res);
}
```

### stack으로 구현 (제어문)

```jsx
"use strict";

if (2) {
  const arr = [1, [2, [3, [4, [5]]]]];
  const err = (v) => {
    throw v;
  };
  const accToString = (acc) => {
    const [START, END] = "[]";
    let res = "";
    do {
      res = "," + (acc.pop() ?? "") + res;
    } while (acc.length);
    return START + res.substr(1) + END;
  };

  const stringify = (arr) => {

    /* 재귀의 인자는 변수로 잡아준다. */
    let idx = 0;
    let acc = [];
    let stack = [];
    /* 재귀에서 if 조건이 만족할때 까지 계속 루프를 돌기 때문에 while로 잡아준다.  */
    while (true) {
      if (idx < arr.length) {
        const el = arr[idx];
        if (Array.isArray(el)) {
          /* 값을 넣어주는 순서에 유의하자. */
          stack = [arr, idx + 1, acc, stack];
          arr = el;
          idx = 0;
          acc = [];
        } else {
          acc.push(el);
          idx = idx + 1;
        }
      } else {
        const accStr = accToString(acc);
        if (stack.length) {
          const [prevArr, prevIdx, prevAcc, prevStack] = stack;
          prevAcc.push(accStr);
          [arr, idx, acc, stack] = [prevArr, prevIdx, prevAcc, prevStack];
        } else {
          return accStr;
        }
      }
    }
    return recursive(arr, 0, [], []);
  };

  const res = stringify(arr);
  console.log(res);
  console.log(JSON.stringify(arr));
  console.log(JSON.stringify(arr) == res);
}

```
재귀를 제어문으로 바꿀때 변수의 **순서에 유의**해야 한다. 예를들어 
```jsx
stack = [arr, idx + 1, acc, stack];
arr = el;
idx = 0;
acc = [];
```
위를
```jsx
arr = el;
idx = 0;
acc = [];
stack = [arr, idx + 1, acc, stack];
```
이렇게 바꾸면 stack에 엉뚱한 값이 들어가기 때문에 제대로 동작하지 않는다.
### linked list로 구현 (tails recursion)