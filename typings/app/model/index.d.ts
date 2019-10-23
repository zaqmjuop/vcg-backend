// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBook from '../../../app/model/book';
import ExportSession from '../../../app/model/session';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Book: ReturnType<typeof ExportBook>;
    Session: ReturnType<typeof ExportSession>;
    User: ReturnType<typeof ExportUser>;
  }
}
