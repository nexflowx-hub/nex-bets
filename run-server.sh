#!/bin/bash
cd /home/z/my-project
while true; do
  echo "$(date '+%H:%M:%S') Starting server..." >> /home/z/my-project/server.log
  npx next dev -p 3000 --webpack >> /home/z/my-project/dev.log 2>&1
  echo "$(date '+%H:%M:%S') Server exited" >> /home/z/my-project/server.log
  sleep 2
done
