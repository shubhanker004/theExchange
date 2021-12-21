const mongoose = require("mongoose");
const validator = require("validator");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const transactionSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true
  },
  userPhone: {
    type: String,
    required: true
  },
  userAddress: {
    type: String,
    required: true,
    trim: true
  },
  userVerified: {
    type: Boolean,
    required: true
  },
  userEmail: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  orderID: {
    type: String,
    required: true,
  },
  orderData: {
    type: Array,
    required: true,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

transactionSchema.plugin(aggregatePaginate);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = { Transaction };
