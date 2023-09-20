// progress bar
const utils = {};

utils.flaggedUsers = [
  1663855324959, 1663855329877, 1663855369903
]
utils.styles = {
  car: { color: 'gray', text: '🚗' },
  fish: { color: 'red', text: '🐠' },
  house: { color: 'yellow', text: '🏠' },
  tree: { color: 'green', text: '🌳' },
  bicycle: { color: 'cyan', text: '🚲' },
  guitar: { color: 'blue', text: '🎸' },
  pencil: { color: 'magenta', text: '✏' },
  clock: { color: 'lightgray', text: '🕒' },
};

utils.styles['?'] = {color: 'red', text: '❓'};

utils.formatPercent = (n) => {
  return (n * 100).toFixed(2) + '%';
}

utils.printProgress = (count, max) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  const percent = utils.formatPercent(
    count / max
  );
  process.stdout.write(count + '/' + max + ' (' + percent + ')');
}

utils.groupBy = (objArray, key) => {
  const groups = {};
  for (let obj of objArray) {
    const val = obj[key];
    if (groups[val] == null) {
      // initialize
      groups[val] = [];
    }
    groups[val].push(obj);
  }
  return groups;
}

utils.distance=(p1,p2)=>{
  return Math.sqrt(
     (p1[0]-p2[0])**2+
     (p1[1]-p2[1])**2
  );
}

utils.getNearest=(loc,points, k = 1)=>{
  const obj = points.map((val, ind) => {
    return {ind, val}
  });
  const sorted = obj.sort((a, b) => {
    return utils.distance(loc, a.val) - utils.distance(loc, b.val)
  });

  const indices = sorted.map((obj) => obj.ind);
  return indices.slice(0, k);
}

utils.invLerp = (min, max, v) => {
  return (v-min)/ (max - min);
}

utils.normalizePoints = (points, minMax) => {
  let min, max;
  const dimensions = points[0].length;

  if(minMax) {
    min = minMax.min;
    max = minMax.max;
  } else {
    min = [...points[0]];
    max = [...points[0]];

    for(let i = 1; i < points.length; i++) {
      for(let j = 0; j < dimensions; j++) {
        min[j] = Math.min(min[j], points[i][j]);
        max[j] = Math.max(max[j], points[i][j]);
      }
    }
}

  // transform,  between 0 and 1.
  for(let i = 0; i < points.length; i++ ){
    for( let j = 0; j < dimensions; j++ ){
      points[i][j] = utils.invLerp(min[j], max[j], points[i][j]);
    }
  }
  return {min, max};
}

if (typeof module !== 'undefined') {
  module.exports = utils;
}