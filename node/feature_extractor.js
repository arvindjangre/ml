const constants = require('../common/constants.js');
const featuresFunctions = require('../common/featuresFunctions.js');

const fs = require('fs');
console.log('Extracting features...');
const samples = JSON.parse(
  fs.readFileSync(constants.SAMPLES)
);

for(const sample of samples) {
  const paths = JSON.parse(
    fs.readFileSync(
      constants.JSON_DIR + '/' + sample.id+".json"
    )
  );
  const functions = featuresFunctions.inUse.map(f => f.function);
  sample.point = functions.map(f=>f(paths));

}

const featureNames = featuresFunctions.inUse.map(f => f.name);

fs.writeFileSync(constants.FEATURES,
  JSON.stringify({
    featureNames,
    samples: samples.map(s => {
      return {
        point: s.point,
        label: s.label
      };
    })
  })
);
fs.writeFileSync(constants.FEATURES_JS, 
  `const features =
  ${JSON.stringify({featureNames, samples})}
  ;`
);
console.log('Done!');