import { URLProcessor } from './modules/url-processor';

import { checkEnvVars } from './config/env';

checkEnvVars();

const processor = new URLProcessor();
processor.startProcessing();
