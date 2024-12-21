# docker软件安装

## docker 安装mysql

```bash
docker run --name mysql_gytlv --restart=always -v ~/apps/docker/mysql:/var/lib/mysql -p 3306:3306 -e MYSQL\_ROOT\_PASSWORD=123456 mysql:8.0.30
```

## docker安装nacos

### 运行

```bash
docker run --env MODE=standalone --name nacos -d -p 8848:8848 nacos/nacos-server:v2.2.2-slim
```

### 数据库版本-sql文件

```apl
https://github.com/alibaba/nacos/blob/2.2.1-RC-develop/config/src/main/resources/META-INF/nacos-db.sql
```

### 数据库版本-配置

```bash
docker run -d \
--name nacos_2.2.2 \
-p 8848:8848 \
-p 9848:9848 \
-p 9849:9849 \
--privileged=true \
--restart=always \
-e JVM_XMS=1024m \
-e JVM_XMX=1024m \
-e MODE=standalone \
-e PREFER_HOST_MODE=192.168.10.30 \
-e SPRING_DATASOURCE_PLATFORM=mysql \
-e MYSQL_SERVICE_HOST=192.168.10.30 \
-e MYSQL_SERVICE_PORT=3306 \
-e MYSQL_SERVICE_DB_NAME=nacos \
-e MYSQL_SERVICE_USER=root \
-e MYSQL_SERVICE_PASSWORD=123456 \
nacos/nacos-server:v2.2.2-slim
```

## docker 安装rabbitmq

```bash
docker run -d --name=rabbitmq --restart=always -p 5672:5672 -p 15672:15672 rabbitmq:3.12.0-management 
```
rabbitmq_delayed_message_exchange-3.12.0.ez [下载插件](https://www.rabbitmq.com/community-plugins.html)

```bash
docker cp rabbitmq_delayed_message_exchange-3.12.0.ez rabbitmq:/plugins
```

​		进入容器执行

```bash
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```



## docker安装nginx

### 运行

```bash
docker pull nginx:latest
docker run -p 80:80 --name ng nginx:latest
```

### 复制配置文件

```bash
docker cp nginx:/etc/nginx ~/apps/docker/nginx/conf
docker cp nginx:/etc/nginx/nginx.conf ~/apps/docker/nginx/conf/nginx.conf
docker cp nginx:/etc/nginx/conf.d ~/apps/docker/nginx/conf/conf.d
docker cp nginx:/usr/share/nginx/html ~/apps/docker/nginx/html
```

### 挂载目录运行

```bash
docker run --restart=always -p 82:80 --name nginx \
-v ~/apps/docker/nginx/html:/usr/share/nginx/html \
-v ~/apps/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v ~/apps/docker/nginx/conf/conf.d:/etc/nginx/conf.d \
-d nginx
```

## docker安装redis

```bash
docker run --restart=always --name redis -p 6380:6379  -d redis:6.0.8 --requirepass "123456" --appendonly yes
```

## docker安装jenkins

```bash
docker run -u root -p 8080:8080 -p 50000:50000 -d --name jenkins --restart=always -v ~/apps/docker/jenkins/jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk17
#密码
95508674ca464137a3085f3f453e95ab
```

```bash
cd ~/apps/docker/jenkins/jenkins_home
#修改插件下载地址
vi hudson.model.UpdateCenter.xml
#阿里地址源
https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
```

```bash
docker run \
  -u root \
  --rm \
  -d \
  -p 8080:8080 \
  -p 50000:50000 \
  -v ~/apps/docker/jenkins/jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkinsci/blueocean
```

## docker安装minio

```bash
docker run \
	--restart=always \
   -p 9000:9000 \
   -p 9090:9090 \
   --name minio \
   -v ~/apps/docker/minio/data:/data \
   -e "MINIO_ROOT_USER=admin" \
   -e "MINIO_ROOT_PASSWORD=admin123456" \
   -d \
   quay.io/minio/minio server /data --console-address ":9090"
```