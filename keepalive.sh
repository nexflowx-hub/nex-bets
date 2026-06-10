#!/bin/bash
# Keepalive script for Next.js dev server
while true; do
  cd /home/z/my-project
  NODE_OPTIONS="--max-old-space-size=384" npx next dev -p 3000 --turbopack 2>&1 | tee -a dev.log
  echo "Server crashed, restarting in 3s..." >> dev.log
  sleep 3
done
