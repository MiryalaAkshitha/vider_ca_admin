rm -rf build
yarn build:staging
cp ./apache.conf ./build/.htaccess
ssh vider 'rm -rf /home/ubuntu/vider_ca_admin_staging/build'
scp -r ./build vider:/home/ubuntu/vider_ca_admin_staging/build