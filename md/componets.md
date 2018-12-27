---
# 플랫폼 API

---

## 📍 지리적 위치 정보

```javascript
navigator.geolocation.getCurrentPosition( 
  (position) => {
    console.log(position); 
  },
  (error) => {alert(error.message)},
  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} 
);
```

- [MDN Spec을 따름](https://developer.mozilla.org/ko/docs/Web/API/Geolocation/getCurrentPosition)
- 참고 : [Specification List](https://developer.mozilla.org/en-US/docs/Web/Specification_list)

---


## watch형태의 callback 지정 시 주의

- case : setInterval이나 geolocation.watchPosition 같이 한번 설정하면 반복적으로 호출 될 수 있는 코드

- 잊지말고 해제해야 한다.

  ```
  // 설정
  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({position: position});
    });
  }
  
  // 해제
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  ```
---

## 사용자에게 요청해야하는 권한?

카메라, 사진, 연락처 등 개인정보와 관련있는 데이터에 대한 접근 권한
- 앱 별로 권한이 따로 관리
- OS 종류나 버전, 사용하려는 API(카메라, 사진롤, 위치..)에 따라 사용자에게 물어보지 않고 바로 사용할 수 있는 API들이 있고 사용자에게 시스템이 직접 물어보는 API도 있다.
- **점점 더 권한을 사용자에게 직접 물어보는 추세**

---

### 📖 권한 요청 관련 주요 내용

> 대화 상자가 화면에 보이는 동안에는 어떤 콜백도 호출되지 않는다. 사용자가 허용 여부를 선택하고 나면 그에 맞는 콜백이 호출될 것이다. 앱 별로 한번 선택한 사항은 유지되므로 다음번 요청에는 대화 상자가 나타나지 않는다. 사용자가 거절했을 경우에는 위치 정보를 가져오지 못할 뿐 아무 일도 일어나지 않게 할 수 있다. 하지만 대부분의 앱은 요청이 거절당하면 위치 정보를 허용해 달라고 별도로 만든 대화 상자를 사용자에게 다시 보여주곤 한다. 
>
> 리액트 네이티브 2/E 110쪽~111쪽 (6.1절)

---

### 권한 다루기 1/2

- **Step 1 : 앱 설정 파일 수정**
  - 안드로이드 (AndroidManifest.xml) : 앱 설정 파일에 어떤 권한을 사용자에게 요청할 수 있는지 명시
  - ios (Info.plist): 어떤 권한을 사용자에게 물어 볼 때 보여줄 text 메시지

---

### 권한 다루기 2/2
- **Step 2 : 권한을 획득하기 위해 API 호출**
  - 안드로이드 최신버전에서는 별도의 권한을 요청하는 API 사용 [PermissionsAndroid](https://facebook.github.io/react-native/docs/permissionsandroid) 
  - iOS는 사용자에게 별도로 물어보는 API도 있지만 모듈에 따라 첫 사용시 권한을 물어보는 경우 있음
  - 사용자는 시스템이 보여주는 화면(AlertDialog)에서 최종 승인
  	- 사용자는 언제든지 철회할 수 있다.
    - 한번 사용자가 선택하면 설정에서 바꾸거나 앱 삭제 전까지 해당 상태로 유지됨

---

### 권한 요청 관련 UX 1/3

- 무식버전
  - 앱 시작과 동시에 필요한 모든 권한을 묻는다.
- 심플버전
  - 권한이 필요한 액션을 누를 때 권한을 묻는다. 

---

### 권한 요청 관련 UX 2/3

커스텀 Prompt를 이용한 방법
|  | 사용자 허락 | 사용자 거절 |
|:--:|--|--|
| Prompt | Permission Request 하기 | 아무것도 하지 않음 |
| Permission Request | (권한 얻음) | (권한 거절됨,<br/>다시 Permision Request를 보내지 못함)  
- 참고자료 : [OneSignal](https://documentation.onesignal.com/docs/permission-requests), [icon8.com](https://icons8.com/articles/mobile-ux-design-the-right-ways-to-ask-users-for-permissions/), [localytics.com](http://info.localytics.com/blog/using-in-app-messages-for-push-message-opt-ins)

---

### 권한 요청 관련 UX 3/3
- 친절 버전 1단계
  1. 권한이 필요한 액션을 누르면
  2. 이미 사용자에게 요청을 물은 적 있는가?
     - NO) 권한을 요청한 적 없다
       - 권한에 대한 안내화면을 보여준 후 권한을 묻는다. 
     - YES) 요청했을 때 사용자가 승인했나? 
       - 네) 이미 승인되어 있으면 액션진행(카메라 띄우기)
       - 아니오) 이미 거절되었다면 권한을 승인해줘야 어떤 기능을 이용할 수 있는지 안내하고 설정화면으로 보내기
     
> 설정 앱으로 보내는 모듈
> https://github.com/KrazyLabs/react-native-app-settings

---

## 권한 요청 API
> expo에서는 [Permissions](https://docs.expo.io/versions/v31.0.0/sdk/permissions)라는 모듈을 제공
```
const { Permissions } = Expo;
const { status } = await Permissions.getAsync(
  Permissions.NOTIFICATIONS
);
```
- [Permssion 종류](https://docs.expo.io/versions/v31.0.0/sdk/permissions#permissions-types)
  - `Expo.Permissions.CAMERA`
  - `Expo.Permissions.CAMERA_ROLL`
  - ...

---

## 📷 사진과 카메라롤

- iOS의 경우 RCTCameraRoll 라이브러리 link 해야 한다. ([참고 링크](https://class.codejong.kr/t/xcode-rctcameraroll/53))

- 시뮬레이터/에뮬레이터에 사진 넣는 방법
  - 사진을 그냥 드래그 해서 에뮬레이터/시뮬레이터로 드롭
  - iOS,안드로이드 모두 사진 앱에서 확인 가능 (안드로이드는 download로 구분됨)

---

### 카메라롤
> Expo를 이용할 경우는 [ImagePicker](https://docs.expo.io/versions/v31.0.0/sdk/imagepicker) 를 이용해 보자.
- promise 패턴으로 이용
- 다양한 옵션 및 자세한 내용은 [공식 문서 참조](https://facebook.github.io/react-native/docs/cameraroll.html)
- iOS의 경우 공식문서 참조하여 ==반드시== `Info.plist` 수정!

```javascript
CameraRoll.getPhoto({first: 1})
.then( data => {
  
}).catch( e => {
  
});
```

---

### ImagePicker
> Expo에 기본 포함
- `launchImageLibraryAsync`함수는 promise객체를 리턴
- iOS에서는 `Permissions.CAMERA_ROLL` 권한 필요
```js
let result = await ImagePicker.launchImageLibraryAsync({
 allowsEditing: true,
 aspect: [4, 3],
});
```

---

## AsyncStorage

- 브라우저의 쿠키나 localStorage처럼 종료후에도 값이 남아있는 데이터
- 보안이 필요한 경우에는 keychain을 이용
  - [react-native-keychain](https://github.com/oblador/react-native-keychain)
  - expo 모듈에 포함된 [`<SecureStore>`](https://docs.expo.io/versions/v31.0.0/sdk/securestore)
- 이 역시 promise 패턴

```javascript
//set
AsyncStorage.setItem('myKey', 'myValue')
.then( () => {
  // do something
})
.catch( e => {});

//get
AsyncStorage.getItem('myKey')
.then((value) => {
  // do something
});
```

---

### DatePicker

|                           [DatePickerAndroid](https://facebook.github.io/react-native/docs/datepickerandroid) <br/> [TimePickerAndroid](https://facebook.github.io/react-native/docs/timepickerandroid)                           |                             [DatePickeriOS](https://facebook.github.io/react-native/docs/datepickerios)               |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![android](https://raw.githubusercontent.com/mmazzarolo/react-native-modal-datetime-picker/master/extras/datetimepicker-android.gif) | ![ios 50%](https://facebook.github.io/react-native/docs/assets/DatePickerIOS/example.gif) |
| open() 해야하는 modal | 일반 View와 동일 |

> 플랫폼에 상관없이 동일하게 사용가능하게 해주는 컴포넌트 : [react-native-modal-datetime-picker](https://github.com/mmazzarolo/react-native-modal-datetime-picker)
---

# 다양한 컴포넌트들

---

## BarcodeScanner
- 카메라로 바코드를 간편하게 인식 가능
- https://docs.expo.io/versions/v31.0.0/sdk/bar-code-scanner
```
<BarCodeScanner
  onBarCodeScanned={this.handleBarCodeScanned}
  style={StyleSheet.absoluteFill}
/>
```
- 카메라 접근 권한(Permissions.CAMERA)이 필요