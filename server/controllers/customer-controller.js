const customerService = require('../services/customer-service');

const customerController = {
  async paginateTransactions(req, res, next) {
    try{
      const transactions = await customerService.paginateTransactions(req);
      res.json(transactions);

    } catch(error) {
      next(error);
    }
  }
  
}

module.exports = customerController;