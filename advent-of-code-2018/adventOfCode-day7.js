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
  return {next: [], previous:[], willBeDeleted: false};
};

rl.on('line', (line) => {
  lineNr++;
  lines.push(line);
 // if (lineNr === 5) {
  if (lineNr === 101) {
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
  let sortedTree = [];
  let rootKey;
  Object.keys(tree).sort().forEach((f) => {
    sortedTree[f] = tree[f];
  });

  console.log(sortedTree);

  let letterOrderSeq = [];

  const _order = (letter, accumulator, letterSeq) => {

    // check if all keys have been deleted
    if (Object.keys(accumulator).length === 0) {
      return accumulator;
    } else {
      // if no previous then we want to save / remove it
      if (accumulator[letter].previous.length === 0) {
        letterSeq.push(letter);
        // mark the letter as needed to be deleted
        accumulator[letter].willBeDeleted = true;
        // remove the letter to be deleted from previous of all other letters
        Object.keys(accumulator).forEach((l) => {
          const index = accumulator[l].previous.indexOf(letter);
          if (index > -1) {
            accumulator[l].previous.splice(index, 1);
          }
        });

        // find next letter to iterate over..
        // will be a merge of the next
        Object.keys(accumulator).sort().forEach((l) => {
          if (accumulator[l] && !accumulator[l].willBeDeleted) {
            return _order(l, accumulator, letterSeq);
          }
        });

        delete accumulator[letter];
      }
    }

  }


  _order('A', sortedTree, letterOrderSeq)
  console.log(letterOrderSeq.join(''));

}
