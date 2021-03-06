---
title: Docker容器的使用
date: 2020-12-23 16:07:48
top_img: /img/docker.jpg
cover: /img/docker_cover.jpg
tags:
	- Docker
	- 树莓派
	- 容器
	- Linux
categories: [树莓派, Docker]
---

## 获取镜像

```bash
docker pull imageName
```

## 启动容器

```bash
docker run -it --restart always  node /bin/bash
# -i: 交互式操作
# -t: 终端
# --restart: 自动重启策略 no(默认) on-failure:3(意外退出自动重启，上限3) always(总是)
#            unless-stopped(总是，不考虑在Docker守护进程启动时就已经停止了的容器)
# node: node 镜像
# /bin/bash：放在镜像名后的是命令，采用交互式 Shell
# exit 退出交互式 shell
```

## 后台运行容器

```bash
docker run -itd --name node007 node
# -d 不进入容器
# --name node007 指定容器名为 node007
```

## 进入后台运行中的容器

```bash
docker attach 容器id 或者 容器名
# 退出后会导致该容器停止，不推荐使用
docker exec -it 容器id 或者 容器名 /bin/bash
# 退出后不会导致容器停止，推荐使用
```



## 查看容器

```bash
docker ps
# -a 查看所有容器，不加查看正在运行的容器
# -l 查询最后一次创建的容器
```

## 启动一个已停止的容器

```bash
docker start 容器id 或者 容器名
docker restart 容器id 或者 容器名 # 效果同上
```

## 停止容器

```bash
docker stop 容器id 或者 容器名
```

## 删除不需要的容器

```bash
docker rm 容器id 或者 容器名
# 删除容器时，该容器必须为停止状态，否则会报错
```

## 导出容器与导入容器

```bash
docker export node007 > /home/pi/Downloads/快照名.tar
# 导出容器 node007 快照至 /home/pi/Downloads/快照名.tar
cat /home/pi/Downloads/快照名.tar | docker import - node009
# 或者
docker import /home/pi/Downloads/快照名.tar node009
# 导入快照至容器 node009
```

## 查看容器的端口情况

```bash
docker port 容器id 或者 容器名
```

## 查看容器日志

```bash
docker logs -f 容器id 或者 容器名
# -f 持续输出容器内的标准输出，不加则为直接查看现有的日志
```

## 查看容器进程

```bash
docker top 容器id 或者 容器名
```

## 查看容器底层信息

```bash
docker inspect 容器id 或者 容器名
```

```json
[
    {
        "Id": "faa1bd344585f20b99c41289618db6145442550167fa5f4e47b6e43597c1a374",
        "Created": "2020-11-16T02:10:19.104765129Z",
        "Path": "/portainer",
        "Args": [],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 904,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2020-11-29T06:41:32.607576178Z",
            "FinishedAt": "2020-11-29T06:37:52.72741222Z"
        },
        "Image": "sha256:dbf28ba50432b7e4d5b73c4c7b0538beefe333bf7cb246276625f424315dadec",
        "ResolvConfPath": "/var/lib/docker/containers/faa1bd344585f20b99c41289618db6145442550167fa5f4e47b6e43597c1a374/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/faa1bd344585f20b99c41289618db6145442550167fa5f4e47b6e43597c1a374/hostname",
        "HostsPath": "/var/lib/docker/containers/faa1bd344585f20b99c41289618db6145442550167fa5f4e47b6e43597c1a374/hosts",
        "LogPath": "/var/lib/docker/containers/faa1bd344585f20b99c41289618db6145442550167fa5f4e47b6e43597c1a374/faa1bd344585f20b99c41289618db6145442550167fa5f4e47b6e43597c1a374-json.log",
        "Name": "/portainer",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": [
                "/var/run/docker.sock:/var/run/docker.sock",
                "portainer_data:/data"
            ],
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {
                "9000/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "9000"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "always",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "Capabilities": null,
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "KernelMemory": 0,
            "KernelMemoryTCP": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": null,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/86f249a7b1825e080a635699cae3a7c6a4912bc364438e2a5b35014cd51edf37-init/diff:/var/lib/docker/overlay2/f0720de234420eaa67c6f3211524325b27570fafcce81915572f0a0d32988641/diff:/var/lib/docker/overlay2/2c40fedb8397c8f2553752a131d93653a709fab21c09bd7d0415ad26d71ccbb3/diff",
                "MergedDir": "/var/lib/docker/overlay2/86f249a7b1825e080a635699cae3a7c6a4912bc364438e2a5b35014cd51edf37/merged",
                "UpperDir": "/var/lib/docker/overlay2/86f249a7b1825e080a635699cae3a7c6a4912bc364438e2a5b35014cd51edf37/diff",
                "WorkDir": "/var/lib/docker/overlay2/86f249a7b1825e080a635699cae3a7c6a4912bc364438e2a5b35014cd51edf37/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [
            {
                "Type": "volume",
                "Name": "portainer_data",
                "Source": "/var/lib/docker/volumes/portainer_data/_data",
                "Destination": "/data",
                "Driver": "local",
                "Mode": "z",
                "RW": true,
                "Propagation": ""
            },
            {
                "Type": "bind",
                "Source": "/var/run/docker.sock",
                "Destination": "/var/run/docker.sock",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
        "Config": {
            "Hostname": "faa1bd344585",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "9000/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": null,
            "Image": "portainer/portainer",
            "Volumes": {
                "/data": {}
            },
            "WorkingDir": "/",
            "Entrypoint": [
                "/portainer"
            ],
            "OnBuild": null,
            "Labels": {}
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "35062166276df442352951289d7d19fbae30baafa7777581a1fdf533b196d8ec",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "9000/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "9000"
                    }
                ]
            },
            "SandboxKey": "/var/run/docker/netns/35062166276d",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "db5f6576bd337e844b871968169ec4282f5db7f21c6d0db60a3923c811f78d22",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "66d832731a8ebc34909ec714a3ed5c534556de7128c47c367b0621caab24dea3",
                    "EndpointID": "db5f6576bd337e844b871968169ec4282f5db7f21c6d0db60a3923c811f78d22",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:02",
                    "DriverOpts": null
                }
            }
        }
    }
]
```