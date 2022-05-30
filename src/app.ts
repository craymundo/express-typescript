import express from 'express'
import passport from 'passport'
import passportMiddleware from './middlewares/passport';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/user.routes';
import questionnaireRoutes from './routes/questionnaire.routes';
import quizRoutes from './routes/quiz.routes';


const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);


app.get('/', (_req, res) => {
  return res.send(`The API is at http://localhost:${app.get('port')}`);
})

app.use(userRoutes);
app.use(questionnaireRoutes);
app.use(quizRoutes);

export default app;
