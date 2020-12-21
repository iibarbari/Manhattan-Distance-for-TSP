const fs = require('fs');
const path = require('path');
const range = require('lodash/range');

import Matrix from '../distanceMatrix';

module.exports = () => {
  const corridorCount = 6;
  const unitCount = 28;
  const unitArr: [number, number][] = [];

  range(1, corridorCount + 1).forEach((corr: number) => {
    range(1, unitCount + 1).forEach((unit: number) => {
      unitArr.push([corr, unit]);
    });
  });

  const matrix = new Matrix(unitArr, unitCount / 2, corridorCount).calculateMatrix;


  fs.writeFile(path.join(__dirname, '..', 'matrix.json'), JSON.stringify(matrix),
    () => {
    });
};
