require('dotenv').config();
import './src/database';
import express from 'express';
import homeRoute from './src/routes/homeRoute';
import userRoute from './src/routes/userRoute';
import tokenRoute from './src/routes/tokenRoute';
import studentRoute from './src/routes/studentRoute';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoute);
    this.app.use('/users', userRoute);
    this.app.use('/tokens', tokenRoute);
    this.app.use('/students', studentRoute);
  }
}

export default new App().app;
