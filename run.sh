docker build -t nest-prisma-server .
docker run -d -t -p 3000:3000 nest-prisma-server
docker run -d -p 5432:5432 --name nest-postgres -e POSTGRES_PASSWORD=nest -e POSTGRES_USER=nest -e POSTGRES_DB=nest postgres
docker run -d --rm --name redis-server -p 6379:6379 redis