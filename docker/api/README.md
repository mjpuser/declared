docker build -t api:latest .

docker run -P api:latest

curl localhost:<port>/todo

# ISSUES

- dynamodb local blows up if date is not proper format
