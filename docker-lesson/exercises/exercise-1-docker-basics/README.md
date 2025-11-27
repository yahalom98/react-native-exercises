# Exercise 1: Docker Basics

## Objectives

- Practice basic Docker commands
- Run Node.js applications in containers
- Understand container lifecycle
- Work with volumes and ports

## Tasks

### Task 1: Basic Container Operations

1. Pull the Node.js 18 image
2. Run a Node.js container interactively and execute `console.log('Hello Docker!')`
3. List all running containers
4. List all containers (including stopped)

**Solution:**
```bash
# 1. Pull image
docker pull node:18

# 2. Run interactively
docker run -it node:18 node
# Then type: console.log('Hello Docker!')

# 3. List running containers
docker ps

# 4. List all containers
docker ps -a
```

### Task 2: Create and Run a Simple App

Create a file `hello.js`:
```javascript
console.log('Hello from Docker!');
console.log('Node version:', process.version);
console.log('Current time:', new Date().toISOString());
```

Run this file in a Docker container using volume mounting.

**Solution:**
```bash
# Run with volume mount
docker run -it --rm -v $(pwd):/app -w /app node:18 node hello.js
```

### Task 3: Port Mapping

Create an Express app that listens on port 3000 and returns a JSON response. Run it in a container and access it from your host machine.

**Solution:**

Create `app.js`:
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Docker container!',
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
  "name": "exercise-1",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

Run:
```bash
# Install dependencies
docker run -it --rm -v $(pwd):/app -w /app node:18 npm install

# Run app with port mapping
docker run -it --rm -v $(pwd):/app -w /app -p 3000:3000 node:18 node app.js
```

Visit http://localhost:3000

### Task 4: Container Management

1. Run a container in detached mode with name "my-app"
2. View its logs
3. Stop the container
4. Remove the container

**Solution:**
```bash
# 1. Run in detached mode
docker run -d --name my-app -v $(pwd):/app -w /app -p 3000:3000 node:18 node app.js

# 2. View logs
docker logs my-app
docker logs -f my-app  # Follow logs

# 3. Stop container
docker stop my-app

# 4. Remove container
docker rm my-app
```

### Task 5: Environment Variables

Modify your app to read an environment variable `MESSAGE` and display it. Run the container with this environment variable set.

**Solution:**

Update `app.js`:
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    message: process.env.MESSAGE || 'Default message',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
```

Run:
```bash
docker run -it --rm -v $(pwd):/app -w /app -p 3000:3000 \
  -e MESSAGE="Hello from environment variable!" \
  node:18 node app.js
```

## Challenge Exercise

Create a Node.js app that:
1. Reads a file from a mounted volume
2. Displays its contents via HTTP endpoint
3. Allows writing to the file via POST request
4. Persists data using Docker volumes

**Solution:**

Create `file-app.js`:
```javascript
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());

const dataFile = '/data/messages.json';

// Initialize file
async function initFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify([]));
  }
}

app.get('/messages', async (req, res) => {
  try {
    const data = await fs.readFile(dataFile, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/messages', async (req, res) => {
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

const port = 3000;
initFile().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
});
```

Run:
```bash
# Create volume
docker volume create app-data

# Run with volume
docker run -it --rm -v $(pwd):/app -v app-data:/data \
  -w /app -p 3000:3000 node:18 node file-app.js
```

Test:
```bash
# Get messages
curl http://localhost:3000/messages

# Add message
curl -X POST http://localhost:3000/messages \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from Docker!"}'
```

