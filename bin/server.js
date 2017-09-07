var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc');
var config;

try {
    config = JSON.parse(babelrc);
} catch (err) {
    console.log('ERROR: Error parsing your .babelrc.', err);
}

require('babel-core/register')(config);
require('../server');