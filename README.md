# ubuntu 기준 설치 방법

1. Node.js 설치 스크립트를 다운로드하고 실행:
> curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

2. NestJS 프로젝트 생성을 위해 CLI(Command Line Interface)를 설치합니다.

> npm install -g @nestjs/cli

3. 패키지 설치

> npm install

4. 실행

> npm run start

***

# swagger

- 로컬 기준 : http://localhost:3000/api 
- 서버 기준 : http://116.198.66.75:18103/api

***

# crawler

1. python 설치

> sudo yum install python3 -y

2. Python 가상환경 설정

> python3 -m venv myenv
source myenv/bin/activate

3. 실행

>python3 main.py

4. 가상환경 종료

> deactivate
