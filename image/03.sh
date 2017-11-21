# 安装node v8.9.1
RUN sudo apt-get update && sudo apt-get install -y wget

# 使用淘宝镜像安装Node.js v8.9.1
RUN wget https://npm.taobao.org/mirrors/node/v8.9.1/node-v8.9.1-linux-x64.tar.gz && \
    tar -C /usr/local --strip-components 1 -xzf node-v8.9.1-linux-x64.tar.gz && \
    rm node-v8.9.1-linux-x64.tar.gz 

# 将当前工作环境切换到 /node/app 目录，如果目录不存在，会自动创建
WORKDIR /node/app

# 安装npm模块
# package.json需要单独添加。Docker在构建镜像的时候，是一层一层构建的，仅当这一层
# 有变化时，重新构建对应的层。如果package.json和源代码一起添加到镜像，则每次修改
# 源码都需要重新安装npm模块，这样木有必要。所以，正确的顺序是: 
# - 添加package.json
# - 安装npm模块
# - 添加源代码
ADD app/package.json /node/app/package.json

# 使用淘宝的npm镜像
RUN npm install --production -d --registry=https://registry.npm.taobao.org

# 添加源代码
ADD app /node/app

# 运行app.js
CMD ["node", "/node/app/app.js"]
