<!-- page_number: true -->

# Hyperledger Composer를 이용한 네트워크 및 REST API 구현

---

## Hyperledger composer 설치하기
> ubuntu나 mac 환경이 필요합니다.

- [사전 필수 설치 사항 공식 문서](https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html
)에 나와있는 문서를 참고하여 자신의 환경에 맞게 설치합니다.
- 다음 설치 및 실행방법은 버전이 변경되면 바뀔수 있으니 항상 공식 문서를 참고하기를 권합니다.

---

## Hyperledger composer 개발 도구 설치
> https://hyperledger.github.io/composer/latest/installing/development-tools.html
```
npm install -g composer-cli@0.20 composer-rest-server@0.20 generator-hyperledger-composer@0.20 yo composer-playground@0.20
```
- 설치 도중 npm global 환경의 `EACCESS: permission denied. /usr/lib/node_modules` 발생시 다음과 같이 변경
  - `npm config delete prefix` 를 터미널에 실행 후 터미널 재시작 후에 다시 시도

---

## 실행 방법 1/4
### fabric 최초 실행
- startFabric.sh 실행
```
cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./startFabric.sh 
```
- 위 `startFabric.sh` 실패 할 경우 `sudo  ./startFabric.sh`  
```
./createPeerAdminCard.sh
```

### 최초 생성 이후 fabric 재실행
- 재부팅 등으로 다시 start를 해야할 경우 다음 명령어를 이용해야 기존 정보가 유지된다.
```
cd ~/fabric-dev-servers/fabric-scripts/hlfv12/composer
docker-compose start
```
---

## 실행 방법 2/4
### playground 실행 
- 새로운 터미널 열고 `composer-playground` 
- http://localhost:8080 에 접속 확인
  - VirtualBox를 이용하고 있는데 외부 브라우저에서 접근하고자 한다면 네트워크 설정에서 포트포워딩 8080 설정

---

## 실행 방법 3/4
### playground의 hlfv1에 car auction 예제 생성
- `Connection: hlfv1`아래에 있는 "Deploy a new business network" 선택
- car auction 예제 선택 (생성시 임의로 입력한 cardname은 추후 사용됨)
- "3. CREDENTIALS FOR NETWORK ADMINISTRATOR"에서 "ID and Secret"선택 후 erollment ID/PW에 **다음 값을 입력**
  - admin
  - adminpw
- 화면 오른 쪽의 Deploy 버튼 선택
- playground 메인 화면에 새로운 카드가 생성 되었고 connect now로 접속되는지 확인

---

## 실행 방법 4/4
### rest server 실행
- 새로운 터미널을 열고 다음 명령어로 rest server 
  - 아래 명령어에서 YOURCARDNAME 대신에 3/4단계에서 생성된 card 이름으로 변경 후 실행
```
composer-rest-server -c YOURCARDNAME -n never -w true
```
- http://localhost:3000/explorer 로 접속 확인
 
---

### 참고) rest server 실행하는 3가지 방법
- 방법 1. `composer-rest-server` 실행후 propmt에 응답하여 실행
- 방법 2. `composer-rest-server` 명령어 실행시 option을 지정하여 실행

      composer-rest-server -c YOURCARDNAME -n never -w true

- 방법 3. 환경 변수를 설정한 후 `composer-rest-server` 실행
  - 환경변수는 별도의 파일에 환경 변수 지정하는 코드를 저장해 두고 실행전에 `source`명령어로 불러오면 편리

---

## composer-rest-server가 생성한 rest api 예
> 다음 예는 car auction예제의 Member 목록 불러오는 api이다.
- request
  - url : http://localhost:3000/api/Member
  - method : GET
- response
  - body
```
[
  {
    "$class": "org.acme.vehicle.auction.Member",
    "balance": 0,
    "email": "email@mydomain.com",
    "firstName": "codejong",
    "lastName": "lee"
  }
]
```

---

## rn-car-auction에서 rest 이용하기
- code clone하기 
```shell
git clone https://github.com/codejong/rn-car-auction.git
```
- npm 모듈 설치하고 expo 실행하기
```shell
cd rn-car-auction
npm install
expo start
```

---

## 실습) 정비소 목록 만들기
1. Playground Define에 들어가서 Modelfile 부분의 파일에 RepairShop Model 생성하기
   - [Hyperledger Composer Modeling Language](https://sstone1.github.io/composer/reference/cto_language.html)
   - 다음 코드와 위 문서를 참고하여 만들기
   - Q. 위치 정보를 위도 경보로 하려면 어떤 type?
```
asset Vehicle identified by vin {
  o String vin
  o String manufactor
  --> Member owner
}
```
2. rest server를 다시 시작해서 방금 만든 모델이 rest api로 잘 동작하는지 확인하기


---

## rest api include 옵션
```
{"include":"resolve"}
```
- 정보를 가져올 때 연결된 pointer의 정보까지 가져오는 방법
- 호출 예
  - Vehicle의 owner 정보까지 얻어오기
  - http://localhost:3000/api/Vehicle?filter={"include":"resolve"}


---

## rest api where 옵션
- [공식문서](https://hyperledger.github.io/composer/latest/business-network/query.html#using-filters) 참고 
- 현재 `=`, `and`, `or`, `gt`, `gte`, `lt`, `lte`, `neq` 만 지원
- 호출 예
```
{
  "where": {
    "or": [{
      "and": [{
        "field1": "foo"
      }, {
        "field2": "bar"
      }]
    }, {
      "field3": "foobar"
    }]
  }
}
```

---

## 실습) REST API로 Asset 생성하기
```
fetch(
  'http://localhost:3000/api/Member',
  {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
)
```

```
//data 예
{
  $class: 'org.acme.vehicle.auction.Member',
  balance: 5000,
  email: 'memberB@acme.org',
  firstName: 'Billy',
  lastName: 'Thompson',
}
```


---

> 잠깐! 용어 살펴보기
## Business Network Card
- 블럭체인 비즈니스 네트워크에 연결하기 위해 필요한 모든 정보를 담고 있는 카드
- 특정 Participant의 Identity를 포함
- 하나의 배포된 비즈니스 네트워크는 여러개의 비즈니스 네트워크 카드를 가질 수 있다.
- [공식 문서](https://hyperledger.github.io/composer/latest/playground/id-cards-playground)

---

# Composer REST Server 설정
- 환경 변수로 설정하기
- multi mode 사용하기
  - facebook 연동하기
  - mongodb 연동하여 wallet 유지하기

---

## 환경변수로 composer rest server 설정하기
```
export COMPOSER_CARD=admin@carauction-network2
export COMPOSER_NAMESPACES=never
export COMPOSER_AUTHENTICATION=true
export COMPOSER_MULTIUSER=true
export COMPOSER_PROVIDERS='{
    "facebook": {
        "provider": "facebook",
        "module": "passport-facebook",
        "clientID": "xxxxxx",
        "clientSecret": "xxxxxxxxxxx",
        "authPath": "/auth/facebook",
        "callbackURL": "/auth/facebook/callback",
        "successRedirect": "/",
        "failureRedirect": "/"
    }
}'
```
- 별도의 파일(예. envvar.txt)로 관리한 후 composer-rest-server 실행 전 `source` 명령어로 불러오기 (예. `source envvar.txt`)

---

```
npm install -g passport-facebook
```

---

## composer rest server의 multi user mode
- [공식 문서](https://hyperledger.github.io/composer/v0.16/integrating/enabling-multiuser)
- multi user mode를 활성화 해야만 client에 따라 다른 participant자격으로 요청을 보낼 수 있다.
- multi user mode를 활성화하려면 [authentication](https://hyperledger.github.io/composer/v0.16/integrating/enabling-rest-authentication) 기능이 설정되어 있어야 한다. 
  - rest server의 authentication는 [passport.js](http://www.passportjs.org)를 이용하기에 facebook, github, google등 다양한 서비스를 통한 인증 가능

---

## facebook으로 authentication하기
- [facebook developer](https://developers.facebook.com) 사이트에서 앱생성하기
- App ID와 Secret 확인 : 좌측 메뉴에서 `설정` -> `기본 설정`
- `COMPOSER_PROVIDERS` 환경변수를 다음과 같이 지정 (ID와 Secret은 수정해야 함)
```
export COMPOSER_PROVIDERS='{
    "facebook": {
        "provider": "facebook",
        "module": "passport-facebook",
        "clientID": "xxxxxx",
        "clientSecret": "xxxxxxxxxxx",
        "authPath": "/auth/facebook",
        "callbackURL": "/auth/facebook/callback",
        "successRedirect": "/",
        "failureRedirect": "/"
    }
}'
```

---

## expo에 포함된 facebook API
```
async logIn() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Expo.Facebook.logInWithReadPermissionsAsync('YOUR_FACEBOOK_APP_ID', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        alert('Logged in!' + `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
```

---

## facebook 계정 연동 FAQ
- token validation 실패라고 나올 경우 secret과 id 재확인
- 앱을 생성한 계정과 다른 페이스북 계정으로 연동하고자 한다면 해당 앱의 개발자로 다른 계정을 등록하거나 앱 상태를 '개발중'에서 '라이브'로 변경해야 한다.

---


### 잠깐) 화면 전환 관련 이벤트 설정 방법
- 예를 들어 Vehicle 에디터에서 작성 완료후 다시 MyVehicleList로 넘어가면 자동으로 refresh하고자 한다면 MyVehicleList에 NavigationEvents를 활용하면 된다.
```
import React from 'react';
import { View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

const MyScreen = () => (
  <View>
    <NavigationEvents
      onWillFocus={payload => console.log('will focus',payload)}
      onDidFocus={payload => console.log('did focus',payload)}
      onWillBlur={payload => console.log('will blur',payload)}
      onDidBlur={payload => console.log('did blur',payload)}
    />
    {/* 
      Your view code
    */}
  </View>
);

export default MyScreen;
```

---


### composer 관련 참고 링크
- https://medium.com/@CazChurchUk/developing-multi-user-application-using-the-hyperledger-composer-rest-server-b3b88e857ccc
- BlockchainNetwork-CompositeJourney (by IBM)
  - [1단계](https://github.com/IBM/BlockchainNetwork-CompositeJourney/blob/master/README-ko.md)
  - [2단계](https://github.com/IBM/BlockchainSmartContractTrading-CompositeJourney/blob/master/README-ko.md)
  - [3단계](https://github.com/IBM/BlockchainEvents-CompositeJourney/blob/master/README-ko.md)

---

### REST 서버의 데이터를 유지하기 위한 DB 설정
- 환경변수에 다음과 같이 DATASOURCE에 대해 설정합니다.
- mongoDB이외에도 다양한 DB를 연결 할 수 있습니다.
  - [loopback의 dataSource 설정 관련 문서](https://loopback.io/doc/en/lb2/Connecting-models-to-data-sources.html)
```
export COMPOSER_DATASOURCES='{
    "db": {
        "name": "db",
        "connector": "mongodb",
        "host": "ds149404.mlab.com",
        "port": 49404,
        "database": "composer",
        "username": "composer",
        "password": "xxxxxxxxxxx"
    }
}'
```
- 테스트용 mongodb는 mlab.com 을 이용해보세요.
  - MongoDB Deployments 를 생성(free)하고
  - 해당 db를 사용할 수 있는 사용자를 만들어서
  - 해당 db의 정보를 위 환경 변수에 반영하세요.

---

### REST 서버의 DB동작 여부 확인
- /auth/facebook 이용하여 로그인 한 후
- mlab.com 에서 db 내용을 살펴보면 사용자가 추가된 것을 볼 수 있다.
- card를 import해도 