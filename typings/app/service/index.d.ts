// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBook from '../../../app/service/Book';
import ExportTest from '../../../app/service/Test';

declare module 'egg' {
  interface IService {
    book: ExportBook;
    test: ExportTest;
  }
}
