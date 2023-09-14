// progress bar
const utils = {};

utils.flaggedUsers = [
  1663855324959, 1663855329877, 1663855369903
]
utils.styles = {
  car: 'gray',
  fish: 'red',
  house: 'yellow',
  tree: 'green',
  bicycle: 'cyan',
  guitar: 'blue',
  pencil: 'magenta',
  clock: 'lightgray',
};

utils.formatPercent = (n) => {
  return (n * 100).toFixed(2) + '%';
}

utils.printProgress = (count, max) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  const percent = utils.formatPercent(
    count/max
  );
  process.stdout.write(count+'/'+max+ ' (' + percent + ')');
}

utils.groupBy = (objArray, key) => {
  const groups = {};
  for (let obj of objArray) {
    const val = obj[key];
    if(groups[val] == null) {
      // initialize
      groups[val] = [];
    }
    groups[val].push(obj);
  }
  return groups;
}

if(typeof module !== 'undefined') {
  module.exports = utils; 
}