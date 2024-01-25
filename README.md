# logs-collector

---

- [the main idea](#the-main-idea)
- [server](#server)
  - [prerequisites](#prerequisites)
  - [configuration](#configuration)
  - [running](#running)
  - [API description](#api-description)
- [cli](#cli)
  - [synopsis](#synopsis)
- [room for the IMPROVEMENTS](#room-for-the-improvements)

---

## the main idea

Server runs "jobs" in a background. Each job is attached to a specific container and reads the logs until the stream is valid or job is stopped by the user.
Each job has its status: following, paused, completed or error.

The user can manage the jobs using CLI.

The read logs are saved into MongoDB but it can be replaced by another custom storage provider.
The jobs are preserved in a storage provider too.

On the unintended reboot of the server - the jobs which were in status "following" are recovered.

When recovering a job - it reads the logs starting from the place (timestamp) where it stopped last time.

---

## server

### prerequisites

- docker installation with exposed **TCP** connection or Unix-socket

### configuration

- review and adjust environmental variables in [.env](./server/.env)

### running

```bash
cd ./server
docker-compose up --build
```

### API description

- get the list of the available containers from the remote Docker Engine:

```
GET /available-containers
```

- start gathering the logs for multiple containers (by ids/names):


```
POST /logs/start
```

- pause collection the logs for multiple containers (by ids/names):


```
POST /logs/pause
```

- remove the collected logs for multiple containers (by ids/names):


```
DELETE /logs
```

- get all running jobs for multiple containers:


```
GET /logs
```

- tail a container for logs (by id/name):


```
POST /logs/tail
```

---

## cli

### synopsis

```shell
logs-collector --list-available
logs-collector --list
logs-collector start  [--id] [--name]
logs-collector stop   [--id] [--name]
logs-collector delete [--id] [--name]
logs-collector tail   [--id] [--name]
```

---

## room for the IMPROVEMENTS

1. add ability to add containers by labels/tags
2. provide the ability to tail multiple containers at once by client
3. tail with `--follow` from client to server
4. add Authorization
5. save error message to DB for job - if it occurs
6. unit tests
7. write the logs of the app itself to the filesystem/db
8. CLI in interactive mode
