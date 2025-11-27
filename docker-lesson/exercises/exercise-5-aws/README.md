# Exercise 5: AWS Integration

## Objectives

- Push images to AWS ECR
- Create ECS task definitions
- Deploy to AWS Fargate
- Set up CI/CD pipeline

## Prerequisites

- AWS Account
- AWS CLI configured
- Docker installed
- GitHub account (for CI/CD)

## Tasks

### Task 1: Push Image to ECR

1. Create an ECR repository
2. Authenticate Docker with ECR
3. Build and push your image

**Solution:**

```bash
# 1. Create repository
aws ecr create-repository \
  --repository-name my-node-app \
  --region us-east-1

# 2. Get login token
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com

# 3. Build image
docker build -t my-node-app .

# 4. Tag image
docker tag my-node-app:latest \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-node-app:latest

# 5. Push image
docker push \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-node-app:latest
```

### Task 2: Create ECS Task Definition

Create a task definition JSON file for your Node.js application.

**Solution:**

**task-definition.json:**
```json
{
  "family": "my-node-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskExecutionRole",
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
        },
        {
          "name": "PORT",
          "value": "3000"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/my-node-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": [
          "CMD-SHELL",
          "node -e \"require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})\""
        ],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
```

Register:
```bash
# Create log group
aws logs create-log-group --log-group-name /ecs/my-node-app

# Register task definition
aws ecs register-task-definition \
  --cli-input-json file://task-definition.json
```

### Task 3: Create ECS Service

Create an ECS service running on Fargate.

**Solution:**

```bash
# Get VPC and subnet IDs
aws ec2 describe-vpcs
aws ec2 describe-subnets --filters "Name=vpc-id,Values=<vpc-id>"

# Create security group
aws ec2 create-security-group \
  --group-name ecs-sg \
  --description "ECS Security Group" \
  --vpc-id <vpc-id>

# Allow inbound traffic
aws ec2 authorize-security-group-ingress \
  --group-id <sg-id> \
  --protocol tcp \
  --port 3000 \
  --cidr 0.0.0.0/0

# Create service
aws ecs create-service \
  --cluster my-cluster \
  --service-name my-node-app-service \
  --task-definition my-node-app \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

### Task 4: GitHub Actions CI/CD

Create a GitHub Actions workflow to automatically build and deploy to ECS.

**Solution:**

**.github/workflows/deploy.yml:**
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

    - name: Build, tag, and push image
      id: build-image
      env:
        ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
        IMAGE_TAG: ${{ github.sha }}
      run: |
        docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
        docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
        echo "image=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG" >> $GITHUB_OUTPUT

    - name: Update task definition
      id: task-def
      uses: aws-actions/amazon-ecs-render-task-definition@v1
      with:
        task-definition: task-definition.json
        container-name: my-node-app
        image: ${{ steps.build-image.outputs.image }}

    - name: Deploy to ECS
      uses: aws-actions/amazon-ecs-deploy-task-definition@v1
      with:
        task-definition: ${{ steps.task-def.outputs.task-definition }}
        service: ${{ env.ECS_SERVICE }}
        cluster: ${{ env.ECS_CLUSTER }}
        wait-for-service-stability: true
```

### Task 5: Update Service

Update the running ECS service to use a new image version.

**Solution:**

```bash
# Update task definition with new image
aws ecs register-task-definition \
  --cli-input-json file://task-definition.json

# Update service
aws ecs update-service \
  --cluster my-cluster \
  --service my-node-app-service \
  --task-definition my-node-app:2 \
  --force-new-deployment
```

## Challenge Exercise

Set up a complete CI/CD pipeline with:
1. Automated testing before deployment
2. Build and push to ECR
3. Deploy to staging environment
4. Run integration tests
5. Deploy to production with approval
6. Rollback capability

**Solution:**

**.github/workflows/ci-cd.yml:**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY: my-node-app

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run lint

  build:
    name: Build and Push
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to ECR
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build and push
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG

  deploy-staging:
    name: Deploy to Staging
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to staging
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: task-definition-staging.json
          service: my-node-app-staging
          cluster: my-cluster
          wait-for-service-stability: true

  deploy-production:
    name: Deploy to Production
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://my-app.example.com
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: task-definition-prod.json
          service: my-node-app-prod
          cluster: my-cluster
          wait-for-service-stability: true
```

