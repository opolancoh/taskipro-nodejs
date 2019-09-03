const mongoose = require('mongoose');
const config = require('config');

const dbUri = config.get('secrets.dbUri');
const dbName = config.get('db.name');
const db = `${dbUri}/${dbName}`;

console.log(`\nConnecting to database ${db} ...`);

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log(`Successfully connected to database!`);
    /*if (process.argv[2] === 'seed') {
      require('./startup/seed/execute-seed');
    }*/
  })
  .catch(err => {
    console.log(`\nError connecting to database ${db}\n`);
    console.error(err);
    process.exit(1);
  });
