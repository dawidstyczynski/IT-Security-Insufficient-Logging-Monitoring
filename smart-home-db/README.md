# Smart Home - database

## Build docker file

```sh
docker build -f Dockerfile -t smart-home-db .
```

## Run docker file

```sh
docker run -d -p 8080:8080 -p 28015:28015 -p 29015:29015  smart-home-db
```
