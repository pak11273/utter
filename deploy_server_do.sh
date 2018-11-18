# login in first to docker with command: docker login

#! /bin/bash
yarn babel

git add .
git cm -m 'server deployed'
git push

#! /usr/bin/expect -f
expect "Enter passphrase for key '/home/vagrant/.ssh/id_rsa"
send "redeemer\r"

docker build -t pak11273/utterzone-server:latest .
docker push pak11273/utterzone-server:latest
ssh root@104.248.209.128 "docker pull pak11273/utterzone-server:latest && docker tag pak11273/utterzone-server:latest dokku/utterzone-server:latest && dokku tags:deploy utterzone-server latest"

