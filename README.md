# Insufficient Logging & Monitoring

This repository contains a demo application with bad and insufficient logging & monitoring practices for IT-Security SS2021.

## Setup Docker environment.

Run the following commands to create the Docker image for the backend (nodemon) and database.

```sh
docker network create smart-home
docker-compose build
```

## Start backend and database with nodemon

To view the database interface navigate to `http://localhost:8080`.

```sh
docker-compose up -d
```

## Start web client

Navigate to `http://localhost:4200/`.

```sh
cd smart-home && ng serve
```
