API="http://localhost:4741"
URL_PATH="/entries"

curl "${API}${URL_PATH}/${ID}" \
--include \
--header "Authorization: Bearer ${TOKEN}"
