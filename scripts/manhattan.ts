type From = {
  corr: number,
  unit: number,
}

type To = {
  corr: number,
  unit: number,
}

export class Manhattan {
  cornerLength: number;
  from: From;
  fromDir: boolean;
  fromPoint: number;
  hallLength: number;
  lateralLength: number;
  to: To;
  toDir: boolean;
  toPoint: number;

  constructor(from: From, to: To, lateralLength = 2, hallLength = 14, cornerLength = 1) {
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

  outerDistance = () => {
    const { cornerLength, from, to, lateralLength, fromDir, toDir, hallLength } = this;
    const lateral = Math.abs(to.corr - from.corr) * (lateralLength + cornerLength);

    return fromDir === toDir ? hallLength + lateral : lateral;
  };

  handleSameCorridor(direction?: true) {
    const { cornerLength, fromDir, lateralLength, hallLength, fromPoint, toPoint } = this;

    if (direction) {
      return Math.abs(toPoint - fromPoint);
    } else {
      if (fromDir) {
        return 2 * (lateralLength + cornerLength) + 2 * hallLength - fromPoint + toPoint;
      } else {
        return 2 * (lateralLength + cornerLength) + 2 * hallLength - toPoint + fromPoint;
      }
    }
  }

  handleDiffCorridorsDiffDirs() {
    const { fromDir, hallLength, fromPoint, toPoint } = this;

    if (fromDir) {
      return this.outerDistance() + (hallLength - fromPoint + 1) + (hallLength - toPoint);
    } else {
      return this.outerDistance() + fromPoint - 1 + toPoint;
    }
  }

  handleDiffCorridorsSameDir() {
    const { fromDir, hallLength, fromPoint, toPoint } = this;

    if (fromDir) {
      return this.outerDistance() + (hallLength - fromPoint) + toPoint;
    } else {
      return this.outerDistance() + (fromPoint - 1) + (hallLength - toPoint + 1);
    }
  }

  get details() {
    const { fromDir, toDir, from, to } = this;

    return [
      (fromDir ? 'up' : 'down'),
      (toDir ? 'up' : 'down'),
      (from.corr == to.corr && from.unit === to.unit ? 'stays' : 'moves'),
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

    console.log(`From ${from.corr}-${from.unit} to ${to.corr}-${to.unit} - ${distance}`);
    return distance;
  }
}
