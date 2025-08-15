# osca

## compose 실행
> 현재는 docker compose에 db 설정만 존재
```sh
docker compose up -d # Daemon 실행
docker compose down  # Daemon 실행 종료
```

## 프로젝트 실행
> Makefile을 사용하여 docker build후 docker run
```sh
make build
make run
```
