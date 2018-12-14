'use strict';

const readline = require('readline');
const fs = require('fs');
const lines = [];
const rl = readline.createInterface({
  input: fs.createReadStream('day7-input.txt'),
  crlfDelay: Infinity
});
let lineNr = 0;

var node = function() {
  return {next: [], previous:[]};
};

rl.on('line', (line) => {
  lineNr++;
  lines.push(line);
  if (lineNr === 7) {
    ADVENT_OF_CODE.sumOfParts(lines);
  }
});

var ADVENT_OF_CODE = {};

ADVENT_OF_CODE.sumOfParts = (input) => {

  const _sumOfParts = (parts, tree) => {
    if (parts.length === 0) {
      return tree;
    } else {
      var lineParts = (parts.pop()).split(' ');
      if (!tree[lineParts[7]]) {
        tree[lineParts[7]] = node();
        tree[lineParts[7]].previous.push(lineParts[1]);
        if (tree[lineParts[1]]) {
          tree[lineParts[1]].next.push(lineParts[7])
        } else {
          tree[lineParts[1]] = node();
          tree[lineParts[1]].next.push(lineParts[7])
        }
      } else {
        tree[lineParts[7]].previous.push(lineParts[1]);
        if (tree[lineParts[1]]) {
          tree[lineParts[1]].next.push(lineParts[7])
        } else {
          tree[lineParts[1]] = node();
          tree[lineParts[1]].next.push(lineParts[7]);
        }
      }
     // tree.push(line);
      return _sumOfParts(parts, tree);
    }
  }
  const tree = _sumOfParts(input, []);
  let rootKey;
  Object.keys(tree).forEach((f) => {
    if (tree[f].previous.length == 0) {
      rootKey = f;
    }
  });


  console.log(tree);



}
