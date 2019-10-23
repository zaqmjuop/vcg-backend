import { Controller } from 'egg';
import { ObjectId } from 'bson';
import jsonwebtoken = require('jsonwebtoken');
console.log({ jsonwebtoken });
// Content-Type  application/x-www-form-urlencoded
const RegUserName = /^\w{6,16}$/;
const RegPassword = /^\w{6,16}$/;
interface Result {
    code: 0 | 1;
    message: string;
    data: any;
}
export interface User {
    _id: ObjectId;
    userName: string;
    password: string;
    __v: number;
}

export interface Session {
    _id: ObjectId;
    userName: string;
    token: string;
    __v: number;
}
class UserController extends Controller {
    async index() {
        const res = await this.ctx.model.User.find({});
        console.log(res);
        this.ctx.body = res;

    }
    async register() {
        const { userName, password } = this.ctx.request.body;
        if (!RegUserName.test(userName)) {
            const result: Result = { code: 1, message: '用户名可以包含大写字母、小写字母、数字或_ 长度允许在6-16位之间', data: null };
            this.ctx.body = result;
            return;
        }
        if (!RegPassword.test(password)) {
            const result: Result = { code: 1, message: '密码可以包含大写字母、小写字母、数字或_ 长度允许在6-16位之间', data: null };
            this.ctx.body = result;
            return;
        }
        const isExist: User = await this.ctx.model.User.findOne({ userName });
        if (isExist && isExist.userName) {
            const result: Result = { code: 1, message: '该用户名已经被注册过', data: null };
            this.ctx.body = result;
            return;
        }
        const newUser = new this.ctx.model.User({ userName, password });
        const token = jsonwebtoken.sign({}, userName);
        const newSession = new this.ctx.model.Session({ userName, token });
        await newUser.save();
        await newSession.save();
        const data = newUser;
        data.token = newSession.token;
        const result: Result = { code: 0, message: '', data };
        result.data.password = null;
        this.ctx.body = result;
    }
    async login() {
        const { userName, password } = this.ctx.request.body;
        if (!RegUserName.test(userName)) {
            const result: Result = { code: 1, message: '用户名或密码不正确', data: null };
            this.ctx.body = result;
            return;
        }
        if (!RegPassword.test(password)) {
            const result: Result = { code: 1, message: '用户名或密码不正确', data: null };
            this.ctx.body = result;
            return;
        }
        const fetchUser: User = await this.ctx.model.User.findOne({ userName });
        if (fetchUser && fetchUser.userName && fetchUser.password === password) {
            await this.ctx.model.Session.remove({ userName });
            const token = jsonwebtoken.sign({}, userName);
            const newSession = new this.ctx.model.Session({ userName, token });
            await newSession.save();
            const result: Result = { code: 0, message: '', data: { user: fetchUser, token: newSession.token } };
            result.data.user.password = null;
            this.ctx.body = result;
            return;
        }
        const result: Result = { code: 1, message: '用户名或密码不正确', data: null };
        this.ctx.body = result;
        return;
    }
    async logout() {
        this.ctx.session = null;
        const { token } = this.ctx.request.body;
        if (typeof token === 'string') {
            await this.ctx.model.Session.remove({ token });
        }
        const result: Result = { code: 0, message: '', data: null };
        this.ctx.body = result;
    }
    async loginAuto() {
        const { token } = this.ctx.request.body;
        if (typeof token === 'string' && token) {
            const fetchSession: Session = await this.ctx.model.Session.findOne({ token });
            if (fetchSession && fetchSession.userName) {
                const fetchUser: User = await this.ctx.model.User.findOne({ userName: fetchSession.userName });
                if (fetchUser && fetchUser.userName) {
                    const result: Result = { code: 0, message: '', data: { user: fetchUser, token: fetchSession.token } };
                    result.data.user.password = null;
                    this.ctx.body = result;
                    return;
                }
            }
        }
        const result: Result = { code: 1, message: 'token无效', data: null };
        this.ctx.body = result;
    }
}

export default UserController;
