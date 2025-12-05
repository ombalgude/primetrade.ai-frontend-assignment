import app from './app';
import { env } from './config/env';

const startServer = () => {
  app.listen(env.BACKEND_PORT, () => {
    console.log(`server listening on http://localhost:${env.BACKEND_PORT}`);
  });
};

startServer();


