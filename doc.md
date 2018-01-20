# build image 
- docker build -t latex .

# 本地调试
- docker run -p 8002:8002 -v $(pwd):/doc/ -t -i latex
- http://localhost:8002/?f=a

# 本地 Daemon 运行
- docker run -d -p 8002:8002 -t -i latex
- docker ps # 查看运行中的进程
- docker kill PID # 杀掉上面 ps 展示的 PID

# 腾讯云上部署
- docker images # 查看 image 列表
  REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
  latex               latest              37f446f265ba        About an hour ago   3.74GB
- docker rmi CONTAINER_ID -f
- docker login --username 100000473*** # 登陆腾讯云，会提示输入密码. *** 部分，要改为你的账号
- docker tag 37f446f265ba ccr.ccs.tencentyun.com/micro_service_latex/tex2png:v1.0.0
- docker push ccr.ccs.tencentyun.com/micro_service_latex/tex2png:v1.0.0 # 需要在 qcloud 中创建服务后，得到 push 的地址

# 笔记
- 直接生成 png 文件需要调用 pdflatex: pdflatex --shell-escape example.tex
- latex -halt-on-error 006.tex # 会生成一个 dvi 文件 注：加了--shell-escape，此选项失效
- dvisvgm --exact --no-fonts 006.dvi # 转成 svg 文件 不要用 imagemagic convert
