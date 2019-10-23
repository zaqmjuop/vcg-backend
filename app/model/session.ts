module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    // const conn = app.mongooseDB.get('db1');
    const SessionSchema = new Schema({
        userName: { type: String, required: true },
        token: { type: String, required: true },
    });

    return mongoose.model('Session', SessionSchema);
};
