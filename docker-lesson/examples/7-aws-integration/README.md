# Example 7: AWS Integration

This example demonstrates how to deploy Docker containers to AWS using ECR, ECS, and Fargate.

## What You'll Learn

- Setting up AWS ECR
- Pushing images to ECR
- Creating ECS clusters
- Deploying to Fargate
- CI/CD with GitHub Actions

## Prerequisites

- AWS Account
- AWS CLI installed and configured
- Docker installed
- GitHub account (for CI/CD)

## Step-by-Step Guide

### Step 1: Install and Configure AWS CLI

```bash
# Install AWS CLI (macOS)
brew install awscli

# Install AWS CLI (Linux)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS CLI
aws configure
# Enter: Access Key ID, Secret Access Key, Region, Output format
```

### Step 2: Create ECR Repository

```bash
# Create repository
aws ecr create-repository \
  --repository-name my-node-app \
  --region us-east-1

# Get repository URI
aws ecr describe-repositories \
  --repository-names my-node-app \
  --region us-east-1
```

### Step 3: Build and Push Image

```bash
# Get login token
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build image
docker build -t my-node-app .

# Tag image
docker tag my-node-app:latest \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-node-app:latest

# Push image
docker push \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-node-app:latest
```

### Step 4: Create ECS Cluster

```bash
# Create cluster
aws ecs create-cluster \
  --cluster-name my-cluster \
  --region us-east-1
```

### Step 5: Create Task Definition

**task-definition.json:**
```json
{
  "family": "my-node-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskRole",
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

```bash
# Create CloudWatch log group
aws logs create-log-group --log-group-name /ecs/my-node-app

# Register task definition
aws ecs register-task-definition \
  --cli-input-json file://task-definition.json
```

### Step 6: Create VPC and Networking

```bash
# Get default VPC
aws ec2 describe-vpcs --filters "Name=isDefault,Values=true"

# Get subnets
aws ec2 describe-subnets \
  --filters "Name=vpc-id,Values=<vpc-id>"

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
```

### Step 7: Create ECS Service

```bash
aws ecs create-service \
  --cluster my-cluster \
  --service-name my-node-app-service \
  --task-definition my-node-app \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-xxx],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:<account-id>:targetgroup/my-tg/xxx,containerName=my-node-app,containerPort=3000"
```

### Step 8: CI/CD with GitHub Actions

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

### Step 9: Set Up GitHub Secrets

In GitHub repository settings, add:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

### Step 10: Alternative - AWS App Runner

App Runner is simpler for containerized apps:

```bash
# Create App Runner service
aws apprunner create-service \
  --service-name my-node-app \
  --source-configuration '{
    "ImageRepository": {
      "ImageIdentifier": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/my-node-app:latest",
      "ImageRepositoryType": "ECR",
      "ImageConfiguration": {
        "Port": "3000",
        "RuntimeEnvironmentVariables": {
          "NODE_ENV": "production"
        }
      }
    },
    "AutoDeploymentsEnabled": true
  }' \
  --instance-configuration '{
    "Cpu": "1 vCPU",
    "Memory": "2 GB"
  }'
```

## IAM Roles Setup

### Task Execution Role

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
```

### Task Role

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

## Monitoring

### CloudWatch Dashboard

```bash
# Create dashboard
aws cloudwatch put-dashboard \
  --dashboard-name ECS-Dashboard \
  --dashboard-body file://dashboard.json
```

### Alarms

```bash
# CPU utilization alarm
aws cloudwatch put-metric-alarm \
  --alarm-name ecs-cpu-high \
  --alarm-description "Alert when CPU exceeds 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2
```

## Cost Optimization

1. **Use Fargate Spot**: 70% cost savings
2. **Right-size containers**: Match CPU/memory to needs
3. **Auto-scaling**: Scale down during low traffic
4. **Reserved capacity**: For predictable workloads
5. **Clean up**: Remove unused images and resources

## Troubleshooting

```bash
# View service events
aws ecs describe-services \
  --cluster my-cluster \
  --services my-node-app-service

# View task logs
aws logs tail /ecs/my-node-app --follow

# Describe running tasks
aws ecs describe-tasks \
  --cluster my-cluster \
  --tasks <task-id>
```

## Best Practices

1. **Use IAM roles**: Never hardcode credentials
2. **Enable logging**: CloudWatch Logs
3. **Set resource limits**: Prevent overconsumption
4. **Use health checks**: Automatic recovery
5. **Enable auto-scaling**: Handle traffic spikes
6. **Tag resources**: Cost tracking
7. **Use secrets manager**: For sensitive data
8. **Enable encryption**: At rest and in transit

## Next Steps

- Set up Application Load Balancer
- Configure auto-scaling
- Set up monitoring and alerts
- Implement blue/green deployments
- Use AWS Secrets Manager

