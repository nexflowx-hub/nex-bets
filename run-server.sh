#!/bin/bash
cd /home/z/my-project
while true; do
  NODE_OPTIONS="--max-old-space-size=512" npx next dev -p 3000 --turbopack >> dev.log 2>&1
  echo "$(date '+%H:%M:%S') - Server exited, restarting in 3s..." >> dev.log
  sleep 3
done
