const fs = require('fs');
const path = require('path');
const _ = require('lodash')
const { NearestNeighbour, Matrix } = require('./scripts');

const corridorCount = 6;
const unitCount = 28;
const units: { corr: number, unit: number }[] = [{ corr: 0, unit: 0 }];

_.range(1, corridorCount + 1).forEach((corr: number) => {
  _.range(1, unitCount + 1).forEach((unit: number) => {
    units.push({
      corr,
      unit
    });
  });
});


const matrix = new Matrix(units).calculateMatrix;


fs.writeFile(path.join(__dirname, 'matrix.json'), JSON.stringify(matrix),()=>{});


// let rawData = fs.readFileSync(path.join(__dirname, 'matrix.json'));
// let matrix = JSON.parse(rawData);

// const paths = new NearestNeighbour(matrix).tour()


// const paths = new NearestNeighbour([
//   [0, 132, 217, 164, 58],
//   [132, 0, 290, 201, 79],
//   [217, 290, 0, 113, 303],
//   [164, 201, 113, 0, 196],
//   [58, 79, 303, 196, 0]
// ]).tour();

// console.log(paths);


