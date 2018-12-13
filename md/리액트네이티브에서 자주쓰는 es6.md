# 리액트에서 자주 만나는 ES6 문법 1
> 참고자료 : https://jsdev.kr/t/es6/2944

---

## 화살표 함수
	
```js
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
// 다음과 동일함:  => { return expression; }

// 매개변수가 하나뿐인 경우 괄호는 선택사항:
(singleParam) => { statements }
singleParam => { statements }

// 매개변수가 없는 함수는 괄호가 필요:
() => { statements }

// 객체 리터럴 표현을 반환하기 위해서는 함수 본문(body)을 괄호 속에 넣음:
params => ({foo: bar})
```
> [MDN 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/애로우_펑션)

---

## 클래스 정의
```
class Polygon extends Component{
  constructor(props) {
    super(props);
    // do something
  }
}
```
> [MDN 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)

---

## 객체 리터럴 표기법

```
cost myKey = 1;
const obj = {
  myKey,
  myNewKey : 3
}
```

---

## 구조 분해(비구조화) 할당
```
var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]

({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20


// 제안 3단계(stage 3 proposal)
({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); //{c: 30, d: 40}
```

---

## 전개 연산자
```
// 함수 호출 용:
myFunction(...iterableObj);

// 배열 리터럴 용:
[...iterableObj, 4, 5, 6]

// 비구조화destructuring 용:
[a, b, ...iterableObj] = [1, 2, 3, 4, 5];

```

> [MDN 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_operator)


---


