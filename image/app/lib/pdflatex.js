const fs = require('fs');
const child_process = require('child_process');
const Path = require('path');

const readFileAsync = fs.readFile;
const writeFileAsync = fs.writeFile;
const execAsync = child_process.exec;

var tmp = require('tmp');

function createTmpDir() {
  return new Promise(function(resolve, reject) {
    tmp.dir(function (err, p) {
      err ? reject(err) : resolve(p);
    });
  });
}

function writeFile(path, data) {
  return new Promise(function(resolve, reject) {
    writeFileAsync(path, data, function(err) {
      err ? reject(err) : resolve();
    });
  })
}

function readFile(path) {
  return new Promise(function(resolve, reject) {
    readFileAsync(path, function(err, data) {
      err ? reject(err) : resolve(data);
    });
  })
}

const isErrorLine = (line) => line.length > 0 && line.charAt(0) === '!';

function filterErrorLines(log) {
  return log
    .split('\n')
    .filter(isErrorLine)
    .map(line => line.substring(2))
    .join('')
}

async function readErrorLog(dirname) {
  const log = await readFile(Path.join(dirname, 'texput.log'));
  return filterErrorLines(log.toString()) || 'LaTeX Error';
}

function exec(cmd, options = {}) {
  return new Promise(function(resolve, reject) {
    execAsync(cmd, options, function(err, stdout, stderr) {
      err ? reject(err) : resolve({ stdout, stderr });
    });
  });
}

function createCommand() {
  return [
    'pdflatex',
    '-shell-escape',
    '-halt-on-error',
    '-interaction=nonstopmode',
    'texput.tex'
  ].join(' ');
}

async function compile(tempPath, options = {}) {
  try {
    const cmd = createCommand();
    await exec(cmd, {
      ...options,
      cwd: tempPath,
      env: process.env,
      timeout: 1000,
    });
    return readFile(Path.join(tempPath, 'texput.png')).then(data => {
      // 移除临时目录
      // TODO 有没有更加有效的方式，不开启 shell
      exec('rm -r ' + tempPath);
      return data;
    });
  } catch (e) {
    throw await readErrorLog(tempPath);
  }
}

async function pdflatex(source, options = {}) {
  const tmpPath = await createTmpDir();
  await writeFile(Path.join(tmpPath, 'texput.tex'), source);
  return compile(tmpPath, options);
}

async function formula(eq) {
  return await pdflatex(`
\\documentclass[convert={density=600,outext=.png}]{standalone}
\\begin{document}
$ ${eq} $
\\end{document}
`);
}

exports.readFile = readFile;
exports.formula = formula;

// execAsync('pdflatex -interaction=nonstopmode -shell-escape texput.tex', {
//     cwd: '/tmp/tmp-187HjL2mVfd6KBl',
//     timeout: 200,
// }, function(err, stdout, stderr) {
//     console.log('#0=========');
//     console.log(err);
//     console.log('#1=========');
//     console.log(stdout.toString());
//     console.log('#2=========');
//     console.log(stderr.toString());
// })
