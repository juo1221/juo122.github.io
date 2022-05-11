---
date: '2021-11-29'
title: 'Tail Recursion 1'
categories: ['Tech']
summary: '꼬리물기 최적화에 대해 알아보자.'
thumbnail: '../images/postBg/tech.png'
---

## 꼬리물기 최적화 ( tail recursion )

Tail recursion : 재귀함수도 일정한 조건을 지키면 제어문처럼 메모리에 resource가 쌓이지 않고 해제 되는것

- 메모리에 상주하지 않으니 stack overflow 에러가 발생하지 않는다.
- 언어 차원에서 지원해야한다.
- 기계적으로 제어문으로 바꿀 수 있다.
  - tail recursion을 지원하지 않는 언어에서는 제어문을 이용해야하기 때문에 제어문으로 바꿀 수 있는 능력이 필요하다.
  - JS는 tail recursion을 지원하지 않지만 유일하게 **사파리에서는 동작**한다. (크롬은 지원x)

## 변환 방법

- 재귀함수로 코드 작성
- 재귀함수를 tail recursion으로 변경
- tail recursion을 제어문으로 기계적으로 변경
  - **기계적으로** 변경한다는 말은 tail recursion의 **논리를 100% 그대로 사용**하여 제어문으로 바꿔야 함을 의미한다.
  - 마치 사람이 컴파일러가 된 것처럼 바꿔야한다.

### 합에 대한 예제

1. 에러표출을 위해 문을 식으로 변경

   ```javascript
   const err = v => {
     throw v
   }
   ```

2. 합계에 대한 재귀함수

   ```javascript
   if (1) {
     const _sum = num => (num ? num + _sum(num - 1) : 0)
     const sum = num =>
       typeof num !== 'number' ? err(`invalid type of ${num}`) : _sum(num)
     console.log(sum(10))
   }
   ```

3. 합계에 대한 tail recursion

   ```javascript
   if (1) {
     const _sum = (num, acc) => (num ? _sum(num - 1, acc + num) : acc)
     const sum = num =>
       typeof num !== 'number' ? err(`invalid type of ${num}`) : _sum(num, 0)
     console.log(sum(10))
   }
   ```

4. 제어문으로 변경

   ```javascript
   if (1) {
     const sum = num => {
       if (typeof num !== 'number') err(`invalid type of ${num}`)
       let acc = 0
       for (let i = num; i > 0; i = i - 1) acc = acc + i
       return acc
     }
     console.log(sum(10))
   }
   ```

사파리에서 실험시,

2번의 경우 num에 100,000 이상의 숫자 대입시 call stack 초과 에러 발생

3번의 경우 num에 100,000 이상의 숫자를 대입하더라도 계산가능

### 배열 합에 대한 예제

1. 배열합계의 재귀함수

```javascript
if (1) {
  const arr = Array.from({ length: 5 }, (_, i) => i + 1)
  const _sum = arr => (arr.length ? arr.pop() + _sum(arr) : 0)
  const sum = arr => (arr.length ? _sum(arr) : err('invalid index'))
  console.log(sum(arr))
}
```

2. 배열합계의 tail recursion

```javascript
if (2) {
  const arr = Array.from({ length: 5 }, (_, i) => i + 1)
  const _sum = (arr, acc) => (arr.length ? _sum(arr, arr.pop() + acc) : acc)
  const sum = arr => (arr.length ? _sum(arr, 0) : err('invalid index'))
  console.log(sum(arr))
}
```

3. 제어문으로 변경

```javascript
if (3) {
  const arr = []
  const sum = arr => {
    if (!arr.length) err('invalid index')
    let acc = 0
    for (let i = arr.length; i > 0; i = i - 1) acc = arr.pop() + acc
    return acc
  }
  console.log(sum(arr))
}
```

사파리에서 실험시,

1번의 경우 arr에 100,000 이상의 요소 대입 시 call stack 초과 에러 발생

2,3번의 경우 num에 100,000 이상의 요소를 대입하더라도 계산가능
