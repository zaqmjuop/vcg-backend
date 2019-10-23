import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  // router.get('/users', controller.user.index);
  // router.get('/books', controller.book.index);
  // router.get('/books/create', controller.book.create);
  // router.get('/users', controller.user.index);
  router.post('/users/register', controller.user.register);
  router.post('/users/login', controller.user.login);
  router.post('/users/logout', controller.user.logout);
  router.post('/users/loginAuto', controller.user.loginAuto);
};
