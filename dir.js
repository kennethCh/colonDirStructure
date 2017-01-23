// Copy the same directory and files structure 

const fs = require('fs');
const exec = require('child_process').exec;
const dirFrom = process.argv[2];
const dirTo = process.argv[3];

copyDirFiles(dirFrom, dirTo);

function copyDirFiles(dirname, targetDir) {
  const dirArr = fs.readdirSync(dirname);
  const dirObject = dirArrToObject(dirArr, dirname);
  writeDir(dirObject, targetDir)
}

function writeDir(dirObject, targetDir) {
  for(key in dirObject) {
    if(key.match('.js') !== null || key === '.DS_Store') {
      exec('touch ' + targetDir + '/' + key, '');
    } else {
      exec('mkdir ' + targetDir + '/' + key);
      writeDir(dirObject[key], targetDir + '/' + key);
    }
  }
}

function dirArrToObject(dirArr, dirname) {
  return dirArr.reduce((pre, cur) => {
    if(cur.match('.js') !== null || cur === '.DS_Store') {
      pre[cur] = true;
    } else {
      const newDirname = dirname + '/' + cur;
      pre[cur] = dirArrToObject(fs.readdirSync(newDirname) ,newDirname);
    }
    return pre;
  }, {})
}

