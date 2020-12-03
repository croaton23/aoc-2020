export function readTextFile(filename)
{
    var fs = require('fs');
    var path = require('path');

    return fs.readFileSync(path.join(__dirname, '../input') + `/${filename}`, 'utf8');
}