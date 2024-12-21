# docker安装

## 更新yum包

```bash
yum -y update
```

## 卸载旧版本（如果以前安装过，否则此步骤可以忽略

```bash
yum remove docker-ce docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
```

## 安装docker

```bash
yum install -y yum-utils device-mapper-persistent-data lvm2
```

## 设置yum源

```bash
yum-config-manager --add-repo http://download.docker.com/linux/centos/docker-ce.repo
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

## 安装最新版本的 Docker Engine-Community 和 containerd

```bash
yum -y install docker-ce docker-ce-cli containerd.io
```

## 查看安装版本

```bash
yum list docker-ce --showduplicates | sort -r
```

## 安装指定版本

```bash
yum -y install docker-ce-27.1.2 docker-ce-cli-27.1.2 containerd.io
```

## 查看版本

```bash
docker -v
docer version
```

## 启动docker并设置开机自启

```bash
systemctl start docker
#开机自动启动
systemctl enable docker
#停止docker
systemctl stop docker 
#重启docker
systemctl restart docker
#查看状态
systemctl status docker
```