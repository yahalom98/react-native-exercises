# Exercise 3: Docker Compose

## Objectives

- Create docker-compose.yml files
- Run multi-container applications
- Configure service dependencies
- Use volumes and networks

## Tasks

### Task 1: Basic Docker Compose

Create a `docker-compose.yml` for a Node.js app with a PostgreSQL database.

**Solution:**

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DB_HOST=db
      - DB_PORT=5432
      - DB_NAME=mydb
      - DB_USER=myuser
      - DB_PASSWORD=mypassword
    depends_on:
      - db

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Task 2: Add Redis Cache

Extend the docker-compose.yml to include a Redis service that the app can use.

**Solution:**

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DB_HOST=db
      - DB_PORT=5432
      - DB_NAME=mydb
      - DB_USER=myuser
      - DB_PASSWORD=mypassword
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### Task 3: Development vs Production

Create separate docker-compose files for development and production.

**Solution:**

**docker-compose.dev.yml:**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev
    depends_on:
      - db

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

**docker-compose.prod.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_PORT=5432
      - DB_NAME=mydb
      - DB_USER=myuser
      - DB_PASSWORD=mypassword
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

Run:
```bash
# Development
docker-compose -f docker-compose.dev.yml up

# Production
docker-compose -f docker-compose.prod.yml up -d
```

### Task 4: Health Checks

Add health checks to all services in docker-compose.yml.

**Solution:**

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DB_HOST=db
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myuser"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

### Task 5: Custom Networks

Create a docker-compose.yml with custom networks separating frontend and backend services.

**Solution:**

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    networks:
      - frontend-network
    volumes:
      - ./frontend:/app
      - /app/node_modules

  api:
    build: ./api
    ports:
      - "3001:3001"
    networks:
      - frontend-network
      - backend-network
    environment:
      - DB_HOST=db
      - REDIS_HOST=redis

  db:
    image: postgres:14-alpine
    networks:
      - backend-network
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    networks:
      - backend-network
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:

networks:
  frontend-network:
    driver: bridge
  backend-network:
    driver: bridge
```

## Challenge Exercise

Create a complete docker-compose setup for a microservices application with:
1. API gateway (Nginx)
2. Two Node.js microservices
3. PostgreSQL database
4. Redis cache
5. MongoDB for logging
6. All services with health checks
7. Proper networking and volumes

**Solution:**

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  # Nginx API Gateway
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - service1
      - service2
    networks:
      - gateway-network

  # Service 1
  service1:
    build: ./service1
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - REDIS_HOST=redis
    networks:
      - gateway-network
      - backend-network
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Service 2
  service2:
    build: ./service2
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - REDIS_HOST=redis
      - MONGO_HOST=mongo
    networks:
      - gateway-network
      - backend-network
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
      mongo:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 10s
      retries: 3

  # PostgreSQL
  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - backend-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myuser"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis
  redis:
    image: redis:7-alpine
    networks:
      - backend-network
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # MongoDB
  mongo:
    image: mongo:5
    environment:
      - MONGO_INITDB_DATABASE=logs
    volumes:
      - mongo_data:/data/db
    networks:
      - backend-network
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  redis_data:
  mongo_data:

networks:
  gateway-network:
    driver: bridge
  backend-network:
    driver: bridge
```

**nginx.conf:**
```nginx
events {
    worker_connections 1024;
}

http {
    upstream service1 {
        server service1:3001;
    }

    upstream service2 {
        server service2:3002;
    }

    server {
        listen 80;

        location /api/v1/ {
            proxy_pass http://service1/;
        }

        location /api/v2/ {
            proxy_pass http://service2/;
        }
    }
}
```

