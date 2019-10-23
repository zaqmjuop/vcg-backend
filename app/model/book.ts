module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    // const conn = app.mongooseDB.get('example');

    const BookSchema = new Schema({
        name: { type: String },
    });
    return mongoose.model('Book', BookSchema);
};
