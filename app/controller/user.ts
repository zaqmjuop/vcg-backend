import { Controller } from 'egg';

class UserController extends Controller {
    async index() {
        const res = await this.ctx.model.User.find({});
        console.log(res)
        this.ctx.body = res;

    }

    async create() {
        const random = Math.trunc(Math.random() * 100000)
        const newUser = new this.ctx.model.User({ name: `书名_${random}` });
        const result = await newUser.save();
        this.ctx.body = result;
    }
}

export default UserController;
