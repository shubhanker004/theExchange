const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const productSchema = mongoose.Schema({
  model:{
    type: String,
    required: [true, "You need to specify the model name."],
  },
  category:{
    type: String,
    // enum : ['Disposable Vape', 'Delta'],
    default: 'Disposable Vape'
  },
  brand:{
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true
  },
  puffs:{
    type: Number,
    required: true,
    maxlength: 50000
  },
  nicotinePercentage:{
    type: Number,
    required: false
  },
  oilContent:{
    type: Number,
    required: false
  },
  chargePort:{
    type: String,
    required: false
  },
  flavor:{
    type: String,
    required: [true, "You need to specify the flavor."],
    maxlength: 200
  },
  boxQuantity:{
    type: Number,
    required: [true, "How many items come in the box?"],
    default: 10
  },
  price:{
    type: Number,
    required: [true, "You need to specify the price of the item."],
    maxlength: 500
  },
  suggestedRetailPrice:{
    type: Number,
    required: false,
    maxlength: 1000
  },
  available:{
    type: Number,
    required: [true, "How many items of this kind do you have in inventory."],
    maxlength: 100000
  },
  itemSold:{
    type: Number,
    required: true,
    default: 0
  },
  shipping:{
    type: Boolean,
    required: [true, "Do you have free shipping for this product?"],
    default: false
  },
  images:{
    type: Array,
    default:[]
  },
  date:{
    type: Date,
    default: Date.now
  }
});

productSchema.plugin(aggregatePaginate);

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };