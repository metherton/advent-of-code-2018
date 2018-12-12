'use strict';

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day4-input.txt'),
  crlfDelay: Infinity
});

var accumulatorTotal = [];
var count = 0;

var FREQUENCY = {};

rl.on('line', (line) => {
  accumulator = line.split('');
  FREQUENCY.calculate();
});

var outputs = [];
var grid = [];
var accumulator;
FREQUENCY.calculate = function() {

  var  leftover, endLeftover;
  endLeftover = "";
  var offset = 0;
  var j;

    leftover = check(0,1);
    console.log(leftover.join(''));


}

function check(first, second) {

     let newFirst, newSecond;
     newFirst = first;
     newSecond = second;
    if (accumulator[first] === undefined || accumulator[second] === undefined) {
      return accumulator;
    }
    if (((accumulator[first] === accumulator[first].toUpperCase())
      && (accumulator[second] === accumulator[second].toLowerCase())
      && (accumulator[first].toLowerCase() === accumulator[second].toLowerCase()))
      ||  ((accumulator[first] === accumulator[first].toLowerCase())
      && (accumulator[second] === accumulator[second].toUpperCase())
      && (accumulator[first].toLowerCase() === accumulator[second].toLowerCase()))) {

      accumulator.splice(first, 2);
      if (first !== 0) {
        newFirst = first - 1;
        newSecond = second - 1;
      }
    } else {
      newFirst = first + 1;
      newSecond = second + 1;
    }

    return check(newFirst, newSecond);

}

