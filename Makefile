.PHONY: postgres redis prisma-int prisma-studio  nest-run-dev build run stop

all:  postgres redis prisma-int  nest-run-dev

build:
	docker-compose build

run:
	docker-compose up -d

stop:
	docker-compose down

redis:
	docker run -d --rm --name redis-server -p 6379:6379 redis

postgres:
	docker run -d -p 5432:5432 --name nest-postgres -e POSTGRES_PASSWORD=nest -e POSTGRES_USER=nest -e POSTGRES_DB=nest postgres


prisma-int:
	sudo npx prisma migrate dev --name init

prisma-studio:
	sudo npx prisma studio
nest-run-dev:
	pnpm run star:dev