---
date: '2022-02-01'
title: 'Tail Recursion 4'
categories: ['Tech']
summary: 'JSON.stringify 구현하기'
thumbnail: '../images/postBg/tech.png'
---

### JSON.stringify 구현하기 

---

```javascript
 과제
 1. [1,[2,[3,[4,[5]]]]] 를 stringify 해보자.
 2. [1, 2, ['a', [1, 2], false], 3, ['b', 'c', [1, 2]]] 를 stringify 해보자.
```


## 고려할 점

### 과제 1 | 패턴파악하기
---
1. 중첩 구조 
- 대괄호가 닫히기 전에 새로운 대괄호가 오면 기존의 대괄호는 부모로, 새로운 대괄호는 자식으로 만들어준다.
- 관계를 표현하기 위해서는 저장소가 필요하다. 
- 저장소는 stack과 같은 **배열 구조 혹은 linked list**로 구현할 수 있다. 
- stack의 경우 최상위 부모가 모든 자식을 관리해야 한다.
- linked-list의 경우 바로 이전 부모가 누구인지만 기억하면 된다. 
- stack으로도 구현해 보고 linked-list로도 구현해 보자. 

<br/>

### stack으로 구현 (tails recursion)

```javascript
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

```javascript
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
```javascript
stack = [arr, idx + 1, acc, stack];
arr = el;
idx = 0;
acc = [];
```
위를
```javascript
arr = el;
idx = 0;
acc = [];
stack = [arr, idx + 1, acc, stack];
```
이렇게 바꾸면 stack에 엉뚱한 값이 들어가기 때문에 제대로 동작하지 않는다.

### linked list로 구현 (tails recursion)

```javascript
if (1) {
  const arr = [1, [2]];
  const err = (v) => {
    throw v;
  };
  const accToString = (acc) => {
    const [START, END] = "[]";
    let res = "";
    do {
      res = "," + acc.value + res;
    } while ((acc = acc.prev));
    return START + res.substr(1) + END;
  };
  const recursive = (arr, idx, acc, stack) => {
    if (idx < arr.length) {
      const el = arr[idx];
      if (Array.isArray(el)) {
        return recursive(el, 0, null, { arr, idx: idx + 1, acc, stack });
      } else {
        return recursive(arr, idx + 1, { prev: acc, value: el }, stack);
      }
    } else {
      const accStr = accToString(acc);
      if (stack) {
        return recursive(stack.arr, stack.idx, { prev: stack.acc, value: accStr }, stack.stack);
      } else {
        return accStr;
      }
    }
  };
  const stringify = (arr) => {
     recursive(arr, 0, null, null);
  };
  const res = stringify(arr);
  console.log(res);
  console.log(JSON.stringify(arr));
  console.log(JSON.stringify(arr) == res);
}
```

stack과 acc 모두 linked list로 변경했다.
acc는 현재 배열 안에 있는 모든 요소를 저장하는 용도로 사용되고 stack은 부모 배열에 있던 모든 요소를 저장하는 용도로 사용된다.
모든 acc는 이전 acc와 value로 되어있기 때문에 이전 acc가 null이 될 때까지 2pass에서 acc에 저장된 모든 값을 꺼내 가공할 수 있다.

### linked list로 구현 (제어문)

```javascript
if (2) {
  const arr = [1, [2]];
  const err = (v) => {
    throw v;
  };
  const accToString = (acc) => {
    const [START, END] = "[]";
    let res = "";
    do {
      res = "," + acc.value + res;
    } while ((acc = acc.prev));
    return START + res.substr(1) + END;
  };

  const stringify = (arr) => {
    let idx = 0;
    let acc = null;
    let stack = null;
    while (true) {
      if (idx < arr.length) {
        const el = arr[idx];
        if (Array.isArray(el)) {
          stack = { arr, idx: idx + 1, acc, stack };
          arr = el;
          acc = null;
          idx = 0;
        } else {
          acc = { prev: acc, value: el };
          idx = idx + 1;
        }
      } else {
        const accStr = accToString(acc);
        if (stack) {
          let { arr: prevArr, idx: prevIdx, acc: prevAcc, stack: prevStack } = stack;
          acc = { prev: prevAcc, value: accStr };
          arr = prevArr;
          idx = prevIdx;
          stack = prevStack;
        } else {
          return accStr;
        }
      }
    }
  };
  const res = stringify(arr);
  console.log(res);
  console.log(JSON.stringify(arr));
  console.log(JSON.stringify(arr) == res);
}
```

### 과제 2 | 패턴파악하기
---
1. 값의 타입은 숫자, 문자, 불리언 등이 올 수 있다.
2. 2pass에서 acc를 처리할때 타입을 구별해서 처리할 수 있는 **라우터와 라우팅 테이블**을 만들자. 

<br/>

### tails recursion
```javascript
if (1) {
  const arr = ["ab", 1, 2, ["a", "b"]];
  const err = (v) => {
    throw v;
  };
  const strProcessor = {
    table: [
      [/"/, '\\"'],
      [/\r\n/, "\n"],
    ],
    process(v) {
      return this.table.reduce((str, curr) => str.replace(curr[0], curr[1]), v);
    },
  };
  const convertor = {
    data: {
      /* 2pass에서 acc가 처리될 때 모두 [ ] 로 감싸지기 때문에 string으로 인식된다. 
              따라서 [ 이 올 때에는 아무런 처리 없이 리턴하면된다.*/
      string: (v) => (v.includes("[") ? v : `"${strProcessor.process(v)}"`),
      number: (v) => "" + v,
      boolean: (v) => "" + v,
    },
    convert(v) {
      return this.data[typeof v]?.(v) ?? "null";
    },
  };

  const accToString = (acc) => {
    const [START, END] = "[]";
    let res = "";
    do {
      res = "," + convertor.convert(acc.value) + res;
    } while ((acc = acc.prev));
    return START + res.substr(1) + END;
  };
  const recursive = (arr, idx, acc, stack) => {
    if (idx < arr.length) {
      const el = arr[idx];
      if (Array.isArray(el)) {
        return recursive(el, 0, null, { arr, idx: idx + 1, acc, stack });
      } else {
        return recursive(arr, idx + 1, { prev: acc, value: el }, stack);
      }
    } else {
      const accStr = accToString(acc);
      if (stack) {
        return recursive(stack.arr, stack.idx, { prev: stack.acc, value: accStr }, stack.stack);
      } else {
        return accStr;
      }
    }
  };
  const stringify = (arr) => {
    return recursive(arr, 0, null, null);
  };
  const res = stringify(arr);
  console.log(res);
  console.log(JSON.stringify(arr));
  console.log(JSON.stringify(arr) == res);
}
```
## 유의할점 

  **컬렉션의 사용**
  
  ```javascript
  1.
  const parent = [];
  parent.push(child1, child2, child3 ...);
  ```

  ```javascript
  2. 
  let parent;
  child1.parent = parent;
  child2.parent = parent;
  ```
  
  1번과 2번 중 더 좋은 설계는 무엇일까? 

  => 2번이 더 좋은 설계
  1번의 하나의 부모가 각 child와의 의존성이 생기기 때문에 책임이 더 무거워진다. 
  반면 2번의 경우 자신의 부모만 알면 되기 때문에 개별 객체의 책임이 훨씬 가벼워 진다. 

  기본적으로 컬렉션을 배제하는 편이 훨씬 가벼운 의존성을 갖게 되기 때문에 반드시 필요한 경우가 아니라면
  linked-list를 사용하도록 하자.  
