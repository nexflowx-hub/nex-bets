#!/bin/bash
cd /home/z/my-project
# Fork the server into a new process group
setsid bun run dev >> /home/z/my-project/dev.log 2>&1 &
disown
exit 0
