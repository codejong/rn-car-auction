<!-- size: 16:9 -->

<style>
  .slide_bg_img {
    opacity: 1 !important;
  }
</style>

> 하이퍼레저와 연동하는
# 리액트 네이티브 앱 개발 강의 
### Day - 2

![bg](https://class.codejong.kr/uploads/default/original/1X/25a598dfcc7780aa9e146df7c3b885cf132d36e1.png)

---

# 시작하기 전에
> - 감사와 부탁
> - 질문은 언제나 환영
> - 8 * 18 = 144


---

# 어제 배운 내용?

---

### `<Text>` 실습
| ![25%](https://ws4.sinaimg.cn/large/006tNbRwgy1fy0e9viu8sj30u01szafk.jpg) | ![](https://ws2.sinaimg.cn/large/006tNbRwgy1fy0earl2qtj30js06it9p.jpg) |
|--|--|

```
textDecorationLine: 'underline'

```

---

### car auction 만들기

| ![25%](https://ws1.sinaimg.cn/large/006tNbRwgy1fxz8bfiehjj30qg19ygx5.jpg) | ![50%](https://ws3.sinaimg.cn/large/006tNbRwgy1fy0ihz2yvmj30uw062dhp.jpg) |
|--|--|

```
borderRadius: 5,
borderColor: '#aaa',
borderWidth: 1 //StyleSheet.hairlineWidth,
```

---

### hairlineWidth란?
=> 물리적으로 디스플레이가 표현할 수 있는 가장 얇은 선 (real 1 pixel)

---

### 다양한 디스플레이의 point vs pixel
![](https://ws2.sinaimg.cn/large/006tNbRwgy1fy2g6vzbz4j31nq0u0doq.jpg)
- [출처](https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions)

---

### 잠깐) `<Text>`를 버튼 처럼 사용하는 방법?

```
  <View style={{ borderColor: 'blue', borderWidth: 1}}>
    <Text style={{paddingTop:100, fontSize:50}}> 
      I'm 
      <Text onPress={()=>{ alert('wow'); }} style={{color:'red'}}>
        link 
      </Text> 
      !!! 
    </Text>
  </View>
```

---

### 잠깐) `<Text>`에 위치와 관련된 속성을 주지 말라는 이유?
```
<View style={styles.container}>
        <View style={{ borderColor: 'blue', borderWidth: 1}}>
          <Text style={{paddingTop:100, fontSize:50}}> I'm <Text onPress={()=>{ alert('wow'); }} style={{color:'red'}}> link </Text> !!! </Text>
        </View>
      </View>
```

---
## 🐶념잡기 1: 서버에서 데이터를 받아오는 방법?

- API(Application Promgramming Interface)로 데이터를 가져온다?

---


## 🐶념잡기 2: 브라우저는 어떻게 동작할까?

---

## 🐶념잡기 3: VirtualDom 이란?

---


## Q2-6. 이미지를 표현하는 방법은?

---

### `<Image>`
> 언제나 [공식 가이드](https://facebook.github.io/react-native/docs/images) 꼼꼼히 살펴봅시다.
---

### `<Image>` 리소스 불러오는 두가지 방법

```
// 프로젝트 폴더에 넣은 이미지 (정적 이미지 리소스)
<Image source={require("./puppies.png")} />

// uri로 접근하는 이미지 (인터넷, 카메라롤 ...)
<Image source={{uri:"https://facebook.github.io/react/img/logo_og.png"}} 
 style={{width: 400, height: 400}} />
```
- 원격 이미지 소스를 이용할 경우 이미지 사이즈를 따로 지정해야 한다.
  - 🤔 UX 측면에서도 좋다. 왜???
- 자식 컨텐츠를 가질 수 없다. 배경으로 이미지를 넣고 싶다면
  - [`<ImageBackground>`](https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageBackground.js) 를 이용하거나 [`StyleSheet.absoultefill`](https://facebook.github.io/react-native/docs/stylesheet#absolutefill)으로 스타일링

---

### `<Image>` 정적 이미지 리소스 장점

```
.
├── button.js
└── img
    ├── check@2x.png
    └── check@3x.png
    └── done.ios.png
    └── done.android.png
```
```
<Image source={require('./img/check.png')} />
<Image source={require('./img/done.png')} />
```

- iOS와 Android 동일한 방법으로 사용
- JS 파일처럼 관리되고 불러옴
- 코드 변경할 때 처럼 시뮬레이터만 refresh해서 확인 가능
- 이미지 사이즈, 비율, 디바이스 디스플레이 등을 알아서...

---

### `<Image/>` 정적 이미지 리소스 사용시 주의 점
```
// GOOD
<Image source={require('./my-icon.png')} />;

// BAD
var icon = this.props.active ? 'my-icon-active' : 'my-icon-inactive';
<Image source={require('./' + icon + '.png')} />;

// GOOD
var icon = this.props.active
  ? require('./my-icon-active.png')
  : require('./my-icon-inactive.png');
<Image source={icon} />;
```

---

### `<Image>` 원격 이미지 리소스 
- 반드시 사이즈를 적어야 한다!
- [Cache Control (iOS Only)](https://facebook.github.io/react-native/docs/images#cache-control-ios-only)
  - 공격적인 cache를 원한다면  [DylanVann/react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)

---

### `<Image>`에서 유용한 속성
> 모바일에서는 화면의 가로 세로 비율이 다르므로 `cover`속성을 유용

![image-20180928101934452](https://ws4.sinaimg.cn/large/006tNc79gy1fvp1fr7okkj30x60j0gsk.jpg)

---

## Q2-7. 아이콘을 표시하는 방법은?

---

### 잠깐 🤔 : 그래픽을 표현할 때 ==bitmap== 과 ==vector==의 차이?

---

### 

![](https://filecamp.com/wp-content/uploads/2016/02/vector-vs-bitmap2-1.png)
> [출처](https://filecamp.com/blog/vector-vs-bitmap-images-explained/)

---

### 잠깐 🤔 : 폰트는 비트맵일까? 벡터일까?

---

### 🙋🏻‍ : 벡터~

---
![](https://ws4.sinaimg.cn/large/006tNbRwgy1fy0f16hgupj30yw0km75u.jpg)
### 다양한 아이콘 폰트
- https://ionicons.com
- https://fontawesome.com

---

```
// 실습 목표 사용 예
<RoundButton iconName="ios-car" title="가입"/>
```

### `@expo/vector-icons` 모듈
- 다양한 vector 아이콘을 expo환경에서 바로 쓸 수 있게 해주는 모듈
- 아이콘 찾는 방법 : https://expo.github.io/vector-icons/
```
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


//사용하려는 곳에서 다음과 같이 사용
<Ionicons name="md-checkmark-circle"
  size={32} color="green" />
```

---

### 실습

| ![25%](https://ws1.sinaimg.cn/large/006tNbRwgy1fxz8bfiehjj30qg19ygx5.jpg) | ![50%](https://ws1.sinaimg.cn/large/006tNbRwgy1fy0fcctfg7j30ug0643yx.jpg) |
|--|--|

```
borderRadius: 5,
borderColor: '#aaa',
borderWidth: 1 //StyleSheet.hairlineWidth,
```
```
<TextInput style={{height:40}} placeholder="이름"/>
```
---

### 실습 2
Newyork Time 따라해보기
| ![25%](https://ws1.sinaimg.cn/large/006tNbRwgy1fy0g9bnv2xj30u01lt4qp.jpg) | ![50%](https://ws1.sinaimg.cn/large/006tNbRwgy1fy0gajs2u8j30v90ffn1x.jpg) |
|--|--|

---

## Q2-9. 재사용을 위한 컴포넌트제작 방법은?

---

### 재사용하는 Icon이 들어간 TextInput
 ![50%](https://ws1.sinaimg.cn/large/006tNbRwgy1fy0fcctfg7j30ug0643yx.jpg) 
| ![25%](https://ws1.sinaimg.cn/large/006tNbRwgy1fxz8bfiehjj30qg19ygx5.jpg) |  ![25%](https://ws2.sinaimg.cn/large/006tNbRwgy1fxz4n6milrj30qg19ydth.jpg)  |
|--|--|

---

### 다음과 같은 props을 넘기는 컴포넌트를 만들어 보자
```
<IconTextInput
  style={{ marginTop: 10 }}
  iconName={'ios-person'}
  placeholder={'이름'}
/>
```          

---

## Q2-10. 버튼 처럼 터치를 다루는 방법?

---


### 👆 터치와 체스처 다루기 1/3
> 언제나 [공식 문서](https://facebook.github.io/react-native/docs/handling-touches)부터 살펴보자

| 구분 | 미리 보기([출처](https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472)) | 비고 |
|--|--|--|
| Button | X | 솔직히 안씀 |
|TouchableOpacity | ![30%](https://cdn-images-1.medium.com/max/1600/1*gEwt5QNhqOA8ye9K-IVCeQ.gif) | 투명 |
| TouchableHighlight | ![30%](https://cdn-images-1.medium.com/max/1600/1*_YAPEqWoU7ayTr_MBsTNbg.gif) | 레이어 |
| TouchableNativeFeedback | ![30%](https://cdn-images-1.medium.com/max/1600/1*rpwifIwvD4WFgwTiB3jt7A.gif) | Android ripple

---

### 버튼 처럼 터치 할 수 있게 하려면 감싸라~
```
<TouchableOpacity onPress={this._onPressButton}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>TouchableOpacity</Text>
  </View>
</TouchableOpacity>
```

---

### 터치 영역은 최소 44 point?
`hitSlop`!!
```
<View style={{flex: 1,justifyContent:'center', alignItems:'center'}}>
  <TouchableOpacity hitSlop={{
    top: 20, 
    bottom: 20, 
    left: 0, 
    right: 0}}
    style={{
      borderColor:'black',
      borderWidth: 3
    }}
  >
    <Text>여기 버튼이요</Text>
  </TouchableOpacity>
</View>
```


---

## 잠깐) props?

```
import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Hello {this.props.name}!</Text>
      </View>
    );
  }
}

export default class LotsOfGreetings extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera' />
      </View>
    );
  }
}
```

---

### 잠깐) state와 TextInputt

```
import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View } from 'react-native';

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    );
  }
}
```


---

## Q2-11. 사용자 입력을 받는 방법은?

---

### `<TextInput>` 컴포넌트
```
<TextInput
          ref={r => {
            this.textInput = r;
          }}
          autoFocus={this.props.autoFocus}
          returnKeyType={this.props.returnKeyType}
          keyboardType={this.props.keyboardType}
          defaultValue={this.props.defaultValue}
          editable={this.props.editable}
          blurOnSubmit={this.props.blurOnSubmit}
          onSubmitEditing={this.props.onSubmitEditing}
          onChangeText={text => {
            this.props.onChange && this.props.onChange(text);
          }}
          style={{
            flex: 1,
            height: '100%',
          }}
          placeholder={this.props.placeholder}
        />
```

---

### KeyboardAvoidingView
> 글자 입력시 키보드에 화면이 가려지지 않도록 화면의 사이즈를 줄여줌
```
import { KeyboardAvoidingView } from 'react-native';

<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
  ... your UI ...
</KeyboardAvoidingView>
```

---

| ![30%](https://ws4.sinaimg.cn/large/006tNbRwgy1fxz2ym43r5j30o017iqca.jpg) | <h1>목표 3.<br/> 자동차 목록을 만든다.</h1> |
|--|--|

> Q1. 목록을 표현하는 방법?
> Q2. 새로고침 하는 방법?
> Q3. 무한 스크롤이 되도록 하는 방법?

---

## 몸풀기
아이템 하나를 컴포넌트로 만들어보자!


---
> Q1. 목록을 표현하는 방법?
## 리스트 관련 컴포넌트
- `<ListView>` : deprecated! 쓰지마세요. :scream:
- `<FlatList>` :+1:
- `<SectionList>`
- `<VirtualizedList>`

---

### 리스트 관련 주요 개념

```html
<FlatList
  data={[{key: 'a'}, {key: 'b'}]}
  renderItem={({item}) => <Text>{item.key}</Text>}
/>
```
- Item
- data
  - :key: key

---

## Q2. 새로고침 하는 방법?

```xml
<FlatList
  data={this.state.data}
  renderItem={this._renderItem}
  onRefresh={this._refreshData}
  refreshing={this.state.refreshing}
/>
```

---

