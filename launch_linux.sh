sudo kill $(sudo lsof -t -i:3000)

cd ./oj-server
# npm install
npx nodemon server.js &
cd ../oj-client
# npm install
npx ng build --watch
