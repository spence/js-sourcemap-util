#!/usr/bin/env node

var fs = require('fs');
var sourcemap = require('source-map');
var path = require('path');

if (process.argv.length != 5) {
    console.log('Usage: node ' + process.argv[1] + ' <source_dir> <js_path> <map_path>');
    return;
}

var source_dir = path.resolve(process.argv[2]); // /Users/user/git/repo/
var js_path = path.resolve(process.argv[3]);    // /Users/user/git/repo/build/entry-sourcemap.js
var map_path = path.resolve(process.argv[4]);   // /Users/user/git/repo/build/entry.js.map

var map_json = JSON.parse(fs.readFileSync(map_path, 'utf8'));
var consumer = new sourcemap.SourceMapConsumer(map_json);

var keys = {}, counts = [];
fs.readFileSync(js_path).toString().split('\n').forEach(function(line, row) {
    for (var column = 0; column < line.length; column++) {
        var position = consumer.originalPositionFor({
            line: row + 1,
            column: column
        });
        var source = position.source || '[ Compiler Generated Source ]';
        if (source in keys) {
            counts[keys[source]].count++;
        } else {
            keys[source] = counts.length;
            counts.push({source:source, count:1});
        }
    }
});

var byCount = function(a, b) { // sort
    if (a.count === b.count) {
        return 0;
    } else if (a.count < b.count) {
        return 1;
    } else {
        return -1;
    }
};

counts.sort(byCount).forEach(function(count) {
    console.log(count.count + '\t' + count.source);
});
