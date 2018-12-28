# Hyperledger composer

---

## Hyperledger composer 설치하기
> 사전 필수 설치 사항
> https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html
- ubuntu 나 mac 환경에서 설치

---

## Hyperledger composer 개발 도구 설치
> https://hyperledger.github.io/composer/latest/installing/development-tools.html
```
npm install -g composer-cli@0.20 composer-rest-server@0.20 generator-hyperledger-composer@0.20 yo composer-playground@0.20
```
- 설치 도중 npm global 환경의 `EACCESS: permission denied. /usr/lib/node_modules` 발생시 다음과 같이 변경
  - `npm config delete prefix` 를 터미널에 실행 후 터미널 재시작 후에 다시 시도

---

## 실행 방법 1/2
- startFabric.sh 실행
```
cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./startFabric.sh 
```
- 위 `startFabric.sh` 실패 할 경우 `sudo  ./startFabric.sh`  
- 최초 실행시에는 adminCard생성 스크립트도 실행
```
./createPeerAdminCard.sh
```
- playground 실행 : `composer-playground` 
- http://localhost:8080 에 접속 확인
  - VirtualBox를 이용하고 있는데 외부 브라우저에서 접근하고자 한다면 네트워크 설정에서 포트포워딩 8080 설정

---

## 실행 방법 2/3
- 브라우저에서 `Connection: hlfv1`에 car auction 네트워크 생성 (생성 한 후 carname 추후 사용. 예  `admin@carauction`)
- erollment ID/PW 를 선택 후 다음 입력
  - admin
  - adminpw

---

## 실행 방법 3/3
- 새로운 터미널을 열고 다음 명령어로 rest server 실행
```
composer-rest-server
```
- prompt에서 다음과 같이 입력
```
? card name : 위에서 생성한 카드 내임
? name space : naver
? API key 사용 : no
? authentication using Passport : no
? explorer test interface : Yes
? key for dynamic loggin : 그냥 enter
? event publication : Yes
? TLS : no
```
- 혹은 다음과 같이 실행
```
composer-rest-server -c admin@carauction -n never -u true -w true
```
- http://localhost:3000/explorer 로 접속 확인
 
---


## rest api 예
> car auction에서 Member 목록 불러오기
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
git clone git@github.com:codejong/rn-car-auction.git
```
- npm 모듈 설치하고 expo 실행하기
```shell
cd rn-car-auction
npm install
expo start
```

---

## 정비소 목록 만들기
1. Playground Define에 들어가서 Modelfile 부분의 파일에 RepairShop Model 생성하기
   - [Hyperledger Composer Modeling Language](https://sstone1.github.io/composer/reference/cto_language.html)
   - 다음 코드와 위 문서를 참고하여 만들기
```
asset Vehicle identified by vin {
  o String vin
  o String manufactor
  --> Member owner
}
```
2. rest server를 다시 시작해서 방금 만든 모델이 rest api로 잘 동작하는지 확인하기

---
