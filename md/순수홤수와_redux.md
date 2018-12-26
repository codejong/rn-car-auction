# 순수함수와 redux

---

> 시작하기전 기반 다지기

# 함수

---

## 🤔 함수란 무엇인가?

---

### A. 함수는...
- 입력 => (do something)  => 출력
- 입력은 인자, 출력은 리턴 값

  ```javascript
  function add(a, b){
    return a+b;
  }
  ```

------

## 🤔 Pure Function이란?

---

### A. Pure Function은...
- 💧 순수 함수? 뭐가 순수하다는 걸까?
  - 수학 함수 f(x) = x * 2
  - 변덕이 없다. 한결 같다.
  - 입력이 같으면 결과가 같다.
  - 외부의 무언가를 변경해선 안된다.

---

### 어떻게 순수할 수 있나?
<center>

![](https://ws3.sinaimg.cn/large/006tNbRwgy1fwdo7xoutsj307v0esq5q.jpg)

</center>

---

### 순수하지 못한 경우를 보자 1/3
> 호출할 때마다 달라지는 값

```javascript
  function notPure(a, b){
    return a+b+Math.random();
  }
  notPure(1,2);
  notPure(1,2);
```
---

### 순수하지 못한 경우를 보자 2/3
> 주변에 따라 값이 달라질 수 있는 함수

  ```javascript
  var x = 3;
  function dirty(a, b){
    return a+b+x;
  }
  dirty(1,2);
  x= 4;
  dirty(1,2);
  ```
---

### 순수하지 못한 경우를 보자 3/3
> 출력값은 같으나 외부를 변경하는 함수

  ```javascript
  var count = 0;
  function messUp(a, b){
    count++;
    return a+b;
  }
  ```

---

### 어떻게 순수할 수 있나?
- 원칙 1
  - 출력값에 영향을 주는 모든 것를 입력으로 받는다.
- 원칙 2
  - 함수 내부의 코드에서 함수 외부의 변수를 접근하지 않는다.
- 원칙 3
  - 외부의 변화는 외부에서 알아서 정해서 할 수 있도록 길을 열어 둠 (예. callback)

------


### 순수하게 바꿔보자 1/4

- 내부에서 random 처럼 가변적인 내용을 제거한다.
- 필요하다면 가변적인 부분을 밖으로 분리한다.

  ```javascript
  function notPure(a, b){
   	 return a+b+Math.random();
  }
  
  function nowPure(a, b, extra){
   	 return a+b+extra;
  }
  
  nowPure(a, b, Math.random());
  nowPure(a, b, Math.random());
  // 입렵이 달라진 것, 입력이 같을 때는 출력이 항상 같음
  ```

------

### 순수하게 바꿔보자 2/4

- 내가 하는 일은 모두 내 안에서!
- 내부에서 외부(예. global)의 값을 참조하지 않는다.

  ```
  // 예 2
  var x = 3;
  function dirty(a, b){
    return a+b+x;
  }
  
  function notDirty(a, b, extra){
    return a+b+extra;
  }
  
  notDirty(1, 2, x);
  x = 4;
  notDirty(1, 2, x);
  // 입렵이 달라진 것, 입력이 같을 때는 출력이 항상 같음
  ```



------

### 순수하게 바꿔보자 3/4

- 외부의 내용을 바꾸지 않아야하며 결과를 받아서 밖에서 처리하도록

  ```javascript
  var count = 0;
  function messUp(a, b){
    count++;
    return a+b;
  }
  
  function notMessUp(a, b, count){
    return {
      value: a+b,
      count: count++
    };
  }
  
  const result = notMessUp(1, 2, count);
  count = result.count;

  ```
  
---

### 순수하게 바꿔보자 4/4
- 외부의 변화이니 외부가 알아서 하도록 callback에 지정하도록 해준다.
  
  ```javascript
  function notMessUp2(a, b, callback){
    callback();
    return a+b;
  }
  
  var count = 0;
  
  notMessUp2(1, 2, ()=>{
    count++
  });
  ```

------

### 어디서 많이 보던 모습?

```javascript
class CountButton extend Component {
  count = 0
  onPress(){
    alert(`${++this.count}번 눌렀어!`);
  }
  render() {
    return <Button
      onPress={this.onPress}
      title="Learn More"
      color="#841584"
    />;
  };
}
```

---

### 💧 순수하면 뭐가 좋은가?

- 입력이 있을 때 결과를 예측할 수 있다.
- 예측하면 추가적으로 테스트를 쉽게 할 수 있다.
  - 예측이 충분히 되기에 예측과 다른지를 비교하도록 테스트 코드 작성

---

## 🤔 리액트 컴포넌트 === 함수?

---

### A. YES! 리액트 컴포넌트는 함수이다.

- ==입력== : `props`
- ==출력==
  - 의미적 출력 : `render`의 return 값(View)
  - 실제 출력 : 함수의 return 값
    - Stateless Component의 경우 : return 값(View)
    - 일반 Component의 경우 : 객체
      - 라이프 사이클
      - render 함수

---

### 웬 라이프 사이클인가?
- 내부의 `state`가 있다는 것은 **동적, 살아있다**는 의미. 외부 자극이 없어도 스스로 변할 수 있는 객체
- props(입력)이 바뀔 때만 결과(View)가 달라지는 것이 아니라 
내부적으로도 무언가(state) 변하면 결과(View)가 변한다.

---

## 🤔 컴포넌트의 `props`와 `state`란 무엇인가?

---

### A. `props`와 `state`는...

- ==**props**== : View 계층구조에서 부모가 나에게 넘겨주는 것
  - 외부에서 컴포넌트 내부로 무언가를 전달하는 유일한 길
  - 밖에서 넘겨준 것을 바꾸지 않는다. 사용할 뿐!

- ==**state**== : 해당 컴포넌트가 알아서 관리해야하는 데이터
  - 외부에서 직접 변경 못하는 내부에서 사용하는데 데이터: state가 변하면 이에따라 render하는 View(결과값)가 달라져야하는 데이터

---

### 컴포넌트 간의 데이터 전달은 단방향
- prop을 이용하여 부모에서 자식으로~

---

### 앱 전체에서 사용되는 공통 state
- 로그인 정보
- 환경 설정 정보
  - 언어 설정
- ...

---

### 이럴 때 어떤 불편함이 생기나?
- state의 전달
- state의 변경

---

### 어려움 예시 : state의 전달

- [샘플 화면](https://cdn.pttrns.com/634/7943_f.jpg)

```javascript
function Header(props){
  return (
    <View>
      <SearchView/>
      <RightProfileView/>
    </View>
  );
}

function RightProfileView(props){
  return (
    <View>
      <Image source={{uri: props.loginUserProfile}}/>
    </View>
  );
}
```

---

```javascript
Class AppView extends Component{
  constructor(props){
    super(props);
    this.state = {
      loginUserName,
      loginUserProfile
    }
  }
  async login(){
    // ... 
    // 로그인 후 정보를 state에서 관리
    const user = await API.login('myId','myPassword');
    this.setState({
      loginUserName: user.name
      loginUserProfile: user.profile
    });
  }
  render() {
    return (
      <View>
        <Header />
        <MainView />
      </View>
    );    
  }
}
```

---

### 어려움 예시 : state의 변경

---

### 🔧 상태관리도구는 이러한 문제를 해결하기 위한 도구

---

# 11장 **대규모 애플리케이션에서의 State 관리**

---

## `redux`의 3대 개념
- store
- action
- reducer

---
### `store`
- 단일 객체
- 컴포넌트의 `props`로 내용을 전달
- `store`의 초깃값은 reducer에서 결정 됨

---
### `action`
- `store`의 변화를 이끌어 내는 역할
- 앱에서 일어나는 일에 해당
```javascript
export const stopReview = () => {
  return { type: STOP_REVIEW, data: {} };
};
```
---


### reducer
- 액션에 따른 state를 어떻게 바꿔야 할지 나타낸 것
- input 발생 기존 state와 action
- output 새로운 state
- 💧 순수 함수
- store 초기값 결정
- 여러 reducer를 combine하여 하나의 store를 여러개인 듯

```javascript
const reducer = (state = [], action) => {
  console.warn("Changes are not persisted to disk");
  switch (action.type) { 
    case ADD_DECK:
      return state.concat(action.data);   
    }
  return state; 
};
```
---

### 😧 3대는 개념은 아니지만...
- `dispatch()` 함수 : `action`을 `reducer`에게 전달하여 `reducer`가 실행되도록 하는 함수
  - `store` 변화를 일으키는 시작 점

---

### 설정 1단계 : `createStore`
- createStore로 스토어 생성
  - store는 recuer가 결정
  ```
  import { createStore } from "redux";
  import { reducer } from "../reducers/index";
  
  let store = createStore(reducer);
  ```
- 일반적으로 앱 구동코드에서 실행

---

### 설정 2단계 : `<Provider>`
- `<Provider>`로 `<App/>`최상위 컴포넌트를 감싸기
- 이는 하위 모든 컴포넌트에 자동으로 store(리덕스의 state)가 전달 되도록 함

---

### 설정 3단계 : `connect()`
- `Provider`로 부터 전달되는 `store`로 부터 필요한 사항을 연결해주는 새로운 컴포넌트 생성 (HOC)
```
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecksScreen);
```
  - `mapStateToProps` : store의 어떤 state를 props으로 전달할지 결정
  - `mapDispatchToProps` : dispatch를 실행하는 함수를 props로 전달
	- 이를 지정하지 않으면 `this.props.dispatch`로 접근하여 dispatch함수를 직접 사용 가능

---

### 완전한 분리
> 내가 할일은 내가, 니가 할일은 니가 알아서

- 우리가 만드는 Component는 단순 해짐
  1. 어떤 props에 따라 보여주는 모습 달라지게
  2.  내부에서 어떤일이 일어나면 props의 특정 함수가 실행되도록

- redux가 해주는 일
  - store의 특정 값을 i) 단계의 props으로 제공
  - Component의 내부에서 어떤일이 일어날 때 특정 action이 dispatch되도록 

---

> redux를 위한 다양한 도구 1
## [`redux-persist`](https://github.com/rt2zz/redux-persist)
Redux의 스토어를 AsyncStorage에 보관
- 설치 : `npm install redux-persist --save`

---

## `redux-persist` 사용법 1/2
- persistedReducer를 생성
```
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer)
let persistor = persistStore(store)
```

---

## `redux-persist` 사용법 2/2
```
import { PersistGate } from 'redux-persist/integration/react'

// ... normal setup, create store and persistor, import components etc.

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
};
```

---

> redux를 위한 다양한 도구 2
## [`redux-logger`](https://www.npmjs.com/package/redux-logger)
Redux의 스토어를 AsyncStorage에 보관
- 설치 : `npm i --save redux-logger`

```
import { applyMiddleware, createStore } from 'redux';
 
// Logger with default options
import logger from 'redux-logger'
const store = createStore(
  reducer,
  applyMiddleware(logger)
)
```
---
