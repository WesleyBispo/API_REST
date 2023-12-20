require('dotenv').config();
import './src/database';
import express from 'express';
import homeRoute from './src/routes/homeRoute';
import userRoute from './src/routes/userRoute';
import tokenRoute from './src/routes/tokenRoute';
import studentRoute from './src/routes/studentRoute';
import imageRoute from './src/routes/imageRoute';
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.static(`${__dirname}/uploads`));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoute);
    this.app.use('/users', userRoute);
    this.app.use('/tokens', tokenRoute);
    this.app.use('/students', studentRoute);
    this.app.use('/images', imageRoute);
  }
}

export default new App().app;
