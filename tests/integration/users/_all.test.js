// validate required environment variables
['TASKIPRO_INTEGRATION_TEST_URI'].forEach(item => {
  if (!process.env[item]) {
    console.error(`Environment variable '${item}' is not defined!`);
    process.exit(1);
  }
});

require('./create/index.test');
require('./find/index.test');
require('./find_by_id/index.test');
require('./update/index.test');
require('./delete/index.test');
