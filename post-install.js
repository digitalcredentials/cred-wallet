var fs = require('fs');

const securityContextPath = './node_modules/security-context/js/index.js';

const securityContent = fs.readFileSync(
  './security-context-replace.js',
  'utf-8',
);

fs.readFile(securityContextPath, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  fs.writeFile(securityContextPath, securityContent, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
