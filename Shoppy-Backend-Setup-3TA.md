# Shoppy-Backend-Setup.md - 3 Tier Architecture


## Part 3.1 [Step 1️⃣] - Upload Shoppy backend to S3

In this part we are going to setup the shoppy backend codebase and upload to S3 Bucket we created at part 0.2

1. Launch CloudShell
2. Download shoppy backend from github using branch `three-tier-architecture`
3. Setup `shoppy-backend/.env` file
4. Upload `shoppy-backend` folder to S3 Bucket (For later use)


### Step 1 - Launch CloudShell

Use AWS Console...

![Aws CloudShell](https://github.com/saasscaleup/aws-master-course/blob/three-tier-architecture/Launch%20CloudShell.png)


### Step 2 - Download shoppy backend from github
```sh
git clone -b three-tier-architecture --single-branch https://github.com/saasscaleup/aws-master-course.git
```

### Step 3 - Setup `shoppy-backend/.env` file

#### update backend .env MySQL credentials

```sh
cd aws-master-course
cd shoppy-backend
```

Create the `.env` file
```sh
cp .env.copy .env
```

Edit `.env` file

```sh
nano .env
```

Update DB records from AWS RDS Mysql database you created on `Part 2.2 - Create RDS MySQL Database - Multi AZ Deployment`

```
DB_HOST=<RDS-HOST>
DB_USER=<RDS-USER>
DB_PASS=<RDS-PASSWORD>
DB_NAME=<RDS-DATABASE-NAME>
DB_PORT=3306
```

Then save the file with `ctrl+s` or `command+s`

#### Create jwt secret and update .env file

```sh
node
```

```sh
require('crypto').randomBytes(64).toString('hex');
```

copy token and update .env file

```
SECRET=<your-token>
```

### Step 4 - Upload `shoppy-backend` folder to S3 Bucket

```sh
cd /home/cloudshell-user/aws-master-course
```

```sh
aws s3 cp shoppy-backend s3://BUCKET_NAME/shoppy-backend/ --recursive
```
