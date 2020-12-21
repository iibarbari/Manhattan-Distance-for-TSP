import distance from '../manhattan/manhattan';

export default class Matrix {
  points: [number, number][];
  units: number;
  corridors: number;

  constructor(points: [number, number][], units: number, corridors: number) {
    this.points = points;
    this.units = units;
    this.corridors = corridors;
  }

  get calculateMatrix() {
    const matrix: number[][] = [];

    this.points.unshift([0, 0]);

    this.points.forEach(from => {
      let row: number[] = [];
      this.points.forEach(to => {
        const res = distance(from, to, this.units, this.corridors);

        (res === undefined || res instanceof Error) ? new Error('Error while creating the distance matrix') : row.push(
          res);
      });

      matrix.push(row);
    });

    return matrix;
  }
}
