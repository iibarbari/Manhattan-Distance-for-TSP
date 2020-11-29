const cornerStep = 2;
const entranceColumn = 0;
const entranceColumnValue = 3.5;
const rows = 14;
const step = 1;

function getDirection(x: number): 'up' | 'down' {
  return x % 2 === 1 ? 'up' : 'down';
}

function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  // industrial engineering FTW
  const correctedY1 = y1 - 2;
  const correctedY2 = y2 - 2;

  let d = 0;

  const currentDirection = getDirection(x1);
  const targetDirection = getDirection(x2);

  const xDiff = Math.abs(x2 - x1);

  // from the entrance
  if (x1 === entranceColumn) {
    d += step;

    const correctedEntranceColumnValue = x2 < entranceColumnValue ? Math.floor(entranceColumnValue) : Math.ceil(entranceColumnValue);
    const entranceXDiff = Math.abs(correctedEntranceColumnValue - x2);

    if (targetDirection === 'up') {
      // walk to the entrance of the column
      d += (entranceXDiff + 2) * cornerStep;
      d += 2 * (entranceXDiff - 1) * step;
    } else {
      // walk to the entrance of the column
      d += (entranceXDiff + 2) * cornerStep;
      d += 2 * (entranceXDiff) * step;
      d += rows;
    }

    d += targetDirection === 'up' ? rows - correctedY2 : correctedY2 + step;

    return d;
  }

  // points are the same??
  if (x1 === x2 && correctedY1 === correctedY2) return 0;

  if (x1 === x2) {
    if ((correctedY2 < correctedY1 && currentDirection === 'up') || (correctedY2 > correctedY1 && currentDirection === 'down')) {
      return Math.abs(correctedY2 - correctedY1);
    }

    d += 4 * cornerStep;
    d += 2 * rows;
    d += 4 * step;
    d += -1 * Math.abs(correctedY2 - correctedY1);

    return d;
  }

  // two points are on the same column and destination is on the way
  if (
    x1 === x2
    && ((correctedY2 < correctedY1 && currentDirection === 'up') || (correctedY2 > correctedY1 && currentDirection === 'down'))
  ) {
    return Math.abs(correctedY2 - correctedY1);
  }

  // all other cases
  // walk to the end of the current column
  d += currentDirection === 'up' ? correctedY1 : rows - correctedY1;
  d += cornerStep;

  // walk to the start of the target column
  if (currentDirection === targetDirection) {
    d += (xDiff + 1) * cornerStep;
    d += 2 * xDiff * step;
    d += rows;
  } else {
    d += xDiff * cornerStep;
    d += 2 * xDiff * step;
  }

  d += targetDirection === 'up' ? rows - correctedY2 : correctedY2 + step;

  return d;
}

function testDistance(x1: number, y1: number, x2: number, y2: number, expectedValue: number) {
  const v = calculateDistance(x1, y1, x2, y2);

  console.log(`calculateDistance(${x1}, ${y1}, ${x2}, ${y2}) = ${v} === ${expectedValue}`, v === expectedValue);
}

// from entrance
testDistance(0, 0, 1, 13, 14);
testDistance(0, 0, 2, 3, 25);
testDistance(0, 0, 5, 13, 10);
testDistance(0, 0, 6, 3, 29);

// special cases
testDistance(1, 13, 1, 13, 0);
testDistance(1, 13, 1, 11, 2);
testDistance(1, 13, 1, 14, 39);
testDistance(2, 8, 2, 2, 34);

// other cases
testDistance(1, 13, 2, 13, 29);
testDistance(1, 13, 3, 13, 40);
