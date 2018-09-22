#!/bin/bash
# fuser -k 3000/tcp
# lsof -i:3000 | xargs kill
killall node

# service redis_6379 start
brew services start redis
cd ./oj-server
npm install
npx nodemon server.js &
cd ../oj-client
npm install
npx ng build --watch

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

# fuser -k 3000/tcp
# lsof -i:3000 | xargs kill
killall node
# service redis_6379 stop
brew services stop redis
