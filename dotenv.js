'use strict';

const FindUp = require('find-up');
process.argv.push(`dotenv_config_path=${FindUp.sync('.env')}`);
