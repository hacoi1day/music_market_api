# Music Market API
## Require
- [x] Restrict domain to get API
- [x] Use PostgreSQL
- [x] Use JWT for authentication
- [x] Login API
- [x] Forgot password API
- [x] Change password API
- [x] CRUD Users
- [x] CRUD Songs
- [x] CRUD Banners
- [x] Seed data (songs and users)
- [x] API Document (use Swagger)
- [x] File Storage (use MinIO)

## Setup Project

### Requirement
- Docker
- Docker compose

### Start service
Run command:
```
docker-compose up
```

### Install dependencies
```
yarn
```

### Update .env
```
cp .env.example .env
```

### Start
```
yarn start:dev
```

### Access swagger
http://localhost:3000/api/docs

### Migrate
```
yarn migrate:up
```

### Seed
```
yarn seeder:run
```
