#!/bin/bash
cd /home/kavia/workspace/code-generation/tyresense-30870-e7fe01c3/tyresense_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

