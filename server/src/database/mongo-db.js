const mongoose = require('mongoose');

function generator (name) {
    return {[name]: function(model, ...args) {
        const ret = model[name](...args);
        if(ret
            && typeof args[args.length -1] !== 'function' // do not exec when called with a callback - will throw an error
            && !(ret instanceof Promise)) return ret.exec();
        else return ret;
    }}[name];
}

exports.save = generator('save');

exports.findOne = generator('findOne');

exports.findOneAndUpdate = generator('findOneAndUpdate');

exports.findByIdAndUpdate = generator('findByIdAndUpdate');

exports.findById = generator('findById');

exports.find = generator('find');

exports.count = generator('countDocuments');

exports.update = generator('updateMany');

exports.deleteOne = generator('deleteOne');

exports.deleteMany = generator('deleteMany');

exports.start = async function start(address, callback) {
    mongoose.set('strictQuery', false);
    exports.conn = await mongoose.connect(address, {/*connectTimeoutMS: 60 * 1000,*/ authSource: 'admin'});
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        //callback(db);
    });

    callback(db);
};

exports.models = require('./schemas/models');

exports.mongoose = mongoose;
