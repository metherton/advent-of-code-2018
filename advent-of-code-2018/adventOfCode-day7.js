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
  if (lineNr === 5) {
  //if (lineNr === 101) {
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
  let tree = _sumOfParts(input, []);
  let rootKey;
  Object.keys(tree).forEach((f) => {
    if (tree[f].previous.length == 0) {
      console.log(f);
    }
  });

  console.log(tree);

  let letterOrderSeq = [];

  const _order = (letter, accumulator, letterSeq) => {

    console.log('check:', letter);

    if (Object.keys(accumulator).length === 0) {
      return accumulator;
    } else {
      if (accumulator[letter].previous.length === 0) {
        console.log('push:', letter);
        letterSeq.push(letter);
        accumulator[letter].next.sort().forEach((l) => {
          const index = accumulator[l].previous.indexOf(letter);
          if (index > -1) {
            accumulator[l].previous.splice(index, 1);
          }
          return _order(l, accumulator, letterSeq);
        });
        delete accumulator[letter];
      }
    }

  }

  // ['A', 'H', 'J', 'X'].forEach((i) => {
  //   _order(i, tree, letterOrderSeq)
  // });

  ['A'].forEach((i) => {
    _order(i, tree, letterOrderSeq)
  });

  console.log(letterOrderSeq.join(''));

}
