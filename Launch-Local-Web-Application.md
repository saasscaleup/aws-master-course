# Launch-Local-Web-Application.md | Install Shoppy

## Part 1.5 - Install Requirements

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

check if Installed

```sh
node -v
```
```sh
npm -v
```

### Step 3 - Install NGINX

```sh
sudo apt install nginx
```

### Step 4 - Install mysql
sudo apt install mysql-server


## Part 1.6 - Configuration

In this part we will clone our Shoppy web application and configure our Web Application services

1. Git clone Shoppy repository
2. Set Nginx
3. Set Mysql

### Step 1 - Setup Shoppy WebApp


```sh
cd /home/ubuntu
```

```sh
git clone https://github.com/saasscaleup/aws-master-course.git shoppy
```sh

#### Setup Backend

```sh
cd /home/ubuntu/shoppy/shoppy-backend
```
```sh
npm install
```

##### Create jwt secret and update .env file
```sh
node
```
```sh
require('crypto').randomBytes(64).toString('hex');
```

copy token and update .env file

#### Setup Frontend

```sh
cd /home/ubuntu/shoppy/shoppy-frontend
```
```sh
npm install
```

##### Update frontend .env file with the right url
```sh
nano .env
```

### Setup Nginx

// add access 
```sh
sudo gpasswd -a www-data ubuntu

ln -s /etc/nginx/sites-available/shoppy.conf /etc/nginx/sites-enabled/

sudo nginx -t
sudo systemctl restart nginx
```

### Setup MySQL

```sh
sudo mysql
CREATE USER 'your_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON *.* TO 'your_user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```


