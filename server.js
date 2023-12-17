import app from './app';
require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log('Escuntando em http://localhost:3000');
});
