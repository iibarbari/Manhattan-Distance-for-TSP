import fs from 'fs';
import { flatten, groupBy, range, remove, sortBy, sumBy, chunk } from 'lodash';
import path from 'path';
import Matrix from '../distanceMatrix';
import XLSX from 'xlsx';

type ItemLocation = {
  location: [number, number],
  item: number,
};

const output: { from: number, to: number, distance: number, total: number }[][] = [];

function findUnitsAndCorridors() {
  return { corridors: 16, units: 124 / 2 };
}

function calculateDistanceMatrix(data: ItemLocation[]) {
  const locations = data.map(({ location }) => location);
  const details = findUnitsAndCorridors();

  return new Matrix(locations, details.units, details.corridors).calculateMatrix;
}

function algo(data: [ItemLocation[]]) {
  data.forEach((bin, index) => {
    const paths: number[][] = [];
    const matrix = calculateDistanceMatrix(bin);
    const length = bin.length;

    range(1, length + 1).forEach((city) => {
      let lastVisitedCity: number = 0;
      const path = new Array(length + 2);
      const unvisitedCities = range(0, length + 1);

      function updateUnvisitedCities(c: number) {
        remove(unvisitedCities, (a) => a === c);
        lastVisitedCity = c;
      }

      function goTo() {
        for (let c = 2; c < path.length - 1; c++) {
          const smallest = unvisitedCities.reduce((acc, curr): number => {
            return ((matrix[lastVisitedCity][curr] < matrix[lastVisitedCity][acc])
              && unvisitedCities.includes(curr))
              ? curr : acc;
          }, unvisitedCities[0]);

          path[c] = smallest;

          updateUnvisitedCities(smallest);
        }
      }

      function initPath() {
        path[0] = 0;
        path[path.length - 1] = 0;
        path[1] = city;

        updateUnvisitedCities(0);
        updateUnvisitedCities(city);

        goTo();

        paths.push(path);
      }

      initPath();
    });

    parsePaths(bin, index, matrix, paths);
  });
}

function parsePaths(bin: ItemLocation[], index: number, matrix: number[][], paths: number[][]) {
  const finalPath: { bin: number, distance: number, moves: { from: number, to: number, distance: number, total: number }[] }[] = [];

  paths.forEach(path => {
    const items = bin.map(({ item }) => item);
    const moves: { from: number, to: number, distance: number, total: number, bin: number }[] = path.map((p, i) => {
      return {
        // from: p,
        // to: path[i + 1],
        from: p === 0 ? 0 : items[p - 1],
        to: path[i + 1] === 0 ? 0 : items[path[i + 1] - 1],
        distance: matrix[p][path[i + 1]],
        total: 0,
        bin: index
      };
    });

    moves.pop();

    moves.forEach((_, i) => {
      moves[i].total = sumBy(moves, 'distance');
    });

    finalPath.push({ moves, distance: sumBy(moves, 'distance'), bin: index + 1 });
  });

  return findMinimumPaths(sortBy(finalPath, 'distance'));
}

function findMinimumPaths(finalPath: { bin: number, distance: number, moves: { from: number, to: number, distance: number, total: number }[] }[]) {
  const bins = groupBy(finalPath, 'bin');

  Object.keys(bins).forEach(binId => {
    output.push(bins[binId][0].moves);
  });

  return output;
}


export default function nearestNeighbor() {
  fs.readFile(path.join(__dirname, 'locations.json'), (res, rawData) => {
    const data: [ItemLocation[]] = JSON.parse(rawData.toString());

    algo(data);

    const wb = XLSX.utils.book_new();

    chunk(output, 6).forEach((c, i) => {
      const wsName = `Shift-${i}`;

      const ws = XLSX.utils.json_to_sheet(flatten(c));

      XLSX.utils.book_append_sheet(wb, ws, wsName);
    });

    XLSX.writeFile(wb, 'lol.xlsx');
  });
}


nearestNeighbor();
