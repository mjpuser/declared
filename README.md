# API Prototype

## Fetch many:

```bash
curl <url>/todos
```

## Fetch single:

```bash
curl <url>/todos?id=eq.1 -H'accept:application/vnd.pgrst.object+json'
```

See [postgrest docs|http://postgrest.org/en/v5.0/api.html] for more examples
