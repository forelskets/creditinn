const mongoose = require("mongoose");
const UserBankDetails = require("../models/userBankDetails");
const UserTransaction = require("../models/userTransaction");
const Withdrawls = require("../models/withdrawls");
exports.getAllWithdrawls = async (req, res, next) => {
  console.log("getAllWithdrawls");
  try {
    const result = await Withdrawls.find({})
      .populate(["UserId", "BankId"])
      .sort({ _id: "asc" });
    console.log(result, "resultttttttttttt");
    if (result && result.length > 0) {
      return res.send({
        status: 1,
        data: result,
        msg: "success",
      });
    } else {
      return res.send({
        status: 0,

        msg: "fail",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: 0,

      msg: "something_is_wrong",
    });
  }
};

exports.updateStatus = async (req, res, next) => {
  console.log("WithdrawlsupdateStatus");
  const { status } = req.body;
  const { id } = req.params;
  try {
    if (status === "Reject") {
      const result1 = await Withdrawls.findByIdAndUpdate(
        id,
        { Status: status },
        { upsert: true }
      );

      if (result1) {
        console.log(result1, "result1");
        const Amount = result1.Amount;
        const userId = result1.userId;
        let date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const date1 = date.getDate();

        const count = await UserTransaction.collection.count();

        const transactiongenerator = `${year}${month}${date1}${count}`;

        const userbankdetails = await UserBankDetails.findOne({
          UserId: userId,
        });
        console.log(userbankdetails, "bankdeetails");
        const walletbeforeUpdate = userbankdetails?.Wallet;
        const TransactionWallet =
          parseInt(walletbeforeUpdate) + parseInt(Amount);

        console.log(walletbeforeUpdate, TransactionWallet, "ffffff");
        const userBankDetailsUpdated = await UserBankDetails.findOneAndUpdate(
          { UserId: userId },
          { Wallet: TransactionWallet },
          { upsert: true }
        );
        if (!userBankDetailsUpdated) {
          await Withdrawls.findByIdAndUpdate(id, { Status: "Pending" });

          return res.send({
            status: 0,

            msg: "fail to updated Wallet",
          });
        }
        const withdrawls = await UserTransaction({
          userId: mongoose.Types.ObjectId(userId),
          TransactionType: "Reject",
          CreditDebit: "credit",
          Amount: Amount,
          TransactionWallet: TransactionWallet,
          TransactionNo: transactiongenerator,
        });
        console.log(withdrawls, "cashback");
        const withdrawlsDone = await withdrawls.save();

        if (withdrawlsDone) {
          return res.send({
            status: 1,

            msg: "successfully  Status rejected",
          });
        } else {
          await Withdrawls.findByIdAndUpdate(id, { Status: "Pending" });
          await UserBankDetails.findOneAndUpdate(
            { UserId: userId },
            { Wallet: walletbeforeUpdate }
          );
          return res.send({
            status: 0,

            msg: "fail to reject Status ",
          });
        }
      }
    } else {
      const result = await Withdrawls.findByIdAndUpdate(
        id,
        { Status: status },
        { upsert: true }
      );

      if (result) {
        return res.send({
          status: 1,

          msg: "successfully updated status",
        });
      } else {
        return res.send({
          status: 0,

          msg: "fail to updated status",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: 0,

      msg: "something_is_wrong",
    });
  }
};

exports.updateTransaction = async (req, res, next) => {
  console.log("WithdrawlsupdateStatus");
  const { transaction } = req.body;

  const { id } = req.params;
  console.log(id);
  try {
    const result = await Withdrawls.findByIdAndUpdate(
      id,
      { TransactionNo: transaction },
      { upsert: true }
    );

    if (result) {
      return res.send({
        status: 1,

        msg: "successfully updated TransationNo",
      });
    } else {
      return res.send({
        status: 0,

        msg: "fail to updated TransationNo",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: 0,

      msg: "something_is_wrong",
    });
  }
};
