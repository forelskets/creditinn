const UserTransaction = require("../models/userTransaction");
const UserBankDetails = require("../models/userBankDetails");
const ObjectId = require("mongoose").Types.ObjectId;
const Sequence = require("../models/sequenceGenerator");
const { type } = require("express/lib/response");

exports.createUserTransaction = async (req, res, next) => {
  try {
    //  const sequence = await Sequence.findOneAndUpdate({"_id":ObjectId("6281ed6435a76632c8f233ec")},{"$inc" : {TransactionNo : 1 }})
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const date1 = date.getDate();
    // const hour = date.getHours();
    // const minute = date.getMinutes();
    // const second = date.getSeconds();
    const count = (await UserTransaction.collection.count()) + 1;

    const transactiongenerator = `${year}${month}${date1}${count}`;

    // let transactionNoCashback = parseInt(transactiongenerator) + parseInt(sequence.TransactionNo) + 1 ;

    const userbankdetails = await UserBankDetails.findOne({
      UserId: req.body.userId,
    });
    const TransactionWalletCashback =
      parseInt(userbankdetails?.Wallet || 0) + parseInt(req.body.Amount);

    const cashback1 = await UserTransaction({
      userId: req.body.userId,
      TransactionType: req.body.TransactionType,
      CreditDebit: req.body.CreditDebit,
      Amount: req.body.Amount,
      TransactionWallet: TransactionWalletCashback,
      TransactionNo: transactiongenerator,
    });
    console.log(cashback1, "cashback");
    const cashback = cashback1.save();
    console.log(req.body.userId, "userId");

    if (userbankdetails) {
      console.log(userbankdetails.Wallet, "wallet");
      const wallet =
        parseInt(userbankdetails?.Wallet || 0) + parseInt(req.body.Amount);
      console.log(wallet, "wallet");
      const userBankDetailsUpdated = await UserBankDetails.findOneAndUpdate(
        { UserId: req.body.userId },
        { Wallet: wallet },
        { upsert: true }
      );
      console.log(userBankDetailsUpdated, "userBankDetails");
    }
    if (req.body.Earning !== "" && req.body.Earning !== undefined) {
      let date2 = new Date();
      const year2 = date2.getFullYear();
      const month2 = date2.getMonth() + 1;
      const date3 = date2.getDate();
      const count1 = (await UserTransaction.collection.count()) + 1;

      const transactiongenerator1 = `${year2}${month2}${date3}${count1}`;

      const userbankdetailsForEarning = await UserBankDetails.findOne({
        UserId: req.body.refralId,
      });

      console.log(userbankdetailsForEarning, "userbankdetailsforearning");

      const TransactionWalletEarning =
        parseInt(userbankdetailsForEarning?.Wallet || 0) +
        parseInt(req.body.Earning);

      console.log(TransactionWalletEarning, "TransactionWalletEarning");

      const earning1 = await UserTransaction({
        userId: req.body.refralId,
        TransactionType: req.body.TransactionTypeEarning,
        CreditDebit: req.body.CreditDebit,
        Amount: req.body.Earning,
        TransactionWallet: TransactionWalletEarning,
        TransactionNo: transactiongenerator1,
      });
      const earning = earning1.save();
      console.log(earning1, "earning");

      if (userbankdetailsForEarning) {
        userbankdetailsForEarning.Wallet = TransactionWalletEarning;
        const s = userbankdetailsForEarning.save();
        console.log(s, "userbankdetails");
      }

      if (earning) {
        return res.send({
          status: 1,
          message: "allorted",
        });
      } else {
        return res.send({
          status: 0,
          message: "not allorted",
        });
      }
    }
    if (cashback) {
      return res.send({
        status: 1,
        message: "allorted",
      });
    } else {
      return res.send({
        status: 0,
        message: "not allorted",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.send({
      status: 0,
      message: "something_went_wrong",
    });
  }
};

exports.getTransactionList = async (req, res, next) => {
  try {
    const result = await UserTransaction.find()
      .populate(["userId"])
      .sort({ _id: "desc" });
    console.log("result", result);

    if (result) {
      return res.send({
        status: 1,
        data: result,
        message: "success",
      });
    } else {
      return res.send({
        status: 0,
        message: "not success",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.send({
      status: 0,
      message: "something_went_wrong",
    });
  }
};

exports.getTransaction = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await UserTransaction.find({ userId: id })
      .populate(["userId"])
      .sort({ _id: "desc" });
    console.log("result", result);

    if (result) {
      return res.send({
        status: 1,
        data: result,
        message: "success",
      });
    } else {
      return res.send({
        status: 0,
        message: "not success",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.send({
      status: 0,
      message: "something_went_wrong",
    });
  }
};
