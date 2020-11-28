const { Manhattan } = require('./manhattan');

type Point = {
  corr: number,
  unit: number,
}

export class Matrix {
  points: Point[];

  constructor(points: Point[]) {
    this.points = points;
  }

  get calculateMatrix() {
    const matrix: number[][] = [];

    this.points.forEach(from => {
      let row: number[] = [];
      this.points.forEach(to => {
        const distance = new Manhattan(from, to).distance();

        row.push(distance);
      });

      matrix.push(row);
    });

    return matrix;
  }
}
