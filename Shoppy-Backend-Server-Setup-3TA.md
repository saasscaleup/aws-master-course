# Shoppy-Backend-Server-Setup-3TA.md - three-tier-architecture
<hr>

## Part 3.3 [Step 1️⃣] - Connect to EC2 & Download Backend Code from S3

In this part we are going install mysql client and download shoppy-backend code from S3

1. Upgrade Ubuntu Server
2. Install mysql-client
3. Download shoppy-backend code from S3

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

### Step 3 - Download shoppy-backend code from S3

```sh
cd /home/ubuntu
```
```sh
aws s3 cp s3://BUCKET_NAME/shoppy-backend/ shoppy-backend --recursive
```

<hr></hr>

## Part 3.4 [Step 2️⃣] - Configure Backend Database & Initial seed

In this part we are going to: 

1. Connect to RDS Mysql Server
2. Initial seed

### Step 1 - Connect to RDS Mysql Server

```sh
cd /home/ubuntu/shoppy-backend
```

```sh
mysql -u <db-username> -h <rds-endpoint-url> -p
```

```sh
show databases;
```

```sh
use shoppy;
```

```sh
show tables;
``

### Step 2 - Create Database and tables

```sh
source database.sql;
```

<hr></hr>

## Part 3.5 [Step 3️⃣] - Configure Backend App Instance

In this part we are going to: 

1. Install Node.js + NPM
2. Install and Configure Node.js package - PM2 
   
### Step 1 - Install Node.js + NPM

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

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
npm install -g pm2 # may require sudo
```

```sh
cd /home/ubuntu/shoppy-backend
```

```sh
npm install
```

```sh
cd src
```

Start server!

```sh
pm2 start server.js --name=shoppy-backend-server
```

Check list of pm2 services 
```sh
pm2 list
```

Check logs of pm2 services 
```sh
pm2 logs
```

```sh
pm2 start server.js --name=shoppy-backend-server
```
Right now, pm2 is just making sure our app stays running when we leave the SSM session. However, if the server is interrupted for some reason, we still want the app to start and keep running. This is also important for the AMI we will create:

```sh
pm2 startup # 
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
