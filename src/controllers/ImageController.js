import multer from 'multer';
import multerConfig from '../config/multer';
import Image from '../models/Image';
import Student from '../models/Student';

const upload = multer(multerConfig).single('image');

class ImageController {
  store(req, res) {
    return upload(req, res, async (erro) => {
      if (erro) {
        return res.status(400).json({ errors: [erro.code] });
      }
      const { originalname, filename } = req.file;
      const { id } = req.body;
      try {
        const student = await Student.findByPk(id);
        if (!student) return res.status(400).json({ errors: ['ID Student inválido, não foi possível salvar imagem'] });
        const image = await Image.create({ originalname, filename, student_id: id });
        return res.status(200).json(image);
      } catch (error) {
        return res.status(500).json({ errors: ['Erro interno'] });
      }
    });
  }
}

export default new ImageController();
