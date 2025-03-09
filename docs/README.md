# Fedeira Investment Services

A serverless project for investment services using PPI API's, AWS Lambda, DynamoDB, and S3.

## 🚀 Getting Started

This guide provides instructions on how to run the project both locally (for testing) and in production.

## 📌 Prerequisites

Make sure you have the following installed:

Node.js (>= 18.x)
npm (or yarn)
AWS CLI (configured with your AWS credentials)
Serverless Framework (npm install -g serverless)
Docker (for local DynamoDB)
Node.js & TypeScript

## 🏗 Installation

Clone the repository and install dependencies:

git clone https://github.com/your-repo/fedeira-investment-services.git
cd fedeira-investment-services
npm install

## 🔧 Running Locally (Test Mode)

To run the project locally, follow these steps:

### 1. Start Local DynamoDB:

npm run offline-db-init
This will start DynamoDB locally using Docker.

### 2. Verify Local Database:

npm run offline-db-verify
This ensures that DynamoDB is running and accessible.

### 3. Run Migrations (if needed):

npm run offline-db-migrate
This will create required tables in the local DynamoDB instance.

### 4. Start the Serverless Offline API:

npm run offline
This will start a local API endpoint at http://localhost:3000.

### Test the API: Use Postman or any other tool to test the API

## 🚀 Deploying to AWS (Production Mode)

Ensure AWS CLI is configured:

### 1. aws configure

Set up your AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION.

### 2. Deploy to AWS:

npm run deploy
This will package and deploy your services to AWS.

Check Deployed API Gateway URL: After deployment, Serverless will output the API URL. You can verify with the AWS Console and postman.

## 🔍 Debugging

Use serverless logs -f getAvailableBalance to check logs.
If an issue occurs in AWS Lambda, enable logging in CloudWatch.

## 📜 Environment Variables

The project relies on AWS Systems Manager (SSM) Parameter Store for environment variables.

To check the stored variables in AWS:

aws ssm get-parameters-by-path --path /ppi

For local testing, you can create a .env file with the following variables and adjust serverless.yml to use them:

PPI_API_VERSION=your_api_version
PPI_API_KEY=your_api_key
PPI_API_SECRET=your_api_secret
PPI_ACCOUNT_NUMBER=your_account_number
IS_OFFLINE=true

## 📌 Useful Commands

Command Description:
npm run build Compile TypeScript files
npm run offline-db-init Start local DynamoDB
npm run offline-db-verify Verify local DynamoDB tables
npm run offline-db-migrate Run database migrations locally
npm run offline Run API locally
npm run deploy Deploy to AWS
serverless logs -f getAvailableBalance View logs for a function

## 📚 Technologies Used

Node.js & TypeScript
Serverless Framework
AWS Lambda
AWS DynamoDB
AWS S3
AWS Systems Manager (SSM)
Serverless Offline
Pino Logging
