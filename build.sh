rm -rf build
yarn build
cp ./apache.conf ./build/.htaccess
ssh vider 'rm -rf /home/ubuntu/ca-admin'
scp -r ./build vider:/home/ubuntu/ca-admin