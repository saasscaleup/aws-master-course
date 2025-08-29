# Shoppy-frontend-Server-Setup-3TA.md - three-tier-architecture

In this file you will find out how to:

- Part 3.3 [Step 1️⃣] - Connect to EC2 & Download frontend Code from S3
- Part 3.5 [Step 2️⃣] - Configure frontend nginx web server as reverse proxy
- Part 3.6 [Step 3️⃣] - Test frontend App Tier

<hr></hr>

## Part 3.3 [Step 1️⃣] - Connect to EC2 & Download frontend Code from S3

In this part we are going install mysql client and download shoppy-frontend code from S3

1. Upgrade Ubuntu Server
2. Install mysql-client
3. Install awscli
4. Download shoppy-frontend code from S3

### Step 1 - Update ubuntu server

```sh
sudo apt update
```
```sh
sudo apt upgrade
```

### Step 2 - Install mysql-client

```sh
sudo apt install mysql-client
```

### Step 3 - Install AWS CLI on Ubuntu 24

Follow these steps to install the AWS CLI on Ubuntu 24.

#### 1. Install Dependencies

AWS CLI requires some dependencies. Install them using the following command:

```bash
sudo apt install curl unzip -y
```

#### 2. Download the AWS CLI Installer

Use the following command to download the AWS CLI version 2 installer.

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
```

#### 4. Unzip the Installer

Unzip the downloaded file.

```bash
unzip awscliv2.zip
```

#### 5. Run the Installer

Run the install program with the `sudo` command to install the AWS CLI.

```bash
sudo ./aws/install
```

#### 6. Verify the Installation

To confirm that the installation was successful, use the following command:

```bash
aws --version
```

You should see output indicating that the AWS CLI is installed and showing the version number.


### Step 4 - Download shoppy-frontend code from S3

```sh
cd /home/ubuntu
```
```sh
aws s3 cp s3://BUCKET_NAME/shoppy-frontend/ shoppy-frontend --recursive
```

<hr></hr>

## Part 3.4 [Step 2️⃣] - Configure frontend Database & Initial seed

In this part we are going to: 

1. Connect to RDS Mysql Server
2. Initial seed

### Step 1 - Connect to RDS Mysql Server

```sh
cd /home/ubuntu/shoppy-frontend
```

```sh
mysql -u <db-username> -h <rds-endpoint-url> -p
```

### Step 2 - Create Database and tables

```sh
source database.sql;
```

```sh
show databases;
```

```sh
use shoppy;
```

```sh
show tables;
```

<hr></hr>

## Part 3.5 [Step 3️⃣] - Configure frontend App Instance

In this part we are going to: 

1. Install Node.js + NPM
2. Install and Configure Node.js package - PM2 
   
### Step 1 - Install Node.js + NPM

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

After running this, you will see a message similar to this.
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

**DO NOT run the above command**, rather you should copy and past the command in the output you see in your own terminal. 


After you copied and pasted the command and pressed enter. You should run this next 

```sh
nvm install --lts # Latest stable node js server version
```

Check if Installed

```sh
node -v
```
```sh
npm -v
```

### Step 2 - Install and Configure Node.js package - PM2

```sh
npm install -g pm2
```

```sh
cd /home/ubuntu/shoppy-frontend
```

```sh
npm install
```


**Start server!**

```sh
export $(cat .env | xargs) && pm2 start src/server.js --name=shoppy-frontend-server
```

Check list of pm2 services 
```sh
pm2 list
```

Check logs of pm2 services 
```sh
pm2 logs
```

Right now, pm2 is just making sure our app stays running when we leave the SSM session. However, if the server is interrupted for some reason, we still want the app to start and keep running. This is also important for the AMI we will create:

```sh
pm2 startup 
```

After running this you will see a message similar to this.

```
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.0.0/bin /home/ubuntu/.nvm/versions/node/v20.0.0/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu —hp /home/ubuntu
```

**DO NOT run the above command**, rather you should copy and past the command in the output you see in your own terminal. 
After you run it, save the current list of node processes with the following command:

```sh
pm2 save
```


<hr></hr>

## Part 3.6 [Step 4️⃣] - Test frontend App Tier


To ensure your app is configured correctly and can retrieve data from the database, follow these steps:

### 1. Health Check Endpoint

To check if the app is running, use the following command in your SSM terminal to hit the health check endpoint:

```bash
curl http://localhost:3000/health
```

The response should look like the following:

```json
{"status":"OK","message":"Server is healthy!"}
```

### 2. Database Connection Test

Next, test your database connection by hitting the following endpoint locally:

```bash
curl http://localhost:3000/api/database-health
```

You should see a response containing this:

```json
{"status":"OK","message":"Database is healthy!","result":[{"total_users":0}]}
```

### Conclusion

If you see both of these responses, then your networking, security, database, and app configurations are correct.

**Congrats!🥳** Your app layer is fully configured and ready to go.👍✅

---
