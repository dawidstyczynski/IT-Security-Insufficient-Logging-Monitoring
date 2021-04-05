# Smart Home - database

## Build docker image

```sh
docker build -f Dockerfile -t smart-home-db .
```

## Run docker image

```sh
docker run -d -p 8080:8080 -p 28015:28015 -p 29015:29015  smart-home-db
```

## Database interface
Go to `http://localhost:8080`