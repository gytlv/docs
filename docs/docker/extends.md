# docker持续集成

## linux安装jdk17

```bash
sudo yum install java-17-openjdk
java -version
```

## linux安装jenkins

### 安装jenkins

```bash
#配置
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
#下载jenkins
yum install jenkins
#设置jenkins开机自启动
sudo systemctl enable jenkins
#启动jenkins
sudo systemctl start jenkins
#配置仓库地址
sed -i 's|updates.jenkins.io/update-center.json|mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json|g' /var/lib/jenkins/hudson.model.UpdateCenter.xml
#查看jenkins状态
sudo systemctl status jenkins
#关闭
systemctl stop firewalld
#开机关闭防火墙
systemctl disable firewalld
```

### 配置jdk

```bash
[root@localhost soft]# which java
/usr/bin/java
```

### 配置git

```bash
yum install git
[root@localhost soft]# which git
/usr/bin/git
```

### 配置maven

```bash
#配置环境变量
export PATH=$PATH:/root/soft/apache-maven-3.9.8/bin
source /etc/profile
#验证mvn
[root@localhost bin]# mvn -v
Apache Maven 3.9.8 (36645f6c9b5079805ea5009217e36f2cffd34256)
Maven home: /root/soft/apache-maven-3.9.8
Java version: 17.0.11, vendor: Red Hat, Inc., runtime: /usr/lib/jvm/java-17-openjdk-17.0.11.0.9-2.el9.x86_64
Default locale: zh_CN, platform encoding: UTF-8
OS name: "linux", version: "5.14.0-496.el9.x86_64", arch: "amd64", family: "unix"
#配置mvn
[root@localhost bin]# which mvn
/root/soft/apache-maven-3.9.8/bin/mvn
```

### 配置nodejs插件

```bash
Dashboard ->Manage Jenkins ->Plugins ->Available plugins 搜索 nodejs
#配置环境变量
export PATH=$PATH:/root/soft/node-v20.16.0-linux-x64/bin
#使配置生效
source /etc/profile
[root@localhost node-v20.16.0-linux-x64]# node -v
v20.16.0
#jenkins配置node
[root@localhost node-v20.16.0-linux-x64]# which node
/root/soft/node-v20.16.0-linux-x64/bin/node
```



## linux防火墙常用命令

```bash
#查看
systemctl status firewalld
# 启动防火墙
systemctl start firewalld
#关闭
systemctl stop firewalld
#重启
systemctl restart firewalld
#开机自启
systemctl enable firewalld
#开机关闭防火墙
systemctl disable firewalld
#查看防火墙规则（只显示/etc/firewalld/zones/public.xml中防火墙策略）
firewall-cmd --list-all
#查看所有的防火墙策略（即显示/etc/firewalld/zones/下的所有策略）
firewall-cmd --list-all-zones
#重新加载配置文件，更新防火墙规则
firewall-cmd --reload
# 查看已开放的端口
firewall-cmd --list-port
# 添加开放80端口
firewall-cmd --zone=public --add-port=80/tcp —-permanent
# 删除80端口
firewall-cmd --zone=public --remove-port=80/tcp —permanent
```

## 安装gitlab

### 安装

```bash
mkdir -p ~/apps/docker/gitlab
cd ~/apps/docker
vim ~/apps/docker/docker-compose.yml
#gitlib
version: "3"
services:
  gitlab:
    container_name: gitlab
    image: gitlab/gitlab-ce:latest
    hostname: '192.168.101.102'
    restart: always
    ports:
      - 8011:8011
      - 8443:443
      - 2222:22/tcp
    volumes:
      - /etc/localtime:/etc/localtime
      - ~/apps/docker/gitlab/config:/etc/gitlab
      - ~/apps/docker/gitlab/logs:/var/log/gitlab
      - ~/apps/docker/gitlab/data:/var/opt/gitlab
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://192.168.101.102:8011'
        gitlab_rails['gitlab_shell_ssh_port'] = 2222
    deploy:
      resources:
        limits:
           memory: 4G
        reservations:
           memory: 1G
#docker-compose部署gitlab
docker-compose up -d
```

### 重置登陆密码

```bash
#进入gitlab容器
docker exec -it gitlab /bin/bash
#进入控制台
gitlab-rails console -e production
#查询超级管理员
user = User.where(id:1).first
#修改密码
user.password='XXXXX'
#保存
user.save!
#退出
exit
#重启容器
docker restart gitlab
```

### 配置运行内存

```bash
cd ~/apps/docker/gitlab/config
vim gitlab.rb
#搜索
/puma
#配置
puma['worker_processes'] = 2                                                        
puma['min_threads'] = 4                                                              
puma['max_threads'] = 4 
#重启
docker restart gitlab
```

## 安装nexus

### 复制配置文件

```bash
docker run -d -p 8082:8082  --restart=always sonatype/nexus3
docker cp a43f2c4cf960:/nexus-data ~/apps/docker/nexus-data/
```

### 运行nexus

```bash
docker run -d -p 8082:8081  --restart=always --name nexus  --privileged=true -e INSTALL4J_ADD_VM_PARAMS="-Xms1024M -Xmx1024M -XX:MaxDirectMemorySize=1024M" -v ~/apps/docker/nexus-data:/var/nexus-data sonatype/nexus3
```

### 获取密码

```bash
docker exec -it nexus /bin/bash
#查看密码
cat /nexus-data/admin.password
```

### 关闭欢迎页面报错

```html
打开Administration- > System- > Capabilities。选择Outreach Management功能。
点击 Disable 按钮。您的更改将立即保存。
```

## 安装harbor

### 解压harbor插件

```bash
find / -name docker-compose 
cp /usr/libexec/docker/cli-plugins/docker-compose /usr/local/bin/
 #查看版本
docker-compose -v
#修改配置文件
vim harbor.yml
#修改ip、端口(禁用https)
hostname: 192.168.101.102
# http related config
http:
  # port for http, default is 80. If https enabled, this port will redirect to https port
  port: 90
# https related config
#https:
  # https port for harbor, default is 443
  #port: 443
  # The path of cert and key files for nginx
  #certificate: /your/certificate/path
  #private_key: /your/private/key/path
  # enable strong ssl ciphers (default: false)
  # strong_ssl_ciphers: false
  
#执行命令
./prepare
#安装
./install.sh
#通过docker-compose启动
docker-compose up -d
```