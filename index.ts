const Manhattan = require('./manhattan');

new Manhattan({ corr: 2, unit: 19 }, { corr: 2, unit: 19 }).distance

new Manhattan({ corr: 1, unit: 7 }, { corr: 1, unit: 19 }).distance
new Manhattan({ corr: 2, unit: 19 }, { corr: 2, unit: 7 }).distance
new Manhattan({ corr: 2, unit: 7 }, { corr: 2, unit: 19 }).distance
new Manhattan({ corr: 1, unit: 19 }, { corr: 1, unit: 7 }).distance

new Manhattan({ corr: 1, unit: 7 }, { corr: 2, unit: 19 }).distance
new Manhattan({ corr: 1, unit: 7 }, { corr: 4, unit: 19 }).distance
new Manhattan({ corr: 1, unit: 7 }, { corr: 6, unit: 19 }).distance

new Manhattan({ corr: 2, unit: 7 }, { corr: 3, unit: 19 }).distance
new Manhattan({ corr: 2, unit: 7 }, { corr: 5, unit: 19 }).distance

new Manhattan({ corr: 1, unit: 7 }, { corr: 3, unit: 19 }).distance
new Manhattan({ corr: 1, unit: 7 }, { corr: 5, unit: 19 }).distance

new Manhattan({ corr: 2, unit: 7 }, { corr: 4, unit: 19 }).distance
new Manhattan({ corr: 2, unit: 7 }, { corr: 6, unit: 19 }).distance

new Manhattan({ corr: 2, unit: 19 }, { corr: 1, unit: 7 }).distance
new Manhattan({ corr: 4, unit: 19 }, { corr: 1, unit: 7 }).distance
new Manhattan({ corr: 4, unit: 19 }, { corr: 3, unit: 7 }).distance

new Manhattan({ corr: 3, unit: 19 }, { corr: 2, unit: 7 }).distance
new Manhattan({ corr: 5, unit: 19 }, { corr: 2, unit: 7 }).distance

new Manhattan({ corr: 3, unit: 19 }, { corr: 1, unit: 7 }).distance
new Manhattan({ corr: 5, unit: 19 }, { corr: 1, unit: 7 }).distance

new Manhattan({ corr: 4, unit: 19 }, { corr: 2, unit: 7 }).distance
new Manhattan({ corr: 6, unit: 19 }, { corr: 2, unit: 7 }).distance
