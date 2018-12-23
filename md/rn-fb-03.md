## Sync와 Async

## Promise



---

## `<StatusBar />`


---

## react-navigation
> 화면전환


---

# Navigator의 종류
- SwitchNavigator
- StackNavigator
- DrawerNavigator

---

## 설치
```
npm install --save react-navigation
```

---

## 불러오기
```
// In App.js in a new project

import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default createAppContainer(AppNavigator);

```

---

### StackNavigator
-  기본 구성하기
-  디테일 보여주기
-  디테일에 데이터 넘기기
-  Back 하는 방법
---

---

### Demo project 둘러보기
![60%](https://ws3.sinaimg.cn/large/006tNbRwgy1fy78i3guh8j30si0s2wg0.jpg)

