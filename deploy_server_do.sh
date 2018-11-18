#! /bin/bash 
# login in first to docker with command: docker login
yarn babel

git add .
git cm -m 'server deployed'
git push

docker build -t pak11273/utterzone-server:latest .
docker push pak11273/utterzone-server:latest
ssh root@104.248.209.128 "docker pull pak11273/utterzone-server:latest && docker tag pak11273/utterzone-server:latest dokku/utterzone-server:latest && dokku tags:deploy utterzone-server latest"

