# API Prototype

Generate a RESTful API

## Getting Started

```bash
docker-compose up
```

This will start up the database and postgrest server.  To find out the port to
use, you can do a `docker-compose ps`.  


## Fetch many:

```bash
curl <url>/todos
```

## Fetch single:

```bash
curl <url>/todos?id=eq.1 -H'accept:application/vnd.pgrst.object+json'
```

See [postgrest docs|http://postgrest.org/en/v5.0/api.html] for more examples
