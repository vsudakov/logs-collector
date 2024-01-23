# logs-collector

- [server](#server)
  - [prerequisites](#prerequisites)
  - [running](#running)
  - [usage](#usage)

## server

### prerequisites

- make sure that your docker installation exposes **tcp** connection for its API
- configure the appropriate `DOCKER_API_*` environmental variables `.env` or other environment
  - *note: TCP settings take priority over Socket*

### running

```bash
cd ./server
docker-compose up --build
```

### usage
