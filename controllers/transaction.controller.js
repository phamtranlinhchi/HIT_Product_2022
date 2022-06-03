const { User } = require("../models/index");
const { Book } = require("../models/index");
const { TransactionBook } = require("../models/index");
const conn = require("../config/database");
const asyncHandle = require("../middlewares/asyncHandle");
const httpStatus = require("http-status");

const mongoose = require("mongoose");

module.exports = {
  transaction: async (req, res, next) => {
    const user = req.user;
    const namebook = req.body.namebook;
    const amount = req.body.amount;
    const book = await Book.findOne({ namebook });

    transfer(user.username, namebook, amount);

    try {
      const transactionBook = await TransactionBook.create({
        user: user._id,
        book: book._id,
        star: amount,
      });
      res.status(httpStatus.OK).json({
        status: "success",
        transactionBook,
      });
    } catch (err) {
      console.log(err);
      next();
    }
  },
};

async function transfer(from, to, amount) {
  const db = await mongoose.createConnection(process.env.MONGO_URI).asPromise();
  const session = db.startSession();
  session.startTransaction();
  try {
    const opts = { session, returnOriginal: false };
    const A = await User.findOneAndUpdate(
      { username: from },
      { $inc: { star: -amount } },
      opts
    ).then((res) => res.value);
    console.log("A>>>A", A);
    if (A.star < 0) {
      // Nếu số dư của Anonystick không đủ, việc chuyển tiền không thành công và giao dịch bị hủy bỏ
      // `session.abortTransaction()` có nhiềm vụ Sẽ hoàn tác thao tác `findOneAndUpdate () 'ở trên

      //select lại lần nữa?
      console.log(await User.findOne({ username: from }));
      throw new Error("Không đủ sao: " + (A.star + amount));
    }

    // const B = await db
    //   .collection("Account")
    //   .findOneAndUpdate({ name: to }, { $inc: { balance: amount } }, opts)
    //   .then((res) => res.value);
    const B = await Book.findOne({ nameBook: to }, opts);
    if (B.star !== amount) {
      console.log(await Book.findOne({ nameBook: to }));
      throw Error("Sao không hợp lệ");
    }

    await session.commitTransaction();
    session.endSession();
    return { from: A, to: B };
  } catch (error) {
    // Nếu xảy ra lỗi, hãy hủy bỏ tất cả các giao dịch và quay trở lại trước khi sửa đổi
    console.log("Loi ne");
    await session.abortTransaction();
    session.endSession();
    throw error; // catch error
  }
}
