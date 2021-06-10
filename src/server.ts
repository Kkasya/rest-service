import {config} from './common/config';
import {app} from './app';

const {PORT} = config.AUTH_MODE;
app.listen(PORT, () =>
  console.log(`App is running `)
);
