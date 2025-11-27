# Instructor Guide - Docker with Node.js

This guide provides solutions, teaching tips, and additional resources for instructors teaching Docker with Node.js.

## Course Overview

**Duration**: 6 hours + AWS integration
**Level**: Intermediate
**Prerequisites**: Basic Node.js knowledge

## Hour-by-Hour Breakdown

### Hour 1: Docker Basics (60 minutes)

**Learning Objectives:**
- Understand containerization concepts
- Install and verify Docker
- Run basic Docker commands
- Execute Node.js in containers

**Key Concepts:**
- Containers vs VMs
- Docker images and containers
- Basic commands (run, ps, stop, rm)
- Port mapping and volumes

**Teaching Tips:**
1. Start with the "why" - explain problems Docker solves
2. Use live demonstrations
3. Have students run commands alongside
4. Emphasize container lifecycle

**Common Issues:**
- Docker daemon not running
- Permission errors (Linux)
- Port conflicts
- Understanding detached mode

**Solutions:**
- Always verify Docker is running first
- Show `docker ps` frequently
- Explain port mapping clearly: `host:container`

### Hour 2: Dockerfile (60 minutes)

**Learning Objectives:**
- Write Dockerfiles for Node.js apps
- Build Docker images
- Understand Dockerfile instructions
- Use .dockerignore

**Key Concepts:**
- FROM, WORKDIR, COPY, RUN
- Layer caching
- EXPOSE, CMD, ENTRYPOINT
- Image optimization

**Teaching Tips:**
1. Build Dockerfile incrementally
2. Show layer caching in action
3. Demonstrate .dockerignore importance
4. Compare image sizes

**Common Issues:**
- Forgetting to copy package.json first
- Not understanding layer caching
- COPY vs ADD confusion
- CMD vs ENTRYPOINT

**Solutions:**
- Emphasize: package.json → install → code
- Show `docker history` to see layers
- Always use COPY unless URL needed
- CMD = default, ENTRYPOINT = fixed

### Hour 3: Docker Compose (60 minutes)

**Learning Objectives:**
- Create docker-compose.yml files
- Run multi-container applications
- Configure service dependencies
- Use volumes and networks

**Key Concepts:**
- Services definition
- depends_on
- Volumes (named, bind, anonymous)
- Networks

**Teaching Tips:**
1. Start with single service, add more
2. Show service communication
3. Demonstrate volume persistence
4. Explain networking

**Common Issues:**
- Service startup order
- Volume mounting paths
- Network connectivity
- Environment variables

**Solutions:**
- Use health checks for dependencies
- Use absolute paths or relative to compose file
- Services communicate by name
- Use .env files for variables

### Hour 4: Multi-stage Builds (60 minutes)

**Learning Objectives:**
- Create multi-stage Dockerfiles
- Reduce image sizes
- Separate build and runtime
- Optimize for production

**Key Concepts:**
- Multi-stage syntax
- Stage naming
- Copying between stages
- Production optimization

**Teaching Tips:**
1. Show before/after image sizes
2. Build incrementally
3. Explain why each stage exists
4. Compare single vs multi-stage

**Common Issues:**
- Understanding stage isolation
- Copy paths between stages
- When to use multi-stage
- Alpine vs regular images

**Solutions:**
- Each FROM starts fresh
- Use --from=builder /path
- Use for compiled languages or optimization
- Alpine = smaller, regular = more compatible

### Hour 5: Networking & Volumes (60 minutes)

**Learning Objectives:**
- Understand Docker networking
- Create custom networks
- Manage volumes
- Persist data

**Key Concepts:**
- Network drivers (bridge, host, overlay)
- Named vs bind volumes
- Volume persistence
- Service discovery

**Teaching Tips:**
1. Show network isolation
2. Demonstrate volume persistence
3. Explain when to use each volume type
4. Show service communication

**Common Issues:**
- Understanding network types
- Volume paths
- Data persistence
- Network connectivity

**Solutions:**
- Bridge = default, host = direct, overlay = multi-host
- Named volumes managed by Docker
- Bind mounts = host path
- Services on same network communicate by name

### Hour 6: Production Best Practices (60 minutes)

**Learning Objectives:**
- Apply security best practices
- Implement health checks
- Configure logging
- Set resource limits

**Key Concepts:**
- Non-root users
- Health checks
- Structured logging
- Resource limits
- Monitoring

**Teaching Tips:**
1. Show security implications
2. Demonstrate health checks
3. Explain logging strategies
4. Show monitoring setup

**Common Issues:**
- Understanding security risks
- Health check implementation
- Log management
- Resource planning

**Solutions:**
- Always run as non-root
- Health checks = automatic recovery
- Use structured logging (JSON)
- Set limits based on profiling

## Exercise Solutions

All exercises include solutions in their respective README files. Key points:

### Exercise 1: Docker Basics
- Focus on command familiarity
- Emphasize container lifecycle
- Practice volume mounting

### Exercise 2: Dockerfile
- Start simple, add complexity
- Show optimization techniques
- Compare image sizes

### Exercise 3: Docker Compose
- Build incrementally
- Show service dependencies
- Demonstrate networking

### Exercise 4: Multi-stage
- Show size reduction
- Explain each stage
- Compare with single-stage

### Exercise 5: AWS
- Step-by-step AWS setup
- Emphasize IAM roles
- Show CI/CD integration

## Assessment Ideas

1. **Practical Exam**: Containerize a provided Node.js app
2. **Dockerfile Review**: Optimize a given Dockerfile
3. **Troubleshooting**: Fix broken docker-compose.yml
4. **Project**: Deploy app to AWS ECS

## Additional Resources

### Documentation
- [Docker Official Docs](https://docs.docker.com/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [AWS ECS Guide](https://docs.aws.amazon.com/ecs/)

### Tools
- [Dive](https://github.com/wagoodman/dive) - Image analysis
- [Docker Desktop](https://www.docker.com/products/docker-desktop) - GUI tool
- [Portainer](https://www.portainer.io/) - Container management

### Practice Platforms
- [Play with Docker](https://labs.play-with-docker.com/)
- [Katacoda Docker Scenarios](https://www.katacoda.com/courses/docker)

## Common Student Questions

**Q: When should I use Docker?**
A: Use Docker for consistency across environments, microservices, CI/CD, and when you need isolation.

**Q: Docker vs Kubernetes?**
A: Docker = containers, Kubernetes = orchestration. Learn Docker first, then Kubernetes.

**Q: How do I debug containers?**
A: Use `docker exec -it <container> bash`, `docker logs`, and volume mounts for development.

**Q: Should I use Docker in production?**
A: Yes, but follow best practices: security, monitoring, resource limits, health checks.

**Q: How do I update a running container?**
A: Build new image, update service (ECS) or recreate container (Docker Compose).

## Troubleshooting Guide

### Docker won't start
- Check Docker Desktop is running
- Verify system requirements
- Check for conflicting software

### Build fails
- Check Dockerfile syntax
- Verify file paths
- Check .dockerignore
- Review error messages carefully

### Container exits immediately
- Check CMD/ENTRYPOINT
- Review logs: `docker logs <container>`
- Verify application starts correctly
- Check port bindings

### Network issues
- Verify services on same network
- Check service names match
- Review depends_on configuration
- Test with `docker exec` and curl

### Volume issues
- Check volume paths
- Verify permissions
- Use named volumes for persistence
- Check volume mounts in compose

## Teaching Best Practices

1. **Hands-on**: Students should run every command
2. **Incremental**: Build complexity gradually
3. **Real examples**: Use actual applications
4. **Troubleshooting**: Show common errors and fixes
5. **Best practices**: Always mention security and optimization

## Time Management

- **Hour 1**: 40 min lecture, 20 min practice
- **Hour 2**: 30 min lecture, 30 min hands-on
- **Hour 3**: 35 min lecture, 25 min practice
- **Hour 4**: 30 min lecture, 30 min optimization
- **Hour 5**: 35 min lecture, 25 min networking
- **Hour 6**: 40 min best practices, 20 min Q&A
- **AWS**: 60-90 min depending on setup complexity

## Final Project Ideas

1. Containerize a full-stack application
2. Set up CI/CD pipeline
3. Deploy to AWS with auto-scaling
4. Create multi-service architecture
5. Implement monitoring and logging

Good luck with your teaching! 🐳

