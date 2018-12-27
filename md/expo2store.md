## Expo 앱을 스토어에 올리기
필요한 설정 `app.json`
- App Id 지정
- App Icon 지정
- 앱 splash 지정
- 등록을 위한 파일 build

---

### `app.json`의 모습
```
{
   "expo": {
    "name": "Your App Name",
    "icon": "./path/to/your/app-icon.png",
    "version": "1.0.0",
    "slug": "your-app-slug",
    "sdkVersion": "XX.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourappname"
    },
    "android": {
      "package": "com.yourcompany.yourappname"
    }
   }
 }

```

---

### App Id
> 앱을 구분하는 고유 값. 도메인 형태의 주소를 거꾸로 적는 것을 추천 
- ios: bundleIdentifier
- android : package

---


## AppIcon
>  https://docs.expo.io/versions/v31.0.0/guides/app-icons

- 1024 x 1024 크기의 png

---

## Splash screen
> 앱이 시작되기 전에 보이는 스크린
- https://docs.expo.io/versions/v31.0.0/guides/splash-screens
- iOS, Android에 따라 많이 다르나 고정된 이미지를 간단하게 지정하고자 한다면 2436 x 1242 사이즈의 png를 지정하고 resizeMode를 cover로 지정

---

## IPA / APK 파일 만들기 (Build)
- https://docs.expo.io/versions/v31.0.0/distribution/building-standalone-apps
```shell
expo build:android
expo build:ios
```