const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

// Serve static files from the webpage folder
app.use(express.static(path.join(__dirname, 'webpage')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
