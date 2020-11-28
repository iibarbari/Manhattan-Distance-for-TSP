type Point = {
  corr: number,
  unit: number,
}

export class Manhattan {
  cornerLength: number;
  from: Point;
  fromDir: boolean;
  fromPoint: number;
  hallLength: number;
  lateralLength: number;
  to: Point;
  toDir: boolean;
  toPoint: number;

  constructor(
    from = { corr: 1, unit: 1 },
    to = { corr: 1, unit: 1 },
    lateralLength = 2,
    hallLength = 14,
    cornerLength = 2
  ) {
    this.cornerLength = cornerLength;
    this.from = from;
    this.fromDir = this.findDirection(from.corr);
    this.fromPoint = Math.round(from.unit / 2);
    this.hallLength = hallLength;
    this.lateralLength = lateralLength;
    this.to = to;
    this.toDir = this.findDirection(to.corr);
    this.toPoint = Math.round(to.unit / 2);
  }

  findDirection(corr: number) {
    return corr % 2 === 1;
  }

  outerDistance(sameDir: boolean) {
    const { cornerLength, from, to, lateralLength, fromDir, toDir, hallLength } = this;

    if (from !== undefined && to !== undefined) {
      const corners = (Math.abs(to.corr - from.corr) + (sameDir ? 2 : 1)) * cornerLength;
      const lateral = Math.abs(to.corr - from.corr) * lateralLength;

      return fromDir === toDir ? hallLength + lateral + corners : lateral + corners;
    }

    return 0;
  };

  handleSameCorridor(direction?: true) {
    const { cornerLength, fromDir, lateralLength, hallLength, fromPoint, toPoint } = this;

    if (direction) {
      return Math.abs(toPoint - fromPoint);
    } else {
      if (fromDir) {
        return 2 * lateralLength + 4 * cornerLength + hallLength + hallLength - fromPoint + toPoint;
      } else {
        return 2 * lateralLength + 4 * cornerLength + hallLength + hallLength - toPoint + fromPoint;
      }
    }
  }

  handleDiffCorridorsDiffDirs() {
    const { fromDir, toDir, hallLength, fromPoint, toPoint } = this;

    if (fromDir) {
      return this.outerDistance(fromDir === toDir) + (hallLength - fromPoint + 1) + (hallLength - toPoint);
    } else {
      return this.outerDistance(fromDir === toDir) + fromPoint - 1 + toPoint;
    }
  }

  handleDiffCorridorsSameDir() {
    const { fromDir, toDir, hallLength, fromPoint, toPoint } = this;

    if (fromDir) {
      return this.outerDistance(fromDir === toDir) + (hallLength - fromPoint) + toPoint;
    } else {
      return this.outerDistance(fromDir === toDir) + (fromPoint - 1) + (hallLength - toPoint + 1);
    }
  }

  get details() {
    const { fromDir, toDir, from, to } = this;

    if (from !== undefined && to !== undefined) {
      return [
        (fromDir ? 'up' : 'down'),
        (toDir ? 'up' : 'down'),
        (from.corr == to.corr && Math.round(from.unit / 2) === Math.round(to.unit / 2) ? 'stays' : 'moves'),
        (from.corr == to.corr ? 'same' : 'different'),
        (
          from.corr > to.corr ||
          (from.corr === to.corr && fromDir && to.unit > from.unit) ||
          (from.corr === to.corr && !fromDir && from.unit > to.unit) ?
            'forwards' :
            'backwards'
        )
      ].join('|');
    }
  }

  distance2() {
    const { fromDir, toDir, from, to } = this;


  }


  distance(givenFrom = this.from, givenTo = this.to, givenFromDir = this.fromDir, givenToDir = this.toDir) {
    if (givenFrom !== undefined && givenTo !== undefined) {
      let distance;

      if (givenFrom.corr === givenTo.corr) {
        if (Math.round(givenFrom.unit / 2) === Math.round(givenTo.unit / 2)) {
          distance = 0;
        } else {
          if (givenFromDir && givenTo.unit > givenFrom.unit || !givenFromDir && givenTo.unit < givenTo.unit) {
            distance = this.handleSameCorridor(true);
          } else if (givenFromDir && givenFrom.unit > givenTo.unit || !givenFromDir && givenFrom.unit < givenTo.unit) {
            distance = this.handleSameCorridor();
          } else {
            distance = 0;
          }
        }
      } else if (givenFrom.corr !== givenTo.corr && givenFromDir !== givenToDir) {
        distance = this.handleDiffCorridorsDiffDirs();
      } else if (givenFrom.corr !== givenTo.corr && givenFromDir === givenToDir) {
        distance = this.handleDiffCorridorsSameDir();
      }

      // console.log(`From ${givenFrom.corr}-${givenFrom.unit} to ${givenTo.corr}-${givenTo.unit} - ${distance}`);
      return distance;
    }

    return new Error('Please give two points');
  }
}


export class DistanceToInitial extends Manhattan {
  point: Point;
  center: Point;
  goesBack?: true;

  constructor(point: Point, goesBack?: true) {
    super({ unit: 14, corr: 4 }, { unit: point.unit, corr: point.corr });

    this.point = point;
    this.goesBack = goesBack;
    this.center = { unit: 1, corr: 4 };
  }

  outerDistanceToInitial(up: boolean) {
    const { from, to } = this;

    if (up) {

      return Math.abs(to.corr - from.corr);

    } else {
      return Math.round(Math.abs(to.corr - from.corr) / 2) * (2 * this.cornerLength + this.lateralLength) + 1;
    }
  }

  getThis() {
    const { fromDir, point, center } = this;

    if (this.goesBack) {
      // let distance = this.distance(point, center);
      if (fromDir) {

      } else {
      }

      // console.log(distance);

      // console.log(`From ${point.corr}-${point.unit} to center - ${distance}`);

    } else {
      let distance = this.distance(center, point);

      if (point.corr === center.corr) {
        if (Math.round(point.unit / 2) === Math.round(center.unit / 2)) {
          distance = 3 * this.cornerLength + this.lateralLength * 1.5 + 2 * this.hallLength;
        } else {
          distance = <number>this.distance(center, point) - this.lateralLength / 2 - this.cornerLength;
        }
      } else if (point.corr < center.corr) {
        distance = <number>this.distance(center, point) - this.lateralLength / 2 - this.cornerLength;
      }

      console.log(`From center to ${point.corr}-${point.unit} - ${distance}`);
    }
  }
}

// new DistanceToInitial({ unit: 1, corr: 2 }, true).getThis();

// new DistanceToInitial({ unit: 1, corr: 2 }, true).getThis();
// new DistanceToInitial({ unit: 1, corr: 3 }, true).getThis();
// new DistanceToInitial({ unit: 1, corr: 4 }, true).getThis();
// new DistanceToInitial({ unit: 3, corr: 4 }, true).getThis();
// new DistanceToInitial({ unit: 1, corr: 5 }, true).getThis();
// new DistanceToInitial({ unit: 1, corr: 6 }, true).getThis();

new DistanceToInitial({ unit: 1, corr: 1 }).getThis();
new DistanceToInitial({ unit: 1, corr: 2 }).getThis();
new DistanceToInitial({ unit: 1, corr: 3 }).getThis();
new DistanceToInitial({ unit: 1, corr: 4 }).getThis();
new DistanceToInitial({ unit: 3, corr: 4 }).getThis();
new DistanceToInitial({ unit: 1, corr: 5 }).getThis();
new DistanceToInitial({ unit: 1, corr: 6 }).getThis();
