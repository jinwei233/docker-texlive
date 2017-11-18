# demo
# ubuntu 16.04 阿里云镜像
RUN echo '\n\
deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted\n\
deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted\n\
deb http://mirrors.aliyun.com/ubuntu/ xenial-security universe\n\
deb http://mirrors.aliyun.com/ubuntu/ xenial-security multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted\n\
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe\n\
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ xenial universe\n\
deb http://mirrors.aliyun.com/ubuntu/ xenial multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse\n\
deb http://archive.canonical.com/ubuntu xenial partner\n\
deb-src http://archive.ubuntu.com/ubuntu xenial main restricted\n\
deb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted multiverse universe\n\
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted multiverse universe\n\
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse\n\
deb-src http://archive.canonical.com/ubuntu xenial partner\n\
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted multiverse universe\n'\
> /etc/apt/sources.list
