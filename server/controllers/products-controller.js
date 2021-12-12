const { productService } = require('../services');

const productsController = {
  async addProduct(req, res, next) {
    try {
      const product = await productService.addProduct(req.body);
      res.json(product);
    } catch(error) {
      console.log(error);
      next(error);
    }
  },

  async getProduct(req, res, next) {
    try {
      const id = req.params.id;
      const product = await productService.getProductById(id);
      res.json(product);
    } catch(error) {
      next(error);
    }
  },

  async updateProduct(req, res, next) {
    try {
      const id = req.params.id;
      const product = await productService.updateProductById(id, req.body);
      res.json(product);
    } catch(error) {
      next(error);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;
      const product = await productService.deleteProductById(id);
      res.json(product);
    } catch(error) {
      next(error);
    }
  },

  async getAllProducts(req, res, next) {
    try {
      const product = await productService.getAllProducts(req);
      res.json(product);
    } catch(error) {
      next(error);
    }
  },

  async paginateProducts(req, res, next) {
    try{
      const products = await productService.paginateProducts(req);
      res.json(products);

    } catch(error) {
      next(error);
    }
  },

  async picUpload(req, res, next) {
    try{
      const pic = await productService.picUpload(req);
      res.json(pic);
    } catch{
      next(error);
    }
  }
}

module.exports = productsController;