const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use(require('./routers.js'));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
