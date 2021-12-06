# build
docker build . -t comments.ssdh233.me/backup
# run
docker run -d --volume /home/ec2-user/isso/db:/db --env-file .env.local comments.ssdh233.me/backup
