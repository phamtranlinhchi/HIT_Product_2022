const httpStatus = require("http-status");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const { bookService } = require("../services");
const { Book } = require("../models");
const slugify = require("slugify");
const sharp = require("sharp");
const multer = require("multer");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new ErrorResponse("Not an image! Please upload only images.", 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}
module.exports = {
    uploadBookImages: upload.fields([{ name: "image" }]),

    resizeBookImages: asyncHandle(async(req, res, next) => {
        // console.log(files.buffer)
        const book = await Book.findById(req.params.bookId);
        const slug = slugify(xoa_dau(book.namebook), { lower: true });
        req.body.image = [];

        await Promise.all(
            req.files.image.map(async(file, i) => {
                const filename = `${slug}-${i + 1}.jpeg`;
                // resize ( muốn chỉnh kích thước)
                await sharp(file.buffer)
                    // .resize(x,y )
                    .toFormat("jpeg")
                    .jpeg({ quality: 90 })
                    .toFile(`public/updates/${slug}/${filename}`);

                req.body.image.push(filename);
            }),
        );

        next();
    }),

    createBook: asyncHandle(async(req, res, next) => {
        const book = await bookService.createBook(req.body);
        res.status(httpStatus.CREATED).send(book);
    }),

    getBooks: asyncHandle(async(req, res, next) => {
        const books = await bookService.getBooks(req.query);
        res.status(httpStatus.OK).json({
            status: "success",
            result: books.length,
            data: {
                books: books,
            },
        });
    }),

    getBook: asyncHandle(async(req, res, next) => {
        const book = await bookService.getBookById(req.params.bookId);
        if (!book) {
            return next(new ErrorResponse(httpStatus.NOT_FOUND, "Book not found"));
        }
        res.status(httpStatus.OK).json({
            status: "success",
            book,
        });
    }),

    updateBook: asyncHandle(async(req, res) => {
        const book = await bookService.updateBookById(req.params.bookId, req.body);
        res.status(httpStatus.OK).json({
            status: "success",
            book,
        });
    }),

    deleteBook: asyncHandle(async(req, res) => {
        await bookService.deleteBookById(req.params.bookId);
        res.status(httpStatus.NO_CONTENT).json({
            status: "success",
            data: null,
        });
    }),
};