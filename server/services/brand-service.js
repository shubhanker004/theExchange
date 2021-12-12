const httpStatus = require('http-status');
const { HttpError } = require('../middlewares/http-error');
const { Brand } = require('../models/brand');

const addBrand = async(brandname) => {
  try {
    const brand = new Brand({
      name: brandname
    });
    await brand.save();
    return brand;

  } catch(error) {
    throw error;
  }
}

const getBrandById = async(id) => {
  try {
    const brand = await Brand.findById(id);
    if(!brand) {
      throw new HttpError("The brand you are looking for was not found!", httpStatus.NOT_FOUND)
    }
    return brand;

  } catch(error) {
    throw error;
  }
}


const deleteBrandById = async(id) => {
  try {
    const brand = await Brand.findByIdAndRemove(id);
    return brand;

  } catch(error) {
    throw error;
  }
}

const getAllBrands = async(args) => {
  try {
    const brands = await Brand
    .find({})
    .sort([
      ["_id", args.order ? args.order : "asc"]
    ])
    .limit(args.limit ? args.limit : 1000);

    if(!brands) {
      throw new HttpError("Oh! No brands were found :(", httpStatus.NOT_FOUND)
    }
    return brands;
  } catch(error) {
    throw error;
  }
}

module.exports = { 
  addBrand,
  getBrandById,
  deleteBrandById,
  getAllBrands
 };