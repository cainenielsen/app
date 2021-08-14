const express = require('express');
const app = express();
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Goodbye to a ${name}!`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});