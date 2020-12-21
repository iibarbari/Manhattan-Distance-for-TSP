// https://www.youtube.com/watch?v=RQpFffcI-ZI&feature=youtu.be&ab_channel=YongWang
const math = require('mathjs');

import { range } from 'lodash';

const distances = [
  [0, 132, 217, 164, 58],
  [132, 0, 290, 201, 79],
  [217, 290, 0, 113, 303],
  [164, 201, 113, 0, 196],
  [58, 79, 303, 196, 0]
];

const paths: number[][] = new Array(math.size(distances)[0]);

for (let city = 0; city < paths.length; city++) {
  const path: number[] = new Array(math.size(distances)[0]);
  path[0] = city;

  for (let i = 1; i < path.length; i++) {
    // path[i] = distances[path[i-1]]
  }

  paths[city] = path;
}

console.log(paths);
// paths.forEach((city, index) => {
//   console.log({ city, index });
// });



