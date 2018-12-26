# 리액트 네이티브에서의 화면전환

--- 
## react-navigation

- 🔎 [공식문서](https://reactnavigation.org/docs/en/getting-started.html)로 살펴봅시다.
- ⚡️ [3.0 release](https://reactnavigation.org/blog/2018/11/17/react-navigation-3.0.html)
	- AppContainer 지정
	- native 모듈 디펜던시가 생김
  	  - (필수) react-native-gesture-handler
  	  - (옵션) react-native-screens
  	  - expo에는 이 두 네이티브 모듈이 기본 포함되어 있음

---

## react-navigation의 기본적인 사용 패턴
- 화면단위로 별도의 컴포넌트를 만든다. 
  - 예) `./screens/MyHomeScreen.js`
- 만든 screen 컴포넌트를 navigator를 생성하면서 등록한다.
  - navigator에는 다양한 종류가 있다.
```
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});
```
- 만든 navigator를 이용하여 AppContainer를 생성
```
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
```

---

## 화면 전환 방법
- https://reactnavigation.org/docs/en/navigating.html
```
// navigate는 이미 열려 있는 Details가 있다면 그 곳으로 이동
this.props.navigation.navigate('Details')

// 이미 열려있는 Details가 있어도 새로운 Screen을 Stack에 push함
this.props.navigation.push('Details')

// 이전 화면으로 가기
this.props.navigation.goBack();
```

---

## 🥋 react-native-navigation vs. react-navigation (1/2)

> 🔫 한방에 모든게 해결되는 것은 없다.

- 쉽게 세팅할 수 있는 것 : RN
- 다른 네이티브 모듈과 충돌이 적은 것 : RN (Native를 사용하지 않기 때문에)
- Expo로만 만들꺼라면 : RN
- 기존 Native Nativation에 익숙하다면 : RNN
- 진짜 네이티브를 UX를 제공하려면 : RNN
- 🤔... 그렇다면 무엇을 ????

---

## 🥋 react-native-navigation vs. react-navigation (2/2)
- 참고 할만한 글
  - [RNN의 Why do we need this package?](https://github.com/wix/react-native-controllers#why-do-we-need-this-package)
  - [RN의 Limitations](https://reactnavigation.org/docs/en/limitations.html)
  - [react-native의 지옥 1호 : navigation](https://jsdev.kr/t/react-native-1-navigation/2617)
- 하지만 곧 이 모든 싸움이 끝날지도 모른다?!
  - react-native의 core를 바꾸는 중이라는 [블로그 글](https://facebook.github.io/react-native/blog/2018/06/14/state-of-react-native-2018)에서 native navigation 관련 언급
  - ~~감히 예언? Titanium의 [Window](https://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.Window) 같은 컴포넌트가 새롭게 태어 날 것이다! 이름은 아마 Screen?~~

