http://mirrors.163.com/

echo \
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial main restricted\
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates main restricted\
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial universe\
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates universe\
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial multiverse\
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates multiverse\
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-backports main restricted universe multiverse\
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security main restricted\
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security universe\
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security multiverse\
> /etc/apt/sources.list

apt-get install -y imagemagick
apt-get install -y imagemagick emacs
