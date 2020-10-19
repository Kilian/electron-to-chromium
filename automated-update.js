require('shelljs/global');

if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}
if (!which('npm')) {
  echo('Sorry, this script requires npm');
  exit(1);
}

exec('npm update electron-releases && npm run build && npm test', {silent:true}, function(code, stdout, stderr) {
  if(code === 1) {

    exec('echo "' + stdout + stderr + '"| aha | mail -a "Content-type: text/html" -s "[e2c] Automated update failed" root');
    echo('test failed, exit.');
    exit(1);

  } else {

    exec('git add package.json package-lock.json', {silent:true});
    exec('git commit -m "bump electron-releases"', {silent:true});

    exec('git status --porcelain', {silent:true}, function(code, stdout, stderr) {
      const indexHasUpdated = !!stdout.length;
      if(indexHasUpdated) {
        exec('git add versions.js full-versions.js chromium-versions.js full-chromium-versions.js', {silent:true});
        exec('git commit -m "generate new version"', {silent:true});
        exec('npm version patch', {silent:true});
        exec('git push origin master', {silent:true});
        exec('git push --tags', {silent:true});
        exec('npm publish', {silent:true});
        echo('new version released.');
          exit(0);
      } else {
        echo('nothing to do.');
        exit(0);
      }
    });

  }
});
