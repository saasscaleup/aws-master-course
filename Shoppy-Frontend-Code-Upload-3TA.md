# Shoppy-Frontend-Code-Upload.md - 3 Tier Architecture


## Part 5.1 [Step 1️⃣] - Upload Shoppy frontend to S3

In this part we are going to setup the shoppy frontend codebase and upload to S3 Bucket we created at part 0.2

1. Launch CloudShell
2. Download shoppy frontend from github using branch `three-tier-architecture`
3. Create Shoppy Frontend distribution files (`/dist` folder)
4. Setup `nginx.conf` file
5. Upload `shoppy-frontend` folder to S3 Bucket (For later use)


### Step 1 - Launch CloudShell

Use AWS Console...

![Aws CloudShell](https://github.com/saasscaleup/aws-master-course/blob/three-tier-architecture/Launch%20CloudShell.png)


### Step 2 - Download shoppy frontend from github
```sh
git clone -b three-tier-architecture --single-branch https://github.com/saasscaleup/aws-master-course.git
```

### Step 3 - Create Shoppy Frontend distribution files (`/dist` folder)

```sh
cd aws-master-course
cd shoppy-frontend
```


run `npm install` to generate dependencies files

```sh
npm install
```

run `npm run build` to create `/dist` folder

```sh
npm run build
```


Check that `/dist` folder created 

```sh
ls -la
```

### Step 4 - Setup `nginx.conf` file

Edit `nginx.conf` file

```sh
nano nginx.conf
```

Update the value `proxy_pass` with the internal lb dns value:

```
proxy_pass http://[REPLACE-WITH-INTERNAL-LB-DNS]:80/api/;
```

```
        #proxy for internal lb
        location /api/{
            proxy_pass http://[REPLACE-WITH-INTERNAL-LB-DNS]:80/api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            add_header Access-Control-Allow-Origin *; # This might be necessary
        }
```

Then save the file with `ctrl+x` or `command+x` and `y`

### Step 5 - Upload `shoppy-frontend` folder to S3 Bucket (For later use)

```sh
cd /home/cloudshell-user/aws-master-course
```

```sh
aws s3 cp shoppy-frontend/dist s3://BUCKET_NAME/shoppy-frontend/dist/ --recursive
```

```sh
aws s3 cp shoppy-frontend/nginx.conf s3://BUCKET_NAME/shoppy-frontend/nginx.conf --recursive
```

<ht></hr>

Check on S3 that `shoppy-frontend` folder got created and have `/dist` folder and `nginx.conf` file inside ✅