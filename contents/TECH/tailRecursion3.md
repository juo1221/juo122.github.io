---
date: '2022-01-25'
title: 'Tail Recursion 3'
categories: ['Tech']
summary: 'JSON.stringify 구현하기'
thumbnail: '../images/postBg/tech.png'
---

### JSON.stringify 구현하기 ( 개선 후 코드 )

---

```javascript
const arr = [1, 'ab"c', true, undefined, null, _ => 3, Symbol(), {}]

console.log(구현할함수(arr) === JSON.stringify(arr))
```

true가 나오도록 함수를 만들어보자.

### 개선할 점

1. validator의 복잡성 처리
  - string 처리 : 정규표현식 이용.
  - isObject 추가
2. 조건문 
  - 라우터와 라우팅 테이블로 변화.
3. 2pass 전략 이용
  - 1pass : 2pass때 사용할 자료를 수집.
  - 2pass : 1pass에 모은 자료를 처리. 
4. 역할별로 코드 나누기.
  - "{}", "[]" 와 같은 문자를 사용해 마지막에 감싸는 부분은 독립적으로 분리.
5. 변수명 제대로 
  - "go" 가 아니라 재귀의 의미를 갖도록 변경.

```javascript
"use strict";

if (1) {
  const arr = [1, 'ab"c', true, undefined, null, (_) => 3, Symbol(), {}];
  const err = (v) => {
    throw v;
  };
  /* string 처리 : 엔터, excape string 처리 */ 
  const stringReg = {
    regs: [
      [/"/, '\\"'],
      [/\r\n/, "\n"],
    ],
    process(el) {
      if (typeof el != "string") err(`invalid typeof el : ${el} : ${typeof el} `);
      this.regs.forEach((reg) => {
        el = el.replace(reg[0], reg[1]);
      });
      return el;
    },
  };
  const convertor = {
    table: {
      string: (el) => `"${stringReg.process(el)}"`,
      number: (el) => "" + el,
      boolean: (el) => "" + el,
      object: (el) => "{}",
    },
    convert(el, isObject) {
      return this.table[isObject ? "object" : el && typeof el]?.(el) ?? "null";
    },
  };
  /* 역할별로 코드 나누기 : "[]" , "," 등의 문자는 모두 combine 에서만 사용 */
  const combine = (acc) => {
    /* 문자열은 이터러블이기 때문에 바로 구조분해 할당 가능 */
    const [START, END] = "[]";
    let res = "";
    do {
      /* acc.value의 처리는 라우터와 라우팅 테이블을 이용해 처리 */
      res = "," + convertor.convert(acc.value, acc.isObject) + res;
    } while ((acc = acc.prev));
    /* ,는 앞에서 붙이면 쉽게 자를 수 있음 */
    return START + res.substr(1) + END;
  };
  const recursive = (arr, idx, acc) => {
    if (idx < arr.length) {
      const v = arr[idx];
       /* 1pass : acc를 축적 */
      return recursive(arr, idx + 1, { prev: acc, value: v, isObject: v && typeof v == "object" ? true : false });
    } else {
       /* 2pass : 축적한 acc처리 */
      return combine(acc);
    }
  };
  const stringify = (arr) => {
    return recursive(arr, 0, null);
  };
  const res = stringify(arr);

  console.log(JSON.stringify(arr) == res); // true
}
```

## 유의할점 

  **내결함성 없애기**

  내결함성이란 프로그램이 실패하지 않게 만드는 장치를 말한다. 
  내결함성에 걸리면 컨텍스트 오류가 발생하는데 컨텍스트 오류는 프로그램이 죽지도 않으면서 알수없는 값을 출력하기 때문에 디버깅하기 굉장히 어렵다.
  예를들면 이런코드를 말한다.
  ```javascript
  const recursive = (list, index = 0, acc = 0) => {
  if (!Array.isArray(list)) return 0;
  };
  ```
  list가 배열이 아니라면 0을 리턴하고 프로그램은 제대로 동작한다. 복잡하고 긴 코드로 이루어졌을 경우 하나의 내결함성으로 인해 디버깅이 굉장히 어려워지게 된다. 

  이런 내결함성을 회피하기 위해서는
  ```javascript
  const recursive = (list, index = 0, acc = 0) => {
    if (!Array.isArray(list)) throw `invaild list : ${list}`;
  };
  ```
  throw를 이용해서 프로그램을 죽여야한다. 
  throw는 문 이기때문에 코드의 중간에 삽입될 수 없다. 따라서 함수를 이용해 식으로 바꿔주고 사용하도록 하자. 
  ```javascript
  const err = (v) => {throw v}
  const recursive = (list, index = 0, acc = 0) => {
    if (!Array.isArray(list)) err(`invaild list : ${list}`);
  };
  ```

  코드를 작성할 때 고려해야 하는 것 : 안정성, **신뢰성**.

  안정성과 신뢰성은 비슷해보이지만 상반된 개념이다. 
  내결함성을 갖게되면 안정성은 증가하지만 신뢰성은 감소하고, 내결함성을 해소하고 프로그램을 죽이면 안정성은 떨어지지만 신뢰성은 증가한다. 
  <br/>
  <br/>
  ex) 
  사원 100명 중 1명의 월급이 10원으로 들어왔다.

  => 나머지 99명의 월급은 제대로 된 액수가 맞는지 확신할 수 있을까?
  <br/>
  <br/>
  아주 작은 신뢰성의 문제는 전체를 의심하게 만든다. 우리가 지향해야할 점은 안정성의 증가가 아니라 **신뢰성을 증가**시키는 것이다. 

  코드에 내결함성을 갖지 않도록 항상 유의하자. 

