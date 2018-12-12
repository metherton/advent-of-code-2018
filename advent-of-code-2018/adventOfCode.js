'use strict';

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2]),
  crlfDelay: Infinity
});
rl.on('line', (line) => {
  switch(process.argv[3]) {
    case 'react':
      ADVENT_OF_CODE.react(line);
      break;
    case 'react-polymer':
      ADVENT_OF_CODE.reactPolymer(line);
      break;
  }
});

var ADVENT_OF_CODE = {};

ADVENT_OF_CODE.react = (input) => {

  const _react = (first, second, accumulator) => {

    if (firstOrSecondElementIsNotDefined()) {
      return accumulator;
    }
    if (firstAndSecondReact()) {
      // remove the 2 characters
      accumulator.splice(first, 2);
      if (notFirstElementOfInput()) {
        // safe to go back in the input
        return _react(first - 1, second - 1, accumulator);
      } else {
        // just continue without changing the element index as we were at beginning of input array
        return _react(first, second, accumulator);
      }
    } else {
      // increment elements to test by 1
      return _react(first + 1, second + 1, accumulator);
    }

    function firstOrSecondElementIsNotDefined() {
      return accumulator[first] === undefined || accumulator[second] === undefined;
    }

    function firstAndSecondReact() {
      return ((accumulator[first] === accumulator[first].toUpperCase())
        && (accumulator[second] === accumulator[second].toLowerCase())
        && (accumulator[first].toLowerCase() === accumulator[second].toLowerCase()))
        || ((accumulator[first] === accumulator[first].toLowerCase())
        && (accumulator[second] === accumulator[second].toUpperCase())
        && (accumulator[first].toLowerCase() === accumulator[second].toLowerCase()));
    }

    function notFirstElementOfInput() {
      return first !== 0;
    }
  }

  console.log('REACT: number of elements leftover: ',(_react(0,1, input.split(''))).join('').length);

}

ADVENT_OF_CODE.reactPolymer = (input) => {

  const _polymer = (first, letter, accumulator) => {

    if (accumulator[first] === undefined) {
      return accumulator;
    }
    if (accumulator[first] === letter.toUpperCase() ||  accumulator[first] === letter.toLowerCase()) {
      accumulator.splice(first, 1);
      if (first !== 0) {
        return _polymer(first - 1, letter, accumulator);
      } else {
        return _polymer(first, letter, accumulator);
      }
    } else {
      return _polymer(first + 1, letter, accumulator);
    }
  }

  'abcdefghijklmnopqrstuvwxyz'.split('').forEach((letter) => {
     ADVENT_OF_CODE.react((_polymer(0, letter, input.split(''))).join(''));
  });

}


