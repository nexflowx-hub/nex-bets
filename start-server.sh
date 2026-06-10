#!/bin/bash
cd /home/z/my-project
while true; do
  rm -rf .next
  npx next dev -p 3000 --webpack >> /home/z/my-project/dev.log 2>&1
  EXIT=$?
  echo "$(date): Exit code $EXIT" >> /home/z/my-project/server-monitor.log
  sleep 2
done
