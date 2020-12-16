const tests = require('./test');
const isEqual = require('lodash/isEqual');

const corridors = 6;
const lateral = 4;
const corner = 1;
const units = 14;

type Point = [number, number];
type Coordinate = number;

function parseLocation(p: Point): Point {
  return [p[0], Math.round(p[1] / 2)];
}

function goForwardInLane(f: Point, t: Point): number | Error {
  const d = t[1] - f[1];

  if (f[0] % 2 === 1) {
    return d > -1 ? d : new Error('Route not available');
  }

  return d <= 0 ? Math.abs(d) : new Error('Route not available');
}

function direction(p: Coordinate): string {
  return (p % 2 === 1) ? 'up' : 'down';
}

function changeLanes(f: Point, t: Point): number {
  // if goes back to the same lane
  if (f[0] === t[0]) {
    return 4 * corner + 2 * lateral + units;
  }

  const isSameDirection = direction(f[0]) === direction(t[0]);
  const laneChange = Math.abs(f[0] - t[0]);

  const exitCorners = 2;
  const passedCorners = laneChange - 1;
  const passedLateral = laneChange;
  const turns = isSameDirection ? 1 : 0;

  return (
    exitCorners * corner +
    passedCorners * corner * 2 +
    turns * units +
    passedLateral * lateral
  );
}

function distance(f: Point, t: Point) {
  const from = parseLocation(f);
  const to = parseLocation(t);
  const exitPoint: Point = direction(from[0]) === 'up' ? [from[0], units] : [from[0], 1];
  const entrancePoint: Point = direction(to[0]) === 'up' ? [to[0], 1] : [to[0], units];

  if (isEqual(f, [0, 0]) && isEqual([0, 0], t)) {
    return 200;
  }

  if (isEqual(f, [0, 0]) || isEqual([0, 0], t)) {
    return distanceToInitial(from, to);
  }

  if (isEqual(f, t)) {
    return 200;
  }
  const exitDistance = goForwardInLane(from, exitPoint);
  const laneDistance = changeLanes(from, to);
  const entranceDistance = goForwardInLane(entrancePoint, to);

  if (typeof entranceDistance === 'number' && typeof exitDistance === 'number') {
    return exitDistance + laneDistance + entranceDistance + 1;

  }
}

function moveLane(change: number) {
  return corner * 2 + (change - 1) * corner * 2 + change * lateral;
}

function distanceToInitial(f: Point, t: Point): number | Error {
  const goToMiddle = corner + lateral / 2;

  // Moves from center to point t
  if (f[0] === 0) {
    const closerTo = t[0] > corridors / 2 ? corridors / 2 + 1 : corridors / 2;
    const change = Math.abs(closerTo - t[0]);

    if (direction(t[0]) === 'up') {
      const exit = goForwardInLane([t[0], 1], t);
      return typeof exit === 'number' ? goToMiddle + moveLane(change) + exit + 1 : new Error('oops');
    } else {
      if (closerTo === t[0]) {
        const exit = goForwardInLane([t[0], units], t);

        return typeof exit === 'number' ? goToMiddle + moveLane(1) + units + exit + 1 : new Error('oops');
      }

      const exit = goForwardInLane([t[0], units], t);
      return typeof exit === 'number' ? goToMiddle + moveLane(change) + units + exit + 1 : new Error('oops');
    }
  }
  // Moves from point to center
  else if (t[0] === 0) {
    const closerTo = f[0] > corridors / 2 ? corridors / 2 + 1 : corridors / 2;
    const change = Math.abs(closerTo - f[0]);

    if (direction(f[0]) === 'up') {
      if (closerTo === f[0]) {
        const exit = goForwardInLane(f, [f[0], units]);

        return typeof exit === 'number' ? goToMiddle + moveLane(1) + units + exit : new Error('oops');
      }

      const exit = goForwardInLane(f, [f[0], units]);

      return typeof exit === 'number' ? goToMiddle + moveLane(change) + units + exit : new Error('oops');
    } else {
      const exit = goForwardInLane(f, [f[0], 1]);

      return typeof exit === 'number' ? goToMiddle + moveLane(change) + exit : new Error('oops');
    }
  }

  return 200;
}

tests.forEach(({ from, to, result }: {
  from: [number, number],
  to: [number, number],
  result: number
}) => {
  console.log(
    from,
    '->',
    to,
    distance(from, to),
    distance(from, to) === result
  );
});

module.exports = distance;
