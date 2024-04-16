# Launch-Local-Web-Application.md - Monolithic Architecture | Install Shoppy


## Part 1.5 [Step 1️⃣] - Install Requirements

In this part we are going to update Ec2 instance and install Requirements

1. Install NODE
2. Install Nginx
3. Install Mysql

   
### Step 1 - Update ubuntu server
```sh
sudo apt update
```
```sh
sudo apt upgrade
```

### Step 2 - Install Node.js + NPM

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

```sh
node
```

### Step 3 - Install NGINX

```sh
sudo apt install nginx
```

Check if Installed

```sh
sudo systemctl status nginx
```

Go to server IP address and check =...

### Step 4 - Install mysql

sudo apt install mysql-server

Check if Installed

```sh
sudo systemctl status mysql
```

## Part 1.6 [Step 2️⃣] - Configuration

In this part we will clone our Shoppy web application and configure our Web Application services

1. Set Mysql
2. Git clone Shoppy repository
3. Set Nginx

### Setup 1 - Set MySQL


#### Create MySQL user

```sh
sudo mysql
CREATE USER 'shoppy_user'@'localhost' IDENTIFIED BY '12345678';
GRANT ALL PRIVILEGES ON *.* TO 'shoppy_user'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```

### Step 2 - Setup Shoppy WebApp

```sh
cd /home/ubuntu
```

```sh
git clone https://github.com/saasscaleup/aws-master-course.git shoppy
```

```sh
git checkout monolithic-architecture
```

#### Setup Backend

```sh
cd /home/ubuntu/shoppy/shoppy-backend
```

```sh
npm install
```

Check your server Ip with port 3000
http://server_ip:3000

##### Init Database

```sh
sudo mysql
source database.sql;
```

##### update backend .env MySQL credentials

```sh
nano .env
```

```
DB_HOST=localhost
DB_USER=shoppy_user
DB_PASS=12345678
DB_NAME=shoppy
DB_PORT=3306
```

##### Create jwt secret and update .env file

```sh
node
```

```sh
require('crypto').randomBytes(64).toString('hex');
```

copy token and update .env file

```
secret=<your-token>
```

#### Setup Frontend

```sh
cd /home/ubuntu/shoppy/shoppy-frontend
```
```sh
npm install
```

##### Update frontend .env file with the right url

```sh
cp .env.copy .env
```

```sh
nano .env
```

```sh
VITE_APP_API_BASE_URL=http://localhost:3000/api
```

##### Create dist files

```sh
npm run build
```

### Setup Nginx

copy nginx conf file

```sh
sudo cp /home/ubuntu/shoppy/shoppy.conf /etc/nginx/sites-available/
```

Add access to nginx 

```sh
sudo gpasswd -a www-data ubuntu
```

Remove default config

```sh
sudo rm /etc/nginx/sites-enabled/default
```

Enable Shoppy config 
```sh
sudo ln -s /etc/nginx/sites-available/shoppy.conf /etc/nginx/sites-enabled/
```

Check and restart Nginx service

```sh
sudo nginx -t
sudo systemctl restart nginx
```

### Check everything is working
1. Go to server Ip and check that Shoppy frontend is loading
2. Run Shoppy backend server and check that Database and Shoopy app are working

