const mongoose = require('mongoose');
const { Transaction } = require('../models/transaction');

const paginateTransactions = async(req) => {
  try {
    let aggQueryArray = [];

    if(req.body.keywords && req.body.keywords != ''){
      const re = new RegExp(`${req.body.keywords}`,'gi');
      aggQueryArray.push({
          $match:{ userName:{ $regex:re }}
      });
    }

    let aggQuery = Transaction.aggregate(aggQueryArray);
    const options = {
      page: req.body.page,
      limit: req.body.items,
      sort: { date: 'asc'}
    };
    const transactions = await Transaction.aggregatePaginate(aggQuery, options);
    return transactions;

  } catch(error) {
    throw error;
  }
}



module.exports = {
  paginateTransactions
 };