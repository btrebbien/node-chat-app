const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();


// configure express middleware (holds html so keep below maintenance)
app.use(express.static(publicPath));

// binds app to a port
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
