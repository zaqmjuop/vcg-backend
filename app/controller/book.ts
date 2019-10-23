'use strict';

import { Controller } from 'egg';

class BookController extends Controller {
    async index() {
        const res = await this.ctx.model.Book.find({});
        console.log(res);
        this.ctx.body = res;
    }

    async create() {
        const random = Math.trunc(Math.random() * 100000);
        const newBook = new this.ctx.model.Book({ name: `书名_${random}` });
        const result = await newBook.save();
        this.ctx.body = result;
    }
}

module.exports = BookController;
