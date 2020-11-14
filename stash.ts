// const math = require('mathjs');
// const _ = require('lodash');

// const cities = ['A', 'B', 'C', 'D', 'E'];

// const matrix = [
//   [0, 132, 217, 164, 58],
//   [132, 0, 290, 201, 79],
//   [217, 290, 0, 113, 303],
//   [164, 201, 113, 0, 196],
//   [58, 79, 303, 196, 0],
// ];

// cities.forEach((city, initialCity) => {
//   const unvisitedCities = ['A', 'B', 'C', 'D', 'E'];
//   const visitedCities = [];

//   let lastVisitedCity = '';

//   while (unvisitedCities > 0) {
//     if (visitedCities.length === 0) {
//       console.log(`Started from ${city}`);
//       visitedCities.push(city);
//       unvisitedCities.splice(unvisitedCities.indexOf(city), 1);
//       lastVisitedCity = city;
//     } else {
//       const nearestDistance = Math.min.apply(
//         null,
//         matrix[initialCity].filter(Boolean)
//       );
//       const nearestCity = cities[matrix[initialCity].indexOf(nearestDistance)];

//       console.log(`Nearest city is ${nearestCity} with ${nearestDistance}`);

//       visitedCities.push(nearestCity);
//       unvisitedCities.splice(unvisitedCities.indexOf(nearestCity), 1);
//     }
//   }
// });
