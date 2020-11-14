const hallLength = 14;
const lateralLength = 2;

function findDirection(corr: number) {
  return corr % 2 === 1;
}

function handleSameCorridor(from: From, to: To, direction?: Direction) {
  const fromPoint = Math.round(from.unit / 2);
  const toPoint = Math.round(to.unit / 2);

  if (direction) {
    return Math.abs(toPoint - fromPoint);
  } else {
    if (findDirection(from.corr)) {
      return 2 * lateralLength + 2 * hallLength -fromPoint + toPoint;
    } else {
      return 2 * lateralLength + 2 * hallLength - toPoint + fromPoint;
    }
  }
}

function handleDiffCorridorsDiffDirs(from: From, to: To) {
  const fromPoint = Math.round(from.unit / 2);
  const toPoint = Math.round(to.unit / 2);

  if (findDirection(from.corr)) {
    return Math.abs(to.corr - from.corr) * lateralLength + (hallLength - fromPoint + 1) + (hallLength - toPoint);
  } else {
    return Math.abs(to.corr - from.corr) * lateralLength + fromPoint - 1 + toPoint;
  }
}

function handleDiffCorridorsSameDir(from: From, to: To) {
  const fromPoint = Math.round(from.unit / 2);
  const toPoint = Math.round(to.unit / 2);

  if (findDirection(from.corr)) {
    return Math.abs(to.corr - from.corr) * lateralLength + hallLength + (hallLength - fromPoint) + toPoint;
  } else {
    return Math.abs(to.corr - from.corr) * lateralLength + hallLength + (fromPoint - 1) + (hallLength - toPoint + 1);
  }
}

module.exports = function manhattan(from: From, to: To) {
  const fromDir = findDirection(from.corr);
  const toDir = findDirection(to.corr);

  let distance;

  console.log(`From ${from.corr}-${from.unit} to ${to.corr}-${to.unit}`);

  if (from.corr === to.corr) {
    if (fromDir && to.unit > from.unit || !fromDir && to.unit < from.unit) {
      distance = handleSameCorridor(from, to, true);
    } else if (fromDir && from.unit > to.unit || !fromDir && from.unit < to.unit) {
      distance = handleSameCorridor(from, to);
    } else {
      distance = 0;
    }
  } else if (from.corr !== to.corr && fromDir !== toDir) {
    if (fromDir && from.corr < to.corr) {
      distance = handleDiffCorridorsDiffDirs(from, to);
    } else if (fromDir && from.corr > to.corr) {
      distance = handleDiffCorridorsDiffDirs(from, to);
    } else if (!fromDir && from.corr < to.corr) {
      distance = handleDiffCorridorsDiffDirs(from, to);
    } else if (!fromDir && from.corr > to.corr) {
      distance = handleDiffCorridorsDiffDirs(from, to);
    }
  } else if (from.corr !== to.corr && fromDir === toDir) {
    if (fromDir && from.corr < to.corr) {
      distance = handleDiffCorridorsSameDir(from, to);
    } else if (fromDir && from.corr > to.corr) {
      distance = handleDiffCorridorsSameDir(from, to);
    } else if (!fromDir && from.corr < to.corr) {
      distance = handleDiffCorridorsSameDir(from, to);
    } else if (!fromDir && from.corr > to.corr) {
      distance = handleDiffCorridorsSameDir(from, to);
    }
  }

  console.log(`Manhattan distance is ${distance}`);

  return distance;
};
