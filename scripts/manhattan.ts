const { isEqual } = require('lodash');

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

  distance(givenFrom = this.from,
    givenTo = this.to,
    givenFromDir = this.fromDir,
    givenToDir = this.toDir): number | undefined | Error {

    if (givenFrom !== undefined && givenTo !== undefined) {
      let distance;

      // starts from initial and goes to initial
      if (givenFrom.unit === 0 && givenFrom.corr === 0 && givenTo.unit === 0 && givenTo.corr === 0) {
        distance = 0;

        // starts from initial
      } else if (givenFrom.unit === 0 && givenFrom.corr === 0) {
        distance = initial({ unit: 0, corr: 0 }, givenTo);

        // goes from initial
      } else if (givenTo.unit === 0 && givenTo.corr === 0) {
        distance = initial(givenFrom, { unit: 0, corr: 0 });

        // travels from unit o unit
      } else {
        if (givenFrom.corr === givenTo.corr) {
          if (Math.round(givenFrom.unit / 2) === Math.round(givenFrom.unit / 2)) {
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
      }

      return distance;
    }

    return new Error('Please give two points');
  }
}

function initial(from: Point, to: Point) {
  // Depot variables
  const corridors = 6;
  const units = 28;

  // Lateral variables
  const corner = 2;
  const lateral = 1;

  function corrIsUpwards(corr: number) {
    return corr % 2 === 1;
  }

  function distance(from: number[], to: number[]) {
    // doesn't move
    if (isEqual(from, to)) {
      return 0;
    }

    // starts from initial point
    else if (isEqual(from, [0, 0])) {
      const midPoint = (corner * corridors + (corridors - 1) * lateral * 2) / 2;
      const corrLateralDistance =
        (to[0] - 1) * corner + (to[0] - 1) * lateral * 2;

      let lateralLength = 0;

      if (corrIsUpwards(to[0])) {
        if (midPoint > corrLateralDistance) {
          lateralLength = midPoint - corrLateralDistance;
        } else {
          lateralLength = corrLateralDistance - midPoint + corner;
        }
      } else {
        if (to[0] === corridors / 2 + 1) {
          lateralLength = 2 * corner + 2 * lateral + lateral + corner;
        } else if (midPoint > corrLateralDistance) {
          lateralLength = 2 * corner + 2 * lateral + lateral + corner;
        } else {
          lateralLength = 4 * corner + 4 * lateral + lateral;
        }
      }

      // has to go upwards
      if (corrIsUpwards(to[0])) {
        return lateralLength + Math.round(to[1] / 2);
      } else {
        return lateralLength + units + Math.round(to[1] / 2) - 1;
      }
    }

    // goes back to initial point
    else if (isEqual([0, 0], to)) {
      const midPoint = (corner * corridors + (corridors - 1) * lateral * 2) / 2;
      const corrLateralDistance =
        from[0] * corner + (from[0] - 1) * lateral * 2;

      let lateralLength = 0;

      // calculate lateral length
      // goes upwards
      if (corrIsUpwards(from[0])) {
        // exception
        if (from[0] === corridors / 2) {
          lateralLength = 3 * corner + 3 * lateral;
        }

        // if corr is after midPoint
        else if (corrLateralDistance > midPoint) {
          lateralLength = corrLateralDistance - midPoint + corner;
        }

        // if corr is before midPoint
        else {
          lateralLength = midPoint - corrLateralDistance + 2 * corner;
        }
      }
      // goes downwards
      else {
        // if corr is after midPoint
        if (corrLateralDistance > midPoint) {
          lateralLength = corrLateralDistance - midPoint - corner;
        }

        // if corr is before midPoint
        else {
          lateralLength = midPoint - corrLateralDistance;
        }
      }

      // calculate distance
      // has to go upwards
      if (corrIsUpwards(from[0])) {
        const passedCorridor = units / 2;
        const exitCorr = units / 2 - Math.round(from[1] / 2);

        return exitCorr + passedCorridor + lateralLength;
      }

      // has to go downwards
      else {
        return lateralLength + corner + Math.round(from[1] / 2) - 1;
      }
    }
  }

  return distance([from.corr, from.unit], [to.corr, to.unit]);
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

