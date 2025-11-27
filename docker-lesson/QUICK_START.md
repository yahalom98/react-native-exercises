# Quick Start Guide - Docker with Node.js

## Prerequisites

Before starting, ensure you have:

1. **Docker installed**
   - Windows/Mac: [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Linux: Follow installation in Hour 1

2. **Node.js knowledge**
   - Basic understanding of Node.js and npm
   - Familiarity with Express.js (helpful but not required)

3. **Command line familiarity**
   - Basic terminal/command prompt usage

## Installation Verification

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version

# Verify Docker is running
docker info
```

## Learning Path

### Hour 1: Docker Basics
- Start with: `examples/1-docker-basics/`
- Learn: Basic commands, running containers
- Practice: `exercises/exercise-1-docker-basics/`

### Hour 2: Dockerfile
- Start with: `examples/2-dockerfile-basics/`
- Learn: Creating Dockerfiles, building images
- Practice: `exercises/exercise-2-dockerfile/`

### Hour 3: Docker Compose
- Start with: `examples/3-docker-compose/`
- Learn: Multi-container applications
- Practice: `exercises/exercise-3-docker-compose/`

### Hour 4: Multi-stage Builds
- Start with: `examples/4-multi-stage-builds/`
- Learn: Optimizing images
- Practice: `exercises/exercise-4-multi-stage/`

### Hour 5: Networking & Volumes
- Start with: `examples/5-networking-volumes/`
- Learn: Container communication, data persistence
- Practice: Review examples and experiment

### Hour 6: Production Best Practices
- Start with: `examples/6-production-best-practices/`
- Learn: Security, monitoring, optimization
- Practice: Apply to your own projects

### AWS Integration
- Start with: `examples/7-aws-integration/`
- Learn: ECR, ECS, Fargate deployment
- Practice: `exercises/exercise-5-aws/`

## Quick Commands Reference

### Basic Docker Commands
```bash
# Pull image
docker pull node:18

# Run container
docker run -it node:18 node

# List containers
docker ps
docker ps -a

# Stop container
docker stop <container_id>

# Remove container
docker rm <container_id>

# View logs
docker logs <container_id>
```

### Building Images
```bash
# Build image
docker build -t my-app .

# Build with tag
docker build -t my-app:v1.0.0 .

# List images
docker images

# Remove image
docker rmi my-app
```

### Docker Compose
```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# Rebuild
docker-compose up --build
```

## Common Issues and Solutions

### Issue: Docker daemon not running
**Solution:**
- Windows/Mac: Start Docker Desktop
- Linux: `sudo systemctl start docker`

### Issue: Permission denied
**Solution:**
```bash
# Add user to docker group (Linux)
sudo usermod -aG docker $USER
# Log out and back in
```

### Issue: Port already in use
**Solution:**
```bash
# Change port mapping
docker run -p 3001:3000 my-app
# Or stop the service using the port
```

### Issue: Out of disk space
**Solution:**
```bash
# Clean up unused resources
docker system prune -a
```

## Project Structure

```
docker-lesson/
├── README.md                 # Main documentation
├── QUICK_START.md           # This file
├── INSTRUCTOR_GUIDE.md      # Solutions and tips
├── examples/                 # Working examples
│   ├── 1-docker-basics/
│   ├── 2-dockerfile-basics/
│   ├── 3-docker-compose/
│   ├── 4-multi-stage-builds/
│   ├── 5-networking-volumes/
│   ├── 6-production-best-practices/
│   └── 7-aws-integration/
└── exercises/                # Practice exercises
    ├── exercise-1-docker-basics/
    ├── exercise-2-dockerfile/
    ├── exercise-3-docker-compose/
    ├── exercise-4-multi-stage/
    └── exercise-5-aws/
```

## Tips for Success

1. **Practice regularly**: Run commands yourself, don't just read
2. **Experiment**: Try variations of examples
3. **Read error messages**: They often contain solutions
4. **Use documentation**: Docker docs are excellent
5. **Build projects**: Apply concepts to real applications

## Next Steps After Completion

1. Containerize your own Node.js applications
2. Set up CI/CD pipelines
3. Deploy to cloud platforms (AWS, Azure, GCP)
4. Learn Kubernetes for orchestration
5. Explore Docker Swarm for clustering

## Resources

- [Docker Official Docs](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)

Happy Learning! 🐳

