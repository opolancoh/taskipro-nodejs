// validate required environment variables
const envList = ['TASKIPRO_DB_URI', 'TASKIPRO_JWTPK'];
envList.forEach(item => {
  if (!process.env[item]) {
    console.error(`Environment variable '${item}' is not defined!`);
    process.exit(1);
  }
});

const port = process.env.PORT || 5000;
const now = new Date();

console.log(`\nStarting server at ${now} ...`);

const app = require('./app');

app.listen(port, () => {
  console.log(`\nListening on port ${port}`);
  console.log(`Node version: ${process.version}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
});
