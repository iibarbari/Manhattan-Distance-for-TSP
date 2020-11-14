class Manhattan {
  from: From;
  fromDir: boolean;
  fromPoint: number;
  hallLength: number;
  lateralLength: number;
  to: To;
  toDir: boolean;
  toPoint: number;

  constructor(from: From, to: To, lateralLength = 2, hallLength = 14) {
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

  handleSameCorridor(direction?: true) {
    const { fromDir, lateralLength, hallLength, fromPoint, toPoint } = this;

    if (direction) {
      return Math.abs(toPoint - fromPoint);
    } else {
      if (fromDir) {
        return 2 * lateralLength + 2 * hallLength - fromPoint + toPoint;
      } else {
        return 2 * lateralLength + 2 * hallLength - toPoint + fromPoint;
      }
    }
  }

  handleDiffCorridorsDiffDirs() {
    const { to, from, fromDir, lateralLength, hallLength, fromPoint, toPoint } = this;

    if (fromDir) {
      return Math.abs(to.corr - from.corr) * lateralLength + (hallLength - fromPoint + 1) + (hallLength - toPoint);
    } else {
      return Math.abs(to.corr - from.corr) * lateralLength + fromPoint - 1 + toPoint;
    }
  }

  handleDiffCorridorsSameDir() {
    const { to, from, fromDir, lateralLength, hallLength, fromPoint, toPoint } = this;

    if (fromDir) {
      return Math.abs(to.corr - from.corr) * lateralLength + hallLength + (hallLength - fromPoint) + toPoint;
    } else {
      return Math.abs(to.corr - from.corr) * lateralLength + hallLength + (fromPoint - 1) + (hallLength - toPoint + 1);
    }
  }

  get distance() {
    const { to, from, fromDir, toDir } = this;

    let distance;

    if (from.corr === to.corr) {
      if (fromDir && to.unit > from.unit || !fromDir && to.unit < from.unit) {
        distance = this.handleSameCorridor(true);
      } else if (fromDir && from.unit > to.unit || !fromDir && from.unit < to.unit) {
        distance = this.handleSameCorridor();
      } else {
        distance = 0;
      }
    } else if (from.corr !== to.corr && fromDir !== toDir) {
      distance = this.handleDiffCorridorsDiffDirs();
    } else if (from.corr !== to.corr && fromDir === toDir) {
      distance = this.handleDiffCorridorsSameDir();
    }

    console.log(`From ${from.corr}-${from.unit} to ${to.corr}-${to.unit} the manhattan distance is ${distance}`);

    return distance;
  }
}

module.exports = Manhattan;
