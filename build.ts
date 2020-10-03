import fs from "fs";
import child from "child_process";

if(fs.existsSync('.tmp'))
  child.spawnSync('rm', ['-r', '.tmp'])

if(fs.existsSync('publish'))
  child.spawnSync('rm', ['-r', 'publish'])

fs.mkdirSync('.tmp')
fs.mkdirSync('.tmp/dist')
fs.mkdirSync('.tmp/static')

fs.copyFileSync('index.html', '.tmp/index.html')
fs.copyFileSync('dist/main.js', '.tmp/dist/main.js')

child.spawnSync('cp', ['-R', 'static', '.tmp/static'])

child.spawnSync('mv', ['.tmp', 'publish'])