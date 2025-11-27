# Docker with Node.js - Course Outline

## Course Information

**Duration**: 6 hours + AWS Integration (1-2 hours)
**Level**: Intermediate
**Prerequisites**: Basic Node.js knowledge, command line familiarity

## Learning Objectives

By the end of this course, students will be able to:
- Understand containerization and Docker concepts
- Create Dockerfiles for Node.js applications
- Use Docker Compose for multi-container applications
- Optimize Docker images using multi-stage builds
- Configure Docker networking and volumes
- Apply production best practices
- Deploy containers to AWS cloud platforms

## Course Structure

### Hour 1: Docker Basics (60 minutes)
**Topics:**
- What is Docker and why use it?
- Container vs Virtual Machine
- Docker installation (Windows, macOS, Linux)
- Basic Docker commands
- Running Node.js in containers
- Port mapping and volumes

**Hands-on:**
- Install and verify Docker
- Run basic commands
- Execute Node.js scripts in containers
- Practice container lifecycle management

**Exercise:** Exercise 1 - Docker Basics

---

### Hour 2: Dockerfile for Node.js (60 minutes)
**Topics:**
- Understanding Dockerfiles
- Dockerfile instructions (FROM, WORKDIR, COPY, RUN, etc.)
- Building Docker images
- Using .dockerignore
- Best practices for Node.js
- Image optimization

**Hands-on:**
- Create a basic Dockerfile
- Build and run images
- Optimize Dockerfiles
- Compare image sizes

**Exercise:** Exercise 2 - Dockerfile

---

### Hour 3: Docker Compose (60 minutes)
**Topics:**
- What is Docker Compose?
- Creating docker-compose.yml
- Multi-container applications
- Service dependencies
- Volume management
- Environment variables
- Development vs production configs

**Hands-on:**
- Create docker-compose.yml
- Run multi-container apps
- Configure service communication
- Use volumes for data persistence

**Exercise:** Exercise 3 - Docker Compose

---

### Hour 4: Multi-stage Builds & Optimization (60 minutes)
**Topics:**
- Why multi-stage builds?
- Multi-stage Dockerfile syntax
- Reducing image size
- Separating build and runtime
- Production optimizations
- Alpine Linux usage

**Hands-on:**
- Convert single-stage to multi-stage
- Compare image sizes
- Optimize for production
- Use Alpine base images

**Exercise:** Exercise 4 - Multi-stage Builds

---

### Hour 5: Docker Networking & Volumes (60 minutes)
**Topics:**
- Docker networking concepts
- Network types (bridge, host, overlay)
- Creating custom networks
- Volume types (named, bind, anonymous)
- Data persistence
- Container communication

**Hands-on:**
- Create custom networks
- Configure service communication
- Use different volume types
- Implement data persistence

**Exercise:** Review networking examples

---

### Hour 6: Production Best Practices (60 minutes)
**Topics:**
- Security best practices
- Non-root users
- Health checks
- Logging strategies
- Resource limits
- Monitoring
- Graceful shutdown

**Hands-on:**
- Implement security measures
- Add health checks
- Configure logging
- Set resource limits

**Exercise:** Apply best practices to examples

---

### AWS Integration (60-90 minutes)
**Topics:**
- AWS ECR (Elastic Container Registry)
- AWS ECS (Elastic Container Service)
- AWS Fargate
- Creating task definitions
- Deploying to AWS
- CI/CD with GitHub Actions
- Monitoring and scaling

**Hands-on:**
- Push images to ECR
- Create ECS clusters
- Deploy to Fargate
- Set up CI/CD pipeline

**Exercise:** Exercise 5 - AWS Integration

---

## Assessment

### Practical Exercises
1. Containerize a Node.js application
2. Create optimized Dockerfile
3. Set up multi-container application
4. Deploy to AWS

### Knowledge Check
- Docker concepts and terminology
- Dockerfile best practices
- Docker Compose configuration
- Production considerations

## Materials Provided

### Documentation
- ✅ Comprehensive README.md
- ✅ Quick Start Guide
- ✅ Instructor Guide with solutions
- ✅ Course Summary
- ✅ This Course Outline

### Examples
- ✅ 7 complete working examples
- ✅ Step-by-step instructions
- ✅ Code samples
- ✅ Configuration files

### Exercises
- ✅ 5 practice exercises
- ✅ Complete solutions
- ✅ Challenge exercises
- ✅ Real-world scenarios

## Learning Path

### For Students
1. Read QUICK_START.md
2. Follow examples in order (1-7)
3. Complete exercises (1-5)
4. Review solutions
5. Apply to your own projects

### For Instructors
1. Review INSTRUCTOR_GUIDE.md
2. Prepare examples
3. Set up Docker environment
4. Follow hour-by-hour breakdown
5. Use provided solutions

## Time Allocation

| Topic | Time | Type |
|-------|------|------|
| Docker Basics | 60 min | Lecture + Hands-on |
| Dockerfile | 60 min | Lecture + Hands-on |
| Docker Compose | 60 min | Lecture + Hands-on |
| Multi-stage Builds | 60 min | Lecture + Hands-on |
| Networking & Volumes | 60 min | Lecture + Hands-on |
| Production Practices | 60 min | Lecture + Hands-on |
| AWS Integration | 60-90 min | Lecture + Hands-on |
| **Total** | **6-7.5 hours** | |

## Prerequisites Checklist

Before starting, ensure:
- [ ] Docker installed and running
- [ ] Basic Node.js knowledge
- [ ] Command line familiarity
- [ ] Text editor installed
- [ ] AWS account (for AWS section)

## Tools Required

- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose
- Node.js (for local development)
- Text editor (VS Code recommended)
- AWS CLI (for AWS section)
- Git (for CI/CD examples)

## Success Criteria

Students have successfully completed the course when they can:
- ✅ Containerize a Node.js application
- ✅ Write optimized Dockerfiles
- ✅ Use Docker Compose effectively
- ✅ Deploy containers to AWS
- ✅ Apply production best practices

## Additional Resources

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node)
- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

## Support

For questions or issues:
1. Check the README.md for detailed explanations
2. Review example code and comments
3. Consult INSTRUCTOR_GUIDE.md for solutions
4. Refer to official Docker documentation

---

**Ready to start?** Begin with `QUICK_START.md` and work through the examples in order!

Good luck! 🐳

