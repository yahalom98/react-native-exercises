# Example 3: Docker Compose

This example demonstrates using Docker Compose to run a multi-container Node.js application with a database.

## What You'll Learn

- Creating docker-compose.yml
- Running multi-container applications
- Service dependencies
- Volume management
- Environment variables

## Project Structure

```
.
├── app.js
├── package.json
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Step-by-Step Guide

### Step 1: Create Node.js Application

**package.json:**
```json
{
  "name": "docker-compose-example",
  "version": "1.0.0",
  "main": "app.js",
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.0"
  }
}
```

**app.js:**
```javascript
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'mydb',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected:', res.rows[0]);
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Docker Compose!',
    database: 'Connected'
  });
});

app.get('/health', (req, res) => {
  pool.query('SELECT 1', (err) => {
    if (err) {
      res.status(500).json({ status: 'unhealthy', error: err.message });
    } else {
      res.json({ status: 'healthy' });
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
```

### Step 2: Create Dockerfile

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

### Step 3: Create docker-compose.yml

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  # Node.js application
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - PORT=3000
      - DB_HOST=db
      - DB_PORT=5432
      - DB_NAME=mydb
      - DB_USER=myuser
      - DB_PASSWORD=mypassword
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
    restart: unless-stopped

  # PostgreSQL database
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
    restart: unless-stopped

volumes:
  postgres_data:
```

### Step 4: Run with Docker Compose

```bash
# Build and start services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs app
docker-compose logs db

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Step 5: Access Services

- **App**: http://localhost:3000
- **Database**: localhost:5432

## Advanced docker-compose.yml

**docker-compose.advanced.yml:**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: my-node-app
    ports:
      - "${PORT:-3000}:3000"
    environment:
      - NODE_ENV=${NODE_ENV:-development}
      - PORT=3000
      - DB_HOST=db
      - DB_PORT=5432
      - DB_NAME=${DB_NAME:-mydb}
      - DB_USER=${DB_USER:-myuser}
      - DB_PASSWORD=${DB_PASSWORD:-mypassword}
    volumes:
      - ./src:/app/src
      - /app/node_modules
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:14-alpine
    container_name: my-postgres-db
    environment:
      - POSTGRES_USER=${DB_USER:-myuser}
      - POSTGRES_PASSWORD=${DB_PASSWORD:-mypassword}
      - POSTGRES_DB=${DB_NAME:-mydb}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "${DB_PORT:-5432}:5432"
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-myuser}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis cache (optional)
  redis:
    image: redis:7-alpine
    container_name: my-redis
    ports:
      - "6379:6379"
    networks:
      - app-network
    restart: unless-stopped
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

## Using Environment Files

Create `.env`:
```
NODE_ENV=development
PORT=3000
DB_NAME=mydb
DB_USER=myuser
DB_PASSWORD=mypassword
DB_PORT=5432
```

Docker Compose automatically loads `.env` file.

## Common Docker Compose Commands

```bash
# Start services
docker-compose up

# Build and start
docker-compose up --build

# Start in background
docker-compose up -d

# Stop services
docker-compose stop

# Stop and remove
docker-compose down

# View logs
docker-compose logs -f

# Execute command in service
docker-compose exec app bash
docker-compose exec db psql -U myuser -d mydb

# Scale services
docker-compose up --scale app=3

# View running services
docker-compose ps
```

## Key Concepts

1. **Services**: Each service is a container
2. **Networks**: Services on same network can communicate by name
3. **Volumes**: Persistent data storage
4. **Depends_on**: Service startup order
5. **Environment**: Environment variables
6. **Healthchecks**: Container health monitoring

## Next Steps

- Add more services (Redis, MongoDB)
- Implement health checks
- Use environment files
- Set up development vs production configs

