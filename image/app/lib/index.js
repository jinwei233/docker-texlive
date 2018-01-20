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

function todvi(dir) {
  return [
    'latex',
    // '-shell-escape',
    '-halt-on-error',
    // '-interaction=nonstopmode',
    `${dir}/texput.tex`,
  ].join(' ');
}

function tosvg(dir) {
  return [
    'dvisvgm',
    '--exact',
    '--no-fonts',
    `${dir}/texput.dvi`,
    '-o',
    `${dir}/texput.svg`,
  ].join(' ');
}

async function compile(tempPath, options = {}) {
  try {
    await exec(todvi(tempPath), {
      ...options,
      cwd: tempPath,
      env: process.env,
      timeout: 1000,
    });
    await exec(tosvg(tempPath), {
      ...options,
      cwd: tempPath,
      env: process.env,
      timeout: 1000,
    });
    return readFile(Path.join(tempPath, 'texput.svg')).then(data => {
      exec('rm -r ' + tempPath);
      return data;
    });
  } catch (e) {
    throw await readErrorLog(tempPath);
  }
}

async function latex(source, options = {}) {
  const tmpPath = await createTmpDir();
  console.log(`tempPath = ${tmpPath}`);
  await writeFile(Path.join(tmpPath, 'texput.tex'), source);
  return compile(tmpPath, options);
}

async function formula(eq) {
  return await latex(`
\\documentclass{standalone}
\\begin{document}
$ ${eq} $
\\end{document}
`);
}

exports.readFile = readFile;
exports.formula = formula;

// execAsync('latex -interaction=nonstopmode -shell-escape texput.tex', {
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
