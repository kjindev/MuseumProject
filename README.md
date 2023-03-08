# 서울시립미술관 전시안내

서울시에서 제공하는 API를 이용하여 서울시립미술관의 전시 정보를 알려주는 웹사이트입니다.

### Page

https://kjindev.github.io/MuseumProject

### Stacks

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=React Query&logoColor=white"/> <img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=flat-square&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>


### Goals

- React를 이용한 Single Page Application 개발
- React-Query로 API 요청 관리
- Redux Toolkit으로 변수들의 상태 관리
- Firebase를 이용하여 회원가입 및 데이터 저장 기능 구현
- Tailwind CSS를 이용한 반응형 웹페이지 구현


### Features

- 서울시립미술관의 API를 이용하여 미술관의 전시 정보를 안내해주는 웹사이트입니다.
- 회원가입 및 로그인, 프로필 생성, 북마크하기 기능이 있습니다.
- 반응형 웹페이지로, PC와 모바일 모두에서 웹페이지를 이용할 수 있습니다.


### Details

- 현재 전시 : 현재 날짜를 기준으로 전시 중인 작품을 확인할 수 있습니다.
- 지난 전시 :  지난 전시를 작품 이름, 작가 이름으로 검색할 수 있습니다.
- 방문하기 : 미술관 정보 및 지도를 확인할 수 있습니다.
- 마이페이지 : 회원가입 및 로그인 후 마이페이지에서 프로필을 업데이트 할 수 있습니다. 현재 전시, 지난 전시, 방문하기 페이지의 북마크 아이콘을 클릭하면 해당 내용이 마이페이지에 저장됩니다. 저장된 정보는 오른쪽 상단의 마이너스 아이콘을 클릭하여 삭제가 가능합니다.


### CORS 에러 해결

- Express로 작은 서버를 만들어 CORS 에러를 해결하였습니다.
- 해당 내용은 https://github.com/kjindev/MuseumAPI에 작성되어 있습니다.


