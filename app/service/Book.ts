import { Service } from 'egg';

/**
 * Test Service
 */
export default class Book extends Service {

    /**
     * sayHi to you
     * @param name - your name
     */
    public async create(name: string) {
        const random = Math.trunc(Math.random() * 100000)
        const newBook = new this.ctx.model.Book({ name: `书名_${name}_${random}` });
        const result = await newBook.save();
        return result;
    }
}
