import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import uuid from 'uuid';

const setupSchema = () => {
  var Schema = mongoose.Schema;
  var userSchema = new Schema({
    userId: {
      type: String,
      required: true,
      default: () => uuid.v4(),
      index: true,
      unique: true,
    },
    name: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      required: true,
      default: () => Date.now(),
    },
    lastUpdated: {
      type: Date,
      required: true,
      default: () => Date.now(),
    },
    deletionDate: {
      type: Date,
    },
    userPermissions: {
      type: Object,
      required: false,
    },
  });

  userSchema.plugin(mongoosePaginate);
  global.UserTable = mongoose.model('User', userSchema);
};

if (!global.UserTable) setupSchema();

export default global.UserTable;
