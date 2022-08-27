const BankOffer = require("../models/bankOffer");
const Category = require("../models/category");
const Notification = require("../models/notification");
const mongoose = require("mongoose");

exports.getBankOfferList = async (req, res, next) => {
  console.log("getBankOfferList");
  try {
    var result = await BankOffer.find()
      .populate(["BankName", "BankService"])
      .sort({ _id: "desc" });

    if (result && result.length > 0) {
      return res.send({
        status: 1,
        message: "success",
        data: {
          services: result,
        },
      });
    } else {
      return res.send({
        status: 0,
        message: "no_record_found",
      });
    }
  } catch (error) {
    return res.send({
      status: 0,
      message: "something_went_wrong",
    });
  }
};

exports.getBankOfferById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await BankOffer.findById(id).populate([
      "BankName",
      "BankService",
    ]);
    console.log("result", result);

    if (result) {
      return res.send({
        status: 1,
        message: "success",
        data: {
          service: result,
        },
      });
    } else {
      return res.send({
        status: 0,
        message: "no_record_found",
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

exports.createBankOffer = async (req, res, next) => {
  console.log("createBankOffer");
  const { BankName, BankService, Note, Category, Type } = req.body;
  try {
    let file = {};
    file = req.files.Picture[0];
    var image_path = file.path.slice(17);
    console.log(image_path, "pathththtth");
    const fileobj = {
      fileName: file.originalname,
      filePath: image_path,
      fileType: file.mimetype,
    };

    const result = await BankOffer.create({
      BankName: BankName,
      BankService: BankService,
      Note: Note,
      Category: Category,
      Picture: JSON.stringify(fileobj),
      Type,
    });
    console.log("result", result);

    if (result.id) {
      return res.send({
        status: 1,
        message: "Created",
        data: {
          service: result,
        },
      });
    } else {
      return res.send({
        status: 0,
        message: "failed_to_create",
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

exports.BankOfferIextEditor = async (req, res, next) => {
  console.log("BankOfferTextEditor");
  const { id } = req.params;
  const { RTEditor } = req.body;
  try {
    const result = await BankOffer.findByIdAndUpdate(
      id,
      {
        RTEditor,
      },
      { upsert: true }
    );
    console.log("result", result);

    if (result.id) {
      return res.send({
        status: 1,
        message: "Updated",
      });
    } else {
      return res.send({
        status: 0,
        message: "failed_to_Update",
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

// exports.pictureUploads = async(req , res , next) =>{
//   const {Id } = req.body
//   console.log("Idd" , Id)
//   try {

// let file = {};
// file = req.files.Picture[0];
// var image_path = file.path.slice(17,)
// console.log(image_path , "pathththtth")
// const fileobj = {
//   fileName: file.originalname,
//   filePath: image_path,
//   fileType: file.mimetype

// }

//     const bankOffer = await BankOffer.findByIdAndUpdate(Id , { Picture: JSON.stringify(fileobj)})
//     console.log(bankOffer , "bankoffer")
//     if(bankOffer){
//      return res.send({
//         status: 1,
//         msg: 'success'
//       })
//     }else{
//      return res.send({
//         status: 0,
//         msg:'fail'
//       })
//     }
//   } catch (error) {
//       console.log(error);
//       return res.send({
//         status: 0,
//         msg:'technical issue'
//       })
//   }

// }

exports.updateBankOffer = async (req, res, next) => {
  console.log("updateBankOffe");
  const id = req.params.id;
  let obj = {};
  const { BankName, BankService, Note, Category } = req.body;
  try {
    console.log("1111");
    if (BankName) {
      obj.BankName = BankName;
    }
    if (BankService) {
      obj.BankService = BankService;
    }
    console.log(req?.files, "req.files.Picture[0]");
    console.log("222");
    if (Category) {
      obj.Category = Category;
    }
    console.log("oooo");
    if (Note) {
      obj.Note = Note;
    }
    console.log("3333");

    if (req?.files?.Picture) {
      console.log("4444");

      let file = {};
      file = req.files.Picture[0];
      var image_path = file.path.slice(17);
      console.log(image_path, "pathththtth");
      const fileobj = {
        fileName: file.originalname,
        filePath: image_path,
        fileType: file.mimetype,
      };
      obj["Picture"] = JSON.stringify(fileobj);
    }
    console.log("555");
    console.log(obj, "obj");
    const result = await BankOffer.findByIdAndUpdate(id, obj);
    console.log(result, "res");
    if (result) {
      return res.send({
        status: 1,
        message: "Updated",
      });
    } else {
      return res.send({
        status: 0,
        message: "not update",
      });
    }
  } catch (error) {
    return res.send({
      status: 0,
      message: "something_went_wrong",
    });
  }
};

exports.deleteBankOffer = async (req, res, next) => {
  console.log("deleteBankOffer");
  const id = req.params.id;
  try {
    const result = await BankOffer.findByIdAndDelete(id);
    if (result) {
      return res.send({
        status: 1,
        message: "deleted",
      });
    } else {
      return res.send({
        status: 0,
        message: "no_record_found",
      });
    }
  } catch (error) {
    return res.send({
      status: 0,
      message: "something_went_wrong",
    });
  }
};

exports.ChangeOfferStatus = async (req, res, next) => {
  console.log("changeOfferStatus");
  const id = req.params.id;
  const { Status } = req.body;
  console.log(id, Status, "data");
  try {
    let updates = await BankOffer.findByIdAndUpdate(id, { Status: Status });
    console.log(updates, "update");
    if (updates) {
      return res.send({
        status: 1,
        message: "success",
      });
    } else {
      return res.send({
        status: 0,
        message: "not find",
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({
      status: 0,
      message: "Something_technically_issue",
    });
  }
};

exports.NotificationSave = async (req, res, next) => {
  console.log("NotificationSave");
  try {
    const response = await Notification(req.body);
    const SaveNotification = response.save();
    if (SaveNotification) {
      return res.send({
        status: 1,
        msg: "Notification save",
      });
    } else {
      res.send({
        status: "0",
        msg: "Message not save",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "0",
      msg: "some_technical_issue",
    });
  }
};
