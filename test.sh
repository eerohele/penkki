#!/bin/bash

function check {
  "$@" > /dev/null

  local rc=$?

  if [ $rc -ne 0 ]; then
    echo "ERR: $1" >&2
    exit 1
  fi

  return $rc
}

check penkki ls

# --times
check penkki -t 1 ls

# --formatter
check penkki -f chart ls
check penkki -f sparkly ls
check penkki -f html ls
check penkki -f json ls
check penkki -f bars ls

# --commands
check penkki -c ls,df,du

check penkki -t 2 -f chart -c ls,df,du
check penkki -t 2 -f sparkly -c ls,df,du
check penkki -t 2 -f html -c ls,df,du
check penkki -t 2 -f json -c ls,df,du
check penkki -t 2 -f bars -c ls,df,du
