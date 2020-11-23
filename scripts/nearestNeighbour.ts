// https://www.youtube.com/watch?v=RQpFffcI-ZI&feature=youtu.be&ab_channel=YongWang
const _ = require('lodash');

type Matrix = number[][];

export class NearestNeighbour {
  cities: number;
  lastVisited: number;
  matrix: Matrix;
  path: number;
  visitedCities: number[];
  paths: {
    order: number[],
    lengths: number[],
    sum: number
  }[];

  constructor(matrix: Matrix) {
    this.matrix = matrix;

    this.cities = this.matrix.length;
    this.paths = [];

    this.lastVisited = 0;
    this.path = 0;
    this.visitedCities = [];
  }

  reset() {
    this.lastVisited = 0;
    this.path = 0;
    this.visitedCities = [];
  }

  visitCity(index: number) {
    this.lastVisited = index;
    this.visitedCities.push(index);
  }

  findNearestCity() {
    const possibleIndexes: number[] = _.range(0, this.cities);
    const indices = possibleIndexes.filter((i) => this.visitedCities.indexOf(i) < 0);

    const possiblePaths = _.at(this.matrix[this.lastVisited], indices);
    const min = _.min(possiblePaths);
    const index = this.matrix[this.lastVisited].indexOf(min);

    this.visitCity(index);
  }

  findLengthOfTour() {
    const paths: number[] = [];

    this.visitedCities.forEach((i, index) => {
      if (index < this.visitedCities.length - 1) {
        paths.push(this.matrix[i][this.visitedCities[index + 1]]);
      }
    });

    return paths;
  }

  createTour() {
    while (this.visitedCities.length < this.cities) {
      this.findNearestCity();
    }

    this.visitCity(this.visitedCities[0]);

    this.paths.push({
      order: this.visitedCities,
      lengths: this.findLengthOfTour(),
      sum: _.sum(this.findLengthOfTour())
    });
  }

  tour() {
    for (let city = 0; city < this.cities; city++) {
      this.reset();

      this.visitCity(city);

      this.createTour();
    }

    return this.paths;
  }
}
