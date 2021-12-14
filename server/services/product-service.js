const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

const { Product } = require('../models/product');
const httpStatus = require('http-status');
const { HttpError } = require('../middlewares/http-error');

cloudinary.config({ 
  cloud_name: 'the-exchange', 
  api_key: '895564313987423', 
  api_secret: `${process.env.CN_API_SECRET}` 
});

const addProduct = async( body ) => {
  try {
    const product = new Product({
      ...body
    });
    await product.save();
    return product;

  } catch(error) {
    throw error;
  }
}

const getProductById = async( id ) => {
  try {
    const product = await Product.findById(id).populate('brand');

    if(!product) {
      throw new HttpError("The product you are looking for was not found.", httpStatus.NOT_FOUND);
    }

    return product;

  } catch(error) {
    throw error;
  }
}

const updateProductById = async( id, body ) => {
  try {
    const product = await Product.findOneAndUpdate(
      {id},
      {"$set": body},
      {new: true}
    );

    if(!product) {
      throw new HttpError("The product you are looking for was not found.", httpStatus.NOT_FOUND)
    }

    return product;

  } catch(error) {
    throw error;
  }
}

const deleteProductById = async( id ) => {
  try {
    const product = await Product.findByIdAndRemove(id);
    return product;

  } catch(error) {
    throw error;
  }
}

const getAllProducts = async(req) => {
  try {
    const products = await Product
      .find({})
      .populate('brand')
      .sort([
        [req.query.sortBy ? req.query.sortBy : '_id', req.query.order ? req.query.order : "asc"]
      ])
      .limit(parseInt(req.query.limit ? req.query.limit : 5));;
    return products;

  } catch(error) {
    throw error;
  }
}

const paginateProducts = async(req) => {
  try {
    let aggQueryArray = [];

    if(req.body.category && req.body.category.length > 0){
      aggQueryArray.push({
          $match:{ category: { $in: req.body.category }}
      });
    }


    // if(req.body.keywords && req.body.keywords != '') {
    //   const re = new RegExp(`${req.body.keywords}`, 'gi');
    //   aggQueryArray.push({
    //     $match: { brand: { $regex: re } }
    //   });
    // }

    if(req.body.brand && req.body.brand.length > 0){
      let newBrandArray = req.body.brand.map((item) => (
        mongoose.Types.ObjectId(item)
      ));
      aggQueryArray.push({
        $match: { brand: { $in: newBrandArray } }
      });
    }

    if(req.body.keywords && req.body.keywords != ''){
      const re = new RegExp(`${req.body.keywords}`,'gi');
      aggQueryArray.push({
          $match:{ model:{ $regex:re }}
      });
    }

    if(req.body.model && req.body.category.model > 0){
      aggQueryArray.push({
          $match:{ category: { $in: req.body.category }}
      });
    }


    // if(req.body.keywords && req.body.keywords != '') {
    //   const re = new RegExp(`${req.body.keywords}`, 'gi');
    //   aggQueryArray.push({
    //     $match: { flavor: { $regex: re }}
    //   });
    // }

    if(req.body.minPuffs && req.body.minPuffs >= 0 || req.body.maxPuffs && req.body.maxPuffs <= 50000) {
      if(req.body.minPuffs) {
        aggQueryArray.push({ $match: { puffs: { $gt: req.body.minPuffs - 1 }}});
      }
      if(req.body.maxPuffs) {
        aggQueryArray.push({ $match: { puffs: { $lt: req.body.maxPuffs + 1 }}});
      }
    }

    if(req.body.minPrice && req.body.minPrice >= 0 || req.body.maxPrice && req.body.maxPrice <= 50) {
      if(req.body.minPrice) {
        aggQueryArray.push({ $match: { price: { $gt: req.body.minPrice - 1 }}});
      }
      if(req.body.maxPrice) {
        aggQueryArray.push({ $match: { price: { $lt: req.body.maxPrice + 1 }}});
      }
    }

    // getting actual brands name

    aggQueryArray.push({
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand"
      }
    },
    { $unwind: '$brand'}
    );

    // console.log(aggQueryArray)

    let aggQuery = Product.aggregate(aggQueryArray);
    const options = {
      page: req.body.page,
      limit: req.body.items,
      sort: { date: 'asc'}
    };
    const products = await Product.aggregatePaginate(aggQuery, options);
    return products;

  } catch(error) {
    throw error;
  }
}

const picUpload = async(req) => {
  try {
    const upload = await cloudinary.uploader.upload(req.files.file.path, {
      public_id:`${Date.now()}`,
      folder:'theExchange_upload'
    });

    return {
      public_id:upload.public_id,
      url:upload.url
    }
  } catch(error) {
    throw error
  }
}



module.exports = { 
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllProducts,
  paginateProducts,
  picUpload
 };