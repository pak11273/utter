import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

module.exports = (app) => {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
