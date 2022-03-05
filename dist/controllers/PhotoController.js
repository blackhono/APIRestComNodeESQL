"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);

var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('photo');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      try {
        if (err) {
          return res.status(400).json({
            errors: [err.code],
          });
        }
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const aluno = await _Aluno2.default.findByPk(aluno_id);
        if (!aluno) {
          return res.status(400).json({
            errors: ['Aluno não existe'],
          });
        }
        const photo = await _Photo2.default.create({ originalname, filename, aluno_id });
        return res.json(photo);
      } catch (e) {
        return console.log(e);
      }
    });
  }
}

exports. default = new PhotoController();
