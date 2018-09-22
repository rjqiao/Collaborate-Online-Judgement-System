sudo kill $(sudo lsof -t -i:9001)

cd ./oj-server
npm install
nodemon server.js &
cd ../oj-client
npm install
ng build --watch