rm -rf build
yarn build:staging
cp ./apache.conf ./build/.htaccess
ssh viderTest 'rm -rf /home/ubuntu/vider_ca_admin_staging/build'
scp -r ./build viderTest:/home/ubuntu/vider_ca_admin_staging/build