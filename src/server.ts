import {config} from './common/config';
import {app} from './app';

const {PORT} = config;
console.log(config)
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
