rm -rf build
yarn build
cp ./apache.conf ./build/.htaccess
ssh viderTest 'rm -rf /home/ubuntu/vider-ca-admin/build'
scp -r ./build viderTest:/home/ubuntu/vider-ca-admin/build