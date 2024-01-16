require('dotenv').config();
import './database';

import express from 'express';
import cors from 'cors'
import helmet from 'helmet';

import homeRoute from './routes/homeRoute';
import userRoute from './routes/userRoute';
import tokenRoute from './routes/tokenRoute';
import studentRoute from './routes/studentRoute';
import imageRoute from './routes/imageRoute';
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors({ origin: '*' }));
    this.app.use(helmet());
    this.app.use(express.static(`${__dirname}/uploads/`));
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
