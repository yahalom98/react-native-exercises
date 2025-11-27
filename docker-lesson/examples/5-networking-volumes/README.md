# Example 5: Docker Networking & Volumes

This example demonstrates Docker networking and volume management for Node.js applications.

## What You'll Learn

- Docker networking
- Creating custom networks
- Volume management
- Data persistence
- Container communication

## Project Structure

```
.
├── app1/
│   ├── app.js
│   └── package.json
├── app2/
│   ├── app.js
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Step-by-Step Guide

### Step 1: Create Two Applications

**app1/app.js:**
```javascript
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

app.get('/', async (req, res) => {
  try {
    // Call app2 via Docker network
    const response = await axios.get('http://app2:3002/data');
    res.json({
      app: 'App 1',
      message: 'Received from App 2',
      data: response.data
    });
  } catch (error) {
    res.json({
      app: 'App 1',
      error: error.message
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App 1 running on port ${port}`);
});
```

**app2/app.js:**
```javascript
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3002;
const dataFile = '/data/messages.json';

// Initialize data file
async function initData() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify([]));
  }
}

app.use(express.json());

app.get('/data', async (req, res) => {
  try {
    const data = await fs.readFile(dataFile, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post('/data', async (req, res) => {
  try {
    const messages = JSON.parse(await fs.readFile(dataFile, 'utf8'));
    messages.push({
      message: req.body.message,
      timestamp: new Date().toISOString()
    });
    await fs.writeFile(dataFile, JSON.stringify(messages, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', async () => {
  await initData();
  console.log(`App 2 running on port ${port}`);
});
```

### Step 2: Create Docker Compose with Networking

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app1:
    build: ./app1
    ports:
      - "3001:3001"
    networks:
      - app-network
    depends_on:
      - app2

  app2:
    build: ./app2
    ports:
      - "3002:3002"
    networks:
      - app-network
    volumes:
      - app2_data:/data

volumes:
  app2_data:

networks:
  app-network:
    driver: bridge
```

### Step 3: Create Dockerfiles

**app1/Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "app.js"]
```

**app2/Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
CMD ["node", "app.js"]
```

### Step 4: Run and Test

```bash
# Start services
docker-compose up --build

# Test App 1 (calls App 2)
curl http://localhost:3001

# Add data to App 2
curl -X POST http://localhost:3002/data \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from volume!"}'

# Check data persistence
docker-compose down
docker-compose up
curl http://localhost:3002/data
```

## Network Types

### 1. Bridge Network (Default)

```bash
# Create bridge network
docker network create my-bridge-network

# Run container on network
docker run --network my-bridge-network node:18
```

### 2. Host Network

```bash
# Use host network (Linux only)
docker run --network host node:18
```

### 3. Custom Network in Compose

```yaml
networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge

services:
  web:
    networks:
      - frontend
  api:
    networks:
      - frontend
      - backend
```

## Volume Types

### 1. Named Volumes

```yaml
volumes:
  my_data:
    driver: local
```

### 2. Bind Mounts

```yaml
volumes:
  - ./data:/app/data
```

### 3. Anonymous Volumes

```yaml
volumes:
  - /app/node_modules
```

## Complete Example with Multiple Services

**docker-compose.full.yml:**
```yaml
version: '3.8'

services:
  # Frontend
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    networks:
      - frontend-network
    volumes:
      - ./frontend:/app
      - /app/node_modules

  # API
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

  # Database
  db:
    image: postgres:14-alpine
    networks:
      - backend-network
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass

  # Redis
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

## Volume Management Commands

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect <volume_name>

# Create volume
docker volume create my_volume

# Remove volume
docker volume rm <volume_name>

# Remove unused volumes
docker volume prune
```

## Network Management Commands

```bash
# List networks
docker network ls

# Inspect network
docker network inspect <network_name>

# Create network
docker network create my_network

# Connect container to network
docker network connect my_network <container_id>

# Disconnect container
docker network disconnect my_network <container_id>

# Remove network
docker network rm <network_name>
```

## Best Practices

1. **Use named volumes** for databases
2. **Use bind mounts** for development
3. **Separate networks** for different tiers
4. **Backup volumes** regularly
5. **Use service names** for inter-container communication

## Next Steps

- Create more complex network topologies
- Experiment with volume backups
- Set up service discovery
- Implement load balancing

