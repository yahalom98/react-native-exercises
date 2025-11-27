# Example 1: Docker Basics

This example demonstrates basic Docker commands and running a simple Node.js application in a container.

## What You'll Learn

- Basic Docker commands
- Running Node.js in containers
- Container lifecycle management
- Port mapping
- Environment variables

## Prerequisites

- Docker installed and running
- Basic knowledge of Node.js

## Step-by-Step Guide

### Step 1: Verify Docker Installation

```bash
docker --version
docker info
```

### Step 2: Pull Node.js Image

```bash
docker pull node:18
```

### Step 3: Run Node.js Interactively

```bash
docker run -it node:18 node
# Type: console.log('Hello from Docker!')
# Press Ctrl+D to exit
```

### Step 4: Run a Node.js Script

Create `hello.js`:
```javascript
console.log('Hello from Docker container!');
console.log('Node version:', process.version);
```

Run it:
```bash
docker run -it --rm -v $(pwd):/app -w /app node:18 node hello.js
```

### Step 5: Create a Simple Express App

Create `app.js`:
```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Docker!',
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
```

Create `package.json`:
```json
{
  "name": "docker-basics-example",
  "version": "1.0.0",
  "main": "app.js",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### Step 6: Run with Volume Mount

```bash
# Install dependencies in container
docker run -it --rm -v $(pwd):/app -w /app node:18 npm install

# Run the app
docker run -it --rm -v $(pwd):/app -w /app -p 3000:3000 node:18 node app.js
```

Visit `http://localhost:3000` in your browser.

### Step 7: Run in Detached Mode

```bash
docker run -d --name my-app -v $(pwd):/app -w /app -p 3000:3000 node:18 node app.js
```

### Step 8: View Logs

```bash
docker logs my-app
docker logs -f my-app  # Follow logs
```

### Step 9: Stop and Remove Container

```bash
docker stop my-app
docker rm my-app
```

## Key Commands Summary

```bash
# Run container
docker run [options] image [command]

# List containers
docker ps              # Running
docker ps -a           # All

# Container management
docker start <id>
docker stop <id>
docker restart <id>
docker rm <id>

# View logs
docker logs <id>

# Execute command in container
docker exec -it <id> bash
```

## Common Options

- `-it`: Interactive terminal
- `-d`: Detached mode (background)
- `-p host:container`: Port mapping
- `-v host:container`: Volume mount
- `-w /path`: Working directory
- `-e KEY=value`: Environment variable
- `--name name`: Container name
- `--rm`: Remove container when it stops

## Next Steps

- Try modifying the app and see changes
- Experiment with different Node.js versions
- Try running multiple containers

