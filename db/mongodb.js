const mongoose = require('mongoose');
const config = require('config');

const { customErrorHandler } = require('../helpers/error-handler');

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
    /* if (process.argv[2] === 'seed') {
      require('./startup/seed/execute-seed');
    } */
  })
  .catch(err => {
    const message = `#DbError There was a problem connecting to database ${db}. ${err}`;
    customErrorHandler(Error(message));
  });
