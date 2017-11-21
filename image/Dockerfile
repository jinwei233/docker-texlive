#
# thomasweise/texlive
#
# This is an image with a basic TeX Live installation.
# Source: https://github.com/thomasWeise/docker-texlive/
# License: GNU GENERAL PUBLIC LICENSE, Version 3, 29 June 2007
# The license applies to the way the image is built, while the
# software components inside the image are under the respective
# licenses chosen by their respective copyright holders.
# 
FROM ubuntu:16.04
MAINTAINER Thomas Weise <tweise@ustc.edu.cn>

# 国内 ubuntu 镜像
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
>> /etc/apt/sources.list

# 环境配置，源更新
RUN export LANG=C.UTF-8 &&\
    apt-get clean &&\
    apt-get update &&\
    apt-get autoclean -y &&\
    apt-get autoremove -y &&\
    apt-get update &&\
    apt-get install -f -y apt-utils 

# install imagemagick
# apt-get install --no-install-recommends -y imagemagick libmagickwand-dev
RUN apt-get install -y imagemagick

# install texlive
RUN apt-get install -f -y fonts-arphic-bkai00mp \
                          fonts-arphic-bsmi00lp \
                          fonts-arphic-gbsn00lp \
                          fonts-arphic-gkai00mp \
                          fonts-arphic-ukai \
                          fonts-arphic-uming \
                          ttf-wqy-microhei \
                          ttf-wqy-zenhei \                          
                          xfonts-intl-chinese \
                          xfonts-intl-chinese-big &&\
# install TeX Live and ghostscript
    apt-get install -f -y ghostscript=9.18* \
                          make=4.1* \
                          latex-cjk-common=4.8* \
                          latex-cjk-chinese=4.8* \ 
                          texlive-full=2015.2016* \
                          texlive-fonts-extra=2015.2016* \
                          texlive-fonts-recommended=2015.2016* \
                          texlive-math-extra=2015.2016* \
                          texlive-lang-cjk=2015.2016* \                          
                          texlive-luatex=2015.2016* \
                          texlive-pstricks=2015.2016* \
                          texlive-science=2015.2016* \
                          texlive-xetex=2015.2016* &&\
# free huge amount of unused space
    apt-get purge -f -y make-doc \
                        texlive-fonts-extra-doc \
                        texlive-fonts-recommended-doc \
                        texlive-humanities-doc \
                        texlive-latex-base-doc \
                        texlive-latex-extra-doc \
                        texlive-latex-recommended-doc \
                        texlive-metapost-doc \
                        texlive-pictures-doc \
                        texlive-pstricks-doc \
                        texlive-science-doc &&\
# ensure that external fonts and doc folders exists
    mkdir /usr/share/fonts/external/ &&\
    mkdir /doc/

RUN apt-get install -y emacs wget

RUN wget https://npm.taobao.org/mirrors/node/v8.9.1/node-v8.9.1-linux-x64.tar.gz && \
    tar -C /usr/local --strip-components 1 -xzf node-v8.9.1-linux-x64.tar.gz && \
    rm node-v8.9.1-linux-x64.tar.gz 

ADD app/package.json /node/app/package.json

# 使用淘宝的npm镜像
RUN npm install --production -d --registry=https://registry.npm.taobao.org

ADD app /node/app

# clean up all temporary files 
RUN apt-get clean &&\
    apt-get autoclean -y &&\
    apt-get autoremove -y &&\
    apt-get clean &&\
    rm -rf /tmp/* /var/tmp/* &&\
    rm -rf /var/lib/apt/lists/* &&\    
    rm -f /etc/ssh/ssh_host_*
    
# 容器运行时应该尽量保持容器存储层不发生写操作，对于数据库类需要保存动态数据的应
# 用，其数据库文件应该保存于卷(volume)中
VOLUME ["/doc/", "/usr/share/fonts/external/"]

# 一些 latex shell 脚本
ADD scripts /bin/

# 添加 app 目录到 node 项目下
# ADD app /node/

ENTRYPOINT ["/bin/__boot__.sh"]
