const http = require('http');
const url = require('url');

const {
  readFile,
  formula
} = require('./lib/pdflatex');

http.createServer(async function(req, res){
  const request = url.parse(req.url, true);
  const { query } = request;
  let resp
  try {
    resp = await formula(query.f);
  } catch (e) {
    // console.log('=====');
    // console.log(e.message);
    // console.log('=====');
    // res.setHeader("Latex-Error", new Buffer(e).toString('base64'));
    res.setHeader("Latex-Error", e);
    resp = await readFile('./img/error.png');
  }
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(resp, 'binary');
}).listen(8002, '0.0.0.0');
