# 调试
- docker run -p 8002:8002 -v $(pwd):/doc/ -t -i latex

# 笔记
- 直接生成 png 文件需要调用 pdflatex
- pdflatex --shell-escape example.tex
