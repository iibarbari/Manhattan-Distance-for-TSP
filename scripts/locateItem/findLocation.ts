import cluster from './cluster';
import stock from './stock';
import fs from 'fs';
import path from 'path';

type ItemLocation = {
  location: number[],
  item: number,
};

function parseStock() {
  return stock.map(({ Koridor, Sira, UrunID }) => {
    return {
      location: [Number(Koridor.replace(/\D+/g, '')), Sira],
      item: UrunID
    };
  });
}

export default function findLocation(): ItemLocation[][] | Error | undefined {
  const locations = parseStock();
  const list: ItemLocation[][] = [];

  cluster.forEach((bin, index) => {
    list.push([]);

    bin.map(product => {
      const res: ItemLocation | undefined = locations.find(({ item }) => {
        return item === product;
      });

      res === undefined ? new Error(`${product} not found`) : list[index].push(res);
    });
  });

  fs.writeFile(path.join(__dirname, '../nearestNeighbor', 'locations.json'), JSON.stringify(list),
    () => {
    });

  return list;
}
