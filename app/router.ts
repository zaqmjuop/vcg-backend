import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/users', controller.user.index);
  router.get('/books', controller.book.index);
  router.get('/books/create', controller.book.create);
};
