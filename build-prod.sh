rm -rf build
yarn build:prod
cp ./apache.conf ./build/.htaccess
ssh vider 'rm -rf /home/ubuntu/vider_ca_admin/build'
scp -r ./build vider:/home/ubuntu/vider_ca_admin/build