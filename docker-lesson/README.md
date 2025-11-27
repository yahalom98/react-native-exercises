# Docker with Node.js - Complete 6-Hour Course

This comprehensive course covers Docker fundamentals, Dockerfile creation, Docker Compose, optimization techniques, and AWS integration for Node.js applications.

## 📚 Table of Contents

1. [Hour 1: Docker Basics](#hour-1-docker-basics)
2. [Hour 2: Dockerfile for Node.js](#hour-2-dockerfile-for-nodejs)
3. [Hour 3: Docker Compose](#hour-3-docker-compose)
4. [Hour 4: Multi-stage Builds & Optimization](#hour-4-multi-stage-builds--optimization)
5. [Hour 5: Docker Networking & Volumes](#hour-5-docker-networking--volumes)
6. [Hour 6: Production Best Practices](#hour-6-production-best-practices)
7. [AWS Integration](#aws-integration)
8. [Exercises](#exercises)

---

## Hour 1: Docker Basics

### What is Docker?

Docker is a platform that uses containerization to package applications and their dependencies into lightweight, portable containers. Containers run consistently across different environments.

### Key Concepts

#### 1. Container vs Virtual Machine

**Virtual Machine:**
- Full OS on top of host OS
- Heavy resource usage
- Slow startup time
- Complete isolation

**Container:**
- Shares host OS kernel
- Lightweight and fast
- Quick startup
- Process-level isolation

#### 2. Docker Components

- **Docker Engine**: Runtime that builds and runs containers
- **Docker Image**: Read-only template for creating containers
- **Docker Container**: Running instance of an image
- **Dockerfile**: Text file with instructions to build an image
- **Docker Hub**: Public registry for Docker images

### Installation

#### Windows
```bash
# Download Docker Desktop from https://www.docker.com/products/docker-desktop
# Install and restart your computer
```

#### macOS
```bash
# Download Docker Desktop from https://www.docker.com/products/docker-desktop
# Or use Homebrew:
brew install --cask docker
```

#### Linux (Ubuntu/Debian)
```bash
# Update package index
sudo apt-get update

# Install prerequisites
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up stable repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group (optional, to run without sudo)
sudo usermod -aG docker $USER
```

### Basic Docker Commands

#### Check Installation
```bash
docker --version
docker info
```

#### Working with Images
```bash
# Pull an image from Docker Hub
docker pull node:18

# List local images
docker images

# Remove an image
docker rmi node:18

# Search for images
docker search node
```

#### Working with Containers
```bash
# Run a container
docker run node:18 node --version

# Run interactively
docker run -it node:18 bash

# Run in detached mode
docker run -d node:18 node -e "console.log('Hello Docker')"

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop <container_id>

# Start a stopped container
docker start <container_id>

# Remove a container
docker rm <container_id>

# View container logs
docker logs <container_id>

# Execute command in running container
docker exec -it <container_id> bash
```

### First Node.js Container

```bash
# Run Node.js in a container
docker run -it --rm node:18 node

# Run a Node.js script
docker run -it --rm -v $(pwd):/app -w /app node:18 node app.js
```

---

## Hour 2: Dockerfile for Node.js

### What is a Dockerfile?

A Dockerfile is a text file containing instructions to build a Docker image. Each instruction creates a new layer in the image.

### Basic Dockerfile Structure

```dockerfile
# Use official Node.js runtime as base image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Define command to run
CMD ["node", "app.js"]
```

### Dockerfile Instructions Explained

#### FROM
```dockerfile
FROM node:18
# Specifies the base image
# Use specific versions (not 'latest')
```

#### WORKDIR
```dockerfile
WORKDIR /app
# Sets working directory for subsequent instructions
# Creates directory if it doesn't exist
```

#### COPY vs ADD
```dockerfile
COPY package.json ./
# Copies files from host to container
# Use COPY for most cases

ADD https://example.com/file.tar.gz /tmp/
# ADD can also download from URLs
# Prefer COPY for local files
```

#### RUN
```dockerfile
RUN npm install
# Executes commands during image build
# Each RUN creates a new layer
```

#### EXPOSE
```dockerfile
EXPOSE 3000
# Documents which port the container listens on
# Doesn't actually publish the port
```

#### CMD vs ENTRYPOINT
```dockerfile
CMD ["node", "app.js"]
# Default command when container starts
# Can be overridden

ENTRYPOINT ["node"]
# Command that always runs
# Arguments can be appended
```

### Best Practices for Node.js Dockerfiles

#### 1. Use .dockerignore
Create `.dockerignore` file:
```
node_modules
npm-debug.log
.git
.gitignore
.env
README.md
.DS_Store
```

#### 2. Layer Caching
Order instructions from least to most frequently changing:
```dockerfile
# Dependencies change less frequently
COPY package*.json ./
RUN npm install

# Application code changes frequently
COPY . .
```

#### 3. Use Specific Versions
```dockerfile
FROM node:18-alpine
# Use specific version and smaller base image
```

#### 4. Non-root User
```dockerfile
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser
# Run as non-root for security
```

### Building and Running

```bash
# Build an image
docker build -t my-node-app .

# Build with tag
docker build -t my-node-app:1.0.0 .

# Run the container
docker run -p 3000:3000 my-node-app

# Run with environment variables
docker run -p 3000:3000 -e NODE_ENV=production my-node-app
```

---

## Hour 3: Docker Compose

### What is Docker Compose?

Docker Compose is a tool for defining and running multi-container Docker applications. You use a YAML file to configure your services.

### Why Use Docker Compose?

- Define multiple containers in one file
- Start/stop all services with one command
- Handle networking between containers
- Manage volumes and environment variables
- Simplify development workflow

### Basic docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Build and start
docker-compose up --build

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs web

# Execute command in service
docker-compose exec web bash

# Scale services
docker-compose up --scale web=3
```

### Common Use Cases

#### 1. Node.js + MongoDB
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/mydb
    depends_on:
      - mongo

  mongo:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

#### 2. Node.js + Redis
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

#### 3. Development with Hot Reload
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
```

---

## Hour 4: Multi-stage Builds & Optimization

### Multi-stage Builds

Multi-stage builds allow you to use multiple FROM statements in a Dockerfile. Each FROM begins a new stage. You can copy artifacts from previous stages.

### Why Use Multi-stage Builds?

- Reduce final image size
- Separate build dependencies from runtime
- Improve security (fewer tools in final image)
- Faster deployments

### Basic Multi-stage Dockerfile

```dockerfile
# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy only production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

### Advanced Multi-stage Example

```dockerfile
# Stage 1: Dependencies
FROM node:18 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Builder
FROM node:18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nodejs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

### Image Optimization Tips

#### 1. Use Alpine Linux
```dockerfile
FROM node:18-alpine
# Much smaller than regular Node.js image
```

#### 2. Minimize Layers
```dockerfile
# Bad
RUN npm install express
RUN npm install axios
RUN npm install dotenv

# Good
RUN npm install express axios dotenv
```

#### 3. Clean Up in Same Layer
```dockerfile
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

#### 4. Use .dockerignore
```
node_modules
npm-debug.log
.git
.env
dist
coverage
```

#### 5. Production Dependencies Only
```dockerfile
RUN npm ci --only=production
# Or use npm prune --production
```

---

## Hour 5: Docker Networking & Volumes

### Docker Networking

Docker provides several network drivers for containers to communicate.

#### Default Networks

```bash
# List networks
docker network ls

# Inspect network
docker network inspect bridge

# Create custom network
docker network create mynetwork

# Connect container to network
docker run --network mynetwork node:18
```

#### Network Types

1. **Bridge** (default): Isolated network on single host
2. **Host**: Uses host's network directly
3. **Overlay**: Multi-host networking
4. **Macvlan**: Assign MAC addresses to containers

### Docker Compose Networking

Containers in the same docker-compose.yml automatically share a network:

```yaml
version: '3.8'

services:
  app:
    build: .
    # Can access 'db' by hostname
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb

  db:
    image: postgres:14
    # Accessible as 'db' from other services
```

### Docker Volumes

Volumes are the preferred way to persist data in Docker.

#### Volume Types

1. **Named Volumes**: Managed by Docker
2. **Bind Mounts**: Mount host directory
3. **Anonymous Volumes**: Temporary volumes

#### Using Volumes

```bash
# Create named volume
docker volume create mydata

# Use volume in container
docker run -v mydata:/data node:18

# Bind mount
docker run -v /host/path:/container/path node:18

# Mount current directory
docker run -v $(pwd):/app node:18
```

#### Volumes in Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    volumes:
      # Named volume
      - app_data:/app/data
      # Bind mount
      - ./src:/app/src
      # Anonymous volume (prevents overwrite)
      - /app/node_modules

  db:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  app_data:
  postgres_data:
```

### Volume Best Practices

1. Use named volumes for databases
2. Use bind mounts for development
3. Use anonymous volumes to prevent overwrites
4. Backup important volumes regularly

---

## Hour 6: Production Best Practices

### Security Best Practices

#### 1. Use Non-root User
```dockerfile
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser
```

#### 2. Scan Images for Vulnerabilities
```bash
docker scan my-image
```

#### 3. Use Specific Base Image Versions
```dockerfile
FROM node:18.17.0-alpine
# Not: FROM node:latest
```

#### 4. Minimize Attack Surface
```dockerfile
# Use minimal base images
FROM node:18-alpine

# Remove unnecessary packages
RUN apk del curl
```

#### 5. Don't Store Secrets in Images
```dockerfile
# Bad
ENV API_KEY=secret123

# Good - Use environment variables at runtime
docker run -e API_KEY=secret123 my-app
```

### Performance Optimization

#### 1. Multi-stage Builds
Reduce final image size significantly.

#### 2. Layer Caching
Order Dockerfile instructions properly.

#### 3. Use .dockerignore
Exclude unnecessary files.

#### 4. Health Checks
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node healthcheck.js || exit 1
```

### Monitoring & Logging

#### 1. Structured Logging
```javascript
// In your Node.js app
console.log(JSON.stringify({
  level: 'info',
  message: 'Request received',
  timestamp: new Date().toISOString()
}));
```

#### 2. View Logs
```bash
docker logs <container_id>
docker logs -f <container_id>  # Follow logs
docker logs --tail 100 <container_id>
```

#### 3. Log Drivers
```bash
docker run --log-driver json-file --log-opt max-size=10m node:18
```

### Production Dockerfile Example

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy production files
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

USER nodejs

EXPOSE 3000

ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
```

---

## AWS Integration

### Overview

AWS provides several services for running Docker containers:
- **ECR (Elastic Container Registry)**: Store Docker images
- **ECS (Elastic Container Service)**: Run containers on AWS
- **Fargate**: Serverless container platform
- **EC2**: Run Docker on virtual machines

### Part 1: AWS ECR (Elastic Container Registry)

ECR is AWS's Docker registry service.

#### Setup ECR Repository

1. **Create Repository via AWS Console:**
   - Go to ECR in AWS Console
   - Click "Create repository"
   - Choose name (e.g., `my-node-app`)
   - Create repository

2. **Create Repository via CLI:**
```bash
aws ecr create-repository --repository-name my-node-app --region us-east-1
```

#### Push Image to ECR

```bash
# 1. Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# 2. Tag your image
docker tag my-node-app:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-node-app:latest

# 3. Push image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-node-app:latest
```

#### Pull Image from ECR

```bash
docker pull <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-node-app:latest
```

### Part 2: AWS ECS (Elastic Container Service)

ECS runs Docker containers on AWS infrastructure.

#### Create ECS Cluster

```bash
aws ecs create-cluster --cluster-name my-cluster --region us-east-1
```

#### Create Task Definition

Create `task-definition.json`:
```json
{
  "family": "my-node-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "my-node-app",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/my-node-app:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/my-node-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

Register task definition:
```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

#### Create Service

```bash
aws ecs create-service \
  --cluster my-cluster \
  --service-name my-node-app-service \
  --task-definition my-node-app \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

### Part 3: AWS Fargate

Fargate is a serverless compute engine for containers.

#### Benefits
- No server management
- Pay only for running containers
- Automatic scaling
- Integrated with ECS

#### Deploy to Fargate

1. Push image to ECR (see above)
2. Create task definition (see above)
3. Create Fargate service:
```bash
aws ecs create-service \
  --cluster my-cluster \
  --service-name my-fargate-service \
  --task-definition my-node-app \
  --desired-count 2 \
  --launch-type FARGATE \
  --platform-version LATEST \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

### Part 4: CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS ECS

on:
  push:
    branches: [ main ]

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY: my-node-app
  ECS_SERVICE: my-node-app-service
  ECS_CLUSTER: my-cluster
  ECS_TASK_DEFINITION: my-node-app

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v3

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${{ env.AWS_REGION }}

    - name: Login to Amazon ECR
      id: login-ecr
      uses: aws-actions/amazon-ecr-login@v1

    - name: Build, tag, and push image to Amazon ECR
      id: build-image
      env:
        ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
        IMAGE_TAG: ${{ github.sha }}
      run: |
        docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
        docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
        echo "image=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG" >> $GITHUB_OUTPUT

    - name: Fill in the new image ID in the Amazon ECS task definition
      id: task-def
      uses: aws-actions/amazon-ecs-render-task-definition@v1
      with:
        task-definition: task-definition.json
        container-name: my-node-app
        image: ${{ steps.build-image.outputs.image }}

    - name: Deploy Amazon ECS task definition
      uses: aws-actions/amazon-ecs-deploy-task-definition@v1
      with:
        task-definition: ${{ steps.task-def.outputs.task-definition }}
        service: ${{ env.ECS_SERVICE }}
        cluster: ${{ env.ECS_CLUSTER }}
        wait-for-service-stability: true
```

### Part 5: AWS App Runner (Alternative)

App Runner is a simpler alternative for containerized applications.

#### Deploy to App Runner

1. Push image to ECR
2. Create App Runner service via Console or CLI:
```bash
aws apprunner create-service \
  --service-name my-node-app \
  --source-configuration '{
    "ImageRepository": {
      "ImageIdentifier": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/my-node-app:latest",
      "ImageRepositoryType": "ECR",
      "ImageConfiguration": {
        "Port": "3000"
      }
    },
    "AutoDeploymentsEnabled": true
  }' \
  --instance-configuration '{
    "Cpu": "1 vCPU",
    "Memory": "2 GB"
  }'
```

### Best Practices for AWS

1. **Use IAM Roles**: Don't hardcode credentials
2. **Enable Logging**: Use CloudWatch Logs
3. **Set Resource Limits**: CPU and memory limits
4. **Use Secrets Manager**: For sensitive data
5. **Enable Auto Scaling**: Based on metrics
6. **Use Health Checks**: For service reliability
7. **Tag Resources**: For cost tracking

---

## Exercises

See the `exercises/` directory for hands-on practice exercises with solutions.

---

## 🚀 Getting Started

1. **Install Docker:**
   - Follow installation instructions in Hour 1
   - Verify: `docker --version`

2. **Install Docker Compose:**
   - Usually included with Docker Desktop
   - Verify: `docker-compose --version`

3. **Set up AWS (for AWS section):**
   - Create AWS account
   - Install AWS CLI: `aws --version`
   - Configure: `aws configure`

4. **Navigate Examples:**
   - Each example includes a README
   - Follow step-by-step instructions
   - Run and experiment with code

---

## 📖 Additional Resources

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [AWS ECR Documentation](https://docs.aws.amazon.com/ecr/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 🎯 Key Takeaways

1. **Docker Basics**: Containers package apps with dependencies
2. **Dockerfile**: Instructions to build images
3. **Docker Compose**: Multi-container applications
4. **Multi-stage Builds**: Optimize image size
5. **Networking & Volumes**: Container communication and data persistence
6. **Production**: Security, performance, monitoring
7. **AWS Integration**: Deploy containers to cloud

---

Happy Learning! 🐳

