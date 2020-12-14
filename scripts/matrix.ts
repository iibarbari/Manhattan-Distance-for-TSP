const distance = require('./manhattan');


export class Matrix {
  points: [number, number][];

  constructor(points: [number, number][]) {
    this.points = points;
  }

  get calculateMatrix() {
    const matrix: number[][] = [];

    this.points.forEach(from => {
      let row: number[] = [];
      this.points.forEach(to => {
        row.push(distance(from, to));
      });

      matrix.push(row);
    });

    return matrix;
  }
}
