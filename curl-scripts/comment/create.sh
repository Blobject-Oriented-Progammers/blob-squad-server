curl 'http://localhost:4741/comment/' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "content": "'"${CONTENT}"'",
      "entryId": "'"${ENTRYID}"'",
      "author": "'"${AUTHOR}"'"
    }
  }'
