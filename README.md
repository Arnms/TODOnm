# TODOnm
---
##Setup
1. Linux 기본 패키지 설치
    1. Git 설치
        * Red Hat (Fedora, CentOS, Etc.)
            ```
            yum install git
            ```
        * Debian (Debian, Ubuntu, Etc.)
            ```
            apt-get install git
            ```
    2. Node.js, NPM 설치
        * Red Hat (Fedora, CentOS, Etc.)
            ```
            yum install nodejs
            yum install npm
            ```
        * Debian (Debian, Ubuntu, Etc.)
            ```
            apt-get install nodejs
            apt-get install npm
            ```
2. Git Repository 복제
    ```
    git clone https://github.com/Arnms/TODOnm.git
    ```

3. Node Package Module 설치
    ```
    npm install
    ```

4. 프로젝트 실행
    ```
    npm start

    npm-scripts에서 concurrently 모듈을 사용해 동시 실행
    "start": "concurrently \"cd todonm-server && node index.js\" \"cd todonm-client && npm start\"",
    ```