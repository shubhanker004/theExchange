const { Transaction } = require("../models/transaction");
const { User } = require("../models/user");
const request = require('request');
const { clientId, clientSecret, PAYPAL_API } = require("../utils/payPalClient");
// const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");

const addTransaction = async (req) => {
  // let request = new checkoutNodeJssdk.orders.OrdersGetRequest(req.body.orderID);
  let order;

  try {
    var paymentID = req.body.paymentID;
    var payerID = req.body.payerID;
    var purchase_units = req.body.purchase_units;
    order = request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
    '/execute',
      {
        auth:
        {
          user: clientId,
          pass: clientSecret
        },
        body:
        {
          payer_id: payerID,
          transactions: [
          {
            amount:
            {
              total: '10.99',
              currency: 'USD'
            }
          }]
        },
        json: true
      },
      function(err, response)
        {
          if (err)
          {
            console.error(err);
            return response.sendStatus(500);
          }
          // // 4. Return a success response to the client
          // response.json(
          // {
          //   status: 'success'
          // }
          // )
        }
    );
    //// error
    const transaction = new Transaction({
      userID: req.user._id,
      userName: req.user.firstName + " " + req.user.lastName,
      userPhone: req.user.phone,
      userAddress: req.user.address,
      userEmail: req.user.email,
      userVerified: req.user.verified,
      orderID: req.body.orderID,
      orderData: purchase_units
    });
    await transaction.save();

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          history: [
            {
              transactionId: transaction._id,
              date: transaction.date,
              name: transaction.userName,
              phone: transaction.userPhone,
              email: transaction.userEmail,
              // address: transaction.userAddress,
              // userVerified: transaction.userVerified,
              orderID: req.body.orderID,
              amount: transaction.orderData[0].amount.value,
              items: transaction.orderData[0].items,
            },
          ],
        },
      },
      { new: true }
    );

    /// error
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addTransaction,
};
