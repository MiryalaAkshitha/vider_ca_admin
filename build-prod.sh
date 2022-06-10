rm -rf build
yarn build:prod
cp ./apache.conf ./build/.htaccess
ssh viderProd 'rm -rf /home/ubuntu/vider_ca_admin/build'
scp -r ./build viderProd:/home/ubuntu/vider_ca_admin/build