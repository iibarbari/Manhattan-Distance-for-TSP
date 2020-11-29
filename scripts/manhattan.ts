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
    from: Point,
    to: Point,
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

  distance(givenFrom = this.from, givenTo = this.to, givenFromDir = this.fromDir, givenToDir = this.toDir) {
    const { fromDir, toDir, from, to } = this;
    if (givenFrom !== undefined && givenTo !== undefined) {
      let distance;

      if (from.corr === to.corr) {
        if (Math.round(from.unit / 2) === Math.round(to.unit / 2)) {
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

export class Initial {
  point: Point;
  center: Point;
  from?: boolean;

  constructor(point: Point, from = true) {
    this.point = point;
    this.center = { unit: 1, corr: 4 };
    this.from = from;
  }

  findDirection() {
    return this.point.corr % 2 === 1;
  }

  findNearestDownCorr() {
    if (this.point.corr >= this.center.corr) {
      return this.point.corr - 1;
    }
    return this.point.corr + 1;
  }

  findLateralLength(corr: number) {
    const passedCors = Math.abs(this.center.corr - corr);
    const lateralLength = 2;
    const cornerLength = 2;

    if (corr >= this.center.corr) {
      return ((passedCors + 1) * cornerLength) + (passedCors * lateralLength) + 0.5 * lateralLength;
    } else {
      return ((passedCors + 1) * cornerLength) + (passedCors * lateralLength) - cornerLength - 0.5 * lateralLength;
    }
  }

  get calculateLength() {
    const dir = this.findDirection();

    let distance;
    if (this.from) {
      if (dir) {
        const nearestCorr = this.findNearestDownCorr();
        const nearestCorrExitLength = new Manhattan({
          unit: this.point.unit, corr: this.point.corr
        }, {
          unit: 1, corr: nearestCorr
        }).distance();

        if (typeof nearestCorrExitLength === 'number') {
          distance = nearestCorrExitLength + this.findLateralLength(nearestCorr);
        }
      } else {
        distance = this.findLateralLength(this.point.corr) - 1 + Math.round(this.point.unit / 2);
      }
    } else {
      if (dir) {
        distance = this.findLateralLength(this.point.corr) + Math.round(this.point.unit / 2);
      } else {
        const nearestCorr = this.findNearestDownCorr();
        const nearestCorrExitLength = new Manhattan({
          unit: 1, corr: nearestCorr
        }, {
          unit: this.point.unit, corr: this.point.corr
        }).distance();

        if (typeof nearestCorrExitLength === 'number') {
          distance = nearestCorrExitLength + this.findLateralLength(nearestCorr) + 1;
        }
      }
    }
    console.log({ distance, point: this.point });
    return distance;
  }
}


// new Initial({ unit: 1, corr: 1 }).calculateLength;
// new Initial({ unit: 1, corr: 2 }).calculateLength;
// new Initial({ unit: 1, corr: 3 }).calculateLength;
// new Initial({ unit: 1, corr: 4 }).calculateLength;
// new Initial({ unit: 1, corr: 5 }).calculateLength;
// new Initial({ unit: 1, corr: 6 }).calculateLength;

// new Initial({ unit: 1, corr: 1 }, false).calculateLength;
// new Initial({ unit: 1, corr: 2 }, false).calculateLength;
// new Initial({ unit: 1, corr: 3 }, false).calculateLength;
// new Initial({ unit: 2, corr: 4 }, false).calculateLength;
// new Initial({ unit: 1, corr: 5 }, false).calculateLength;
// new Initial({ unit: 1, corr: 6 }, false).calculateLength;

