import multer from 'multer';

import multerConfig from '../config/multerConfig';

import Photo from '../models/Photo';
import Aluno from '../models/Aluno';

const upload = multer(multerConfig).single('photo');

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
        const aluno = await Aluno.findByPk(aluno_id);
        if (!aluno) {
          return res.status(400).json({
            errors: ['Aluno não existe'],
          });
        }
        const photo = await Photo.create({ originalname, filename, aluno_id });
        return res.json(photo);
      } catch (e) {
        return console.log(e);
      }
    });
  }
}

export default new PhotoController();
