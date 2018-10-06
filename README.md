# API Prototype

Generate a RESTful API

## Getting Started

```bash
docker-compose up
```

## Create a todo item

```bash
curl localhost:<port> -H'content-type:application/json' -d'{"task": "something"}'
```


## Fetch single:

```bash
curl localhost:<port>/<id>
```

