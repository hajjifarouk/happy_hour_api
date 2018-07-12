const Joi = require('joi');
const multer = require('multer');
var path = require('path');
const mime = require('mime');

var generateFileName = function(){
    var date = new Date();
    const y = date.getFullYear();
    const M = date.getMonth();
    const d = date.getDay();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const ms = date.getMilliseconds();
    return y+''+M+''+d+''+m+''+s+''+ms;
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, generateFileName()+ '.' + mime.extension(file.mimetype));
    }
});
module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },
    passBody: () => {
        return (req, res, next) => {
            next();
        }
    },
    upload : multer({storage: storage}),
    schemas: {
        signupSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            role: Joi.string().required()
        }),
        signinSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            role: Joi.string().required()
        })
    },
    nocache:(req, res, next)=> {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }
}