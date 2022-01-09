import app from './main.js'
import log from './log.js';

const port = 3001;

app.listen(port, () => {
  console.log(`HERO server jookseb pordil ${port}`);
  log.info('SERVER_STARTED',`HERO server started on port ${port}`)

});