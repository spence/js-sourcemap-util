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

var contentRefs = {};
var getSourceContent = function(source) {
    if (!contentRefs[source]) {
        contentRefs[source] = fs.readFileSync(source).toString().split('\n');
    }
    return contentRefs[source];
};

var getSourceLine = function(source, lineno) {
    return getSourceContent(source)[lineno];
};

var getGeneratedCode = function(line, col, toLine, toCol) {
    var content = getSourceContent(js_path);
    line = line - 1;
    toLine = toLine  ? toLine - 1 : content.length - 1;
    toCol = toCol !== null ? toCol : content[row].length - 1
    var code = '';
    for (var row = line; row <= toLine; row++) {
        if (row == line && row == toLine) {
            // Only line there is
            code += content[row].substring(col, toCol);
        } else if (row == line) {
            // On the first line
            code += content[row].substring(col);
        } else if (row == toLine) {
            // On the last line
            code += content[row].substring(0, toCol);
        } else {
            // Entire line since we're between rows
            code += content[row];
        }
        if (row != toLine) {
            code += '\n';
        }
    }
    return code;
};

// Build map: (source,line) => generated code
fRefLines = {};
for (var j = 0; j < consumer._generatedMappings.length; ++j) {
    var m = consumer._generatedMappings[j];
    var next_m = consumer._generatedMappings[j + 1] || 
        { generatedLine: m.generatedLine, generatedColumn: Infinity };
    var generated = getGeneratedCode(m.generatedLine, 
        m.generatedColumn, next_m.generatedLine, next_m.generatedColumn);

    var lineno = m.originalLine - 1;
    fRefLines[m.source] = fRefLines[m.source] || {};
    if (lineno in fRefLines[m.source]) {
        if (fRefLines[m.source][lineno] !== generated) {
            fRefLines[m.source][lineno] += generated;
        }
    } else {
        fRefLines[m.source][lineno] = generated;
    }
}

// String cleaning
var maxPadding = 90;
var padding = Array(maxPadding).join(' ');
var pad = function(text, length) {
    return text + padding.substring(maxPadding - length + text.length);
};
var detab = function(text) {
    return text.replace(/\t/g, '    ');
}
var deline = function(text) {
    return text.replace(/\n/g, '');
};
var splitAndPadAt = function(text, length) {
     var lines = text.replace(new RegExp('(.{' + length + '})', 'g'), '$1\x00').split(/\x00/);
     lines[lines.length - 1] = pad(lines[lines.length - 1], length);
     return lines;
};
var wrapTogether = function(lineno, codeL, codeR) {
    var lineStr = pad(lineno.toString() + ':', 7);
    var prefixPadding = pad('', 7);
    var linePadding = pad('', maxPadding);
    var leftLines = splitAndPadAt(codeL, maxPadding);
    var rightLines = splitAndPadAt(codeR, maxPadding);
    var text = '';
    var max = Math.max(leftLines.length, rightLines.length);
    for (var i = 0; i < max; i++) {
        var padding = (i === 0 ? lineStr : prefixPadding);
        var leftLine = leftLines[i] || linePadding;
        var rightLine = rightLines[i] || linePadding;
        text += padding + leftLine + '  |  ' + rightLine;
        if (i !== max - 1) {
            text += '\n';
        }
    }
    return text;
};

var byStringAsNumber = function(a, b) { // sort
    if (a === b) {
        return 0;
    } else if (+a > +b) {
        return 1;
    } else {
        return -1;
    }
};

// Print the generated code alongside the source code
// NB: The "generated code" is only the concatenation of all the compiled code
//     bits that references a specific line. Not quite satisfying...
consumer.sources.forEach(function(source) {
    console.log('\n================= ' + source + ' ================\n');
    Object.keys(fRefLines[source]).sort(byStringAsNumber).forEach(function(linestr) {
        var lineno = +linestr;
        var generatedCode = detab(deline(fRefLines[source][lineno]));
        var sourceCode = '[ Compiler Generated Source ]';
        if (source.substring(0, 6) != 'class ') {
            sourceCode = detab(getSourceLine(path.join(source_dir, source), lineno) || '');
        }
        console.log(wrapTogether(lineno + 1, sourceCode, generatedCode));
    });
});
