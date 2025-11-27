# Getting Started - Docker with Node.js

Welcome! This guide will help you get started with the Docker and Node.js course.

## Quick Checklist

### Step 1: Install Docker (5-10 minutes)

**Windows:**
1. Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
2. Run the installer
3. Restart your computer
4. Launch Docker Desktop

**macOS:**
1. Download [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
2. Drag Docker to Applications
3. Launch Docker Desktop
4. Or use Homebrew: `brew install --cask docker`

**Linux (Ubuntu/Debian):**
```bash
# Follow installation steps in Hour 1 of README.md
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
sudo systemctl enable docker
```

### Step 2: Verify Installation (2 minutes)

Open your terminal/command prompt and run:

```bash
docker --version
docker-compose --version
docker info
```

You should see version numbers and Docker system information.

### Step 3: Test Docker (3 minutes)

Run your first container:

```bash
docker run hello-world
```

You should see a welcome message from Docker!

### Step 4: Choose Your Learning Path

#### Option A: Self-Paced Learning
1. Start with `QUICK_START.md`
2. Follow examples in order (1-7)
3. Complete exercises as you go
4. Refer to `README.md` for detailed explanations

#### Option B: Instructor-Led
1. Follow `COURSE_OUTLINE.md`
2. Work through each hour systematically
3. Complete exercises after each section
4. Use `INSTRUCTOR_GUIDE.md` for help

### Step 5: Set Up Your Workspace

```bash
# Navigate to the docker-lesson directory
cd docker-lesson

# Explore the structure
ls -la

# Start with the first example
cd examples/1-docker-basics
```

## First Example: Docker Basics

Let's run your first Node.js container:

```bash
# Navigate to first example
cd examples/1-docker-basics

# Install dependencies (if needed)
npm install

# Run with Docker (using volume mount)
docker run -it --rm -v $(pwd):/app -w /app -p 3000:3000 node:18 node app.js
```

Visit `http://localhost:3000` in your browser!

## Common First-Time Issues

### Issue: "Docker daemon is not running"
**Solution:** Start Docker Desktop (Windows/Mac) or run `sudo systemctl start docker` (Linux)

### Issue: "Permission denied" (Linux)
**Solution:** Add your user to docker group:
```bash
sudo usermod -aG docker $USER
# Log out and back in
```

### Issue: "Port already in use"
**Solution:** Change the port or stop the service using port 3000

### Issue: "Command not found: docker"
**Solution:** Docker is not in your PATH. Restart terminal or add Docker to PATH.

## Learning Tips

1. **Type commands yourself** - Don't just copy/paste, understand what each does
2. **Read error messages** - They often tell you exactly what's wrong
3. **Experiment** - Try variations of examples
4. **Use documentation** - Docker docs are excellent
5. **Practice regularly** - Containerize your own apps

## What's Next?

After completing the basics:

1. **Hour 2**: Learn to create Dockerfiles
2. **Hour 3**: Use Docker Compose for multi-container apps
3. **Hour 4**: Optimize with multi-stage builds
4. **Hour 5**: Master networking and volumes
5. **Hour 6**: Apply production best practices
6. **AWS**: Deploy to the cloud

## Need Help?

1. Check `README.md` for detailed explanations
2. Review example code and comments
3. Consult `INSTRUCTOR_GUIDE.md` for solutions
4. Check [Docker Documentation](https://docs.docker.com/)

## Course Structure Overview

```
docker-lesson/
├── README.md              ← Start here for full course content
├── QUICK_START.md         ← Quick reference guide
├── GETTING_STARTED.md     ← You are here!
├── COURSE_OUTLINE.md      ← Course structure
├── INSTRUCTOR_GUIDE.md    ← Solutions and teaching tips
├── SUMMARY.md             ← Course summary
├── examples/              ← Working examples (1-7)
└── exercises/             ← Practice exercises (1-5)
```

## Ready to Begin?

1. ✅ Docker installed and verified
2. ✅ First container run successfully
3. ✅ Understood course structure
4. ✅ Ready to start learning!

**Next Step:** Open `QUICK_START.md` or go directly to `examples/1-docker-basics/README.md`

Happy Learning! 🐳

---

**Pro Tip:** Keep a terminal open and Docker Desktop running while going through the course. You'll be running commands frequently!

