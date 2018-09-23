docker build -t api:latest .

docker run -P api:latest

curl localhost:<port>/todo
