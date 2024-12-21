# 构建java项目

## docker-compose

```bash
#版本信息
docker-compose version
# Docker Compose version v2.31.0-desktop.2
```
## harbor安装配置
[harbor-online-installer-v2.11.2.tgz](https://github.com/goharbor/harbor/releases/download/v2.11.2/harbor-online-installer-v2.11.2.tgz)

```bash
# 解压
tar -zxvf harbor-online-installer-v2.11.2.tgz
#更换目录
mv harbor-online-installer-v2.11.2 harbor
#进入目录
cd harbor
#复制配置文件
cp harbor.yml.tmpl harbor.yml
#修改配置文件
vim harbor.yml
```
```bash
# The IP address or hostname to access admin UI and registry service.
# DO NOT use localhost or 127.0.0.1, because Harbor needs to be accessed by external clients.
hostname: 192.168.10.30

# http related config
http:
  # port for http, default is 80. If https enabled, this port will redirect to https port
  port: 80

#禁用https
#https:
  # https port for harbor, default is 443
  #port: 443
  # The path of cert and key files for nginx
  #certificate: /your/certificate/path
  #private_key: /your/private/key/path
  # enable strong ssl ciphers (default: false)
  # strong_ssl_ciphers: false

#密码
# Remember Change the admin password from UI after launching Harbor.
harbor_admin_password: Harbor12345
```
```bash
#安装harobr
sh install.sh
#重启
doocker-compose -f doocker-compose .yml up -d
```

## jdk镜像制作-mac版
jdk-17.0.13_macos-aarch64_bin.tar.gz
[下载地址](https://www.oracle.com/cn/java/technologies/downloads/#java17-mac)

### dockerfile文件
```bash
FROM arm64v8/ubuntu:latest
LABEL MAINTAINER="author <2286252881@qq.com>"
RUN mkdir -p /usr/local/java
ADD jdk-17.0.13_linux-aarch64_bin.tar.gz /usr/local/java/
ENV JAVA_HOME=/usr/local/java/jdk-17.0.13
ENV PATH=$PATH:$JAVA_HOME/bin
```

### 构建镜像
```bash
docker build -t centos7-jdk17 .
```
## 项目pom同级目录新增Dockerfile文件
```bash
FROM macos-jdk17:latest
MAINTAINER gytlv
EXPOSE 8510
ADD target/gytlv-service-system.jar /gytlv-service-system.jar

WORKDIR /
ENTRYPOINT ["java","-jar","gytlv-service-system.jar"]
```
## 修改maven配置
```java
<artifactId>gytlv-service-system</artifactId>

<properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <docker.repository>192.168.10.30</docker.repository>
    <docker.registry.name>gytlv</docker.registry.name>
</properties>

<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
        <plugin>
            <groupId>com.spotify</groupId>
            <artifactId>docker-maven-plugin</artifactId>
            <version>1.2.2</version>
            <executions>
                <execution>
                    <id>build-image</id>
                    <phase>package</phase>
                    <goals>
                        <goal>build</goal>
                        <goal>push</goal>
                    </goals>
                </execution>
            </executions>
            <configuration>
                <serverId>harbor</serverId>
                <registryUrl>http://${docker.repository}</registryUrl>
                <dockerHost>http://192.168.10.30:2376</dockerHost>
                <imageName>${docker.repository}/${docker.registry.name}/${project.artifactId}:${project.version}</imageName>
                <dockerDirectory>${project.basedir}</dockerDirectory>
            </configuration>
        </plugin>
    </plugins>
</build>
```

## 构建打包docker镜像
```bash
# 可以用idea自带的构建插件
mvn clean package
```
## 配置项目gytlv-service-gateway.yml
```bash
services:
    gytlv-web-mgr:
        container_name: gytlv-web-mgr
        image: 192.168.10.30/gytlv/gytlv-web-mgr:1.0-SNAPSHOT
        ports:
          - "8603:8603"
```

## 部署项目
```bash
docker-compose -f gytlv-service-gateway.yml up -d
```

小伙伴们快去试试把...